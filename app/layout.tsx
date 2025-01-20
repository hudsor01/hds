import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import ClientLayout from './client-layout'
import './globals.css'

// Font configuration
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hudson Digital',
  description: 'Property Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} ${inter.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
