'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/layouts/navbar'
import { Providers } from '@/components/providers'
import { ErrorBoundary } from '@/components/ui/error-boundary'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: ClientLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="container mx-auto flex-1 px-4 py-8">{children}</main>
              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                  <p className="text-muted-foreground text-sm">© 2024 Hudson Digital Solutions. All rights reserved.</p>
                  <div className="flex items-center space-x-4">
                    <a href="/privacy" className="text-muted-foreground hover:text-foreground text-sm">
                      Privacy
                    </a>
                    <a href="/terms" className="text-muted-foreground hover:text-foreground text-sm">
                      Terms
                    </a>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster position="top-center" expand={true} richColors closeButton />
          </Providers>
          {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          )}
        </ErrorBoundary>
      </body>
    </html>
  )
}
