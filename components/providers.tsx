'use client'

import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { theme } from '@/lib/theme'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </NextThemeProvider>
    </QueryClientProvider>
  )
}
