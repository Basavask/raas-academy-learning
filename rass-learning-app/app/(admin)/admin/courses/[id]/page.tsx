import { CourseDetails } from '@/components/admin/course-details'
import { requireAdmin } from '@/lib/auth/guard'
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'

interface CoursePageProps {
  params: { id: string }
}

export default async function CourseDetailsPage({ params }: CoursePageProps) {
  await requireAdmin()
  
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      modules: {
        orderBy: { order: 'asc' }
      },
      _count: {
        select: { enrollments: true }
      }
    }
  })

  if (!course) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CourseDetails course={course} />
    </div>
  )
}