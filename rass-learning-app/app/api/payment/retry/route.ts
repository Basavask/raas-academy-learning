import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'

export async function POST(req: NextRequest) {
  try {
    // Check if Razorpay keys are configured
    if (!process.env.RAZORPAY_KEY_SECRET || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ 
        error: 'Payment service not configured' 
      }, { status: 503 })
    }

    const { razorpay } = await import('@/lib/razorpay')

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { paymentId } = await req.json()

    // Get failed payment
    const failedPayment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        userId: session.user.id,
        status: 'FAILED'
      },
      include: { course: true }
    })

    if (!failedPayment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    // Create new Razorpay order
    const order = await razorpay.orders.create({
      amount: failedPayment.amount * 100,
      currency: 'INR',
      receipt: `retry_${Date.now()}`,
      notes: {
        courseId: failedPayment.courseId,
        userId: session.user.id,
        retryFor: failedPayment.id
      }
    })

    // Create new payment record
    await prisma.payment.create({
      data: {
        razorpayOrderId: order.id,
        amount: failedPayment.amount,
        currency: 'INR',
        status: 'PENDING',
        userId: session.user.id,
        courseId: failedPayment.courseId
      }
    })

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency
    })
  } catch (error) {
    console.error('Payment retry error:', error)
    return NextResponse.json({ 
      error: 'Failed to create order' 
    }, { status: 500 })
  }
}