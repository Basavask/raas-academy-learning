import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { checkEnrollment } from '@/lib/db/utils'
import { CourseDetailView } from '@/components/courses/course-detail-view'

interface CourseDetailPageProps {
  params: { id: string }
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const session = await getServerSession(authOptions)
  
  const course = await prisma.course.findUnique({
    where: { 
      id: params.id,
      isLive: true
    },
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

  const isEnrolled = session?.user?.id 
    ? await checkEnrollment(session.user.id, course.id)
    : false

  return (
    <CourseDetailView 
      course={course} 
      isEnrolled={isEnrolled}
      isAuthenticated={!!session}
    />
  )
}