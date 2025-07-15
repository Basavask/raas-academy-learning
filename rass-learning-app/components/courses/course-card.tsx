import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Users, BookOpen } from 'lucide-react'
import { Course } from '@prisma/client'

interface CourseCardProps {
  course: Course & { _count?: { enrollments: number } }
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={course.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={course.title}
          fill
          className="object-cover"
        />
        {course.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary-500 text-white text-xs rounded-full">
              {course.category}
            </span>
          </div>
        )}
      </div>
      
      <CardContent className="flex-1 p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {course.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          )}
          {course._count && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course._count.enrollments} students</span>
            </div>
          )}
          {course.level && (
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="capitalize">{course.level}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-primary-500">
            ₹{course.price.toLocaleString()}
          </span>
        </div>
        <Button asChild>
          <Link href={`/courses/${course.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}