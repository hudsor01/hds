'use client';

import type {BaseCrudItem, CrudContainerProps} from '../../types/crud-types';
import {useProtectedRoute} from '@/hooks/use-protected-route';
import Spinner from 'components/ui/spinner';

export function CrudContainer<T extends BaseCrudItem>({
  title,
  children,
  loading = false,
  className = '',
}: CrudContainerProps<T>) {
  useProtectedRoute();

  return (
    <div className={`container mx-auto p-6 ${className}`}>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>{title}</h1>
      </div>
      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <Spinner className='h-8 w-8' />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
