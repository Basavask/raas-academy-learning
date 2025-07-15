import { CourseFilters } from '@/components/courses/course-filters'
import { CourseGrid } from '@/components/courses/course-grid'
import { CourseSearch } from '@/components/courses/course-search'
import { getPublishedCourses } from '@/lib/db/utils'

interface CoursesPageProps {
  searchParams: Promise<{
    search?: string
    category?: string
    level?: string
    page?: string
  }>
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const { search,category,level, page } = await searchParams
  const page1 = Number(page) || 1
  const pageSize = 12

  const { courses, total } = await getPublishedCourses({
    skip: (page1 - 1) * pageSize,
    take: pageSize,
    search: search,
    category: category,
    level: level,
  })

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Discover courses that match your interests and career goals
          </p>
          <CourseSearch defaultValue={search} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64">
            <CourseFilters 
              selectedCategory={category}
              selectedLevel={level}
            />
          </aside>
          
          <main className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {courses.length} of {total} courses
              </p>
            </div>
            
            <CourseGrid 
              courses={courses}
              currentPage={page1}
              totalPages={totalPages}
            />
          </main>
        </div>
      </div>
    </div>
  )
}