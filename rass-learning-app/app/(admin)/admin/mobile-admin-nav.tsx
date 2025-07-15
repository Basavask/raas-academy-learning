"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
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
  { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Courses', href: '/admin/courses', icon: BookOpen },
  { title: 'Students', href: '/admin/users', icon: Users },
  { title: 'Enrollments', href: '/admin/enrollments', icon: DollarSign },
  { title: 'Reports', href: '/admin/reports', icon: BarChart },
  { title: 'Settings', href: '/admin/settings', icon: Settings },
]

export function MobileAdminNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <nav className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 p-4 overflow-y-auto">
            <div className="mb-8">
              <h2 className="text-xl font-bold">Admin Menu</h2>
            </div>
            <div className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
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
            </div>
          </nav>
        </div>
      )}
    </>
  )
}