'use client'

import { Header } from '@/components/layout/header'
import { Box, Drawer, Stack, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import type { Route } from 'next'
import Image from 'next/image'
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
    <Stack sx={{ height: '100%', bgcolor: 'background.paper' }}>
      {/* Logo Section */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Link href="/dashboard">
          <Box sx={{ position: 'relative', width: '100%', height: 60 }}>
            <Image
              src="/logo.png"
              alt="Hudson Digital Solutions"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>
        </Link>
      </Box>

      {/* Navigation Items */}
      <Stack sx={{ p: 2, flex: 1, gap: 1 }}>
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
                    '&:hover': {
                      bgcolor: 'action.hover',
                      color: 'primary.main',
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

      {/* Preview Image */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 160,
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Image
            src="/dashboard-preview.png"
            alt="Dashboard Preview"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Box>
    </Stack>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile Drawer */}
      <Box
        component="nav"
        sx={{ width: { lg: DRAWER_WIDTH }, flexShrink: { lg: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', lg: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                borderRight: 1,
                borderColor: 'divider'
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', lg: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                borderRight: 1,
                borderColor: 'divider'
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header onOpenSidebarAction={() => setMobileOpen(true)} />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 3,
            bgcolor: 'background.default',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
