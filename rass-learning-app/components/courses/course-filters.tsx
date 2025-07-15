"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { COURSE_CATEGORIES, COURSE_LEVELS } from '@/lib/constants/categories'

interface CourseFiltersProps {
  selectedCategory?: string
  selectedLevel?: string
}

export function CourseFilters({ selectedCategory, selectedLevel }: CourseFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (type: 'category' | 'level', value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(type, value)
    } else {
      params.delete(type)
    }
    params.set('page', '1')
    router.push(`/courses?${params.toString()}`)
  }

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    params.delete('level')
    params.set('page', '1')
    router.push(`/courses?${params.toString()}`)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Category</h3>
          <div className="space-y-2">
            {COURSE_CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => handleFilterChange('category', 
                  selectedCategory === category.value ? '' : category.value
                )}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Level</h3>
          <div className="space-y-2">
            {COURSE_LEVELS.map((level) => (
              <button
                key={level.value}
                onClick={() => handleFilterChange('level',
                  selectedLevel === level.value ? '' : level.value
                )}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedLevel === level.value
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}