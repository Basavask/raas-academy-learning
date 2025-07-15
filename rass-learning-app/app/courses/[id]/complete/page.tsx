import { requireAuth } from '@/lib/auth/guard'
import { prisma } from '@/lib/db/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Trophy, Download, Share2 } from 'lucide-react'

interface CourseCompletePageProps {
  params: Promise<{ id: string }>
}

export default async function CourseCompletePage({ params }: CourseCompletePageProps) {
  const session = await requireAuth()
  const { id } = await params
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId: id,
      }
    },
    include: {
      course: true
    }
  })

  if (!enrollment || !enrollment.completedAt) {
    redirect(`/courses/${id}/learn`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-24 h-24 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-4">
              <Trophy className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Congratulations! 🎉
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You&apos;ve successfully completed
            </p>
            <p className="text-xl font-semibold text-primary-500 mt-2">
              {enrollment.course.title}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <Button className="w-full sm:w-auto" disabled>
              <Download className="mr-2 h-4 w-4" />
              Download Certificate (Coming Soon)
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" disabled>
              <Share2 className="mr-2 h-4 w-4" />
              Share Achievement
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/student/dashboard">Back to Dashboard</Link>
            </Button>
            <Button asChild>
              <Link href="/courses">Browse More Courses</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}