import { Course } from '@prisma/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Edit, Eye, Trash2 } from 'lucide-react'

interface CoursesListProps {
  courses: (Course & { _count: { enrollments: number } })[]
}

export function CoursesList({ courses }: CoursesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={course.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image'}
              alt={course.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                course.isLive 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {course.isLive ? 'Live' : 'Draft'}
              </span>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">
              {course.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {course.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-primary-500">
                ₹{course.price}
              </span>
              <span className="text-sm text-gray-500">
                {course._count.enrollments} students
              </span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" asChild>
                <Link href={`/admin/courses/${course.id}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/admin/courses/${course.id}/edit`}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}