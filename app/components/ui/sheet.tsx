'use client'

import { cn } from "@/app/lib/utils"
import type { DrawerProps } from '@mui/material'
import { IconButton, Drawer as MuiDrawer, styled } from '@mui/material'
import * as React from 'react'
import { X } from 'react-feather'


const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    padding: theme.spacing(2),
  },
}))

export interface SheetProps extends Omit<DrawerProps, 'open'> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  ({ className, children, open, onOpenChange, onClose, ...props }, ref) => {
    const handleClose = React.useCallback(
      (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        onClose?.(event, reason)
        onOpenChange?.(false)
      },
      [onClose, onOpenChange]
    )

    return (
      <StyledDrawer
        ref={ref}
        open={open}
        onClose={handleClose}
        className={cn('fixed inset-0 z-50 outline-none', className)}
        {...props}
      >
        {children}
      </StyledDrawer>
    )
  }
)
Sheet.displayName = 'Sheet'

export interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ className, asChild, children, ...props }, ref) => {
    if (asChild) {
      return children
    }
    return (
      <button
        ref={ref}
        type="button"
        className={cn(className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SheetTrigger.displayName = 'SheetTrigger'

export const SheetClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof IconButton>
>(({ className, onClick, ...props }, ref) => (
  <IconButton
    ref={ref}
    onClick={onClick}
    className={cn(
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary',
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </IconButton>
))
SheetClose.displayName = 'SheetClose'

export const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative w-full h-full flex flex-col overflow-y-auto bg-background p-6',
      className
    )}
    {...props}
  >
    {children}
  </div>
))
SheetContent.displayName = 'SheetContent'

export const SheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
    {...props}
  />
))
SheetHeader.displayName = 'SheetHeader'

export const SheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
))
SheetFooter.displayName = 'SheetFooter'

export const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
))
SheetTitle.displayName = 'SheetTitle'

export const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
SheetDescription.displayName = 'SheetDescription'
