'use client'

import { useCallback, useState, useTransition } from 'react'
import { Menu, MenuItem, IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import type { Route } from 'next'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'

interface NavigationMenuProps {
  items: Array<{
    title: string
    href: Route
    description?: string
    icon?: React.ReactNode
  }>
}

export default function NavigationMenu({ items }: NavigationMenuProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleNavigation = useCallback(
    (href: string) => {
      startTransition(() => {
        router.push(href)
        handleClose()
      })
    },
    [router, handleClose]
  )

  return (
    <nav>
      <IconButton
        onClick={handleClick}
        color="inherit"
        aria-label="menu"
        aria-controls={open ? 'navigation-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="navigation-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'navigation-button',
          role: 'menu'
        }}
        PaperProps={{
          elevation: 3,
          sx: { mt: 1.5 }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {items.map(item => (
          <MenuItem
            key={item.href}
            onClick={() => handleNavigation(item.href)}
            component={Link}
            href={item.href}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              minWidth: 200
            }}
          >
            {item.icon}
            <div>
              <div className="font-medium">{item.title}</div>
              {item.description && <div className="text-sm text-gray-600">{item.description}</div>}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </nav>
  )
}
