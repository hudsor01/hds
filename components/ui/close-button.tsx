'use client'

import { cn } from '@/auth/lib/utils'
import * as React from 'react'
import { X } from 'react-feather'
import { Button } from './button'

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      variant="ghost"
      size="sm"
      className={cn('rounded-full', className)}
      ref={ref}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </Button>
  )
)

export type CloseButtonProps = React.ComponentPropsWithoutRef<typeof Button>
export default CloseButton
