import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Student Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Welcome back, {session.user.name}! Start learning today.
      </p>
    </div>
  )
}