import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
  const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { isLive } = await req.json()

    const course = await prisma.course.update({
      where: { id },
      data: { isLive },
    })

    return NextResponse.json({ success: true, data: course })
  } catch (error) {
    console.error('Course publish error:', error)
    return NextResponse.json(
      { error: 'Failed to update course status' },
      { status: 500 }
    )
  }
}