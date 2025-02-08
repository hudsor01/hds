'use client';

import type { BaseCrudItem, CrudContainerProps } from '../../types/crud-types';
import { useProtectedRoute } from '@/hooks/use-protected-route';
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
