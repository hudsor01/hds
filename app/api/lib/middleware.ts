import type { NextResponse } from 'next/server'
import type { Session, User } from '@supabase/supabase-js'
import { ApiError } from './error-handler'
import supabase from '@../../../lib/supabase'

export async function withAuth(
    request: Request,
    handler: (user: User) => Promise<NextResponse>
): Promise<NextResponse> {
    try {
        const { data, error } = await supabase.auth.getSession()
        const { session } = data

        if (error || !session) {
            throw new ApiError(401, 'Unauthorized')
        }

        return await handler(session.user)
    } catch (error) {
        throw new ApiError(401, 'Unauthorized')
    }
}

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later'
})

export function withRateLimit(
    handler: (request: Request) => Promise<NextResponse>
): (request: Request) => Promise<NextResponse> {
    return async (request: Request): Promise<NextResponse> => {
        const ip: string =
            request.headers.get('x-forwarded-for') ?? 'unknown'
        const rateLimitResult = await rateLimiter(request, { ip })

        if (rateLimitResult.status === 429) {
            throw new ApiError(429, 'Too Many Requests')
        }

        return handler(request)
    }
}
