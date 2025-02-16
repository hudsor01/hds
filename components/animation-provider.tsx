'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}

export { m }
