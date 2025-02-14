'use client'

import * as React from 'react'
import Button from '@mui/material/Button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import CircularProgress from '@mui/material/CircularProgress'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      },
      animation: {
        none: '',
        rotate: 'hover:rotate-2 hover:scale-110',
        'rotate-left': 'hover:-rotate-2 hover:scale-110'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      animation: 'none'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      animation,
      asChild = false,
      loading = false,
      disabled,
      startIcon,
      endIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = loading || disabled

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <CircularProgress
            size={16}
            className="mr-2"
            color={variant === 'default' ? 'inherit' : 'primary'}
          />
        )}
        {!loading && startIcon && <span className="mr-2">{startIcon}</span>}
        {children}
        {!loading && endIcon && <span className="ml-2">{endIcon}</span>}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
