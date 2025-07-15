import { requireAuth } from '@/lib/auth/guard'
import { prisma } from '@/lib/db/prisma'
import { notFound, redirect } from 'next/navigation'
import { LearningLayout } from '@/components/learning/learning-layout'

interface LearnPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ module?: string }>
}

export default async function LearnPage({ params, searchParams }: LearnPageProps) {
  const session = await requireAuth()
  const { id } = await params
  const { module } = await searchParams
  // Check enrollment
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId: id,
      }
    },
    include: {
      course: {
        include: {
          modules: {
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  })

  if (!enrollment) {
    redirect(`/courses/${id}`)
  }

  const currentModuleId = module || enrollment.course.modules[0]?.id
  const currentModule = enrollment.course.modules.find(m => m.id === currentModuleId)

  if (!currentModule) {
    notFound()
  }

  return (
    <LearningLayout
      enrollment={enrollment}
      currentModule={currentModule}
      modules={enrollment.course.modules}
    />
  )
}