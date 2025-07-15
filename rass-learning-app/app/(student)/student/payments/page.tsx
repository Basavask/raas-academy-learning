import { requireAuth } from '@/lib/auth/guard'
import { prisma } from '@/lib/db/prisma'
import { PaymentHistory } from '@/components/student/payment-history'

export default async function PaymentsPage() {
  const session = await requireAuth()

  const payments = await prisma.payment.findMany({
    where: { userId: session.user.id },
    include: { course: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Payment History
      </h1>
      <PaymentHistory payments={payments} />
    </div>
  )
}