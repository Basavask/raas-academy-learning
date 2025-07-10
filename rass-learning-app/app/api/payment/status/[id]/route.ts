import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payment = await prisma.payment.findFirst({
      where: {
        razorpayPaymentId: params.id,
        userId: session.user.id
      }
    })

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    return NextResponse.json({
      status: payment.status,
      courseId: payment.courseId
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get payment status' }, { status: 500 })
  }
}