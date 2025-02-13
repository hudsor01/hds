'use client'

import { ThemeProvider } from 'next-themes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { useState } from 'react'
import { ModalProvider } from './modal-provider'
import { AnimationProvider } from './animation-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
      <AnimationProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position="top-center" richColors expand />
          <ModalProvider />
        </QueryClientProvider>
      </AnimationProvider>
    </ThemeProvider>
  )
}
