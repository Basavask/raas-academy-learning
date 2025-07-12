"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Clock, Users, ArrowRight } from 'lucide-react'

const categories = [
  'Management',
  'Marketing', 
  'AI/ML',
  'Data Science',
  'Electronics',
  'Software Development'
]

const featuredCourses = [
  {
    id: 1,
    category: 'Management',
    title: 'Certificate Program in Entrepreneurship and Start Up Mastery',
    institute: 'IIM Mumbai',
    duration: '04 months',
    mode: 'Online',
    deadline: '13th Jul 2025'
  },
  {
    id: 2,
    category: 'Management',
    title: 'Certificate program in Smart Supply Chain Management',
    institute: 'IIM Mumbai',
    duration: '06 weeks',
    mode: 'Online',
    deadline: '11th Jul 2025'
  },
  {
    id: 3,
    category: 'AI/ML',
    title: 'Product Management and Agentic AI',
    institute: 'Vishlesan i-Hub IIT Patna',
    duration: '06 months',
    mode: 'Online',
    deadline: '13th Jul 2025'
  }
]

export function CoursePreview() {
  const [activeCategory, setActiveCategory] = useState('Management')

  const filteredCourses = featuredCourses.filter(
    course => course.category === activeCategory
  )

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-red-600 text-lg font-semibold mb-2">Our Courses</h2>
          <h3 className="text-3xl md:text-4xl font-bold">
            Programs To Help You Upskill
          </h3>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex gap-2 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Button
              variant="ghost"
              className="rounded-md px-6 bg-red-500 text-white hover:bg-red-600"
            >
              By Category
            </Button>
            <Button variant="ghost" className="rounded-md px-6">
              By Institute
            </Button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold">{course.institute.split(' ')[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{course.institute}</p>
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>{course.duration} | {course.mode}</p>
                  <p>Qualifier test - {course.deadline}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Learn more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Brochure
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/courses">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}