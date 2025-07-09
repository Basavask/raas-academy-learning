import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CourseWithDetails } from '@/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PopularCoursesProps {
  courses: CourseWithDetails[]
}

export function PopularCourses({ courses }: PopularCoursesProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Popular Courses</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/courses">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.slice(0, 5).map((course:any) => (
            <div
              key={course?.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {course?.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {course?._count?.enrollments || 0} students
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary-500">
                  ₹{course?.price}
                </p>
                <p className="text-xs text-gray-500">
                  {course?.isLive ? 'Live' : 'Draft'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}