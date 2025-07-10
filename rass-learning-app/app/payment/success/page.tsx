import { requireAuth } from '@/lib/auth/guard'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export default async function PaymentSuccessPage() {
  await requireAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              You have been successfully enrolled in the course.
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/student/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/student/courses">View My Courses</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}