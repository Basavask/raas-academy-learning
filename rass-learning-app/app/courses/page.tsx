"use client"

import React from "react";
import { useState, useEffect, useCallback, Suspense } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Clock, Users, X, Check } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from "@/lib/utils/cn";

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  level: string;
  price: number;
  duration: string;
  slug?: string;
  _count?: {
    enrollments: number;
  };
}

const categories = [
  'Data Science',
  'Machine Learning',
  'Digital Marketing',
  'Graphic Design',
  'Business',
  'Personal Development',
  'Web Development',
  'Mobile Development',
  'Cloud Computing',
  'Cybersecurity'
]

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-primary">
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = 'Checkbox';

function CoursesContent() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  
  // Filter states - only categories now
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        search: searchQuery,
        categories: selectedCategories.join(','),
      })
      console.log("params", params);
      const response = await fetch(`/api/courses/search?${params}`)
      if (!response.ok) {
        setCourses([]);
        return;
      }
      const data: Course[] = await response.json()
      setCourses(data)
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    } finally {
      setLoading(false)
    }
  }, [searchQuery, selectedCategories])

  useEffect(() => {
    fetchCourses()
    setCurrentPage(0); // Reset to first page on filter/search change
  }, [fetchCourses])

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
  }

  const hasActiveFilters = selectedCategories.length > 0

  // Pagination logic
  const totalPages = Math.ceil(courses.length / pageSize);
  const paginatedCourses = courses.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Explore Our Courses</h1>
          <p className="text-xl opacity-90">
            Find the perfect course to advance your career
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar - Full Width */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 text-lg w-full"
            />
          </div>
        </div>

        {/* Main Content with Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Category Filters */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 text-sm font-medium",
                        selectedCategories.includes(category)
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Active Filters</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(cat => (
                      <span key={cat} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        {cat}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(cat)} />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Content - Course Grid */}
          <div className="flex-1">
            {/* Course Grid */}
            <div className="w-full">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : courses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No courses found matching your criteria.</p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.isArray(paginatedCourses) ? paginatedCourses.map((course: Course) => (
                      <Card key={course.id} className="hover:shadow-lg transition-shadow flex flex-col h-full">
                        <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                          {course.imageUrl ? (
                            <Image
                              src={course.imageUrl}
                              alt={course.title}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-4xl font-bold text-gray-400">
                                {course.category?.charAt(0) || "C"}
                              </span>
                            </div>
                          )}
                          <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                            {course.category}
                          </div>
                        </div>
                        <CardContent className="flex flex-col flex-1 p-6">
                          <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {course.description}
                          </p>
                          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{course._count?.enrollments || 0} students</span>
                            </div>
                          </div>
                          <div className="mt-auto w-full">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">{course.level}</span>
                              <span className="text-2xl font-bold text-primary">
                                ₹{course.price.toLocaleString()}
                              </span>
                            </div>
                            <Link href={`/courses/${course.slug || course.id}`}>
                              <Button className="w-full">View Details</Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    )) : null}
                  </div>
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                      {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentPage(idx)}
                          className={`w-3 h-3 rounded-full ${currentPage === idx ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'} transition-all`}
                          aria-label={`Go to page ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CoursesContent.displayName = 'CoursesContent';

export default function CoursesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <CoursesContent />
    </Suspense>
  )
}