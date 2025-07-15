"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CourseModule } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

interface ModuleContentProps {
  module: CourseModule
  isCompleted: boolean
  onComplete: () => void
  nextModuleId?: string
  courseId: string
}

export function ModuleContent({
  module,
  isCompleted,
  onComplete,
  nextModuleId,
  courseId
}: ModuleContentProps) {
  const router = useRouter()
  const [marking, setMarking] = useState(false)

  const handleMarkComplete = async () => {
    setMarking(true)
    try {
      const response = await fetch(`/api/courses/${courseId}/modules/${module.id}/complete`, {
        method: 'POST'
      })
      
      if (!response.ok) throw new Error('Failed to mark complete')
      
      onComplete()
      toast.success('Module completed!')
      
      if (nextModuleId) {
        setTimeout(() => {
          router.push(`/courses/${courseId}/learn?module=${nextModuleId}`)
        }, 1000)
      }
    } catch {
      toast.error('Failed to mark module as complete')
    } finally {
      setMarking(false)
    }
  }

  const handleNext = () => {
    if (nextModuleId) {
      router.push(`/courses/${courseId}/learn?module=${nextModuleId}`)
    } else {
      router.push(`/courses/${courseId}/complete`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {module.title}
            </h1>
            {module.description && (
              <p className="text-gray-600 dark:text-gray-400">
                {module.description}
              </p>
            )}
          </div>

          {/* Module Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            {module.content ? (
              <div dangerouslySetInnerHTML={{ __html: module.content }} />
            ) : (
              <p>No content available for this module.</p>
            )}
          </div>

          {/* Video Content */}
          {module.videoUrl && (
            <div className="mb-8">
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <iframe
                  src={module.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t pt-6">
            {!isCompleted ? (
              <Button
                onClick={handleMarkComplete}
                disabled={marking}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                {marking ? 'Marking...' : 'Mark as Complete'}
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Completed</span>
              </div>
            )}

            <Button
              onClick={handleNext}
              variant={nextModuleId ? 'default' : 'outline'}
            >
              {nextModuleId ? (
                <>
                  Next Module
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Finish Course'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}