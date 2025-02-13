'use client'

import { useEffect, useRef } from 'react'

interface PerformanceMetrics {
  duration: number
  frameRate: number
  droppedFrames: number
}

export function useAnimationPerformance() {
  const metricsRef = useRef<PerformanceMetrics>({
    duration: 0,
    frameRate: 0,
    droppedFrames: 0
  })

  const frameCountRef = useRef(0)
  const startTimeRef = useRef(0)
  const rafIdRef = useRef<number | undefined>(undefined)

  const startTracking = () => {
    frameCountRef.current = 0
    startTimeRef.current = performance.now()

    const trackFrame = () => {
      frameCountRef.current++
      rafIdRef.current = requestAnimationFrame(trackFrame)
    }

    rafIdRef.current = requestAnimationFrame(trackFrame)
  }

  const stopTracking = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
    }

    const endTime = performance.now()
    const duration = endTime - startTimeRef.current
    const expectedFrames = (duration / 1000) * 60
    const frameRate = (frameCountRef.current / duration) * 1000
    const droppedFrames = Math.max(0, expectedFrames - frameCountRef.current)

    metricsRef.current = {
      duration,
      frameRate,
      droppedFrames
    }

    // Log performance issues if detected
    if (droppedFrames > 5 || frameRate < 30) {
      console.warn('Animation performance issues detected:', metricsRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  return {
    startTracking,
    stopTracking,
    getMetrics: () => metricsRef.current
  }
}
