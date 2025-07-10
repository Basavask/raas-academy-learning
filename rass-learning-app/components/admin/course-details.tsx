"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Course, CourseModule } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { Edit, ArrowLeft, Trash2, Eye, EyeOff, Plus } from 'lucide-react'
import { ModulesList } from './modules-list'

interface CourseDetailsProps {
  course: Course & {
    modules: CourseModule[]
    _count: { enrollments: number }
  }
}

export function CourseDetails({ course }: CourseDetailsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublishToggle = async () => {
    setIsPublishing(true)
    try {
      const response = await fetch(`/api/admin/courses/${course.id}/publish`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isLive: !course.isLive })
      })

      if (!response.ok) throw new Error('Failed to update course')

      toast.success(course.isLive ? 'Course unpublished' : 'Course published!')
      router.refresh()
    } catch (error) {
      toast.error('Failed to update course status')
    } finally {
      setIsPublishing(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this course?')) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/courses/${course.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete course')

      toast.success('Course deleted successfully')
      router.push('/admin/courses')
    } catch (error) {
      toast.error('Failed to delete course')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/admin/courses">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button
            variant={course.isLive ? "outline" : "default"}
            onClick={handlePublishToggle}
            disabled={isPublishing}
          >
            {course.isLive ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Unpublish
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Publish
              </>
            )}
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/admin/courses/${course.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {course.imageUrl && (
              <div className="relative h-48 w-full rounded-lg overflow-hidden">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">{course.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {course.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Price:</span>
                <p className="text-xl font-bold text-primary-500">₹{course.price}</p>
              </div>
              <div>
                <span className="font-medium">Duration:</span>
                <p>{course.duration || 'Not specified'}</p>
              </div>
              <div>
                <span className="font-medium">Level:</span>
                <p className="capitalize">{course.level || 'Not specified'}</p>
              </div>
              <div>
                <span className="font-medium">Category:</span>
                <p>{course.category || 'Not specified'}</p>
              </div>
              <div>
                <span className="font-medium">Students:</span>
                <p>{course._count.enrollments}</p>
              </div>
              <div>
                <span className="font-medium">Status:</span>
                <p className={course.isLive ? 'text-green-600' : 'text-gray-500'}>
                  {course.isLive ? 'Published' : 'Draft'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Course Modules</CardTitle>
            <Button size="sm" asChild>
              <Link href={`/admin/courses/${course.id}/modules/new`}>
                <Plus className="mr-2 h-4 w-4" />
                Add Module
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ModulesList courseId={course.id} modules={course.modules} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}