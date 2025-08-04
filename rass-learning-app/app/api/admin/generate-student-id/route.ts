import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { requireAdmin } from '@/lib/auth/guard'

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const { userId } = body
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }
    
    // Check if user already has a student ID
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    if (user.studentId) {
      return NextResponse.json({ error: 'User already has a student ID' }, { status: 400 })
    }
    
    // Generate unique student ID (format: RAAS-YYYY-XXXX)
    const year = new Date().getFullYear()
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    const studentId = `RAAS-${year}-${randomNum}`
    
    // Check if student ID already exists
    const existingUser = await prisma.user.findUnique({
      where: { studentId }
    })
    
    if (existingUser) {
      return NextResponse.json({ error: 'Student ID generation failed, please try again' }, { status: 500 })
    }
    
    // Update user with student ID
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { studentId },
      select: {
        id: true,
        name: true,
        email: true,
        studentId: true
      }
    })
    
    return NextResponse.json({ 
      message: 'Student ID generated successfully',
      studentId: updatedUser.studentId,
      user: updatedUser
    })
  } catch (error) {
    console.error('Error generating student ID:', error)
    return NextResponse.json({ error: 'Failed to generate student ID' }, { status: 500 })
  }
} 