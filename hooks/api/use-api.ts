import { apiClient, handleApiError } from '@/lib/api';
import { BaseQueryParams, BaseResponse } from '@/types/common';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

interface UseCrudOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  queryOptions?: Omit<UseQueryOptions<BaseResponse<T>>, 'queryKey' | 'queryFn'>;
}

export function useApiQuery<T>(
  endpoint: string,
  params?: BaseQueryParams,
  options?: UseCrudOptions<T>,
) {
  return useQuery({
    queryKey: [endpoint, params],
    queryFn: async () => {
      try {
        const response = await apiClient.get<BaseResponse<T>>(endpoint, {
          params,
        });
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    ...options?.queryOptions,
  });
}

export function useApiMutation<T, TVariables = unknown>(
  endpoint: string,
  options?: UseCrudOptions<T>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: TVariables) => {
      try {
        const response = await apiClient.post<BaseResponse<T>>(
          endpoint,
          variables,
        );
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      options?.onSuccess?.(data.data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

export function useApiUpdate<T, TVariables = unknown>(
  endpoint: string,
  options?: UseCrudOptions<T>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: TVariables & { id: string | number }) => {
      try {
        const response = await apiClient.put<BaseResponse<T>>(
          `${endpoint}/${id}`,
          data,
        );
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      options?.onSuccess?.(data.data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}

export function useApiDelete<T>(endpoint: string, options?: UseCrudOptions<T>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      try {
        const response = await apiClient.delete<BaseResponse<T>>(
          `${endpoint}/${id}`,
        );
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
      options?.onSuccess?.(data.data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
}
