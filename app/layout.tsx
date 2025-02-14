import './globals.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './theme'
import type { Metadata } from 'next'
import { Providers } from '@/components/providers/providers'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Roboto } from 'next/font/google'
import { Toaster } from 'sonner'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

// Configure Roboto font with variable fonts support
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  title: 'Hudson Digital Solutions',
  description: 'Your comprehensive property management solution',
  icons: {
    icon: '/favicon.ico'
  }
}

// Enhanced layout with Next.js 15's async features
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Using Next.js 15's async headers API
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const themePreference = cookieStore.get('theme')?.value

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
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
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
