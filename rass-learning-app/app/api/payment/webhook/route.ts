import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex')

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)

    // Handle different webhook events
    switch (event.event) {
      case 'payment.captured':
        await handlePaymentCaptured(event.payload.payment.entity)
        break
      case 'payment.failed':
        await handlePaymentFailed(event.payload.payment.entity)
        break
      case 'refund.created':
        await handleRefundCreated(event.payload.refund.entity)
        break
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handlePaymentCaptured(payment: Record<string, unknown>) {
  const paymentRecord = await prisma.payment.findUnique({
    where: { razorpayPaymentId: payment.id as string }
  })

  if (!paymentRecord) {
    console.error('Payment record not found:', payment.id)
    return
  }

  // Update payment status
  await prisma.payment.update({
    where: { id: paymentRecord.id },
    data: { status: 'SUCCESS' }
  })

  // Send confirmation email (implement email service)
  // await sendEnrollmentConfirmation(paymentRecord.userId, paymentRecord.courseId)
}

async function handlePaymentFailed(payment: Record<string, unknown>) {
  await prisma.payment.update({
    where: { razorpayPaymentId: payment.id as string },
    data: { status: 'FAILED' }
  })
}

async function handleRefundCreated(refund: Record<string, unknown>) {
  await prisma.payment.update({
    where: { razorpayPaymentId: refund.payment_id as string },
    data: { status: 'REFUNDED' }
  })
}