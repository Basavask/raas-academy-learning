"use client"

import React from "react";
import { useState, useEffect, Suspense } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Search, Filter, Clock, Users, X, Check } from 'lucide-react'
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

const levels = ['Beginner', 'Intermediate', 'Advanced']
const priceRanges = ['Free', '< ₹10,000', '₹10,000 - ₹50,000', '> ₹50,000']

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(
  ({ className, ...props }, ref) => (
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
  )
);

function CoursesContent() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(true)
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])

  useEffect(() => {
    fetchCourses()
    setCurrentPage(0); // Reset to first page on filter/search change
  }, [searchQuery, selectedCategories, selectedLevels, selectedPriceRanges])

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        search: searchQuery,
        categories: selectedCategories.join(','),
        levels: selectedLevels.join(','),
        priceRanges: selectedPriceRanges.join(',')
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
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    )
  }

  const togglePriceRange = (priceRange: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(priceRange)
        ? prev.filter(p => p !== priceRange)
        : [...prev, priceRange]
    )
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedLevels([])
    setSelectedPriceRanges([])
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedLevels.length > 0 || 
                          selectedPriceRanges.length > 0

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
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 text-lg"
            />
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
            {selectedCategories.map(cat => (
              <span key={cat} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {cat}
                <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(cat)} />
              </span>
            ))}
            {selectedLevels.map(level => (
              <span key={level} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                {level}
                <X className="h-3 w-3 cursor-pointer" onClick={() => toggleLevel(level)} />
              </span>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-700"
            >
              Clear all
            </Button>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label 
                        htmlFor={category} 
                        className="text-sm font-normal cursor-pointer"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Level</h3>
                <div className="space-y-2">
                  {levels.map(level => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={level}
                        checked={selectedLevels.includes(level)}
                        onCheckedChange={() => toggleLevel(level)}
                      />
                      <Label 
                        htmlFor={level} 
                        className="text-sm font-normal cursor-pointer"
                      >
                        {level}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map(priceRange => (
                    <div key={priceRange} className="flex items-center space-x-2">
                      <Checkbox
                        id={priceRange}
                        checked={selectedPriceRanges.includes(priceRange)}
                        onCheckedChange={() => togglePriceRange(priceRange)}
                      />
                      <Label 
                        htmlFor={priceRange} 
                        className="text-sm font-normal cursor-pointer"
                      >
                        {priceRange}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="lg:hidden mb-4"
              onClick={() => setShowFilters(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Show Filters
            </Button>

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