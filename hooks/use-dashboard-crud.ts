import { supabase } from '@/app/auth/lib/supabase'
import { Entity, UseDashboardCrudOptions } from '@/types/crud-types'
import { useState } from 'react'
import { toast } from 'sonner'


export function useDashboardCrud<T extends Entity>(options: UseDashboardCrudOptions<T>) {
  const { table, select = '*', onSuccess, onError } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleError = (error: Error) => {
    setError(error);
    onError?.(error);
    toast(error.message, {
      variant: 'destructive',
    });
  };

  const create = async (data: Omit<T, 'id'>) => {
    setLoading(true);
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert([data])
        .select(select)
        .single();

      if (error) throw error;
      onSuccess?.(result as T);
      toast('Item created successfully', {
        title: 'Success',
      });
      return result as T;
    } catch (error) {
      handleError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: Partial<T>) => {
    setLoading(true);
    try {
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select(select)
        .single();

      if (error) throw error;
      onSuccess?.(result as T);
      toast('Item updated successfully', {
        title: 'Success',
      });
      return result as T;
    } catch (error) {
      handleError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      toast('Item deleted successfully', {
        title: 'Success',
      });
    } catch (error) {
      handleError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getOne = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from(table).select(select).eq('id', id).single();

      if (error) throw error;
      return data as T;
    } catch (error) {
      handleError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAll = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from(table)
        .select(select)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as T[];
    } catch (error) {
      handleError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

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
