'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'sonner'
import { Navbar } from './navbar'
import { Footer } from './footer'

interface PublicLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  fullWidth?: boolean
}

const LayoutRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default
}))

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
  }
}))

export function PublicLayout({ children, maxWidth = 'xl', fullWidth = false }: PublicLayoutProps) {
  return (
    <LayoutRoot>
      <Analytics />
      <SpeedInsights />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--mui-palette-background-paper)',
            color: 'var(--mui-palette-text-primary)',
            border: '1px solid var(--mui-palette-divider)'
          }
        }}
      />

      <Navbar />

      <Main>
        {fullWidth ? (
          children
        ) : (
          <Container
            maxWidth={maxWidth}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {children}
          </Container>
        )}
      </Main>

      <Footer />
    </LayoutRoot>
  )
}
