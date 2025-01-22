import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import ClientLayout from './client-layout'
import { Navbar } from './components/layout/navbar'
import './globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hudsondigital',
    creator: '@hudsondigital'
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${roboto.variable} antialiased`}>
      <body>
        <Navbar />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
