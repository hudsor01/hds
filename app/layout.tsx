import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Toaster } from 'sonner'
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

export const metadata: Metadata = {
  title: 'Hudson Digital Solutions',
  description: 'Your comprehensive property management solution',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="h-full">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            {children}
            <Footer />
          </div>
          <Toaster position="top-center" expand richColors closeButton />
        </Providers>
      </body>
    </html>
  )
}
