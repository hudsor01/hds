'use client';

import { Card } from 'components/ui/card';
import { Skeleton } from 'components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Stats Grid Skeleton */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className='p-6'>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5 rounded' />
                <Skeleton className='h-4 w-24' />
              </div>
              <div className='mt-2 flex items-baseline gap-2'>
                <Skeleton className='h-8 w-20' />
                <Skeleton className='h-4 w-12' />
              </div>
            </Card>
          ))}
      </div>

      {/* Activity and Quick Actions Skeleton */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <Card className='p-6'>
            <Skeleton className='h-6 w-32' />
            <div className='mt-6 space-y-6'>
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className='flex items-start gap-4'>
                    <Skeleton className='h-5 w-5 rounded' />
                    <div className='flex-1 space-y-2'>
                      <div className='flex items-center justify-between'>
                        <Skeleton className='h-4 w-32' />
                        <Skeleton className='h-3 w-16' />
                      </div>
                      <Skeleton className='h-4 w-full' />
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
        <div>
          <Card className='p-6'>
            <Skeleton className='h-6 w-28' />
            <div className='mt-6 space-y-4'>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className='h-12 w-full' />
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
