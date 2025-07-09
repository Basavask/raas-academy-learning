import { Card, CardContent } from '@/components/ui/card'
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react'
import { AdminStats } from '@/types'

interface StatsCardsProps {
  stats: AdminStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Students',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      change: '+12%',
      trend: 'up',
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Active Courses',
      value: stats.totalCourses.toLocaleString(),
      icon: BookOpen,
      change: '+4',
      trend: 'up',
      bgColor: 'bg-green-500',
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+23%',
      trend: 'up',
      bgColor: 'bg-purple-500',
    },
    {
      title: 'Enrollments',
      value: stats.totalEnrollments.toLocaleString(),
      icon: TrendingUp,
      change: '+18%',
      trend: 'up',
      bgColor: 'bg-orange-500',
    },
  ]

  return (
    // Update the grid classes
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {card.value}
                </p>
                <p className={`text-sm mt-2 ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {card.change} from last month
                </p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}