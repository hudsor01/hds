'use client'

import { Card } from '@/components/card'
import { Skeleton } from '@/components/skeleton'

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Skeleton className="mb-8 h-12 w-[250px]" />
      <div className="grid gap-8 md:grid-cols-3">
        {[1, 2, 3].map(i => (
          <Card key={i} className="p-6">
            <Skeleton className="mb-4 h-8 w-[120px]" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </Card>
        ))}
      </div>
    </div>
  )
}
