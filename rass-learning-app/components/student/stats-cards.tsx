import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Clock, Trophy } from 'lucide-react'
import { StudentStats } from '@/types'

interface StudentStatsCardsProps {
  stats: StudentStats
}

export function StudentStatsCards({ stats }: StudentStatsCardsProps) {
  const cards = [
    {
      title: 'Enrolled Courses',
      value: stats.enrolledCourses,
      icon: BookOpen,
      bgColor: 'bg-blue-500',
      description: 'Total courses',
    },
    {
      title: 'In Progress',
      value: stats.inProgressCourses,
      icon: Clock,
      bgColor: 'bg-orange-500',
      description: 'Currently learning',
    },
    {
      title: 'Completed',
      value: stats.completedCourses,
      icon: Trophy,
      bgColor: 'bg-green-500',
      description: 'Finished courses',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {card.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {card.description}
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