'use client'

import { useState, useEffect, useCallback } from 'react'

interface DeviceCapabilities {
  supportsReducedMotion: boolean
  browserPerformance: 'high' | 'medium' | 'low'
}

interface PerformanceConfig {
  recommendedDuration: number
}

export function usePerformanceOptimization() {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    supportsReducedMotion: false,
    browserPerformance: 'high'
  })

  const [config, setConfig] = useState<PerformanceConfig>({
    recommendedDuration: 0.2
  })

  const detectCapabilities = useCallback(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Simple browser performance check
    const browserPerformance = (() => {
      if (!window.requestAnimationFrame) return 'low'
      if (navigator.hardwareConcurrency >= 4) return 'high'
      return 'medium'
    })()

    setCapabilities({
      supportsReducedMotion: prefersReducedMotion,
      browserPerformance
    })

    // Update animation duration based on performance
    setConfig({
      recommendedDuration: browserPerformance === 'high' ? 0.2 : 0.3
    })
  }, [])

  useEffect(() => {
    detectCapabilities()

    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => detectCapabilities()
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [detectCapabilities])

  return {
    capabilities,
    config
  }
}
