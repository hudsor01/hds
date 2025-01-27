import { CommandMenu } from '@/components/command-menu'
import { Footer } from '@/components/layout/footer'
import { Providers } from '@/components/providers'
import type { Viewport } from 'next'
import { Inter, Playfair_Display, Roboto } from 'next/font/google'
import { Navbar } from './components/layout/navbar'
import './globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  fallback: ['system-ui', 'arial'],
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#A7E7D9',
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.variable} ${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar>
              <CommandMenu />
            </Navbar>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
