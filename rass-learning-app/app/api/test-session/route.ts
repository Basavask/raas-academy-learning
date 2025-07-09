import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    return NextResponse.json({
      status: 'ok',
      session: session || null,
      hasAuth: !!process.env.NEXTAUTH_SECRET,
      nodeEnv: process.env.NODE_ENV,
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}