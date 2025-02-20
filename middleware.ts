import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Note: We do not need to check (auth) route group as these are already protected by the layout
const publicPaths = [
    '/',
    '/about',
    '/features',
    '/pricing',
    '/contact',
    '/testimonials'
]

export async function middleware(req: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: req.headers
        }
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return req.cookies.get(name)?.value
                },
                set(
                    name: string,
                    value: string,
                    options: CookieOptions
                ) {
                    req.cookies.set({
                        name,
                        value,
                        ...options
                    })
                    response = NextResponse.next({
                        request: {
                            headers: req.headers
                        }
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options
                    })
                },
                remove(name: string, options: CookieOptions) {
                    req.cookies.set({
                        name,
                        value: '',
                        ...options
                    })
                    response = NextResponse.next({
                        request: {
                            headers: req.headers
                        }
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options
                    })
                }
            }
        }
    )

    const { pathname } = req.nextUrl

    // Handle public routes caching
    if (publicPaths.some(path => pathname === path)) {
        const response = NextResponse.next()
        response.headers.set(
            'Cache-Control',
            'public, s-maxage=3600, stale-while-revalidate=59'
        )
        return response
    }

    // Allow static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/api') ||
        pathname.match(/^\/.*\.(ico|png|jpg|jpeg|svg|css|js)$/)
    ) {
        const response = NextResponse.next()
        response.headers.set(
            'Cache-Control',
            'public, max-age=31536000, immutable'
        )
        return response
    }

    // Get session
    const {
        data: { session }
    } = await supabase.auth.getSession()

    // Protect dashboard routes
    if (!session && pathname.startsWith('/dashboard')) {
        const redirectUrl = new URL('/login', req.url)
        redirectUrl.searchParams.set('redirectTo', pathname)
        return NextResponse.redirect(redirectUrl)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         * - api folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public/|api/).*)'
    ]
}