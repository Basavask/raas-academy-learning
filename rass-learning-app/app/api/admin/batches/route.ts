import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { requireAdmin } from '@/lib/auth/guard'

interface BatchWithEnrollments {
  id: string
  batchNumber: string
  startDate: Date
  endDate: Date
  maxStudents: number
  isActive: boolean
  enrollments: Array<{
    id: string
    user: {
      id: string
      name: string | null
      email: string
      studentId: string | null
    }
  }>
}

// GET - Fetch all batches for a course
export async function GET(request: NextRequest) {
  try {
    await requireAdmin()
    
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    
    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }
    
    const batches = await (prisma as unknown as typeof prisma & { courseBatch: { findMany: (args: unknown) => Promise<BatchWithEnrollments[]> } }).courseBatch.findMany({
      where: { courseId },
      include: {
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                studentId: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(batches)
  } catch (error) {
    console.error('Error fetching batches:', error)
    return NextResponse.json({ error: 'Failed to fetch batches' }, { status: 500 })
  }
}

// POST - Create a new batch
export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const { courseId, batchNumber, startDate, endDate, maxStudents } = body
    
    if (!courseId || !batchNumber || !startDate || !endDate || !maxStudents) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }
    
    // Check if batch number already exists for this course
    const existingBatch = await (prisma as unknown as typeof prisma & { courseBatch: { findFirst: (args: unknown) => Promise<BatchWithEnrollments | null> } }).courseBatch.findFirst({
      where: { courseId, batchNumber }
    })
    
    if (existingBatch) {
      return NextResponse.json({ error: 'Batch number already exists for this course' }, { status: 400 })
    }
    
    const batch = await (prisma as unknown as typeof prisma & { courseBatch: { create: (args: unknown) => Promise<BatchWithEnrollments> } }).courseBatch.create({
      data: {
        courseId,
        batchNumber,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        maxStudents: parseInt(maxStudents)
      },
      include: {
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                studentId: true
              }
            }
          }
        }
      }
    })
    
    return NextResponse.json(batch)
  } catch (error) {
    console.error('Error creating batch:', error)
    return NextResponse.json({ error: 'Failed to create batch' }, { status: 500 })
  }
}

// PUT - Update a batch
export async function PUT(request: NextRequest) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const { id, batchNumber, startDate, endDate, maxStudents, isActive } = body
    
    if (!id) {
      return NextResponse.json({ error: 'Batch ID is required' }, { status: 400 })
    }
    
    const batch = await (prisma as unknown as typeof prisma & { courseBatch: { update: (args: unknown) => Promise<BatchWithEnrollments> } }).courseBatch.update({
      where: { id },
      data: {
        batchNumber,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        maxStudents: maxStudents ? parseInt(maxStudents) : undefined,
        isActive
      },
      include: {
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                studentId: true
              }
            }
          }
        }
      }
    })
    
    return NextResponse.json(batch)
  } catch (error) {
    console.error('Error updating batch:', error)
    return NextResponse.json({ error: 'Failed to update batch' }, { status: 500 })
  }
}

// DELETE - Delete a batch
export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Batch ID is required' }, { status: 400 })
    }
    
    // Check if batch has enrollments
    const batchWithEnrollments = await (prisma as unknown as typeof prisma & { courseBatch: { findUnique: (args: unknown) => Promise<BatchWithEnrollments | null> } } ).courseBatch.findUnique({
      where: { id },
      include: { enrollments: true }
    })
    
    if (batchWithEnrollments?.enrollments?.length && batchWithEnrollments.enrollments?.length > 0) {
      return NextResponse.json({ error: 'Cannot delete batch with enrolled students' }, { status: 400 })
    }
    
    await (prisma as unknown as typeof prisma & { courseBatch: { delete: (args: unknown) => Promise<void> } }).courseBatch.delete({
      where: { id }
    })
    
    return NextResponse.json({ message: 'Batch deleted successfully' })
  } catch (error) {
    console.error('Error deleting batch:', error)
    return NextResponse.json({ error: 'Failed to delete batch' }, { status: 500 })
  }
} 