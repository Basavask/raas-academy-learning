import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params

    const { progress } = await req.json()

    const enrollment = await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: id
        }
      },
      data: {
        progress,
        completedAt: progress === 100 ? new Date() : null
      }
    })

    return NextResponse.json({ success: true, data: enrollment })
  } catch (error) {
    console.error('An error occurred. Please try again.' + (error instanceof Error ? ` ${error.message}` : ''))
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}