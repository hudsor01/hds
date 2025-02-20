import type { MetadataRoute } from 'next'

const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Get dynamic routes from database
    // const properties = await db.property.findMany({
    //   select: { id: true, updatedAt: true },
    //   where: { isPublished: true }
    // })

    // Static routes
    const routes = [
        '',
        '/about',
        '/features',
        '/pricing',
        '/contact',
        '/testimonials',
        '/login',
        '/signup',
        '/forgot-password'
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8
    }))

    // Dynamic routes example (uncomment when database is ready)
    // const propertyRoutes = properties.map((property) => ({
    //   url: `${baseUrl}/properties/${property.id}`,
    //   lastModified: property.updatedAt.toISOString(),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.6,
    // }))

    return [
        ...routes
        // ...propertyRoutes, // Uncomment when database is ready
    ]
}
