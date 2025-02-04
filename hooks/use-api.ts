import {BaseQueryParams, BaseResponse} from '@/types/common';
import {useMutation, useQuery, UseQueryOptions} from '@tanstack/react-query';
import axios from 'axios';

export function useApiQuery<T>(
  endpoint: string,
  params?: BaseQueryParams,
  options?: Omit<UseQueryOptions<BaseResponse<T>>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    queryKey: [endpoint, params],
    queryFn: async () => {
      const {data} = await axios.get<BaseResponse<T>>(endpoint, {params});
      return data;
    },
    ...options,
  });
}

export function useApiMutation<T, TVariables>(
  endpoint: string,
  options?: {
    onSuccess?: (data: BaseResponse<T>) => void;
    onError?: (error: Error) => void;
  },
) {
  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const {data} = await axios.post<BaseResponse<T>>(endpoint, variables);
      return data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useApiDelete<T>(
  endpoint: string,
  options?: {
    onSuccess?: (data: BaseResponse<T>) => void;
    onError?: (error: Error) => void;
  },
) {
  return useMutation({
    mutationFn: async (id: string | number) => {
      const {data} = await axios.delete<BaseResponse<T>>(`${endpoint}/${id}`);
      return data;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
