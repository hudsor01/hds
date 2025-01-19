"use client"

import { cn } from '@/lib/utils'
import {
    DialogActions,
    IconButton,
    Dialog as MuiDialog,
    DialogContent as MuiDialogContent,
    DialogTitle as MuiDialogTitle,
    styled,
} from '@mui/material'
import * as React from 'react'
import { X } from 'react-feather'

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    padding: theme.spacing(2),
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
  },
}))

export interface DialogProps extends React.ComponentProps<typeof MuiDialog> {
  onOpenChange?: (open: boolean) => void
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ children, onOpenChange, open, onClose, ...props }, ref) => {
    const handleClose = React.useCallback(
      (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        onClose?.(event, reason)
        onOpenChange?.(false)
      },
      [onClose, onOpenChange]
    )

    return (
      <StyledDialog
        ref={ref}
        open={open}
        onClose={handleClose}
        {...props}
      >
        {children}
      </StyledDialog>
    )
  }
)
Dialog.displayName = 'Dialog'

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MuiDialogContent>
>(({ className, children, ...props }, ref) => (
  <MuiDialogContent
    ref={ref}
    className={cn('relative', className)}
    {...props}
  >
    {children}
  </MuiDialogContent>
))
DialogContent.displayName = 'DialogContent'

export const DialogHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  >
    {children}
  </div>
)
DialogHeader.displayName = 'DialogHeader'

export const DialogFooter = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogActions>) => (
  <DialogActions
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

export const DialogTitle = React.forwardRef<
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

export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof IconButton>
>(({ className, onClick, ...props }, ref) => (
  <IconButton
    ref={ref}
    onClick={onClick}
    className={cn(
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </IconButton>
))
DialogClose.displayName = 'DialogClose'

export const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(className)}
    {...props}
  />
))
DialogTrigger.displayName = 'DialogTrigger'
