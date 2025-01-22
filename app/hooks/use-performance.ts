'use client'

import { useEffect } from 'react'

export function usePerformance() {
  useEffect(() => {
    // Report initial page load performance
    if (typeof window !== 'undefined') {
      const { performance } = window
      if (performance) {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const paintEntries = performance.getEntriesByType('paint')

        // Log performance metrics
        console.debug('Page Load Time:', navigationEntry.loadEventEnd - navigationEntry.startTime)
        console.debug('First Paint:', paintEntries[0]?.startTime)
        console.debug('First Contentful Paint:', paintEntries[1]?.startTime)
      }
    }
  }, [])
}
