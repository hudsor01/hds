import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import ClientLayout from './client-layout'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#60A5FA', // pastel blue
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
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hudson Digital Solutions Preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dickswayze',
    creator: '@dickswayze',
    images: ['/twitter-image.png']
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
      className={`${roboto.variable} antialiased`}
    >
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
