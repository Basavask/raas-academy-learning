import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    // Save to DB
    await prisma.subscribeNews.create({ data: { email } })
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    // Log the error for debugging
    console.error('Subscribe API error:', err)
    if (err instanceof Error && err.message === 'P2002') {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
} 