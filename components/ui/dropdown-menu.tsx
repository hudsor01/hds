'use client'

import { cn } from '@/lib/utils'
import type { MenuItemProps, MenuProps } from '@mui/material'
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
} from '@mui/material'
import * as React from 'react'
import { Check, ChevronRight } from 'react-feather'

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.shape.borderRadius,
    minWidth: 180,
    boxShadow: theme.shadows[4],
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      fontSize: theme.typography.pxToRem(14),
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  minHeight: 36,
  padding: '6px 16px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}))

export interface DropdownMenuProps extends Omit<MenuProps, 'open'> {
  trigger?: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, children, trigger, onOpenChange, ...props }, ref) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
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
          <IconButton onClick={handleClick} className={className}>
            {trigger}
          </IconButton>
        )}
        <StyledMenu ref={ref} anchorEl={anchorEl} open={open} onClose={handleClose} {...props}>
          {children}
        </StyledMenu>
      </>
    )
  }
)
DropdownMenu.displayName = 'DropdownMenu'

export interface DropdownMenuItemProps extends MenuItemProps {
  inset?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

export const DropdownMenuItem = React.forwardRef<HTMLLIElement, DropdownMenuItemProps>(
  ({ className, children, inset, startIcon, endIcon, ...props }, ref) => (
    <StyledMenuItem
      ref={ref}
      className={cn(
        'outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm transition-colors focus:bg-accent focus:text-accent-foreground',
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {startIcon && <ListItemIcon>{startIcon}</ListItemIcon>}
      <ListItemText>{children}</ListItemText>
      {endIcon && <ListItemIcon sx={{ ml: 'auto' }}>{endIcon}</ListItemIcon>}
    </StyledMenuItem>
  )
)
DropdownMenuItem.displayName = 'DropdownMenuItem'

export const DropdownMenuSeparator = React.forwardRef<
  HTMLHRElement,
  React.ComponentProps<typeof Divider>
>(({ className, ...props }, ref) => (
  <Divider
    ref={ref}
    component="hr"
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

export const DropdownMenuCheckItem = React.forwardRef<
  HTMLLIElement,
  DropdownMenuItemProps & { checked?: boolean }
>(({ className, children, checked, ...props }, ref) => (
  <StyledMenuItem
    ref={ref}
    className={cn(
      'outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm transition-colors focus:bg-accent focus:text-accent-foreground',
      className
    )}
    {...props}
  >
    {checked && (
      <ListItemIcon sx={{ minWidth: 24 }}>
        <Check className="h-4 w-4" />
      </ListItemIcon>
    )}
    <ListItemText>{children}</ListItemText>
  </StyledMenuItem>
))
DropdownMenuCheckItem.displayName = 'DropdownMenuCheckItem'

export const DropdownMenuSubItem = React.forwardRef<HTMLLIElement, DropdownMenuItemProps>(
  ({ className, children, ...props }, ref) => (
    <StyledMenuItem
      ref={ref}
      className={cn(
        'outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm transition-colors focus:bg-accent focus:text-accent-foreground',
        className
      )}
      {...props}
    >
      <ListItemText>{children}</ListItemText>
      <ChevronRight className="ml-auto h-4 w-4" />
    </StyledMenuItem>
  )
)
DropdownMenuSubItem.displayName = 'DropdownMenuSubItem'
