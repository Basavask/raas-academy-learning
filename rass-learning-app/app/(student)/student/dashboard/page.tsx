import { requireAuth } from '@/lib/auth/guard'
import { getStudentStats } from '@/lib/db/utils'
import { prisma } from '@/lib/db/prisma'
import { ContinueLearning } from '@/components/student/continue-learning'
import { EnrolledCourses } from '@/components/student/enrolled-courses'
import { RecentActivity } from '@/components/student/recent-activity'
import { StudentStatsCards } from '@/components/student/stats-cards'

export default async function StudentDashboard() {
  const session = await requireAuth()
  
  const [stats, enrollments] = await Promise.all([
    getStudentStats(session.user.id),
    prisma.enrollment.findMany({
      where: { userId: session.user.id },
      include: {
        course: {
          include: {
            modules: true
          }
        }
      },
      orderBy: { enrolledAt: 'desc' }
    })
  ])

  const inProgressCourses = enrollments.filter((e: typeof enrollments[number]) => !e.completedAt && e.progress > 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {session.user.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Continue your learning journey
        </p>
      </div>

      {/* Stats Cards */}
      <StudentStatsCards stats={stats} />

      {/* Continue Learning */}
      {inProgressCourses.length > 0 && (
        <div className="mt-8">
          <ContinueLearning courses={inProgressCourses} />
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <EnrolledCourses enrollments={enrollments} />
        </div>
        <div>
          <RecentActivity activities={stats.recentActivity} />
        </div>
      </div>
    </div>
  )
}