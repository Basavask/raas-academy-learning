import { getServerSession } from "next-auth"
import { authOptions } from "./config"
import { redirect } from "next/navigation"

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return session
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/unauthorized')
  }
  return session
}

export async function requireStudent() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'STUDENT') {
    redirect('/unauthorized')
  }
  return session
}