import { Navbar } from '@/components/layouts/Navbar'
import { PageErrorBoundary } from '@/components/error-boundary'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        default: 'Property Manager',
        template: '%s | Property Manager'
    },
    description:
        'Advanced property management system for modern property managers',
    keywords: [
        'property management',
        'real estate',
        'tenant management',
        'landlord software'
    ],
    authors: [{ name: 'Property Manager' }],
    creator: 'Property Manager',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://propertymanager.com',
        title: 'Property Manager',
        description:
            'Advanced property management system for modern property managers',
        siteName: 'Property Manager'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Property Manager',
        description:
            'Advanced property management system for modern property managers',
        creator: '@propertymanager'
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png'
    },
    manifest: '/site.webmanifest'
}

export default function PublicLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-background min-h-screen">
            <Navbar />
            <PageErrorBoundary>
                <main className="flex-1">{children}</main>
            </PageErrorBoundary>
        </div>
    )
}
