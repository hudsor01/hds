'use client'

import { useAnimation } from '@/components/animation-provider'
import { usePropertyAnimationMetrics } from '@/hooks/use-property-animation-metrics'
import { useCallback } from 'react'

export function usePropertyAnimations() {
  const { reduceMotion, duration } = useAnimation()
  const { startMetric, endMetric, getMetrics } = usePropertyAnimationMetrics()

  const animatePropertyUpdate = useCallback(
    (callback: () => void) => {
      startMetric('totalAnimationDuration')
      callback()
      endMetric('totalAnimationDuration')
    },
    [startMetric, endMetric]
  )

  const measureListRender = useCallback(
    (callback: () => void) => {
      if (!reduceMotion) {
        startMetric('listLoadTime')
        callback()
        endMetric('listLoadTime')
      } else {
        callback()
      }
    },
    [reduceMotion, startMetric, endMetric]
  )

  return {
    reduceMotion,
    duration,
    animatePropertyUpdate,
    measureListRender,
    getMetrics
  }
}
