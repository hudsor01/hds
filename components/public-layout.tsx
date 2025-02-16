// components/public-layout.tsx
'use client'

import { Box, Container, useTheme } from '@mui/material'
import { Navbar } from './navbar'
import { Footer } from './footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'sonner'

interface PublicLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default // Use theme here
      }}
    >
      <Analytics />
      <SpeedInsights />
      <Toaster position="top-center" />

      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
      <Footer />
    </Box>
  )
}
