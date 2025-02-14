import supabase from '@/lib/supabase'
import { NextResponse, type NextRequest } from 'next/server'
import { type Database } from '@/types/db.types'
import { rateLimiter } from '@/lib/rate-limit'
import { DatabaseError } from '@/lib/supabase'
import { ZodError } from 'zod'

// All protected routes should be under /dashboard
const PROTECTED_ROUTES = ['/dashboard']
const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/pricing',
  '/features',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password'
]
const AUTH_COOKIE = 'sb-auth-token'

interface ErrorResponse {
  error: {
    message: string
    code?: string
    details?: unknown
  }
  status: number
}

export async function withErrorHandler(
  handler: (req: NextRequest) => Promise<Response>,
  options: {
    rateLimit?: boolean
    validateSession?: boolean
  } = {}
) {
  return async (req: NextRequest): Promise<Response> => {
    try {
      // Apply rate limiting if enabled
      if (options.rateLimit) {
        const ip = req.headers.get('x-forwarded-for') || req.ip
        const { success, limit, reset, remaining } = await rateLimiter(ip)

        if (!success) {
          return createErrorResponse({
            error: {
              message: 'Too munknown requests',
              code: 'RATE_LIMIT_EXCEEDED',
              details: { limit, reset, remaining }
            },
            status: 429
          })
        }
      }

      return await handler(req)
    } catch (error) {
      return handleApiError(error)
    }
  }
}

function handleApiError(error: unknown): Response {
  console.error('API Error:', error)

  if (error instanceof DatabaseError) {
    return createErrorResponse({
      error: {
        message: error.message,
        code: error.code,
        details: error.details
      },
      status: error.status || 500
    })
  }

  if (error instanceof ZodError) {
    return createErrorResponse({
      error: {
        message: 'Validation error',
        code: 'VALIDATION_ERROR',
        details: error.errors
      },
      status: 400
    })
  }

  if (error instanceof Error) {
    return createErrorResponse({
      error: {
        message: error.message,
        code: 'INTERNAL_ERROR'
      },
      status: 500
    })
  }

  return createErrorResponse({
    error: {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR'
    },
    status: 500
  })
}

function createErrorResponse({ error, status }: ErrorResponse): Response {
  return NextResponse.json(
    { error },
    {
      status,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export function withValidation<T>(schema: { parse: (data: unknown) => T }) {
  return async (req: NextRequest): Promise<T> => {
    const body = await req.json()
    return schema.parse(body)
  }
}

export async function updateSession(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)

    // Allow public routes to be accessed without authentication
    if (PUBLIC_ROUTES.some(route => requestUrl.pathname === route)) {
      return NextResponse.next()
    }

    // Rate limiting for auth endpoints
    if (request.nextUrl.pathname.startsWith('/auth')) {
      const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'
      const { success } = await rateLimiter(ip, request, {
        uniqueTokenPerInterval: 500,
        interval: 60 * 1000, // 1 minute
        tokensPerInterval: 10
      })
      if (!success) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
      }
    }

    const supabase = supabase<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession()

    if (sessionError) {
      throw new DatabaseError('Failed to get session', 'AUTH_ERROR', sessionError.message)
    }

    const isProtectedRoute = PROTECTED_ROUTES.some(route => requestUrl.pathname.startsWith(route))

    // Handle protected routes
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirect', requestUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Only redirect to dashboard if specifically on login/signup pages
    if ((requestUrl.pathname === '/login' || requestUrl.pathname === '/signup') && session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Update session cookie
    const response = NextResponse.next({
      request: {
        headers: request.headers
      }
    })

    if (session) {
      response.cookies.set(AUTH_COOKIE, session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      })
    } else {
      response.cookies.delete(AUTH_COOKIE)
    }

    return response
  } catch (error) {
    console.error('Auth middleware error:', error)
    if (error instanceof DatabaseError) {
      return NextResponse.json({ error: error.message }, { status: error.status || 500 })
    }
    return NextResponse.json({ error: 'Authentication error' }, { status: 500 })
  }
}
