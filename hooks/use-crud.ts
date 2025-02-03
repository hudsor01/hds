// lib/hooks/use-crud.ts
import { apiClient } from '@/lib/api-client'
import { CrudOptions } from '@/types/crud-types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function createCrudHooks<T extends { id: string | number }>({
  resourceName,
  endpoint,
  onCreateSuccess,
  onUpdateSuccess,
  onDeleteSuccess,
}: CrudOptions<T>) {
  // List hook
  function useList(filters?: Record<string, any>) {
    return useQuery({
      queryKey: [endpoint, filters],
      queryFn: () => {
        const queryString = filters
          ? `?${new URLSearchParams(filters).toString()}`
          : '';
        return apiClient.get<T[]>(`/api/${endpoint}${queryString}`);
      },
    });
  }

  // Get single item hook
  function useItem(id: string | number) {
    return useQuery({
      queryKey: [endpoint, id],
      queryFn: () => apiClient.get<T>(`/api/${endpoint}/${id}`),
      enabled: !!id,
    });
  }

  // Create hook
  function useCreate() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: Omit<T, 'id'>) =>
        apiClient.post<T>(`/api/${endpoint}`, data),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [endpoint] });
        toast.success(`${resourceName} created successfully`);
        onCreateSuccess?.(data);
      },
      onError: (error: Error) => {
        toast.error(`Failed to create ${resourceName.toLowerCase()}: ${error.message}`);
      },
    });
  }

  // Update hook
  function useUpdate() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, ...data }: Partial<T> & { id: string | number }) =>
        apiClient.put<T>(`/api/${endpoint}/${id}`, data),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [endpoint] });
        toast.success(`${resourceName} updated successfully`);
        onUpdateSuccess?.(data);
      },
      onError: (error: Error) => {
        toast.error(`Failed to update ${resourceName.toLowerCase()}: ${error.message}`);
      },
    });
  }

  // Delete hook
  function useDelete() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: string | number) =>
        apiClient.delete(`/api/${endpoint}/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [endpoint] });
        toast.success(`${resourceName} deleted successfully`);
        onDeleteSuccess?.();
      },
      onError: (error: Error) => {
        toast.error(`Failed to delete ${resourceName.toLowerCase()}: ${error.message}`);
      },
    });
  }

  return {
    useList,
    useItem,
    useCreate,
    useUpdate,
    useDelete,
  };
}
