import {apiClient} from '@/lib/api-client';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

interface CrudHooksOptions<T> {
  resourceName: string;
  endpoint: string;
  onCreateSuccess?: () => void;
  onUpdateSuccess?: () => void;
  onDeleteSuccess?: () => void;
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
      queryFn: () => apiClient.get(`/api/${endpoint}`).then(res => res.data),
    });
  };

  const useItem = (id: string) => {
    return useQuery<T>({
      queryKey: [endpoint, id],
      queryFn: () => apiClient.get(`/api/${endpoint}/${id}`).then(res => res.data),
    });
  };

  const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: Omit<T, 'id'>) =>
        apiClient.post(`/api/${endpoint}`, data).then(res => res.data),
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
        apiClient.patch(`/api/${endpoint}/${id}`, data).then(res => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [endpoint]});
        onUpdateSuccess?.();
      },
    });
  };

  const useDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => apiClient.delete(`/api/${endpoint}/${id}`).then(res => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [endpoint]});
        onDeleteSuccess?.();
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
