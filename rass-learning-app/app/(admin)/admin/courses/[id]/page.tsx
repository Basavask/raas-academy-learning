import { CourseDetails } from '@/components/admin/course-details'
import { BatchManagement } from '@/components/admin/batch-management'
import { requireAdmin } from '@/lib/auth/guard'
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface CoursePageProps {
  params: Promise<{ id: string }>
}

interface BatchWithEnrollments {
  id: string
  batchNumber: string
  startDate: Date
  endDate: Date
  maxStudents: number
  isActive: boolean
  enrollments: Array<{
    id: string
    user: {
      id: string
      name: string | null
      email: string
      studentId: string | null
    }
  }>
}

export default async function CourseDetailsPage({ params }: CoursePageProps) {
  await requireAdmin()
  const { id } = await params
  
  const [course, batches] = await Promise.all([
    prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          orderBy: { order: 'asc' }
        },
        _count: {
          select: { enrollments: true }
        }
      }
    }),
    (prisma as typeof prisma & { courseBatch: { findMany: (args: unknown) => Promise<BatchWithEnrollments[]> } }).courseBatch.findMany({
      where: { courseId: id },
      include: {
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                studentId: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  ])

  if (!course) {
    notFound()
  }

  // Transform batches to match the expected interface
  const transformedBatches = batches.map((batch: BatchWithEnrollments) => ({
    ...batch,
    startDate: batch.startDate.toISOString().split('T')[0],
    endDate: batch.endDate.toISOString().split('T')[0],
    enrollments: batch.enrollments.map((enrollment) => ({
      id: enrollment.id,
      user: {
        id: enrollment.user.id,
        name: enrollment.user.name || '',
        email: enrollment.user.email,
        studentId: enrollment.user.studentId || undefined
      }
    }))
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{course.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">Course Management Dashboard</p>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Course Details</TabsTrigger>
          <TabsTrigger value="batches">Batch Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <CourseDetails course={course} />
        </TabsContent>
        
        <TabsContent value="batches">
          <BatchManagement 
            courseId={course.id} 
            courseTitle={course.title} 
            batches={transformedBatches}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}