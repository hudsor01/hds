'use client'

import { cn } from "@/app/lib/utils"
import type { ButtonHTMLAttributes } from "react"
import { forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm' | 'lg'
  variant?: 'default' | 'ghost' | 'outline'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  size = 'default',
  variant = 'default',
  ...props
}, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'default',
          'bg-transparent hover:bg-gray-100': variant === 'ghost',
          'border border-gray-200 bg-transparent hover:bg-gray-100': variant === 'outline',
          'h-9 px-4 py-2': size === 'default',
          'h-8 px-3 text-sm': size === 'sm',
          'h-11 px-8': size === 'lg',
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
