'use client'

import va from '@vercel/analytics'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface PageViewEvent {
  pathname: string
  search: string
  url: string
  timestamp: number
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    try {
      // Construct the complete URL from pathname and search params
      const url = pathname + searchParams.toString()

      // Track the pageview with additional metadata
      const event: PageViewEvent = {
        pathname,
        search: searchParams.toString(),
        url,
        timestamp: Date.now()
      }

      va.track('pageview', event)
    } catch (error) {
      // Log analytics errors but don't break the app
      console.error('Analytics tracking error:', error)
    }
  }, [pathname, searchParams])

  return children
}

// Export for type inference
export type { PageViewEvent }
