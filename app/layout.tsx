import './globals.css'
import React from 'react'
import { Metadata as NextMetadata } from 'next'
import { Roboto } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
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
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="bg-background-app text-text-primary">
        <Providers>
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
