'use client'

import { routes } from '@/auth/lib/routes'
import {
    Box,
    Collapse,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Tooltip,
    Typography,
    alpha,
    useTheme
} from '@mui/material'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
    BarChart2,
    ChevronLeft,
    ChevronRight,
    FileText,
    Home,
    Key,
    Plus,
    Settings,
    Tool,
    Users
} from 'react-feather'

const navItems = [
  {
    title: 'Dashboard',
    icon: BarChart2,
    href: routes.dashboard
  },
  {
    title: 'Properties',
    icon: Home,
    href: routes.properties.index
  },
  {
    title: 'Tenants',
    icon: Users,
    href: routes.tenants.index
  },
  {
    title: 'Maintenance',
    icon: Tool,
    href: routes.maintenance.index
  },
  {
    title: 'Leases',
    icon: Key,
    href: routes.leases.index
  },
  {
    title: 'Documents',
    icon: FileText,
    href: routes.documents.index
  }
] as const

const DRAWER_WIDTH = 280
const COLLAPSED_DRAWER_WIDTH = 72

export function Sidebar() {
  const theme = useTheme()
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          transition: theme.transitions.create(['width'], {
            duration: theme.transitions.duration.shorter
          })
        }
      }}
    >
      <Stack sx={{ height: '100%' }}>
        {/* Logo & Collapse Button */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={sidebarCollapsed ? 'center' : 'space-between'}
          sx={{
            p: 2,
            minHeight: 64
          }}
        >
          {!sidebarCollapsed && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: '1.25rem'
              }}
            >
              HDS
            </Typography>
          )}
          <IconButton onClick={handleToggleCollapse} size="small">
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Stack>

        <Divider />

        {/* Quick Action Button */}
        <Box sx={{ p: 2 }}>
          <Link href={routes.properties.new} style={{ textDecoration: 'none' }}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <ListItemButton
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: 1,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                  <Plus size={20} />
                </ListItemIcon>
                <Collapse in={!sidebarCollapsed} orientation="horizontal">
                  <ListItemText
                    primary="Add Property"
                    primaryTypographyProps={{
                      sx: { fontWeight: 600 }
                    }}
                  />
                </Collapse>
              </ListItemButton>
            </motion.div>
          </Link>
        </Box>

        {/* Navigation Items */}
        <List sx={{ px: 2, py: 1 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
                <Link href={item.href} style={{ textDecoration: 'none', width: '100%' }}>
                  <Tooltip
                    title={sidebarCollapsed ? item.title : ''}
                    placement="right"
                  >
                    <ListItemButton
                      selected={isActive}
                      sx={{
                        borderRadius: 1,
                        color: isActive ? 'primary.main' : 'text.secondary',
                        bgcolor: isActive
                          ? alpha(theme.palette.primary.main, 0.08)
                          : 'transparent',
                        '&:hover': {
                          bgcolor: isActive
                            ? alpha(theme.palette.primary.main, 0.12)
                            : alpha(theme.palette.primary.main, 0.04)
                        },
                        '&.Mui-selected': {
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.12)
                          }
                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 36,
                          color: isActive ? 'primary.main' : 'text.secondary'
                        }}
                      >
                        <item.icon size={20} />
                      </ListItemIcon>
                      <Collapse in={!sidebarCollapsed} orientation="horizontal">
                        <ListItemText
                          primary={item.title}
                          primaryTypographyProps={{
                            sx: {
                              fontWeight: isActive ? 600 : 500,
                              color: isActive ? 'text.primary' : 'inherit'
                            }
                          }}
                        />
                      </Collapse>
                    </ListItemButton>
                  </Tooltip>
                </Link>
              </ListItem>
            )
          })}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        {/* Settings */}
        <List sx={{ px: 2, py: 1 }}>
          <ListItem disablePadding>
            <Link href={routes.settings} style={{ textDecoration: 'none', width: '100%' }}>
              <Tooltip
                title={sidebarCollapsed ? 'Settings' : ''}
                placement="right"
              >
                <ListItemButton
                  selected={pathname === routes.settings}
                  sx={{
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.04)
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Settings size={20} />
                  </ListItemIcon>
                  <Collapse in={!sidebarCollapsed} orientation="horizontal">
                    <ListItemText primary="Settings" />
                  </Collapse>
                </ListItemButton>
              </Tooltip>
            </Link>
          </ListItem>
        </List>
      </Stack>
    </Drawer>
  )
}
