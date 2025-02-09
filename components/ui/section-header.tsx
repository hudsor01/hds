'use client'

import { cn } from '@/lib/utils'

export function SectionHeader({
  title,
  subtitle,
  gradient = true,
  className,
}: {
  title: string
  subtitle?: string
  gradient?: boolean
  className?: string
}) {
  return (
    <div className={cn('mb-16 text-center', className)}>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        {gradient ? (
          <>
            {title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              {title.split(' ').slice(-1)}
            </span>
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  )
}
