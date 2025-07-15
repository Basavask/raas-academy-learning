import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { progress } = await req.json()

    const enrollment = await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: params.id
        }
      },
      data: {
        progress,
        completedAt: progress === 100 ? new Date() : null
      }
    })

    return NextResponse.json({ success: true, data: enrollment })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}