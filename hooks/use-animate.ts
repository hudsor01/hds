import { useTheme } from '@mui/material'
import { useState, useCallback } from 'react'

interface AnimationConfig {
  duration?: number
  delay?: number
  easing?: string
  onComplete?: () => void
}

export function useAnimate() {
  const theme = useTheme()
  const [isAnimating, setIsAnimating] = useState(false)

  const animate = useCallback(
    (element: HTMLElement | null, keyframes: Keyframe[] | PropertyIndexedKeyframes, config: AnimationConfig = {}) => {
      if (!element) return

      const { duration = 300, delay = 0, easing = theme.transitions.easing.easeInOut, onComplete } = config

      setIsAnimating(true)

      const animation = element.animate(keyframes, {
        duration,
        delay,
        easing,
        fill: 'both'
      })

      animation.onfinish = () => {
        setIsAnimating(false)
        onComplete?.()
      }

      return animation
    },
    [theme.transitions.easing.easeInOut]
  )

  const fadeIn = useCallback(
    (element: HTMLElement | null, config?: AnimationConfig) => {
      return animate(element, [{ opacity: 0 }, { opacity: 1 }], config)
    },
    [animate]
  )

  const fadeOut = useCallback(
    (element: HTMLElement | null, config?: AnimationConfig) => {
      return animate(element, [{ opacity: 1 }, { opacity: 0 }], config)
    },
    [animate]
  )

  const slideIn = useCallback(
    (element: HTMLElement | null, direction: 'left' | 'right' | 'up' | 'down' = 'right', config?: AnimationConfig) => {
      const distance = '20px'
      const translations = {
        left: [`translateX(-${distance})`, 'translateX(0)'],
        right: [`translateX(${distance})`, 'translateX(0)'],
        up: [`translateY(-${distance})`, 'translateY(0)'],
        down: [`translateY(${distance})`, 'translateY(0)']
      }

      return animate(
        element,
        [
          { opacity: 0, transform: translations[direction][0] },
          { opacity: 1, transform: translations[direction][1] }
        ],
        {
          easing: theme.transitions.easing.easeOut,
          ...config
        }
      )
    },
    [animate, theme.transitions.easing.easeOut]
  )

  const scale = useCallback(
    (element: HTMLElement | null, { from = 0.95, to = 1 }: { from?: number; to?: number } = {}, config?: AnimationConfig) => {
      return animate(
        element,
        [
          { opacity: 0, transform: `scale(${from})` },
          { opacity: 1, transform: `scale(${to})` }
        ],
        {
          easing: theme.transitions.easing.easeOut,
          ...config
        }
      )
    },
    [animate, theme.transitions.easing.easeOut]
  )

  return {
    isAnimating,
    animate,
    fadeIn,
    fadeOut,
    slideIn,
    scale
  }
}

// Utility for creating spring-like transitions
export function createSpring(stiffness = 100, damping = 10, mass = 1) {
  return `cubic-bezier(${0.5 + stiffness / 1000}, ${damping / 100}, ${mass / 10}, 1)`
}
