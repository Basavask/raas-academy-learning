import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, PlayCircle } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-primary-950/20" />
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="text-primary-500">RASS Learning</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Empower your future with quality education. Learn new skills, advance your career, and achieve your goals with our comprehensive courses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="/courses">
                Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">
                <PlayCircle className="mr-2 h-4 w-4" />
                Get Started Free
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-2xl text-primary-500">1000+</span>
              <span>Active Students</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-2xl text-primary-500">50+</span>
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-2xl text-primary-500">95%</span>
              <span>Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}