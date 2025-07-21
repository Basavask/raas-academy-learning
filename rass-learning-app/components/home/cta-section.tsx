import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Build Your Talent Pipeline with Vetted Interns. At Zero Cost.
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
          The ultimate low-risk way to assess future full-time hires while 
          accelerating your current projects.
        </p>
        <Button 
          size="lg" 
          variant="secondary"
          className="bg-white text-primary hover:bg-gray-100"
          asChild
        >
          <Link href="/hire-from-us">
            Partner With Us
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}