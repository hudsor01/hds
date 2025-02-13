'use client'

import { ThemeProvider } from 'next-themes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useState, useEffect } from 'react'
import { ModalProvider } from './modal-provider'
import { GestureModalProvider } from './gesture-modal-provider'
import { AnimationProvider } from './animation-provider'
import { usePerformanceOptimization } from '@/hooks/use-performance-optimization'

function DynamicModalProvider() {
  const [isTouch, setIsTouch] = useState(false)
  const { capabilities } = usePerformanceOptimization()

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  // Use gesture modals only on touch devices with good performance
  if (isTouch && capabilities.supportsHighPerformanceAnimations) {
    return <GestureModalProvider />
  }
  return <ModalProvider />
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
      <AnimationProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position="top-center" richColors expand />
          <DynamicModalProvider />
        </QueryClientProvider>
      </AnimationProvider>
    </ThemeProvider>
  )
}
