"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Clock, Users } from 'lucide-react'
import Image from 'next/image'
import { COURSE_CATEGORIES } from '@/lib/constants/categories'

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  duration: string;
  price: number;
  instructor: string;
  _count?: { enrollments: number };
}

const categories = [
  { value: 'all', label: 'All' },
  ...COURSE_CATEGORIES
];

export function CoursePreview() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 3;

  // Add more filters if needed (levels, durations, etc.)
  // For now, just category
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (activeCategory !== 'all') params.set('categories', activeCategory)
        // Add more params for other filters if needed
        console.log("params1", params);
        const response = await fetch(`/api/courses/search?${params}`)
        const data = await response.json()
        setCourses(Array.isArray(data) ? data : data.courses || [])
      } catch (error) {
        console.error('Failed to fetch courses', error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [activeCategory])

  const totalPages = Math.ceil(courses.length / pageSize);
  const paginatedCourses = courses.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-primary text-2xl md:text-3xl font-extrabold mb-2 tracking-tight">Our Certification Courses</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            From foundational skills to advanced professional mastery.
          </h3>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-6 py-2 rounded-full text-base font-semibold transition-all shadow-sm border border-transparent ${activeCategory === category.value
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md border-gray-200 dark:border-gray-700'
                }`}
              style={{ minWidth: 120 }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 items-stretch">
          {loading ? (
            <div className="col-span-full text-center">Loading...</div>
          ) : paginatedCourses.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No courses found.</div>
          ) : (
            paginatedCourses.map((course) => (
              <Card
                key={course.id}
                className="relative h-full hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer border border-gray-200 dark:border-gray-700 rounded-2xl"
                style={{ minHeight: 420 }}
              >
                {/* Course Image */}
                <div className="relative h-48 bg-gray-200 dark:bg-gray-700 rounded-t-2xl overflow-hidden">
                  {course.imageUrl ? (
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-400">
                        {course.category?.charAt(0) || "C"}
                      </span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow">
                    {course.category}
                  </div>
                </div>

                <CardContent className="flex flex-col flex-1 p-6">
                  <h4 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white">{course.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-base">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course._count?.enrollments ?? 0} students</span>
                    </div>
                  </div>

                  <div className="mt-auto w-full">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-600">by {course.instructor || "Instructor"}</p>
                      <p className="text-2xl font-extrabold text-primary">₹{course.price?.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2 pt-2 w-full min-w-0">
                      <Button
                        size="lg"
                        className="flex-1 font-semibold text-base py-2 min-w-0 overflow-hidden"
                        asChild
                      >
                        <Link href={`/courses/${course.id}`} className="w-full flex items-center justify-center min-w-0 overflow-hidden whitespace-nowrap">
                          View Details
                          <ArrowRight className="ml-1 h-4 w-4 flex-shrink-0" />
                        </Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="flex-1 border-primary text-primary font-semibold text-base py-2 hover:bg-primary hover:text-white min-w-0"
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-3 h-3 rounded-full ${currentPage === idx ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'} transition-all`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-5">
          <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary hover:text-white font-semibold text-base px-8 py-3">
            <Link href="/courses">
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}