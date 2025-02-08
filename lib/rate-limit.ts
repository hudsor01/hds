import { rateLimit } from 'express-rate-limit';
import { NextResponse } from 'next/server';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

export async function withRateLimit(
  request: Request,
  handler: () => Promise<Response>,
) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const limiter = rateLimiter.get();

  try {
    await new Promise((resolve, reject) => {
      limiter({ ip, path: new URL(request.url).pathname }, {}, (err: any) => {
        if (err) reject(err);
        resolve(true);
      });
    });

    return await handler();
  } catch (error) {
    if (error.message === rateLimiter.message) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
