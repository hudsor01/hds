import { headers } from 'next/headers'
import { kv } from '@vercel/kv'

interface CacheMetrics {
    hits: number
    misses: number
    errors: number
    latency: number[]
    lastUpdated: number
}

interface CacheEvent {
    type: 'hit' | 'miss' | 'error'
    key: string
    duration: number
    timestamp: number
    userAgent?: string
    path?: string
}

export class CacheMonitor {
    private static instance: CacheMonitor
    private metricsKey = 'cache:metrics'
    private eventsKey = 'cache:events'
    private readonly sampleRate = 0.1 // Sample 10% of requests

    private constructor() {}

    public static getInstance(): CacheMonitor {
        if (!CacheMonitor.instance) {
            CacheMonitor.instance = new CacheMonitor()
        }
        return CacheMonitor.instance
    }

    private shouldSample(): boolean {
        return Math.random() < this.sampleRate
    }

    async recordEvent(
        event: Omit<CacheEvent, 'timestamp' | 'userAgent' | 'path'>
    ) {
        if (!this.shouldSample()) return

        const headersList = headers()
        const fullEvent: CacheEvent = {
            ...event,
            timestamp: Date.now(),
            userAgent: headersList.get('user-agent') ?? undefined,
            path: headersList.get('x-invoke-path') ?? undefined
        }

        try {
            // Record event
            await kv.lpush(this.eventsKey, JSON.stringify(fullEvent))
            // Trim event list to last 1000 events
            await kv.ltrim(this.eventsKey, 0, 999)

            // Update metrics
            const metrics = await this.getMetrics()
            const updatedMetrics: CacheMetrics = {
                hits: metrics.hits + (event.type === 'hit' ? 1 : 0),
                misses:
                    metrics.misses + (event.type === 'miss' ? 1 : 0),
                errors:
                    metrics.errors + (event.type === 'error' ? 1 : 0),
                latency: [...metrics.latency, event.duration].slice(
                    -100
                ), // Keep last 100 latency measurements
                lastUpdated: Date.now()
            }

            await kv.set(
                this.metricsKey,
                JSON.stringify(updatedMetrics)
            )
        } catch (error) {
            console.error('Error recording cache event:', error)
        }
    }

    async getMetrics(): Promise<CacheMetrics> {
        try {
            const metrics = await kv.get<string>(this.metricsKey)
            return metrics
                ? JSON.parse(metrics)
                : {
                      hits: 0,
                      misses: 0,
                      errors: 0,
                      latency: [],
                      lastUpdated: Date.now()
                  }
        } catch (error) {
            console.error('Error getting cache metrics:', error)
            return {
                hits: 0,
                misses: 0,
                errors: 0,
                latency: [],
                lastUpdated: Date.now()
            }
        }
    }

    async getRecentEvents(limit = 100): Promise<CacheEvent[]> {
        try {
            const events = await kv.lrange(
                this.eventsKey,
                0,
                limit - 1
            )
            return events.map(event => JSON.parse(event as string))
        } catch (error) {
            console.error('Error getting cache events:', error)
            return []
        }
    }

    async getCacheHitRate(): Promise<number> {
        const metrics = await this.getMetrics()
        const total = metrics.hits + metrics.misses
        return total > 0 ? metrics.hits / total : 0
    }

    async getAverageLatency(): Promise<number> {
        const metrics = await this.getMetrics()
        return metrics.latency.length > 0
            ? metrics.latency.reduce((a, b) => a + b, 0) /
                  metrics.latency.length
            : 0
    }
}
