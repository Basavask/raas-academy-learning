import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'
import { razorpay } from '@/lib/razorpay'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseId } = await req.json()

    // Get course details
    const course = await prisma.course.findUnique({
      where: { id: courseId }
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      }
    })

    if (existingEnrollment) {
      return NextResponse.json({ error: 'Already enrolled' }, { status: 400 })
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: course.price * 100, // Amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        courseId: course.id,
        userId: session.user.id
      }
    })

    // Create payment record in database
    await prisma.payment.create({
      data: {
        razorpayOrderId: order.id,
        amount: course.price,
        currency: 'INR',
        status: 'PENDING',
        userId: session.user.id,
        courseId: course.id
      }
    })

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency
    })
  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}