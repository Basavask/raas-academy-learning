import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Clock, CheckCircle } from 'lucide-react'
import { EnrollmentWithCourse } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface EnrolledCoursesProps {
  enrollments: EnrollmentWithCourse[]
}

export function EnrolledCourses({ enrollments }: EnrolledCoursesProps) {
  if (enrollments.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start your learning journey by enrolling in a course
          </p>
          <Button asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Courses</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/student/courses">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {enrollments.map((enrollment: EnrollmentWithCourse) => (
            <div
              key={enrollment.id}
              className="flex gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="relative h-24 w-40 flex-shrink-0">
                <Image
                  src={enrollment.course.imageUrl || 'https://via.placeholder.com/160x96'}
                  alt={enrollment.course.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {enrollment.course.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {enrollment.course.description}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {enrollment.course.duration || 'Self-paced'}
                  </span>
                  {enrollment.completedAt ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      Completed
                    </span>
                  ) : (
                    <span>{enrollment.progress}% complete</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-xs text-gray-500">
                  Enrolled {formatDistanceToNow(new Date(enrollment.enrolledAt), { addSuffix: true })}
                </span>
                <Button size="sm" asChild>
                  <Link href={`/courses/${enrollment.courseId}/learn`}>
                    {enrollment.completedAt ? 'Review' : 'Continue'}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}