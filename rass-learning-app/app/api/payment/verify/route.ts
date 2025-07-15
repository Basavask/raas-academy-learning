import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId
    } = await req.json()

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Find payment by razorpayOrderId (not unique)
    const paymentRecord = await prisma.payment.findFirst({
      where: { razorpayOrderId: razorpay_order_id }
    })
    if (!paymentRecord) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }
    // Update payment record by id (unique)
    const payment = await prisma.payment.update({
      where: { id: paymentRecord.id },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        status: 'SUCCESS'
      }
    })

    // Create enrollment
    await prisma.enrollment.create({
      data: {
        userId: session.user.id,
        courseId,
        paymentId: payment.id,
        progress: 0
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 })
  }
}