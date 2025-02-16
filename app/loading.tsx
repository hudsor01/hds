'use client'

import { Card } from '@/components/card'
import { Skeleton } from '@/components/skeleton'
import { Container } from '@/components/container'

export default function Loading() {
  return (
    <Container className="py-8">
      <Skeleton className="mb-8 h-10 w-[200px]" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="space-y-4 p-6">
            <Skeleton className="h-4 w-24" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
            <Skeleton className="h-8 w-full" />
          </Card>
        ))}
      </div>
    </Container>
  )
}
