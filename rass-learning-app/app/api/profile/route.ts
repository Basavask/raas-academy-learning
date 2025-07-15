import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        bio: true,
        profileImage: true,
      },
    })

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const address = formData.get('address') as string
    const bio = formData.get('bio') as string
    const profileImageFile = formData.get('profileImage') as File

    let profileImageUrl = undefined

    if (profileImageFile && profileImageFile.size > 0) {
      const buffer = Buffer.from(await profileImageFile.arrayBuffer())
      const filename = `${session.user.id}-${Date.now()}.${profileImageFile.name.split('.').pop()}`
      const filepath = path.join(process.cwd(), 'public/uploads/profiles', filename)
      
      await writeFile(filepath, buffer)
      profileImageUrl = `/uploads/profiles/${filename}`
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        phone: phone || null,
        address: address || null,
        bio: bio || null,
        ...(profileImageUrl && { profileImage: profileImageUrl }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        bio: true,
        profileImage: true,
      },
    })

    return NextResponse.json({ success: true, data: updatedUser })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}