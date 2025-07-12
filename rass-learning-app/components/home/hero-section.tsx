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
    name: "Aparna Singh",
    role: "College Dropout → Application Engineer",
    company: "KAPIVA",
    quote: "As a college drop out, I found the courage to rewrite my future, one line of code at a time. RAAS skilled me to work as a developer.",
    image: "/testimonials/aparna.jpg"
  },
  {
    id: 2,
    name: "Rohit Goyal",
    company: "Walmart",
    metric: "160%",
    metricLabel: "Salary Increase",
    quote: "My journey from curiosity to career growth proves that with learning and dedication, a person can conquer any challenge.",
    image: "/testimonials/rohit.jpg"
  },
  {
    id: 3,
    name: "Hurmit Grover",
    role: "SSC Aspirant → SDE 1",
    company: "KAPIVA",
    quote: "The web development program opened new doors. With no coding background, I have landed at Kapiva and there's no looking back.",
    image: "/testimonials/hurmit.jpg"
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
              Starts at RAAS.
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

          {/* Right Content - Testimonial */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl">
            <div className="relative h-[500px] md:h-[600px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentTestimonial 
                      ? 'opacity-100 z-10' 
                      : 'opacity-0 z-0'
                  }`}
                >
                  <div className="bg-primary rounded-3xl p-8 h-full text-white relative overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute bottom-0 right-0 w-3/4 h-3/4">
                      <Image
                        src={testimonial.image || '/placeholder-person.png'}
                        alt={testimonial.name}
                        fill
                        className="object-cover object-top opacity-50 grayscale"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-20">
                      {/* Metric or Role */}
                      {testimonial.metric ? (
                        <div className="flex items-center gap-2 mb-6">
                          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <div>
                            <div className="text-4xl font-bold">{testimonial.metric}</div>
                            <div className="text-sm opacity-90">{testimonial.metricLabel}</div>
                          </div>
                        </div>
                      ) : testimonial.role && (
                        <p className="text-lg opacity-90 mb-4">{testimonial.role}</p>
                      )}

                      {/* Name */}
                      <h3 className="text-3xl font-bold mb-4">{testimonial.name}</h3>

                      {/* Company Badge */}
                      <div className="inline-block bg-white text-primary px-4 py-2 rounded-full font-bold mb-8">
                        {testimonial.company}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-lg leading-relaxed">
                        <span className="text-4xl opacity-50">"</span>
                        {testimonial.quote}
                        <span className="text-4xl opacity-50">"</span>
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