import { Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Navbar } from '@/components/layouts/navbar'

import '@/app/globals.css'
import Providers from './providers'

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body className="bg-background min-h-screen antialiased">
                <Providers>
                    <div className="flex min-h-screen flex-col">
                        <Navbar />
                        <main className="flex-1">
                            <Suspense
                                fallback={<div>Loading...</div>}
                            >
                                {children}
                            </Suspense>
                        </main>
                    </div>
                </Providers>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    )
}
