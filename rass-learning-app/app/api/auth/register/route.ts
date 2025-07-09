import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
})

export async function POST(req: NextRequest) {
  console.log("Register API called")
  
  try {
    // Parse request body
    const body = await req.json()
    console.log("Request body:", { ...body, password: "[HIDDEN]" })
    
    // Validate input
    const validationResult = registerSchema.safeParse(body)
    if (!validationResult.success) {
      console.log("Validation failed:", validationResult.error)
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid input data',
          details: validationResult.error.errors 
        },
        { status: 400 }
      )
    }

    const { email, password, name } = validationResult.data

    // Test database connection
    try {
      await prisma.$connect()
      console.log("Database connected")
    } catch (dbError) {
      console.error("Database connection failed:", dbError)
      return NextResponse.json(
        { 
          success: false,
          error: 'Database connection failed' 
        },
        { status: 500 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log("User already exists:", email)
      return NextResponse.json(
        { 
          success: false,
          error: 'User already exists' 
        },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("Password hashed")

    // Create user with default profile image
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'STUDENT',
        profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff&size=200`,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profileImage: true,
      },
    })
    
    console.log("User created successfully:", user.email)

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User created successfully',
    })
  } catch (error) {
    console.error('Registration error:', error)
    
    // Return proper error response
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create user',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}