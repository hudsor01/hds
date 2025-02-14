'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, loading, type = 'button', variant = 'primary', ...props }, ref) => {
    const baseStyles = 'flex items-center justify-center font-medium rounded-md transition-colors'
    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary-dark',
      secondary: 'bg-background-subtle text-text-primary hover:bg-background-subtle/80',
      outline: 'border border-border-ui text-text-primary hover:bg-background-subtle'
    }

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          baseStyles,
          variantStyles[variant],
          'px-4 py-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          children
        )}
      </button>
    )
  }
)
