import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // requests per window

// In-memory store for rate limiting
const rateLimitStore = new Map<string, {count: number; resetTime: number}>();

export function rateLimitMiddleware(req: NextRequest) {
  const ip = req.ip || 'anonymous';
  const now = Date.now();

  // Clean up expired entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }

  // Get or create rate limit entry
  let rateLimit = rateLimitStore.get(ip);
  if (!rateLimit || rateLimit.resetTime < now) {
    rateLimit = {
      count: 0,
      resetTime: now + RATE_LIMIT_WINDOW,
    };
    rateLimitStore.set(ip, rateLimit);
  }

  // Increment request count
  rateLimit.count++;

  // Set rate limit headers
  const headers = new Headers();
  headers.set('X-RateLimit-Limit', MAX_REQUESTS.toString());
  headers.set('X-RateLimit-Remaining', Math.max(0, MAX_REQUESTS - rateLimit.count).toString());
  headers.set('X-RateLimit-Reset', new Date(rateLimit.resetTime).toUTCString());

  // Check if rate limit exceeded
  if (rateLimit.count > MAX_REQUESTS) {
    return NextResponse.json(
      {
        error: 'Too many requests',
        message: 'Please try again later',
        retryAfter: Math.ceil((rateLimit.resetTime - now) / 1000),
      },
      {
        status: 429,
        headers,
      },
    );
  }

  // Continue with the request
  const response = NextResponse.next();
  // Copy headers to response
  headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}
