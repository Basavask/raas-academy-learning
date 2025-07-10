import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EnrollmentWithCourse } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import { BookOpen, CheckCircle, PlayCircle } from 'lucide-react'

interface RecentActivityProps {
  activities: EnrollmentWithCourse[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (enrollment: EnrollmentWithCourse) => {
    if (enrollment.completedAt) return CheckCircle
    if (enrollment.progress > 0) return PlayCircle
    return BookOpen
  }

  const getActivityText = (enrollment: EnrollmentWithCourse) => {
    if (enrollment.completedAt) return 'Completed'
    if (enrollment.progress > 0) return `${enrollment.progress}% progress`
    return 'Started'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity:any) => {
              const Icon = getActivityIcon(activity)
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <Icon className="h-4 w-4 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.course.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {getActivityText(activity)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(activity.enrolledAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}