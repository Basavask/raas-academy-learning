import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EnrollmentWithDetails } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'

interface RecentEnrollmentsProps {
  enrollments: EnrollmentWithDetails[]
}

export function RecentEnrollments({ enrollments }: RecentEnrollmentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Enrollments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {enrollments.map((enrollment: EnrollmentWithDetails) => (
            <div key={enrollment?.id} className="flex items-center space-x-4">
              <Image
                src={enrollment.user.profileImage || `https://ui-avatars.com/api/?name=${enrollment.user.name}`}
                alt={enrollment.user.name || 'User'}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  {enrollment.user.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enrolled in {enrollment.course?.title}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-primary-500">
                  ₹{enrollment.payment?.amount || 0}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(enrollment?.enrolledAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}