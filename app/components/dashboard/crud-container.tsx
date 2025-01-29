'use client';

import { useProtectedRoute } from '@/hooks/use-protected-route';
import { Spinner } from '@/components/ui/spinner';
import type { ReactNode } from 'react';

interface BaseCrudItem {
  id: string;
  [key: string]: unknown;
}

interface CrudContainerProps<T extends BaseCrudItem> {
  table: string;
  title: string;
  children: ReactNode;
  onItemCreated?: (item: T) => void;
  loading?: boolean;
  className?: string;
}

export function CrudContainer<T extends BaseCrudItem>({
  table,
  title,
  children,
  onItemCreated,
  loading = false,
  className = '',
}: CrudContainerProps<T>) {
  useProtectedRoute();

  return (
    <div className={`container mx-auto p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
