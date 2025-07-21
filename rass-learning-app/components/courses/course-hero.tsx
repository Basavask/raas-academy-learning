"use client"

import { Button } from '@/components/ui/button'
import { Course } from '@prisma/client'
import { Award, Clock, PlayCircle, Users } from 'lucide-react'
import Image from 'next/image'

export function CourseHero({ course }: { course: Course }) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {course.category}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {course.level}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {course.title}
            </h1>
            
            <p className="text-xl mb-8 opacity-90">
              {course.description}
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{course.enrollments.length} enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>Certificate included</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div>
                <p className="text-3xl font-bold">₹{course.price.toLocaleString()}</p>
                {course.originalPrice && (
                  <p className="text-sm line-through opacity-70">
                    ₹{course.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Enroll Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {course.image ? (
              <Image
                src={course.image}
                alt={course.title}
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            ) : (
              <div className="bg-white/10 rounded-lg aspect-video flex items-center justify-center">
                <PlayCircle className="h-20 w-20 opacity-50" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}