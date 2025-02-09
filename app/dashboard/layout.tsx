'use client'

import { AuthGuard } from '@/components/auth/auth-guard'
import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useUser } from '../../auth/lib/auth/config'
const SIDEBAR_WIDTH = 280

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const theme = useTheme()
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))
  const { user, isLoaded } = useUser()
  const router = useRouter()

  // Check if user needs onboarding
  useEffect(() => {
    if (isLoaded && user) {
      const needsOnboarding =
        !user.firstName || !user.lastName || !user.publicMetadata?.onboardingCompleted
      if (needsOnboarding) {
        router.push('/onboarding')
      }
    }
  }, [isLoaded, user, router])

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <AuthGuard>
      <Box sx={{ display: 'flex', minHeight: '100vh', overflow: 'hidden' }}>
        <DashboardHeader
          onSidebarOpen={() => setSidebarOpen(true)}
          onSidebarToggle={handleSidebarToggle}
          sidebarCollapsed={sidebarCollapsed}
        />

        <Box
          component="nav"
          sx={{
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: theme.zIndex.drawer,
            width: {
              lg: sidebarCollapsed ? 80 : SIDEBAR_WIDTH,
            },
            transition: theme.transitions.create('width', {
              duration: theme.transitions.duration.standard,
            }),
          }}
        >
          {lgUp ? (
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', lg: 'block' },
                '& .MuiDrawer-paper': {
                  position: 'static',
                  width: 'auto',
                  height: '100%',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                  transition: theme.transitions.create('width', {
                    duration: theme.transitions.duration.standard,
                  }),
                  overflowX: 'hidden',
                },
              }}
            >
              <Box sx={{ height: 64 }} /> {/* Header spacing */}
              <Box
                sx={{
                  px: sidebarCollapsed ? 1 : 2,
                  py: 3,
                  height: 'calc(100% - 64px)',
                  overflow: 'auto',
                }}
              >
                <DashboardNav collapsed={sidebarCollapsed} />
              </Box>
            </Drawer>
          ) : (
            <Drawer
              anchor="left"
              onClose={() => setSidebarOpen(false)}
              open={sidebarOpen}
              variant="temporary"
              sx={{
                display: { xs: 'block', lg: 'none' },
                '& .MuiDrawer-paper': {
                  width: SIDEBAR_WIDTH,
                  boxSizing: 'border-box',
                  overflowX: 'hidden',
                },
              }}
            >
              <Box sx={{ height: 64 }} /> {/* Header spacing */}
              <Box sx={{ px: 2, py: 3 }}>
                <DashboardNav collapsed={false} />
              </Box>
            </Drawer>
          )}
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: '100vh',
            pt: '64px', // Header height
            ml: {
              xs: 0,
              lg: sidebarCollapsed ? '80px' : `${SIDEBAR_WIDTH}px`,
            },
            transition: theme.transitions.create('margin', {
              duration: theme.transitions.duration.standard,
            }),
            overflow: 'auto',
          }}
        >
          <Box sx={{ p: 3 }}>{children}</Box>
        </Box>
      </Box>
    </AuthGuard>
  )
}
