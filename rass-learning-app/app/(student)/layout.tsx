import { requireAuth } from '@/lib/auth/guard'
import { MobileStudentNav } from './student/mobile-student-nav'
import { StudentSidebar } from './student/student-sidebar'

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAuth()
  
  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileStudentNav />
      </div>
      
      {/* Desktop Layout */}
      <div className="flex">
        <div className="hidden lg:block">
          <StudentSidebar />
        </div>
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </>
  )
}