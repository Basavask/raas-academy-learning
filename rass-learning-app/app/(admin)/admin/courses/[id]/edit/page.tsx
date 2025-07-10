import { CourseEditForm } from '@/components/admin/course-edit-form'
import { requireAdmin } from '@/lib/auth/guard'
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'

interface EditCoursePageProps {
  params: { id: string }
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  await requireAdmin()
  
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      modules: {
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!course) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Edit Course
      </h1>
      <CourseEditForm course={course} />
    </div>
  )
}