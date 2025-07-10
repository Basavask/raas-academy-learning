import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/db/prisma'
import { writeFile, unlink } from 'fs/promises'
import path from 'path'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    let imageUrl = undefined

    if (imageFile && imageFile.size > 0) {
      // Delete old image if exists
      const oldCourse = await prisma.course.findUnique({
        where: { id: params.id },
        select: { imageUrl: true }
      })

      if (oldCourse?.imageUrl?.startsWith('/uploads/')) {
        try {
          await unlink(path.join(process.cwd(), 'public', oldCourse.imageUrl))
        } catch (error) {
          console.error('Failed to delete old image:', error)
        }
      }

      // Save new image
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      const filename = `course-${Date.now()}.${imageFile.name.split('.').pop()}`
      const filepath = path.join(process.cwd(), 'public/uploads/courses', filename)
      
      await writeFile(filepath, buffer)
      imageUrl = `/uploads/courses/${filename}`
    }

    const course = await prisma.course.update({
      where: { id: params.id },
      data: {
        title,
        description,
        price,
        duration: duration || null,
        level: level || null,
        category: category || null,
        ...(imageUrl && { imageUrl }),
      },
    })

    return NextResponse.json({ success: true, data: course })
  } catch (error) {
    console.error('Course update error:', error)
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete course image if exists
    const course = await prisma.course.findUnique({
      where: { id: params.id },
      select: { imageUrl: true }
    })

    if (course?.imageUrl?.startsWith('/uploads/')) {
      try {
        await unlink(path.join(process.cwd(), 'public', course.imageUrl))
      } catch (error) {
        console.error('Failed to delete image:', error)
      }
    }

    await prisma.course.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Course deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}