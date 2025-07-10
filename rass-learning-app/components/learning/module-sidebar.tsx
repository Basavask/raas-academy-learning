import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CourseModule } from '@prisma/client'
import { cn } from '@/lib/utils/cn'
import { CheckCircle, PlayCircle, Lock } from 'lucide-react'

interface ModuleSidebarProps {
  modules: CourseModule[]
  currentModule: CourseModule
  completedModules: string[]
  courseId: string
}

export function ModuleSidebar({
  modules,
  currentModule,
  completedModules,
  courseId
}: ModuleSidebarProps) {
  const router = useRouter()

  const getModuleIcon = (module: CourseModule, index: number) => {
    if (completedModules.includes(module.id)) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }
    if (module.id === currentModule.id) {
      return <PlayCircle className="h-5 w-5 text-primary-500" />
    }
    // Lock modules that come after incomplete ones
    const previousCompleted = index === 0 || completedModules.includes(modules[index - 1].id)
    if (!previousCompleted) {
      return <Lock className="h-5 w-5 text-gray-400" />
    }
    return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
  }

  const isModuleLocked = (index: number) => {
    return index > 0 && !completedModules.includes(modules[index - 1].id)
  }

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto p-4">
      <h2 className="font-semibold text-lg mb-4">Course Content</h2>
      <div className="space-y-2">
        {modules.map((module, index) => {
          const isLocked = isModuleLocked(index)
          const isCurrent = module.id === currentModule.id
          
          return (
            <Link
              key={module.id}
              href={isLocked ? '#' : `/courses/${courseId}/learn?module=${module.id}`}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg transition-colors",
                isCurrent && "bg-primary-50 dark:bg-primary-900/20",
                !isCurrent && !isLocked && "hover:bg-gray-100 dark:hover:bg-gray-800",
                isLocked && "opacity-50 cursor-not-allowed"
              )}
              onClick={(e) => {
                if (isLocked) {
                  e.preventDefault()
                }
              }}
            >
              {getModuleIcon(module, index)}
              <div className="flex-1">
                <h3 className={cn(
                  "font-medium text-sm",
                  isCurrent && "text-primary-600 dark:text-primary-400"
                )}>
                  Module {index + 1}: {module.title}
                </h3>
                {module.duration && (
                  <p className="text-xs text-gray-500 mt-1">{module.duration}</p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}