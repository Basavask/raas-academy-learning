import { requireAdmin } from '@/lib/auth/guard'
import { Suspense } from 'react'
import { AdminSidebar } from './admin/admin-sidebar'
import { MobileAdminNav } from './admin/mobile-admin-nav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Suspense fallback={<div className="w-64 bg-white dark:bg-gray-800" />}>
        <AdminSidebar />
      </Suspense>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Suspense fallback={<div className="h-16 bg-white dark:bg-gray-800" />}>
          <MobileAdminNav />
        </Suspense>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}