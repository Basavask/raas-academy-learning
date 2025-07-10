"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { 
  LayoutDashboard, 
  BookOpen, 
  Trophy, 
  User,
  Settings
} from 'lucide-react'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/student/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'My Courses',
    href: '/student/courses',
    icon: BookOpen,
  },
  {
    title: 'Achievements',
    href: '/student/achievements',
    icon: Trophy,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: User,
  },
  {
    title: 'Settings',
    href: '/student/settings',
    icon: Settings,
  },
]

export function StudentSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}