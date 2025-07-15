import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'
import { Prisma } from '@prisma/client'
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

    // Start transaction
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Check if already processed
      const existingPayment = await tx.payment.findUnique({
        where: { razorpayPaymentId: razorpay_payment_id }
      })

      if (existingPayment) {
        return { alreadyProcessed: true, payment: existingPayment }
      }

      // Find payment by razorpayOrderId (not unique)
      const paymentRecord = await tx.payment.findFirst({
        where: { razorpayOrderId: razorpay_order_id }
      })
      if (!paymentRecord) {
        throw new Error('Payment not found')
      }
      // Update payment record by id (unique)
      const payment = await tx.payment.update({
        where: { id: paymentRecord.id },
        data: {
          razorpayPaymentId: razorpay_payment_id,
          status: 'SUCCESS'
        }
      })

      // Check if already enrolled
      const existingEnrollment = await tx.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId
          }
        }
      })

      if (!existingEnrollment) {
        // Create enrollment
        await tx.enrollment.create({
          data: {
            userId: session.user.id,
            courseId,
            paymentId: payment.id,
            progress: 0
          }
        })
      }

      return { alreadyProcessed: false, payment }
    })

    return NextResponse.json({ 
      success: true,
      alreadyProcessed: result.alreadyProcessed 
    })
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 })
  }
}