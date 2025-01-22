'use client'

import { Box, Drawer, Stack, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import type { Route } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import
  {
    BarChart2,
    FileText,
    Home,
    Key,
    Settings,
    Tool,
    Users
  } from 'react-feather'

const DRAWER_WIDTH = 280

const sidebarItems = [
  { title: 'Dashboard', href: '/dashboard' as Route, icon: Home },
  { title: 'Properties', href: '/dashboard/properties' as Route, icon: Key },
  { title: 'Tenants', href: '/dashboard/tenants' as Route, icon: Users },
  { title: 'Maintenance', href: '/dashboard/maintenance' as Route, icon: Tool },
  { title: 'Documents', href: '/dashboard/documents' as Route, icon: FileText },
  { title: 'Analytics', href: '/dashboard/analytics' as Route, icon: BarChart2 },
  { title: 'Settings', href: '/dashboard/settings' as Route, icon: Settings }
]

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const drawer = (
    <Stack
      sx={{
        height: '100%',
        width: DRAWER_WIDTH,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      {/* Navigation Items */}
      <Stack
        sx={{
          py: 3,
          px: 2,
          flex: 1,
          gap: 1,
          overflowY: 'auto'
        }}
      >
        {sidebarItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                style={{ textDecoration: 'none' }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: 1,
                    color: 'text.secondary',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      transform: 'translateX(5px)',
                    }
                  }}
                >
                  <Icon size={20} style={{ marginRight: '12px' }} />
                  {item.title}
                </Stack>
              </Link>
            </motion.div>
          )
        })}
      </Stack>
    </Stack>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            bgcolor: 'background.paper',
            border: 'none',
            zIndex: theme.zIndex.drawer
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            border: 'none'
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          width: { xs: '100%', lg: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { xs: 0, lg: `${DRAWER_WIDTH}px` },
          pt: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 3 },
          position: 'relative',
          zIndex: 1
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
