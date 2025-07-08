import { User, Course, CourseModule, Enrollment, Payment, Role, PaymentStatus } from '@prisma/client'

// User types
export type SafeUser = Omit<User, 'password'>

export interface UserWithEnrollments extends SafeUser {
  enrollments: EnrollmentWithCourse[]
}

// Course types
export interface CourseWithModules extends Course {
  modules: CourseModule[]
  _count?: {
    enrollments: number
  }
}

export interface CourseWithDetails extends Course {
  modules: CourseModule[]
  enrollments: Enrollment[]
}

// Enrollment types
export interface EnrollmentWithCourse extends Enrollment {
  course: Course
}

export interface EnrollmentWithDetails extends Enrollment {
  course: CourseWithModules
  user: SafeUser
  payment?: Payment
}

// Payment types
export interface PaymentWithDetails extends Payment {
  user: SafeUser
  course: Course
}

// Form types
export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface CourseFormData {
  title: string
  description: string
  price: number
  imageUrl?: string
  level?: string
  duration?: string
  category?: string
}

export interface ModuleFormData {
  title: string
  description?: string
  content?: string
  videoUrl?: string
  duration?: string
  order: number
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Dashboard Stats
export interface AdminStats {
  totalUsers: number
  totalCourses: number
  totalEnrollments: number
  totalRevenue: number
  recentEnrollments: EnrollmentWithDetails[]
  popularCourses: CourseWithDetails[]
}

export interface StudentStats {
  enrolledCourses: number
  completedCourses: number
  inProgressCourses: number
  totalSpent: number
  recentActivity: EnrollmentWithCourse[]
}