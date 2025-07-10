import { Course } from '@prisma/client'
import { CourseCard } from './course-card'
import { Pagination } from '../ui/pagination'

interface CourseGridProps {
  courses: (Course & { _count?: { enrollments: number } })[]
  currentPage: number
  totalPages: number
}

export function CourseGrid({ courses, currentPage, totalPages }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No courses found. Try adjusting your filters.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </>
  )
}