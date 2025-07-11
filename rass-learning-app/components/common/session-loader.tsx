"use client"

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export function SessionLoader() {
  const { status } = useSession()

  if (status === 'loading') {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return null
}