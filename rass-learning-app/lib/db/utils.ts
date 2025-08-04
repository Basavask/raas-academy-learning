import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { Enrollment, Prisma } from '@prisma/client'
import type { SafeUser } from '@/types'

// User utilities
export async function createUser(data: {
  email: string
  password: string
  name?: string
  role?: 'ADMIN' | 'STUDENT'
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10)
  
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  })
}

export async function getUserByEmail(email: string): Promise<SafeUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  })
  
  if (!user) return null
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...safeUser } = user
  return safeUser
}

export async function validatePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}

// Course utilities
export async function getPublishedCourses(options?: {
  skip?: number
  take?: number
  category?: string
  level?: string
  search?: string
}) {
  const where: Prisma.CourseWhereInput = {
    isLive: true,
  }
  
  if (options?.category) {
    where.category = options.category
  }
  
  if (options?.level) {
    where.level = options.level
  }
  
  if (options?.search) {
    where.OR = [
      { title: { contains: options.search } },
      { description: { contains: options.search } },
    ]
  }
  
  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      skip: options?.skip,
      take: options?.take,
      include: {
        modules: {
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { enrollments: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.course.count({ where }),
  ])
  
  return { courses, total }
}
export async function getCourseWithModules(courseId: string) {
  return prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: 'asc' },
      },
    },
  })
}

// Enrollment utilities
export async function checkEnrollment(userId: string, courseId: string) {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  })
  
  return !!enrollment
}

export async function enrollStudent(userId: string, courseId: string, paymentId?: string) {
  return prisma.enrollment.create({
    data: {
      userId,
      courseId,
      paymentId,
    },
    include: {
      course: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          profileImage: true,
          phone: true,
          address: true,
          bio: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  })
}

// Stats utilities
export async function getAdminStats() {
  const [totalUsers, totalCourses, totalEnrollments, payments] = await Promise.all([
    prisma.user.count({ where: { role: 'STUDENT' } }),
    prisma.course.count(),
    prisma.enrollment.count(),
    prisma.payment.findMany({
      where: { status: 'SUCCESS' },
      select: { amount: true },
    }),
  ])
  
  const totalRevenue = payments.reduce((sum: unknown, payment: unknown) => (sum as number) + (payment as { amount: number }).amount, 0)
  
  const recentEnrollments = await (prisma as unknown as typeof prisma & { enrollment: { findMany: (args: unknown) => Promise<Enrollment[]> } }).enrollment.findMany({
    take: 5,
    orderBy: { enrolledAt: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          profileImage: true,
          phone: true,
          address: true,
          bio: true,
          studentId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      course: {
        include: {
          modules: true,
        },
      },
      payment: true,
    },
  })
  
  const popularCourses = await prisma.course.findMany({
    take: 5,
    where: { isLive: true },
    include: {
      modules: true,
      enrollments: true,
      _count: {
        select: { enrollments: true },
      },
    },
    orderBy: {
      enrollments: {
        _count: 'desc',
      },
    },
  })
  
  return {
    totalUsers,
    totalCourses,
    totalEnrollments,
    totalRevenue,
    recentEnrollments,
    popularCourses,
  }
}

export async function getStudentStats(userId: string) {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: true,
      payment: true,
    },
  })
  
  const enrolledCourses = enrollments.length
  const completedCourses = enrollments.filter((e) => e.completedAt).length
  const inProgressCourses = enrolledCourses - completedCourses
  
  const payments = await prisma.payment.findMany({
    where: {
      userId,
      status: 'SUCCESS',
    },
    select: { amount: true },
  })
  
  const totalSpent = payments.reduce((sum: unknown, payment: unknown) => (sum as number) + (payment as { amount: number }).amount, 0)
  
  const recentActivity = await prisma.enrollment.findMany({
    where: { userId },
    take: 5,
    orderBy: { enrolledAt: 'desc' },
    include: {
      course: true,
    },
  })
  
  return {
    enrolledCourses,
    completedCourses,
    inProgressCourses,
    totalSpent,
    recentActivity,
  }
}