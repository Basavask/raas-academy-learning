import { requireAdmin } from '@/lib/auth/guard'
import { CourseForm } from '../../course-form'

export default async function NewCoursePage() {
  await requireAdmin()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Create New Course
      </h1>
      <CourseForm />
    </div>
  )
}