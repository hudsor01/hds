import { createClient } from '@/app/utils/supabase/client';
import { toast } from 'sonner';

import { useState } from 'react';

const supabase = createClient();

interface Entity {
  id: string;
  [key: string]: any;
}

interface UseDashboardCrudOptions<T extends Entity> {
  table: string;
  select?: string;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useDashboardCrud<T extends Entity>(options: UseDashboardCrudOptions<T>) {
  const { table, select = '*', onSuccess, onError } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleError = (error: Error) => {
    setError(error);
    onError?.(error);
    toast({
      description: error.message,
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
      toast({
        title: 'Success',
        description: 'Item created successfully',
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
      toast({
        title: 'Success',
        description: 'Item updated successfully',
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
      toast({
        title: 'Success',
        description: 'Item deleted successfully',
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
