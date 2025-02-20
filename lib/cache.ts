import { unstable_cache } from 'next/cache'

export const CACHE_TAGS = {
    properties: 'properties',
    tenants: 'tenants',
    maintenance: 'maintenance',
    payments: 'payments',
    documents: 'documents',
    pricing: 'pricing',
    testimonials: 'testimonials'
} as const

type CacheTags = keyof typeof CACHE_TAGS

export async function cache<T>(
    fn: () => Promise<T>,
    key: string[],
    tags: CacheTags[],
    revalidate = 3600 // 1 hour default
) {
    const cached = await unstable_cache(fn, key, {
        tags,
        revalidate
    })()

    return cached
}

// Pricing cache helpers
export async function cachePricingPlans() {
    return cache(
        async () => {
            // Fetch pricing plans from your data source
            return [
                {
                    name: 'Starter',
                    price: 29,
                    features: [
                        'Up to 10 properties',
                        'Basic reporting',
                        'Email support'
                    ]
                }
                // ... other plans
            ]
        },
        ['pricing-plans'],
        [CACHE_TAGS.pricing],
        86400 // 24 hours
    )
}

// Testimonials cache helpers
export async function cacheTestimonials() {
    return cache(
        async () => {
            // Fetch testimonials from your data source
            return [
                {
                    name: 'John Doe',
                    role: 'Property Manager',
                    content: 'Great software!'
                }
                // ... other testimonials
            ]
        },
        ['testimonials'],
        [CACHE_TAGS.testimonials],
        3600 // 1 hour
    )
}

// Cache invalidation helper
export async function invalidateCache(tags: CacheTags[]) {
    try {
        await Promise.all(
            tags.map(async tag => {
                // Implement cache invalidation logic here
                // This could be a call to your caching service or database
                console.log(`Invalidating cache for tag: ${tag}`)
            })
        )
    } catch (error) {
        console.error('Error invalidating cache:', error)
    }
}
