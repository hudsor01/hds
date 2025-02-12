'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'
import { Box, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material'
import { useAuth } from '@/components/providers/auth-provider'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Properties', href: '/properties' },
  { name: 'Tenants', href: '/tenants' },
  { name: 'Maintenance', href: '/maintenance' },
  { name: 'Leases', href: '/leases' },
  { name: 'Payments', href: '/payments' },
  { name: 'Settings', href: '/settings' }
]

const publicNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const navItems = user ? navigation : publicNavigation

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box'
          }
        }}
      >
        <List>
          {navItems.map(item => (
            <ListItem
              key={item.name}
              component={Link}
              href={item.href}
              onClick={toggleDrawer}
              sx={{
                backgroundColor: pathname === item.href ? 'action.selected' : 'transparent',
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export function DesktopNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  const navItems = user ? navigation : publicNavigation

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
      {navItems.map(item => (
        <ListItem
          key={item.name}
          component={Link}
          href={item.href}
          sx={{
            width: 'auto',
            backgroundColor: pathname === item.href ? 'action.selected' : 'transparent',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </Box>
  )
}
