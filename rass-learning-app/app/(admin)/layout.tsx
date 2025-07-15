import { requireAdmin } from '@/lib/auth/guard'
import { AdminSidebar } from './admin/admin-sidebar'
import { MobileAdminNav } from './admin/mobile-admin-nav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()
  
  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileAdminNav />
      </div>
      
      {/* Desktop Layout */}
      <div className="flex">
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </>
  )
}