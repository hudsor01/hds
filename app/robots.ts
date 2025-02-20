import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/dashboard/',
                '/api/',
                '/_next/',
                '/static/',
                '/admin/',
                '/user/',
                '/property/*/edit',
                '/tenant/*/edit',
                '/maintenance/*/edit',
                '/*.json$',
                '/*.xml$'
            ]
        },
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl
    }
}
