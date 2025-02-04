import {apiClient} from '@/lib/api-client';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';

interface CrudHooksOptions<T> {
  resourceName: string;
  endpoint: string;
  onCreateSuccess?: () => void;
  onUpdateSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

interface ApiResponse<T> {
  data: T;
}

export function createCrudHooks<T extends {id: string}>({
  resourceName,
  endpoint,
  onCreateSuccess,
  onUpdateSuccess,
  onDeleteSuccess,
}: CrudHooksOptions<T>) {
  const useList = () => {
    return useQuery<T[]>({
      queryKey: [endpoint],
      queryFn: () => apiClient.get<ApiResponse<T[]>>(`/api/${endpoint}`).then(res => res.data),
    });
  };

  const useItem = (id: string) => {
    return useQuery<T>({
      queryKey: [endpoint, id],
      queryFn: () => apiClient.get<ApiResponse<T>>(`/api/${endpoint}/${id}`).then(res => res.data),
    });
  };

  const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: Omit<T, 'id'>) =>
        apiClient.post<ApiResponse<T>>(`/api/${endpoint}`, data).then(res => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [endpoint]});
        onCreateSuccess?.();
      },
    });
  };

  const useUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({id, ...data}: Partial<T> & {id: string}) =>
        apiClient.patch<ApiResponse<T>>(`/api/${endpoint}/${id}`, data).then(res => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [endpoint]});
        onUpdateSuccess?.();
      },
    });
  };

  const useDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) =>
        apiClient.delete<ApiResponse<T>>(`/api/${endpoint}/${id}`).then(res => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [endpoint]});
        toast.success(`${resourceName} deleted successfully`);
        onDeleteSuccess?.();
      },
      onError: (error: Error) => {
        toast.error(`Failed to delete ${resourceName.toLowerCase()}: ${error.message}`);
      },
    });
  };

  return {
    useList,
    useItem,
    useCreate,
    useUpdate,
    useDelete,
  };
}
