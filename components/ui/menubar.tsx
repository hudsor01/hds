'use client'

import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  styled,
  type MenuItemProps,
  type MenuProps,
} from '@mui/material'
import * as React from 'react'

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.shape.borderRadius,
    minWidth: 180,
    boxShadow: theme.shadows[4],
  },
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: '0.875rem',
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

export interface MenubarProps extends Omit<MenuProps, 'open'> {
  trigger: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Menubar = React.forwardRef<HTMLDivElement, MenubarProps>(
  ({ className, trigger, open, onOpenChange, children, ...props }, ref) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
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
        <Button onClick={handleClick} className={className} variant="text" color="inherit">
          {trigger}
        </Button>
        <StyledMenu
          ref={ref}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          {...props}
        >
          <MenuList>{children}</MenuList>
        </StyledMenu>
      </>
    )
  }
)
Menubar.displayName = 'Menubar'

export interface MenubarItemProps extends MenuItemProps {
  inset?: boolean
}

const MenubarItem = React.forwardRef<HTMLLIElement, MenubarItemProps>(
  ({ className, children, inset, ...props }, ref) => (
    <StyledMenuItem ref={ref} className={className} sx={inset ? { pl: 8 } : undefined} {...props}>
      {children}
    </StyledMenuItem>
  )
)
MenubarItem.displayName = 'MenubarItem'

export { Menubar, MenubarItem }
