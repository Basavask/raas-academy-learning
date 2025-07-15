import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Clock, Users, ArrowRight } from 'lucide-react'
import Image from 'next/image'

// Mock data - will be replaced with real data later
const popularCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more",
    price: 4999,
    duration: "40 hours",
    students: 1234,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&q=80",
    category: "Web Development"
  },
  {
    id: 2,
    title: "Data Science with Python",
    description: "Master data science concepts using Python",
    price: 5999,
    duration: "35 hours",
    students: 856,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&q=80",
    category: "Data Science"
  },
  {
    id: 3,
    title: "Digital Marketing Masterclass",
    description: "Learn SEO, social media marketing, and more",
    price: 3999,
    duration: "25 hours",
    students: 2341,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&q=80",
    category: "Marketing"
  }
]

export function CoursesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Popular Courses
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start your learning journey with our most popular courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {popularCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary-500 text-white text-sm rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {course.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students} students</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-primary-500">₹{course.price}</span>
                </div>
                <Button size="sm" asChild>
                  <Link href={`/courses/${course.id}`}>
                    View Course
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" asChild>
            <Link href="/courses">
              View All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}