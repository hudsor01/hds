import type { Metadata } from 'next'

export const defaultMetadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    ),
    title: {
        default:
            'Property Manager - Advanced Property Management System',
        template: '%s | Property Manager'
    },
    description:
        'Comprehensive property management system for modern property managers and landlords.',
    keywords: [
        'property management',
        'real estate software',
        'tenant management',
        'landlord tools',
        'property maintenance',
        'rent collection',
        'property analytics'
    ],
    authors: [{ name: 'Property Manager' }],
    creator: 'Property Manager',
    publisher: 'Property Manager',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: process.env.NEXT_PUBLIC_APP_URL,
        title: 'Property Manager - Advanced Property Management System',
        description:
            'Comprehensive property management system for modern property managers and landlords.',
        siteName: 'Property Manager',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Property Manager Open Graph Image'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Property Manager',
        description:
            'Comprehensive property management system for modern property managers and landlords.',
        creator: '@propertymanager',
        images: ['/twitter-image.jpg']
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            {
                url: '/favicon-16x16.png',
                sizes: '16x16',
                type: 'image/png'
            },
            {
                url: '/favicon-32x32.png',
                sizes: '32x32',
                type: 'image/png'
            }
        ],
        apple: [
            {
                url: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png'
            }
        ],
        other: [
            {
                rel: 'mask-icon',
                url: '/safari-pinned-tab.svg'
            }
        ]
    },
    manifest: '/site.webmanifest',
    alternates: {
        canonical: process.env.NEXT_PUBLIC_APP_URL
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    },
    other: {
        'msapplication-TileColor': '#ffffff',
        'theme-color': '#ffffff'
    }
}

type PageMetadataProps = {
    title: string
    description: string
    path: string
    image?: string
}

export function generatePageMetadata({
    title,
    description,
    path,
    image = '/og-image.jpg'
}: PageMetadataProps): Metadata {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}${path}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title
                }
            ]
        },
        twitter: {
            title,
            description,
            images: [image]
        },
        alternates: {
            canonical: url
        }
    }
}
