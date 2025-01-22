'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ThemeMetadata } from './components/theme-metadata'
import { Providers } from './providers'
import { theme } from './theme'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeMetadata />
        {children}
      </ThemeProvider>
    </Providers>
  )
}
