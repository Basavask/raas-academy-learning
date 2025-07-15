"use client"

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Button, ButtonProps } from './button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
  loadingText?: string
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ children, loading, loadingText, disabled, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        className={cn(className)}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading && loadingText ? loadingText : children}
      </Button>
    )
  }
)

LoadingButton.displayName = 'LoadingButton'