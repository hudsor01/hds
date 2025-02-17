'use client'

import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { useTheme } from '@mui/material'

// Common animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

export const slideDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const scale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
}

// Animation configuration based on theme transitions
export function useAnimationConfig() {
  const theme = useTheme()

  return {
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    },
    // Match Material UI's transition timing
    fast: {
      duration: theme.transitions.duration.shortest / 1000,
      ease: 'easeInOut'
    },
    medium: {
      duration: theme.transitions.duration.standard / 1000,
      ease: 'easeInOut'
    },
    slow: {
      duration: theme.transitions.duration.complex / 1000,
      ease: 'easeInOut'
    }
  }
}

interface AnimationProviderProps {
  children: React.ReactNode
  type?: 'sync' | 'async'
}

export function AnimationProvider({ children, type = 'async' }: AnimationProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict={true}>
      <AnimatePresence mode={type === 'sync' ? 'sync' : 'popLayout'}>{children}</AnimatePresence>
    </LazyMotion>
  )
}

// Export motion components and types
export { m }
export type { AnimationProviderProps }

// Export common animation presets
export const animations = {
  fadeIn,
  slideUp,
  slideDown,
  scale
}
