import { requireAdmin } from '@/lib/auth/guard'
import { prisma } from '@/lib/db/prisma'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { CoursesList } from '../courses-list'

export default async function AdminCoursesPage() {
  await requireAdmin()
  
  const courses = await prisma.course.findMany({
    include: {
      _count: {
        select: { enrollments: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Manage Courses
        </h1>
        <Button asChild>
          <Link href="/admin/courses/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Link>
        </Button>
      </div>

      <CoursesList courses={courses} />
    </div>
  )
}