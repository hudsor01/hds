'use client'

import va from '@vercel/analytics'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    va.track('pageview', {
      pathname,
      search: searchParams.toString(),
      url,
    })
  }, [pathname, searchParams])

  return children
}
