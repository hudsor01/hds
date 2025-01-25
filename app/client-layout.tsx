'use client'

import { AuthProvider } from "@/auth/components/auth-provider"
import { Providers } from '@/components/providers'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { StrictMode } from 'react'
import { ThemeMetadata } from './components/theme-metadata'
import theme from './theme'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StrictMode>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeMetadata />
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </AuthProvider>
    </StrictMode>
  )
}
