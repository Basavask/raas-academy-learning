"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useRouter } from '@/hooks/use-route-loading'

const testimonials = [
  {
    id: 1,
    name: "Hurmit Grover",
    role: "SSC Aspirant → SDE 1",
    company: "KAPIVA",
    quote: "The web development program opened new doors. With no coding background, I have landed at Kapiva and there's no looking back.",
    image: "/testimonials/hurmit.jpg"
  },
  {
    id: 2,
    name: "Aparna Singh",
    role: "College Dropout → Application Engineer",
    company: "KAPIVA",
    quote: "As a college drop out, I found the courage to rewrite my future, one line of code at a time. Masai skilled me to work as a developer.",
    image: "/testimonials/aparna.jpg"
  },
  {
    id: 3,
    name: "Rohit Goyal",
    company: "Walmart",
    metric: "160%",
    metricLabel: "Salary Increase",
    quote: "My journey from curiosity to career growth proves that with learning and dedication, a person can conquer any challenge.",
    image: "/testimonials/rohit.jpg"
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
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 min-h-[calc(100vh-8rem)]">
          
          {/* Left Content */}
          <div className="flex-1 w-full text-center lg:text-left max-w-2xl lg:max-w-none">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              Your AI Powered Future,
              <br />
              Starts at RASS.
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-12">
              Excel with India's top outcome based platform
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-12">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-primary">7.1K+</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Careers<br />Transformed
                </p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-primary">2.5K+</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Placement<br />Partners
                </p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-primary">15K+</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Students<br />Enrolled
                </p>
              </div>
            </div>

            {/* Ratings */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-12">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">4.6</span>
                <div className="flex text-primary">
                  ★★★★☆
                </div>
                <span className="text-gray-600 dark:text-gray-400 ml-2">Google</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">4.93</span>
                <div className="flex text-primary">
                  ★★★★★
                </div>
                <span className="text-gray-600 dark:text-gray-400 ml-2">CourseReport</span>
              </div>
            </div>
          </div>

          {/* Right Content - Testimonial Card */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl">
            <div className="relative h-[450px] md:h-[550px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentTestimonial 
                      ? 'opacity-100 z-10' 
                      : 'opacity-0 z-0'
                  }`}
                >
                  <div className="bg-primary rounded-[2rem] p-8 md:p-10 h-full text-white relative overflow-hidden">
                    {/* Person Image - Positioned at bottom right */}
                    <div className="absolute bottom-0 right-0 w-[60%] h-[70%]">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-transparent z-10"></div>
                      <div className="absolute inset-0 bg-gradient-to-l from-primary via-primary/80 to-transparent z-10"></div>
                      
                      {/* Image or placeholder */}
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover object-top"
                          priority={index === 0}
                          onError={(e) => {
                            // Fallback to placeholder if image fails
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 opacity-30"></div>
                      )}
                    </div>

                    {/* Content - Positioned above image */}
                    <div className="relative z-20 h-full flex flex-col">
                      {/* Role or Metric */}
                      {testimonial.metric ? (
                        <div className="flex items-center gap-3 mb-6">
                          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <div>
                            <div className="text-4xl font-bold">{testimonial.metric}</div>
                            <div className="text-sm opacity-90">{testimonial.metricLabel}</div>
                          </div>
                        </div>
                      ) : testimonial.role && (
                        <p className="text-lg font-medium opacity-90 mb-4">{testimonial.role}</p>
                      )}

                      {/* Name */}
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">{testimonial.name}</h3>

                      {/* Company Badge */}
                      <div className="inline-flex self-start bg-white text-primary px-4 py-2 rounded-full font-bold text-sm mb-6">
                        {testimonial.company}
                      </div>

                      {/* Quote - Limited height to prevent overlap */}
                      <blockquote className="text-base md:text-lg leading-relaxed flex-1 max-w-[85%]">
                        <span className="text-3xl opacity-50">"</span>
                        <span className="inline-block px-2">
                          {testimonial.quote}
                        </span>
                        <span className="text-3xl opacity-50">"</span>
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all ${
                    index === currentTestimonial 
                      ? 'bg-primary w-8 h-2' 
                      : 'bg-gray-300 dark:bg-gray-600 w-2 h-2'
                  } rounded-full`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}