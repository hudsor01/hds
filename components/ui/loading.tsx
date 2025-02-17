'use client'

import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface LoadingProps {
  variant?: 'spinner' | 'skeleton' | 'dots'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  fullScreen?: boolean
}

export function Loading({ variant = 'spinner', size = 'md', className, fullScreen = false }: LoadingProps) {
  const Container = ({ children }: { children: React.ReactNode }) => (
    <div
      className={cn(
        'flex items-center justify-center',
        fullScreen && 'bg-background/80 fixed inset-0 backdrop-blur-sm',
        className
      )}
    >
      {children}
    </div>
  )

  if (variant === 'skeleton') {
    return (
      <Container>
        <div className="w-full space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </Container>
    )
  }

  if (variant === 'dots') {
    return (
      <Container>
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={cn(
                'bg-primary animate-bounce rounded-full',
                size === 'sm' && 'h-1 w-1',
                size === 'md' && 'h-2 w-2',
                size === 'lg' && 'h-3 w-3'
              )}
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.6s'
              }}
            />
          ))}
        </div>
      </Container>
    )
  }

  // Default spinner
  return (
    <Container>
      <div
        className={cn(
          'border-primary animate-spin rounded-full border-2 border-t-transparent',
          size === 'sm' && 'h-4 w-4',
          size === 'md' && 'h-8 w-8',
          size === 'lg' && 'h-12 w-12'
        )}
      />
    </Container>
  )
}

// Benefits skeleton for specific use cases
export function BenefitsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-lg border p-8">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="mt-6 h-4 w-3/4" />
          <Skeleton className="mt-4 h-20 w-full" />
        </div>
      ))}
    </div>
  )
}

// Global loading state
export function GlobalLoading() {
  return <Loading variant="spinner" size="lg" fullScreen />
}

// Loading states for specific components
export function ButtonLoading({ className }: { className?: string }) {
  return <Loading variant="dots" size="sm" className={className} />
}

export function TableLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  )
}

export function CardLoading() {
  return (
    <div className="rounded-lg border p-6">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="mt-4 h-8 w-full" />
      <Skeleton className="mt-4 h-4 w-3/4" />
    </div>
  )
}
