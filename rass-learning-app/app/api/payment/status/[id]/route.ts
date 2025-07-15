import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  const { id } = await params


    const payment = await prisma.payment.findFirst({
      where: {
        razorpayPaymentId: id,
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
    console.error('An error occurred. Please try again.' + (error instanceof Error ? ` ${error.message}` : ''))
    return NextResponse.json({ error: 'Failed to get payment status' }, { status: 500 })
  }
}