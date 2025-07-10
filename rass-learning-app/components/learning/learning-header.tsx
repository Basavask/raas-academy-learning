import Link from 'next/link'
import { Course } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Menu, X } from 'lucide-react'

interface LearningHeaderProps {
  course: Course
  progress: number
  onMenuClick: () => void
}

export function LearningHeader({ course, progress, onMenuClick }: LearningHeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <Link href="/student/dashboard" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500">
              ← Back to Dashboard
            </Link>
            
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white hidden md:block">
              {course.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Progress: {progress}%
              </span>
              <Progress value={progress} className="w-32" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}