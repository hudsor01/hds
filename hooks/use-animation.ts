'use client'

import { useAnimation as useFramerAnimation, AnimationControls } from 'framer-motion'
import { useCallback } from 'react'
import { useAnimation } from '@/components/animation-provider'
import type { AnimationVariant } from '@/types/animation'
import type { ComponentType } from 'react'
import { type Animations } from '@/types'

interface AnimationOptions {
  duration?: number
  delay?: number
  type?: 'spring' | 'tween'
  stiffness?: number
  damping?: number
}

export type ModalConfig = {
  id: string
  component: ComponentType<{ onClose: () => void } & Record<string, any>>
  props?: Record<string, any>
}

interface AnimationStep {
  target: string
  variant: AnimationVariant
  options?: AnimationOptions
}

type UseAnimationReturn = {
  animate: (config: Animations.AnimationConfig) => void
  isAnimating: boolean
  stop: () => void
}

export function useAnimationControl(): UseAnimationReturn {
  const controls = useFramerAnimation()
  const { reduceMotion, duration: defaultDuration } = useAnimation()

  const animate = useCallback(
    async (steps: AnimationStep | AnimationStep[]) => {
      if (reduceMotion) return

      const stepsArray = Array.isArray(steps) ? steps : [steps]

      for (const step of stepsArray) {
        await controls.start(target => {
          if (target === step.target) {
            return {
              ...step.variant.visible,
              transition: {
                duration: step.options?.duration || defaultDuration,
                delay: step.options?.delay || 0,
                type: step.options?.type || 'tween',
                ...(step.options?.type === 'spring' && {
                  stiffness: step.options?.stiffness || 300,
                  damping: step.options?.damping || 25
                })
              }
            }
          }
          return {}
        })
      }
    },
    [controls, reduceMotion, defaultDuration]
  )

  const reset = useCallback(() => {
    controls.stop()
    controls.set('hidden')
  }, [controls])

  return {
    controls,
    animate,
    reset,
    isReducedMotion: reduceMotion
  }
}
