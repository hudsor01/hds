'use client'

import { useEffect, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { DashboardSidebar } from '@/components/layouts/dashboard/sidebar'
import { DashboardHeader } from '@/components/layouts/dashboard/header'
import { usePathname } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useTheme()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < theme.breakpoints.values.md)
      setIsSidebarOpen(window.innerWidth >= theme.breakpoints.values.md)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [theme.breakpoints.values.md])

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }, [pathname, isMobile])

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false)
        }}
        isMobile={isMobile}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
          marginLeft: isSidebarOpen && !isMobile ? '280px' : 0
        }}
      >
        <DashboardHeader
          onMenuClick={() => {
            setIsSidebarOpen(!isSidebarOpen)
          }}
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
        />

        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            bgcolor: theme.palette.mode === 'light' ? 'grey.50' : 'grey.900'
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              maxWidth: theme.breakpoints.values.xl,
              mx: 'auto',
              width: '100%'
            }}
          >
            {children}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
