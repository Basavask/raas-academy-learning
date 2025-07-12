"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from '@/hooks/use-route-loading'

const testimonials = [
  {
    id: 1,
    name: "Hurmit Grover",
    role: "SSC Aspirant → SDE 1",
    company: "KAPIVA",
    image: "/testimonials/student1.jpg",
    quote: "The web development program opened new doors. With no coding background, I have landed at Kapiva and there's no looking back."
  },
  {
    id: 2,
    name: "Akansha Sneha",
    role: "B.Tech (EEE) → Data Analyst",
    company: "Shadowfax",
    image: "/testimonials/student2.jpg",
    quote: "After limited job opportunities post-college and disrupted government exam plans due to the pandemic, I pivoted to data analytics. Turning challenges into success I now inspire others to do the same."
  },
  {
    id: 3,
    name: "Mayuri Samanta",
    role: "Fresher to SDE1",
    company: "LogiNext",
    image: "/testimonials/student3.jpg",
    quote: "Coming from a non-tech background, the structured curriculum and mentorship helped me land my dream job as a software developer."
  }
]

export function HeroSection() {
  const { data: session } = useSession()
  const router = useRouter()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleGetStarted = () => {
    if (session) {
      router.push(session.user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard')
    } else {
      router.push('/register')
    }
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Your AI Powered Future,
                <br />
                Starts at <span className="text-primary-500">RASS</span>.
              </h1>
              <p className="text-xl text-red-600 dark:text-red-400 font-semibold">
                Excel with India's top outcome based platform
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-sm">
                <h3 className="text-2xl md:text-3xl font-bold text-primary-500">7.1K+</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Careers Transformed</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-sm">
                <h3 className="text-2xl md:text-3xl font-bold text-primary-500">2.5K+</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Placement Partners</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-sm">
                <h3 className="text-2xl md:text-3xl font-bold text-primary-500">15K+</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Students Enrolled</p>
              </div>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="text-xl">{star}</span>
                  ))}
                </div>
                <span className="text-lg font-semibold">4.6</span>
                <Image src="/google-logo.png" alt="Google" width={60} height={20} className="ml-2" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="text-xl">{star}</span>
                  ))}
                </div>
                <span className="text-lg font-semibold">4.93</span>
                <span className="text-sm text-gray-600">CourseReport</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" onClick={handleGetStarted}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Content - Testimonial Card */}
          <div className="relative h-[500px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentTestimonial 
                    ? 'opacity-100 transform translate-x-0' 
                    : 'opacity-0 transform translate-x-full'
                }`}
              >
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-8 h-full flex flex-col justify-between text-white shadow-2xl">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-white/90 text-sm">{testimonial.role}</p>
                      </div>
                      <div className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                        {testimonial.company}
                      </div>
                    </div>
                    
                    <blockquote className="text-lg leading-relaxed mb-8">
                      <span className="text-4xl opacity-50">"</span>
                      {testimonial.quote}
                      <span className="text-4xl opacity-50">"</span>
                    </blockquote>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-2xl font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-white/80 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Testimonial Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial 
                      ? 'bg-white w-8' 
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  )
}