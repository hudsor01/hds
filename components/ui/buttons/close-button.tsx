'use client'

import { Button } from './button'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { X } from 'react-feather'

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ className, ...props }, ref) => (
    <Button variant="outline" className={cn('rounded-full', className)} ref={ref} {...props}>
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </Button>
  )
)

export type CloseButtonProps = React.ComponentPropsWithoutRef<typeof Button>
export default CloseButton
