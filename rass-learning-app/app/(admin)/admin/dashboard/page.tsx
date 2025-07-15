import { requireAdmin } from '@/lib/auth/guard'
import { getAdminStats } from '@/lib/db/utils'
import { PopularCourses } from '../popular-courses'
import { QuickActions } from '../quick-actions'
import { RecentEnrollments } from '../recent-enrollments'
import { StatsCards } from '../stats-cards'
import { RevenueChart } from '../revenue-chart'

export default async function AdminDashboard() {
  const session = await requireAdmin()
  const stats = await getAdminStats()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back, {session.user.name}! Here's your platform overview.
        </p>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <RevenueChart />
        <PopularCourses courses={stats.popularCourses} />
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <RecentEnrollments enrollments={stats.recentEnrollments} />
      </div>
    </div>
  )
}