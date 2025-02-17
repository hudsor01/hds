import { Footer } from '@/components/layouts/footer'
import { Navbar } from '@/components/layouts/navbar'
import { Providers } from '@/components/providers'
import { AuthProvider } from '@/components/providers/auth-provider'
import { theme } from '@/lib/theme'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Roboto } from 'next/font/google'
import React, { Suspense } from 'react'
import { Toaster } from 'sonner'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
})

// Loading component
function LoadingFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <CircularProgress />
    </Box>
  )
}

// Metadata - moved outside of component
export const metadata = {
  title: 'HDS Platform',
  description: 'Modern Property Management Platform'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Providers>
              <AuthProvider initialUser={null}>
                <Suspense fallback={<LoadingFallback />}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: '100vh',
                      bgcolor: 'background.default'
                    }}
                  >
                    <Navbar />
                    <Box
                      component="main"
                      sx={{
                        flex: '1 0 auto',
                        width: '100%'
                      }}
                    >
                      {children}
                    </Box>
                    <Footer />
                  </Box>
                </Suspense>
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
              </AuthProvider>
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
