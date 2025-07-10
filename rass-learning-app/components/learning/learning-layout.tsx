"use client"

import { useState } from 'react'
import { Enrollment, Course, CourseModule } from '@prisma/client'
import { ModuleSidebar } from './module-sidebar'
import { ModuleContent } from './module-content'
import { LearningHeader } from './learning-header'
import { MobileModuleNav } from './mobile-module-nav'

interface LearningLayoutProps {
  enrollment: Enrollment & {
    course: Course
  }
  currentModule: CourseModule
  modules: CourseModule[]
}

export function LearningLayout({
  enrollment,
  currentModule,
  modules
}: LearningLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [completedModules, setCompletedModules] = useState<string[]>([])

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules(prev => [...prev, moduleId])
    // Update progress in database
    updateProgress()
  }

  const updateProgress = async () => {
    const progress = Math.round((completedModules.length / modules.length) * 100)
    await fetch(`/api/courses/${enrollment.courseId}/progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress })
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LearningHeader 
        course={enrollment.course}
        progress={enrollment.progress}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <ModuleSidebar
            modules={modules}
            currentModule={currentModule}
            completedModules={completedModules}
            courseId={enrollment.courseId}
          />
        </div>

        {/* Mobile Sidebar */}
        <MobileModuleNav
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          modules={modules}
          currentModule={currentModule}
          completedModules={completedModules}
          courseId={enrollment.courseId}
        />

        {/* Main Content */}
        <main className="flex-1">
          <ModuleContent
            module={currentModule}
            isCompleted={completedModules.includes(currentModule.id)}
            onComplete={() => handleModuleComplete(currentModule.id)}
            nextModuleId={modules[modules.findIndex(m => m.id === currentModule.id) + 1]?.id}
            courseId={enrollment.courseId}
          />
        </main>
      </div>
    </div>
  )
}