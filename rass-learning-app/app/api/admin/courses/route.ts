import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const duration = formData.get('duration') as string
    const level = formData.get('level') as string
    const category = formData.get('category') as string
    const imageFile = formData.get('image') as File

    let imageUrl = null

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      const filename = `course-${Date.now()}.${imageFile.name.split('.').pop()}`
      const filepath = path.join(process.cwd(), 'public/uploads/courses', filename)
      
      await writeFile(filepath, buffer)
      imageUrl = `/uploads/courses/${filename}`
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price,
        duration,
        level,
        category,
        imageUrl,
        isLive: false, // Start as draft
      },
    })

    return NextResponse.json({ success: true, data: course })
  } catch (error) {
    console.error('Course creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}