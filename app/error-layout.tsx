'use client'

import theme from './theme'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { Roboto } from 'next/font/google'

export const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
  title: 'Page Not Found - Hudson Digital Solutions',
  description: 'The requested page could not be found'
}

export default function ErrorLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background:
            'linear-gradient(180deg, rgba(0, 127, 255, 0.05) 0%, rgba(0, 89, 178, 0.05) 100%)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          component="header"
          sx={{
            height: 70,
            px: 3,
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'divider',
            background: 'white'
          }}
        >
          <Box
            component="h1"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              m: 0
            }}
          >
            Property Manager
          </Box>
        </Box>
        <Box component="main" sx={{ flex: 1 }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
