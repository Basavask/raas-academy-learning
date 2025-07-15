import { requireAuth } from '@/lib/auth/guard'
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import { Invoice } from '@/components/student/invoice'

interface InvoicePageProps {
  params: { paymentId: string }
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const session = await requireAuth()

  const payment = await prisma.payment.findFirst({
    where: {
      id: params.paymentId,
      userId: session.user.id,
      status: 'SUCCESS'
    },
    include: {
      course: true,
      user: true
    }
  })

  if (!payment) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Invoice payment={payment} />
    </div>
  )
}