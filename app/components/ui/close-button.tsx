'use client'

import { X } from 'lucide-react'
import { cn } from 'my-app/app/lib/utils'
import * as React from 'react'
import { Button } from './button'

interface CloseButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  className?: string
}

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      variant="ghost"
      size="icon"
      className={cn('rounded-full', className)}
      ref={ref}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </Button>
  )
)
CloseButton.displayName = 'CloseButton'
