"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Course } from '@prisma/client'
import { Calendar, CheckCircle, Users, Zap } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function FeeRegistration({ course }: { course: Course }) {
  const { data: session } = useSession()
  const router = useRouter()

  const handleEnroll = async () => {
    if (!session) {
      router.push('/login')
      return
    }

    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course.id })
      })

      const data = await response.json()
      
      if (data.id) {
        // Redirect to payment or show Razorpay modal
        toast.success('Redirecting to payment...')
      }
    } catch (error) {
      console.error('Failed to create order', error)
      toast.error('Failed to create order')
    }
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Fee & Registration</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-6">Course Investment</h3>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-primary">
                  ₹{course.price.toLocaleString()}
                </span>
                {course.price && (
                  <span className="text-xl line-through text-gray-400">
                    ₹{course.price.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                One-time payment • No hidden charges
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Lifetime access to course content</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Industry-recognized certificate</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Job placement assistance</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>1-on-1 mentorship sessions</span>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full"
              onClick={handleEnroll}
            >
              Enroll Now
            </Button>
          </Card>
          
          <Card className="p-8">
            <h3 className="text-2xl font-semibold mb-6">Next Batch Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">Batch Starts</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    15th January, 2025
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">Limited Seats</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Only 25 seats remaining
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Zap className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">Early Bird Offer</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Save 20% - Ends in 5 days
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Note:</strong> This course requires a minimum time commitment of 15-20 hours per week
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}