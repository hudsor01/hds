'use client';

import {Card} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='max-w-7xl mx-auto px-4 py-12'>
      <Skeleton className='h-12 w-[250px] mb-8' />
      <div className='grid md:grid-cols-3 gap-8'>
        {[1, 2, 3].map(i => (
          <Card key={i} className='p-6'>
            <Skeleton className='h-8 w-[120px] mb-4' />
            <Skeleton className='h-4 w-full mb-2' />
            <Skeleton className='h-4 w-2/3' />
          </Card>
        ))}
      </div>
    </div>
  );
}
