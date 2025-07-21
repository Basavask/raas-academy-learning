"use client"

import { Payment, Course, User } from '@prisma/client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { format } from 'date-fns'

interface InvoiceProps {
  payment: Payment & {
    course: Course
    user: User
  }
}

export function Invoice({ payment }: InvoiceProps) {
  const handleDownload = () => {
    // In a real app, generate PDF invoice
    window.print()
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center border-b">
        <h1 className="text-2xl font-bold">INVOICE</h1>
        <p className="text-sm text-gray-600">RAAS Learning</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">From:</h3>
            <p>RAAS Learning</p>
            <p>Bengaluru, Karnataka</p>
            <p>India</p>
          </div>
          <div className="text-right">
            <h3 className="font-semibold mb-2">To:</h3>
            <p>{payment.user.name}</p>
            <p>{payment.user.email}</p>
            {payment.user.phone && <p>{payment.user.phone}</p>}
          </div>
        </div>

        <div className="mb-6">
          <p><strong>Invoice Number:</strong> {payment.razorpayPaymentId}</p>
          <p><strong>Date:</strong> {format(new Date(payment.createdAt), 'dd MMM yyyy')}</p>
          <p><strong>Payment Method:</strong> Online Payment</p>
        </div>

        <table className="w-full mb-6">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Description</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4">
                <p className="font-medium">{payment.course.title}</p>
                <p className="text-sm text-gray-600">Lifetime Access</p>
              </td>
              <td className="text-right py-4">₹{payment.amount}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="py-4 font-bold">Total</td>
              <td className="text-right py-4 font-bold">₹{payment.amount}</td>
            </tr>
          </tfoot>
        </table>

        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600">Thank you for your purchase!</p>
          <Button onClick={handleDownload} className="mt-4 print:hidden">
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}