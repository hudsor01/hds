import { supabase } from '@/lib/supabase';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Rate limit settings
const RATE_LIMITS = {
  waitlist: {window: 60 * 1000, max: 5}, // 5 requests per minute for waitlist
  general: {window: 60 * 1000, max: 100}, // 100 requests per minute for general endpoints
  auth: {window: 15 * 60 * 1000, max: 10}, // 10 requests per 15 minutes for auth endpoints
};

// In-memory store for rate limiting
const rateLimitStore = new Map<string, {count: number; resetTime: number}>();

export async function rateLimitMiddleware(req: NextRequest, type: keyof typeof RATE_LIMITS = 'general') {
  const ip = req.ip || req.headers.get('x-forwarded-for')?.split(',')[0] || 'anonymous';
  const now = Date.now();
  const limit = RATE_LIMITS[type];

  // Check IP blacklist
  const {data: blacklisted} = await supabase
    .from('ip_blacklist')
    .select('ip_address')
    .eq('ip_address', ip)
    .single();

  if (blacklisted) {
    return NextResponse.json(
      {error: 'IP address blocked', message: 'Please contact support'},
      {status: 403},
    );
  }

  // Clean up expired entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }

  // Get or create rate limit entry
  const key = `${ip}:${type}`;
  let rateLimit = rateLimitStore.get(key);
  if (!rateLimit || rateLimit.resetTime < now) {
    rateLimit = {
      count: 0,
      resetTime: now + limit.window,
    };
    rateLimitStore.set(key, rateLimit);
  }

  // Increment request count
  rateLimit.count++;

  // Set rate limit headers
  const headers = new Headers();
  headers.set('X-RateLimit-Limit', limit.max.toString());
  headers.set('X-RateLimit-Remaining', Math.max(0, limit.max - rateLimit.count).toString());
  headers.set('X-RateLimit-Reset', new Date(rateLimit.resetTime).toUTCString());

  // Check if rate limit exceeded
  if (rateLimit.count > limit.max) {
    // Log excessive attempts
    if (rateLimit.count > limit.max * 2) {
      await supabase.from('waitlist_attempts').insert([
        {
          identifier: ip,
          created_at: new Date().toISOString(),
        },
      ]);
    }

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
