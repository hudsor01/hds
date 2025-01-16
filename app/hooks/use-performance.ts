'use client'

import { useEffect } from 'react'

export function usePerformance() {
  useEffect(() => {
    // Record initial page load time
    if (typeof window !== 'undefined') {
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      console.log('Page Load Time:', navigationTiming.loadEventEnd - navigationTiming.startTime)
    }
  }, [])
}
