// lib/rate-limit.ts
import { Redis } from '@upstash/redis'

export class RateLimiter {
  private redis: Redis

  async isRateLimited(key: string, limit: number, window: number): Promise<boolean> {
    const current = await this.redis.incr(key)
    if (current === 1) {
      await this.redis.expire(key, window)
    }
    return current > limit
  }
}
