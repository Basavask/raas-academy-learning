"use client"

import { Button } from '@/components/ui/button'
import { useRouter } from '@/hooks/use-route-loading'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export function HeroSection() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleGetStarted = () => {
    if (session) {
      router.push(session.user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard')
    } else {
      router.push('/register')
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            Become the talent that
            <br />
            <span className="text-primary">every company wants to hire</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            India&apos;s #1 Outcome-Focused Skill Development Initiative
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-primary">15K+</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Students Trained</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-primary">2.5K+</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Hiring Partners</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-primary">85%</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Placement Rate</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              onClick={handleGetStarted}
            >
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg"
              asChild
            >
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}