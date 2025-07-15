"use client"

import { Suspense, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface SuspenseWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function SuspenseWrapper({ 
  children, 
  fallback = (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}: SuspenseWrapperProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>
}