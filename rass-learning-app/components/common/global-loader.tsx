"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

// Configure NProgress
if (typeof window !== 'undefined') {
  NProgress.configure({
    minimum: 0.3,
    easing: 'ease',
    speed: 800,
    showSpinner: true, // Enable spinner for better visibility
    trickle: true,
    trickleSpeed: 200,
  })
}

export function GlobalLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Start progress when route starts changing
    const handleStart = () => NProgress.start()
    const handleComplete = () => NProgress.done()

    // Listen to route changes
    handleComplete()

    return () => {
      handleComplete()
    }
  }, [pathname, searchParams])

  // Add click listeners to all links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.href && !link.target && link.href.startsWith(window.location.origin)) {
        NProgress.start()
      }
    }

    document.addEventListener('click', handleClick)
    
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return null
}