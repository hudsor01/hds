import { CommandMenu } from '@/components/command-menu'
import { Footer } from '@/components/layout/footer'
import { Providers } from '@/components/providers'
import type { Metadata, Viewport } from 'next'
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

export const metadata: Metadata = {
  title: {
    default: 'Hudson Digital Solutions | Property Management',
    template: '%s | Hudson Digital Solutions'
  },
  description: 'Enterprise-grade property management platform for modern real estate operations',
  applicationName: 'Hudson Digital Solutions',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    siteName: 'Hudson Digital Solutions',
    title: 'Hudson Digital Solutions - Property Management Platform',
    description: 'Enterprise-grade property management platform for modern real estate operations',
    images: [
      {
        url: '/dashboard-preview.png',
        width: 800,
        height: 600,
        alt: 'Hudson Digital Solutions Dashboard Preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dickswayze',
    creator: '@dickswayze',
    images: ['/dashboard-preview.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    'property management',
    'real estate software',
    'tenant management',
    'landlord tools',
    'property analytics'
  ]
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
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
