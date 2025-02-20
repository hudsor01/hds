import { unstable_cache } from 'next/cache'
import { CacheMonitor } from './cache-monitor'

export async function monitoredCache<T>(
    fn: () => Promise<T>,
    key: string[],
    options: {
        tags?: string[]
        revalidate?: number
    } = {}
): Promise<T> {
    const monitor = CacheMonitor.getInstance()
    const startTime = performance.now()

    try {
        const cached = await unstable_cache(fn, key, {
            tags: options.tags,
            revalidate: options.revalidate
        })()

        const duration = performance.now() - startTime
        await monitor.recordEvent({
            type: 'hit',
            key: key.join(':'),
            duration
        })

        return cached
    } catch (error) {
        const duration = performance.now() - startTime
        await monitor.recordEvent({
            type: 'error',
            key: key.join(':'),
            duration
        })
        throw error
    }
}
