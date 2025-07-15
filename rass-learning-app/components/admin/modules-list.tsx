import { CourseModule } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, GripVertical } from 'lucide-react'

interface ModulesListProps {
  courseId: string
  modules: CourseModule[]
}

export function ModulesList({ modules }: Omit<ModulesListProps, 'courseId'>) {
  if (modules.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No modules added yet. Add your first module to get started.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {modules.map((module) => (
        <div
          key={module.id}
          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <GripVertical className="h-5 w-5 text-gray-400" />
          <div className="flex-1">
            <h4 className="font-medium">{module.title}</h4>
            {module.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {module.description}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}