"use client"

import * as React from "react"
import { cn } from "@/lib/utils/cn"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700",
          className
        )}
        {...props}
      >
        <div
          className="h-full bg-primary-500 transition-all duration-300 ease-in-out"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }