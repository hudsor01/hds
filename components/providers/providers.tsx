'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { useState } from 'react'
import { AnimationProvider } from './animation-provider'
import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AnimationProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-center" expand richColors />
      </AnimationProvider>
    </QueryClientProvider>
  )
}
