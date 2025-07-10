"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export function PaymentStatus() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [courseId, setCourseId] = useState<string>('')

  useEffect(() => {
    const paymentId = searchParams.get('payment_id')
    const courseIdParam = searchParams.get('course_id')
    
    if (paymentId && courseIdParam) {
      setCourseId(courseIdParam)
      checkPaymentStatus(paymentId)
    } else {
      setStatus('failed')
    }
  }, [searchParams])

  const checkPaymentStatus = async (paymentId: string) => {
    try {
      const response = await fetch(`/api/payment/status/${paymentId}`)
      const data = await response.json()
      
      if (data.status === 'SUCCESS') {
        setStatus('success')
      } else {
        setStatus('failed')
      }
    } catch (error) {
      setStatus('failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary-500" />
              <h2 className="text-xl font-semibold mb-2">Processing Payment...</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we confirm your payment
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You have been successfully enrolled in the course
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href={`/courses/${courseId}/learn`}>Start Learning</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/student/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </>
          )}

          {status === 'failed' && (
            <>
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Payment Failed</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your payment could not be processed. Please try again.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href={courseId ? `/courses/${courseId}` : '/courses'}>
                    Try Again
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/student/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}