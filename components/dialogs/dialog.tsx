'use client'

import { cn } from '@/lib/utils'
import {
  Dialog as MuiDialog,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle
} from '@mui/material'
import * as React from 'react'

interface DialogProps extends React.ComponentProps<typeof MuiDialog> {
  onOpenChange?: (open: boolean) => void
}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ className, children, onOpenChange, open, onClose, ...props }, ref) => {
    const handleClose = React.useCallback(
      (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        onClose?.(event, reason)
        onOpenChange?.(false)
      },
      [onClose, onOpenChange]
    )

    return (
      <MuiDialog
        ref={ref}
        className={cn('fixed inset-0 z-50 flex items-center justify-center', className)}
        open={open}
        onClose={handleClose}
        {...props}
      >
        {children}
      </MuiDialog>
    )
  }
)
Dialog.displayName = 'Dialog'

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MuiDialogContent>
>(({ className, children, ...props }, ref) => (
  <MuiDialogContent
    ref={ref}
    className={cn('bg-background relative p-6 shadow-lg sm:rounded-lg', className)}
    {...props}
  >
    {children}
  </MuiDialogContent>
))
DialogContent.displayName = 'DialogContent'

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof MuiDialogTitle>
>(({ className, ...props }, ref) => (
  <MuiDialogTitle
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
DialogTitle.displayName = 'DialogTitle'

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
))
DialogDescription.displayName = 'DialogDescription'

export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle }
