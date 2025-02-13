'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AnimationPreferences {
  reduceMotion: boolean
  duration: number
  setReduceMotion: (value: boolean) => void
  setDuration: (value: number) => void
}

const AnimationContext = createContext<AnimationPreferences | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [duration, setDuration] = useState(0.2)

  // Check user's system preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
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
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider')
  }
  return context
}
