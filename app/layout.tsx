import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { Providers } from '@/providers'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { Inter, Roboto } from 'next/font/google'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          roboto.variable,
          inter.variable
        )}
      >
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <main className="font-primary">{children}</main>
          </Providers>
          <Toaster />
        </NextThemeProvider>
      </body>
    </html>
  )
}
