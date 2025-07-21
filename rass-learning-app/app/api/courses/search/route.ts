import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categories = searchParams.get('categories');
    const search = searchParams.get('search') || ''
    const levels = searchParams.get('levels')?.split(',').filter(Boolean) || []
    const durations = searchParams.get('durations')?.split(',').filter(Boolean) || []
    const priceRanges = searchParams.get('priceRanges')?.split(',').filter(Boolean) || []

    // Normalize the category for DB matching
    let categoryFilter = categories;
    if (categoryFilter) {
      categoryFilter = categoryFilter.toLowerCase().replace(/\s+/g, '-');
    }

    // Build where clause
    const where: Record<string, unknown> = {
      isLive: true,
      AND: [] as Record<string, unknown>[]
    }

    // Search query
    if (search) {
      (where.AND as Record<string, unknown>[]).push({
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { category: { contains: search } }
        ]
      })
    }

    // Category filter
    if (categoryFilter) {
      (where.AND as Record<string, unknown>[]).push({
        category: categoryFilter
      })
    }

    // Level filter
    if (levels.length > 0) {
      (where.AND as Record<string, unknown>[]).push({
        level: { in: levels }
      })
    }

    // Duration filter
    if (durations.length > 0) {
      const durationConditions: Record<string, unknown>[] = []
      durations.forEach(duration => {
        if (duration === '< 3 months') {
          durationConditions.push({ duration: { contains: '1 month' } })
          durationConditions.push({ duration: { contains: '2 month' } })
        } else if (duration === '3-6 months') {
          durationConditions.push({ duration: { contains: '3 month' } })
          durationConditions.push({ duration: { contains: '4 month' } })
          durationConditions.push({ duration: { contains: '5 month' } })
          durationConditions.push({ duration: { contains: '6 month' } })
        } else if (duration === '> 6 months') {
          durationConditions.push({ duration: { contains: '7 month' } })
          durationConditions.push({ duration: { contains: '8 month' } })
          durationConditions.push({ duration: { contains: '9 month' } })
          durationConditions.push({ duration: { contains: '12 month' } })
        }
      })
      if (durationConditions.length > 0) {
        (where.AND as Record<string, unknown>[]).push({ OR: durationConditions })
      }
    }

    // Price range filter
    if (priceRanges.length > 0) {
      const priceConditions: Record<string, unknown>[] = []
      priceRanges.forEach(range => {
        if (range === 'Free') {
          priceConditions.push({ price: 0 })
        } else if (range === '< ₹10,000') {
          priceConditions.push({ price: { lt: 10000 } })
        } else if (range === '₹10,000 - ₹50,000') {
          priceConditions.push({ 
            AND: [
              { price: { gte: 10000 } },
              { price: { lte: 50000 } }
            ]
          })
        } else if (range === '> ₹50,000') {
          priceConditions.push({ price: { gt: 50000 } })
        }
      })
      if (priceConditions.length > 0) {
        (where.AND as Record<string, unknown>[]).push({ OR: priceConditions })
      }
    }

    // Remove empty AND array if no filters
    if ((where.AND as Record<string, unknown>[]).length === 0) {
      delete where.AND
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        _count: {
          select: { enrollments: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error in /api/courses/search:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}