import { CourseModule } from '@prisma/client'
import { X } from 'lucide-react'
import { ModuleSidebar } from './module-sidebar'

interface MobileModuleNavProps {
  isOpen: boolean
  onClose: () => void
  modules: CourseModule[]
  currentModule: CourseModule
  completedModules: string[]
  courseId: string
}

export function MobileModuleNav({
  isOpen,
  onClose,
  modules,
  currentModule,
  completedModules,
  courseId
}: MobileModuleNavProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Course Content</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ModuleSidebar
          modules={modules}
          currentModule={currentModule}
          completedModules={completedModules}
          courseId={courseId}
        />
      </div>
    </div>
  )
}