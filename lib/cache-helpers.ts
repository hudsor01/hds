import { unstable_cache } from 'next/cache'
import { headers } from 'next/headers'

type CacheOptions = {
    revalidate?: number
    tags?: string[]
}

/**
 * Higher-order function to add caching to any async data fetching function
 */
export function withCache<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    keyPrefix: string,
    options: CacheOptions = {}
) {
    return async (
        ...args: Parameters<T>
    ): Promise<Awaited<ReturnType<T>>> => {
        const headersList = headers()
        const isBot =
            headersList
                .get('user-agent')
                ?.toLowerCase()
                .includes('bot') ?? false

        // Longer cache time for bots to improve SEO
        const revalidate = isBot ? 3600 : (options.revalidate ?? 60)

        return unstable_cache(
            () => fn(...args),
            [`${keyPrefix}:${JSON.stringify(args)}`],
            {
                revalidate,
                tags: options.tags
            }
        )()
    }
}

/**
 * Cache successful responses based on URL patterns
 */
export function getCacheHeadersByPath(
    path: string
): Record<string, string> {
    // Define cache rules for different types of pages
    const cacheRules = {
        // Static pages with infrequent updates
        static: {
            paths: ['/', '/about', '/features'],
            headers: {
                'Cache-Control':
                    'public, s-maxage=3600, stale-while-revalidate=59'
            }
        },
        // Dynamic pages with moderate update frequency
        dynamic: {
            paths: ['/pricing', '/testimonials'],
            headers: {
                'Cache-Control':
                    'public, s-maxage=300, stale-while-revalidate=59'
            }
        },
        // Highly dynamic pages
        realtime: {
            paths: ['/dashboard', '/properties'],
            headers: {
                'Cache-Control': 'no-store'
            }
        }
    }

    // Find matching rule
    const rule = Object.values(cacheRules).find(({ paths }) =>
        paths.some(p => path.startsWith(p))
    )

    return (
        rule?.headers ?? {
            // Default to no caching for unknown paths
            'Cache-Control': 'no-store'
        }
    )
}

/**
 * Helper to implement stale-while-revalidate caching strategy
 */
export async function getWithRevalidation<T>(
    key: string,
    fetchData: () => Promise<T>,
    options: CacheOptions = {}
): Promise<T> {
    try {
        // Attempt to fetch fresh data
        const data = await fetchData()

        // Cache the fresh data
        await unstable_cache(async () => data, [key], {
            revalidate: options.revalidate,
            tags: options.tags
        })()

        return data
    } catch (error) {
        // If fetch fails, try to return stale data from cache
        const cachedData = await unstable_cache(
            async () => null,
            [key],
            { tags: options.tags }
        )()

        if (cachedData) {
            return cachedData as T
        }

        throw error
    }
}
