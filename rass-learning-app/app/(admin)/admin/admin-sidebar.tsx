"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  DollarSign, 
  Settings,
  BarChart
} from 'lucide-react'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Courses',
    href: '/admin/courses',
    icon: BookOpen,
  },
  {
    title: 'Students',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Enrollments',
    href: '/admin/enrollments',
    icon: DollarSign,
  },
  {
    title: 'Reports',
    href: '/admin/reports',
    icon: BarChart,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export function AdminSidebar() {
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