'use client'

import { cn } from '@/app/lib/utils'
import type { MenuItemProps, MenuProps } from '@mui/material'
import
  {
    Divider,
    Menu,
    MenuItem,
    styled,
  } from '@mui/material'
import * as React from 'react'

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.shape.borderRadius,
    minWidth: 180,
    boxShadow: theme.shadows[4],
    '& .MuiMenu-list': {
      padding: theme.spacing(1),
    },
    '& .MuiMenuItem-root': {
      fontSize: 14,
      padding: theme.spacing(1, 2),
      borderRadius: theme.shape.borderRadius,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
  },
}))

export interface ContextMenuProps extends Omit<MenuProps, 'open'> {
  trigger: React.ReactNode
}

export const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ className, children, trigger, ...props }, ref) => {
    const [contextMenu, setContextMenu] = React.useState<{
      mouseX: number
      mouseY: number
    } | null>(null)

    const handleContextMenu = (event: React.MouseEvent) => {
      event.preventDefault()
      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event.clientX,
              mouseY: event.clientY,
            }
          : null,
      )
    }

    const handleClose = () => {
      setContextMenu(null)
    }

    return (
      <>
        <div onContextMenu={handleContextMenu}>{trigger}</div>
        <StyledMenu
          ref={ref}
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
          className={cn('', className)}
          {...props}
        >
          {children}
        </StyledMenu>
      </>
    )
  }
)
ContextMenu.displayName = 'ContextMenu'

export interface ContextMenuItemProps extends MenuItemProps {
  inset?: boolean
}

export const ContextMenuItem = React.forwardRef<HTMLLIElement, ContextMenuItemProps>(
  ({ className, inset, ...props }, ref) => (
    <MenuItem
      ref={ref}
      className={cn(inset && 'pl-8', className)}
      {...props}
    />
  )
)
ContextMenuItem.displayName = 'ContextMenuItem'

export const ContextMenuSeparator = React.forwardRef<HTMLHRElement, React.ComponentProps<typeof Divider>>(
  (props, ref) => <Divider ref={ref} {...props} />
)
ContextMenuSeparator.displayName = 'ContextMenuSeparator'
