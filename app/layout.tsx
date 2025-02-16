import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/toaster'
import { AuthProvider } from '@/lib/auth/auth-provider'
import './globals.css'

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' }
  ],
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  title: {
    default: 'HDS Platform',
    template: 'HDS Platform'
  },
  description: 'Modern property management solution',
  keywords: ['property management', 'real estate', 'landlord', 'tenant'],
  authors: [{ name: 'Hudson Digital Solutions' }],
  creator: 'Hudson Digital Solutions',
  metadataBase: new URL(process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3000')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
