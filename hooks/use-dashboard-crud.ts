import {supabase} from '../app/auth/lib/auth/config';
import type {Entity, UseDashboardCrudOptions} from '@/types/crud-types';
import {useCallback, useState} from 'react';
import {toast} from 'sonner';

export function useDashboardCrud<T extends Entity>(options: UseDashboardCrudOptions<T>) {
  const {table, select = '*', onSuccess, onError} = options;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Centralized error handler: ensures we always throw an Error instance,
  // set the local error state, call any onError callback and show a toast.
  const handleError = useCallback(
    (err: unknown): never => {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      onError?.(errorObj);
      toast.error(errorObj.message);
      throw errorObj;
    },
    [onError],
  );

  // Helper to perform a Supabase operation while managing loading and error state.
  const performOperation = useCallback(
    async <R>(operation: Promise<{data: R; error: any}>): Promise<R> => {
      setLoading(true);
      try {
        const {data, error} = await operation;
        if (error) {
          return handleError(error);
        }
        if (data === null || data === undefined) {
          return handleError(new Error('No data returned'));
        }
        return data;
      } catch (err) {
        return handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [handleError],
  );

  const create = useCallback(
    async (data: Omit<T, 'id'>): Promise<T> => {
      const result = await performOperation<T>(
        supabase.from(table).insert([data]).select(select).single() as unknown as Promise<{
          data: T;
          error: any;
        }>,
      );
      onSuccess?.(result);
      toast.success('Item created successfully');
      return result;
    },
    [performOperation, table, select, onSuccess],
  );

  const update = useCallback(
    async (id: string, data: Partial<T>): Promise<T> => {
      const result = await performOperation<T>(
        supabase
          .from(table)
          .update(data)
          .eq('id', id)
          .select(select)
          .single() as unknown as Promise<{data: T; error: any}>,
      );
      onSuccess?.(result);
      toast.success('Item updated successfully');
      return result;
    },
    [performOperation, table, select, onSuccess],
  );

  const remove = useCallback(
    async (id: string): Promise<void> => {
      await performOperation<any>(
        supabase.from(table).delete().eq('id', id) as unknown as Promise<{data: any; error: any}>,
      );
      toast.success('Item deleted successfully');
    },
    [performOperation, table],
  );

  const getOne = useCallback(
    async (id: string): Promise<T> => {
      return await performOperation<T>(
        supabase.from(table).select(select).eq('id', id).single() as unknown as Promise<{
          data: T;
          error: any;
        }>,
      );
    },
    [performOperation, table, select],
  );

  const getAll = useCallback(async (): Promise<T[]> => {
    // Use a type assertion for the order-by column since T may not include a created_at field.
    return await performOperation<T[]>(
      supabase
        .from(table)
        .select(select)
        .order('created_at' as any, {ascending: false}) as unknown as Promise<{
        data: T[];
        error: any;
      }>,
    );
  }, [performOperation, table, select]);

  return {
    create,
    update,
    remove,
    getOne,
    getAll,
    loading,
    error,
  };
}
