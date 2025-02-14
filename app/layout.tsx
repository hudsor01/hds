import './globals.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './theme'
import type { Metadata } from 'next'
import { Providers } from '@/components/providers/providers'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Roboto } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Providers } from '@/components/providers/providers'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  preload: true
})

export const metadata: NextMetadata = {
  title: 'HDS Platform',
  description:
    'A comprehensive platform for managing properties and streamlining real estate operations.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={'${roboto.className}'}>
        <Providers>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline enableColorScheme />
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster
                position="top-center"
                expand
                richColors
                closeButton
                theme={(themePreference as 'light' | 'dark' | 'system') || 'system'}
              />
            </ThemeProvider>
          </AppRouterCacheProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
