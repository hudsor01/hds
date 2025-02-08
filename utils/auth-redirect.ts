import { type ReadonlyURLSearchParams } from 'next/navigation'

export const DEFAULT_LOGIN_REDIRECT = '/dashboard'

export function getRedirectUrl(searchParams?: ReadonlyURLSearchParams): string {
  const redirect = searchParams?.get('redirect')

  // Check if the redirect URL is safe (only internal redirects allowed)
  if (redirect) {
    // Ensure the URL is relative and doesn't contain protocol/domain
    const isRelativeUrl = redirect.startsWith('/') && !redirect.startsWith('//')
    if (isRelativeUrl) {
      return redirect
    }
  }

  return DEFAULT_LOGIN_REDIRECT
}

export function createRedirectUrl(currentPath: string): string {
  return `/sign-in?redirect=${encodeURIComponent(currentPath)}`
}

// Get URL without search params
export function getBaseUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.pathname
  } catch {
    // If URL parsing fails, assume it's already a pathname
    return url
  }
}

// Safe redirect paths that don't require auth
export const publicPaths = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
  '/auth/callback',
  '/',
  '/about',
  '/contact',
  '/pricing',
]

export function isPublicPath(path: string): boolean {
  return publicPaths.includes(getBaseUrl(path)) ||
    path.startsWith('/_next') ||
    path.startsWith('/api/public') ||
    path.includes('.')
}
