"use client"

import { useEffect, useTransition } from 'react'
import { useRouter as useNextRouter } from 'next/navigation'
import NProgress from 'nprogress'

export function useRouter() {
  const router = useNextRouter()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (isPending) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [isPending])

  const push = (href: string) => {
    NProgress.start()
    startTransition(() => {
      router.push(href)
    })
  }

  const replace = (href: string) => {
    NProgress.start()
    startTransition(() => {
      router.replace(href)
    })
  }

  const back = () => {
    NProgress.start()
    startTransition(() => {
      router.back()
    })
  }

  return {
    ...router,
    push,
    replace,
    back,
  }
}