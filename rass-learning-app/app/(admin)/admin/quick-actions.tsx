import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Users, BookOpen, FileText } from 'lucide-react'

export function QuickActions() {
  const actions = [
    {
      label: 'Add Course',
      href: '/admin/courses/new',
      icon: Plus,
      variant: 'default' as const,
    },
    {
      label: 'Manage Users',
      href: '/admin/users',
      icon: Users,
      variant: 'outline' as const,
    },
    {
      label: 'View Courses',
      href: '/admin/courses',
      icon: BookOpen,
      variant: 'outline' as const,
    },
    {
      label: 'Reports',
      href: '/admin/reports',
      icon: FileText,
      variant: 'outline' as const,
    },
  ]

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant={action.variant}
          asChild
        >
          <Link href={action.href}>
            <action.icon className="mr-2 h-4 w-4" />
            {action.label}
          </Link>
        </Button>
      ))}
    </div>
  )
}