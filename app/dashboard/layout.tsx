'use client'

import { useEffect, useState } from 'react'
import { Box, Container, useMediaQuery, useTheme } from '@mui/material'
import { AuthProvider } from '@/components/providers/auth-provider'
import DashboardNavbar from '@/components/layout/dashboard-navbar'
import DashboardFooter from '@/components/layout/dashboard-footer'
import { LoadingScreen } from '@/components/ui/loading-screen'
import { usePathname } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Handle initial page load
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Initialize any dashboard-wide resources
        await Promise.all([
          // Add any necessary data fetching or initialization here
          new Promise(resolve => setTimeout(resolve, 500)) // Minimum loading time
        ])
      } finally {
        setIsLoading(false)
      }
    }

    initializeDashboard()
  }, [])

  // Reset scroll position on route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <AuthProvider>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: theme => theme.palette.background.default
        }}
      >
        <DashboardNavbar />
        <Container
          component="main"
          maxWidth={false}
          sx={{
            flexGrow: 1,
            py: 3,
            px: isMobile ? 2 : 3,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: '1920px',
              mx: 'auto'
            }}
          >
            {children}
          </Box>
        </Container>
        <DashboardFooter />
      </Box>
    </AuthProvider>
  )
}

// Add type safety for the layout
DashboardLayout.displayName = 'DashboardLayout'
