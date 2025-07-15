"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clock, Users, Star } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const featuredCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Master modern web development with HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects.",
    price: 4999,
    originalPrice: 9999,
    duration: "40 hours",
    students: 1234,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&q=80",
    instructor: "John Doe",
    tag: "Bestseller"
  },
  {
    id: 2,
    title: "Data Science with Python Masterclass",
    description: "Learn data science from scratch. Master Python, Pandas, NumPy, Machine Learning, and Deep Learning.",
    price: 5999,
    originalPrice: 11999,
    duration: "35 hours",
    students: 856,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&q=80",
    instructor: "Jane Smith",
    tag: "Hot & New"
  },
  {
    id: 3,
    title: "Digital Marketing Complete Course",
    description: "Become a digital marketing expert. Learn SEO, Social Media Marketing, Google Ads, and Content Marketing.",
    price: 3999,
    originalPrice: 7999,
    duration: "25 hours",
    students: 2341,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&q=80",
    instructor: "Mike Johnson",
    tag: "Popular"
  },
  {
    id: 4,
    title: "Mobile App Development with React Native",
    description: "Build iOS and Android apps with React Native. Create cross-platform mobile applications from scratch.",
    price: 6999,
    originalPrice: 12999,
    duration: "45 hours",
    students: 567,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&q=80",
    instructor: "Sarah Williams",
    tag: "New"
  }
]

export function CourseSlider() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Featured Courses</h2>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="course-slider"
        >
          {featuredCourses.map((course) => (
            <SwiperSlide key={course.id}>
              <div className="grid md:grid-cols-2 gap-8 items-center bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                <div className="relative h-64 md:h-96">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full">
                      {course.tag}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {course.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold text-primary-500">₹{course.price}</span>
                    <span className="text-lg text-gray-500 line-through">₹{course.originalPrice}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                      {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button asChild>
                      <Link href={`/courses/${course.id}`}>
                        Enroll Now
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/courses/${course.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    By {course.instructor}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}