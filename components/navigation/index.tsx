import { useAuth } from '@/lib/auth'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'

// Navigation Item
interface NavItem {
  label: string
  href: string
  icon?: ReactNode
  requiresAuth?: boolean
  requiredRole?: string
}

interface NavigationProps {
  items: NavItem[]
  logo?: ReactNode
}

// Main Navigation
export function MainNavigation({ items, logo }: NavigationProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, role } = useAuth()

  const filteredItems = items.filter(
    (item) =>
      (!item.requiresAuth || isAuthenticated) && (!item.requiredRole || role === item.requiredRole)
  )

  const navContent = (
    <List>
      {filteredItems.map((item) => (
        <ListItem
          key={item.href}
          component={Link}
          href={item.href}
          selected={pathname === item.href}
          sx={{
            borderRadius: 1,
            mb: 0.5,
            '&.Mui-selected': {
              bgcolor: 'primary.light',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.light',
              },
            },
          }}
        >
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  )

  return (
    <>
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
          )}
          {logo}
          {!isMobile && (
            <Stack direction="row" spacing={2} sx={{ ml: 'auto' }}>
              {navContent}
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <IconButton
              onClick={() => setMobileOpen(false)}
              sx={{ mb: 2, ml: 'auto', display: 'block' }}
            >
              <X />
            </IconButton>
            {navContent}
          </Box>
        </Drawer>
      )}
    </>
  )
}

// Sidebar Navigation
interface SidebarProps extends NavigationProps {
  width?: number
}

export function Sidebar({ items, logo, width = 280 }: SidebarProps) {
  const pathname = usePathname()
  const { isAuthenticated, role } = useAuth()

  const filteredItems = items.filter(
    (item) =>
      (!item.requiresAuth || isAuthenticated) && (!item.requiredRole || role === item.requiredRole)
  )

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Toolbar>{logo}</Toolbar>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {filteredItems.map((item) => (
            <ListItem
              key={item.href}
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                },
              }}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
