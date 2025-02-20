import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        default: 'HDS - Property Management System',
        template: '%s | HDS'
    },
    description:
        'Modern property management system for real estate professionals',
    keywords: [
        'property management',
        'real estate',
        'tenant management',
        'lease management'
    ]
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#2563EB'
}
