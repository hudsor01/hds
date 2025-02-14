'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import type { AnimationPreferences } from '@/types/animation'

const AnimationContext = createContext<AnimationPreferences | undefined>(undefined)

const DEFAULT_DURATION = 0.2

interface AnimationProviderProps {
  children: ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [duration, setDuration] = useState(DEFAULT_DURATION)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimationContext.Provider
        value={{
          reduceMotion,
          duration,
          setReduceMotion,
          setDuration
        }}
      >
        {children}
      </AnimationContext.Provider>
    </LazyMotion>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider')
  }
  return context
}
