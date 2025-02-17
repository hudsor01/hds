'use client'

import { cn } from '@/lib/utils'
import { type AlertTitleProps } from '@/types/components'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const alertVariants = cva(
  '[&>svg]:text-foreground relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  )
)
Alert.displayName = 'Alert'

export { Alert, alertVariants }

export function AlertTitle({ children, ...props }: AlertTitleProps) {
  return <h2 {...props}>{children}</h2>
}

export function AlertDescription({ children, ...props }: { children: React.ReactNode }) {
  return <p {...props}>{children}</p>
}
