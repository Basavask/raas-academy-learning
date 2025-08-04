import { CourseDetailView } from '@/components/courses/course-detail-view'
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'

interface CourseDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  // const session = await getServerSession(authOptions)
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { 
      id,
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

  // const isEnrolled = session?.user?.id 
  //   ? await checkEnrollment(session.user.id, course.id)
  //   : false

  return (
    <CourseDetailView 
      course={{
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        imageUrl: course.imageUrl || undefined,
        category: course.category || undefined,
        level: course.level || undefined,
        duration: course.duration || undefined,
        modules: course.modules?.map(module => ({
          id: module.id,
          title: module.title,
          description: module.description || undefined,
          order: module.order,
          duration: module.duration || undefined
        })),
        _count: course._count
      }}
    />
  )
}