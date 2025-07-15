"use client"

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'

// Configure NProgress
if (typeof window !== 'undefined') {
  NProgress.configure({
    minimum: 0.3,
    easing: 'ease',
    speed: 800,
    showSpinner: true,
    trickle: true,
    trickleSpeed: 200,
  })
}

function GlobalLoaderInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

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

export function GlobalLoader() {
  return (
    <Suspense fallback={null}>
      <GlobalLoaderInner />
    </Suspense>
  )
}