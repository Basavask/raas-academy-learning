import { Payment, Course } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle, XCircle, Clock, FileText } from 'lucide-react'
import Link from 'next/link'

interface PaymentHistoryProps {
  payments: (Payment & { course: Course })[]
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'FAILED':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'Successful'
      case 'FAILED':
        return 'Failed'
      case 'PENDING':
        return 'Pending'
      case 'REFUNDED':
        return 'Refunded'
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No payments yet</p>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(payment.status)}
                  <div>
                    <p className="font-medium">{payment.course.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDistanceToNow(new Date(payment.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">₹{payment.amount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getStatusText(payment.status)}
                    </p>
                  </div>
                  {payment.status === 'SUCCESS' && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/student/invoice/${payment.id}`}>
                        <FileText className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}