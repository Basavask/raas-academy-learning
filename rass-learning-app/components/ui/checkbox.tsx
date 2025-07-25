"use client"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import * as React from "react"


const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={className}
      {...props}
    />
  )
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
