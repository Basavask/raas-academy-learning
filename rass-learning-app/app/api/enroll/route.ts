import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseId } = await req.json()

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      }
    })

    if (existing) {
      return NextResponse.json({ success: true, data: existing })
    }

    // Create enrollment (temporary - should go through payment)
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: session.user.id,
        courseId,
        progress: 0
      }
    })

    return NextResponse.json({ success: true, data: enrollment })
  } catch (error) {
    console.error('An error occurred. Please try again.' + (error instanceof Error ? ` ${error.message}` : ''))
    return NextResponse.json({ error: 'Failed to enroll' }, { status: 500 })
  }
}