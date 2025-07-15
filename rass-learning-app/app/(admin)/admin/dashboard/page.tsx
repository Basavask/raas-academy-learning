import { requireAdmin } from '@/lib/auth/guard'
import { getAdminStats } from '@/lib/db/utils'
import { PopularCourses } from '../popular-courses'
import { RecentEnrollments } from '../recent-enrollments'
import { StatsCards } from '../stats-cards'

export default async function AdminDashboard() {
  await requireAdmin()
  
  const rawStats = await getAdminStats()
  
  // Transform the stats to match the expected type
  const stats = {
    ...rawStats,
    recentEnrollments: rawStats.recentEnrollments.map(enrollment => ({
      ...enrollment,
      payment: enrollment.payment || undefined // Convert null to undefined
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <RecentEnrollments enrollments={stats.recentEnrollments} />
        <PopularCourses courses={stats.popularCourses} />
      </div>
    </div>
  )
}