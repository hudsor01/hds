import type { Database } from '@/types/db.types'
import type { CookieOptions } from '@supabase/ssr'
import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import process from 'process'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'],
        {
            cookies: {
                getAll: () => {
                    return req.cookies.getAll()
                },
                setAll: (
                    cookies: {
                        name: string
                        value: string
                        options: CookieOptions
                    }[]
                ) => {
                    cookies.forEach(cookie => {
                        req.cookies.set({
                            name: cookie.name,
                            value: cookie.value,
                            ...cookie.options
                        })
                        res.cookies.set({
                            name: cookie.name,
                            value: cookie.value,
                            ...cookie.options,
                            sameSite: cookie.options.sameSite as
                                | 'strict'
                                | 'lax'
                                | 'none'
                                | undefined,
                            secure: cookie.options.secure
                        })
                    })
                }
            }
        }
    )

    const {
        data: { session }
    } = await supabase.auth.getSession()
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')

    // Handle authentication routes
    if (!session) {
        // If not authenticated and trying to access protected route
        if (!isAuthPage) {
            const redirectUrl = new URL('/auth/signin', req.url)
            redirectUrl.searchParams.set(
                'redirect',
                req.nextUrl.pathname
            )
            return NextResponse.redirect(redirectUrl)
        }
    } else {
        // If authenticated and trying to access auth page
        if (isAuthPage) {
            return NextResponse.redirect(
                new URL('/dashboard', req.url)
            )
        }
    }

    return res
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
} as const
