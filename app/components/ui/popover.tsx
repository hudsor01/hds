'use client'

import { cn } from '@/auth/lib/utils'
import type { PopoverProps as MuiPopoverProps } from '@mui/material'
import {
    IconButton,
    Popover as MuiPopover,
    styled,
} from '@mui/material'
import * as React from 'react'

const StyledPopover = styled(MuiPopover)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
}))

export interface PopoverProps extends Omit<MuiPopoverProps, 'open'> {
  trigger?: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ className, children, trigger, onOpenChange, ...props }, ref) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
      onOpenChange?.(true)
    }

    const handleClose = () => {
      setAnchorEl(null)
      onOpenChange?.(false)
    }

    return (
      <>
        {trigger && (
          <IconButton
            onClick={handleClick}
            className={className}
          >
            {trigger}
          </IconButton>
        )}
        <StyledPopover
          ref={ref}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          {...props}
        >
          {children}
        </StyledPopover>
      </>
    )
  }
)
Popover.displayName = 'Popover'

export const PopoverTrigger = React.forwardRef<
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
PopoverTrigger.displayName = 'PopoverTrigger'

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'z-50 w-72 rounded-md bg-popover p-4 text-popover-foreground shadow-md outline-none',
      className
    )}
    {...props}
  />
))
PopoverContent.displayName = 'PopoverContent'
