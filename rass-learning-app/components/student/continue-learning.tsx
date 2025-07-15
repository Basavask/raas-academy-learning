"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { PlayCircle } from 'lucide-react'
import { EnrollmentWithCourse } from '@/types'
import { Progress } from '../ui/progress'

interface ContinueLearningProps {
  courses: EnrollmentWithCourse[]
}

export function ContinueLearning({ courses }: ContinueLearningProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Continue Learning</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((enrollment: EnrollmentWithCourse) => (
            <div
              key={enrollment.id}
              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="relative h-20 w-32 flex-shrink-0">
                <Image
                  src={enrollment.course.imageUrl || 'https://via.placeholder.com/128x80'}
                  alt={enrollment.course.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {enrollment.course.title}
                </h4>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      Progress
                    </span>
                    <span className="font-medium">{enrollment.progress}%</span>
                  </div>
                  <Progress value={enrollment.progress} className="h-2" />
                </div>
              </div>
              <Button asChild>
                <Link href={`/courses/${enrollment.courseId}/learn`}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Continue
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}