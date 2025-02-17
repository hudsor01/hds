'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import { UseMutationResult } from '@tanstack/react-query'
import { api as apiClient } from '@/lib/api' // Assuming you have an apiClient defined

interface BaseResponse<T> {
  data: T
  message?: string
  status?: number
}

interface BaseQueryParams {
  [key: string]: string | number | boolean | undefined
}

interface UseCrudOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  queryOptions?: Omit<UseQueryOptions<BaseResponse<T>>, 'queryKey' | 'queryFn'>
}
export function useApiQuery<T>(endpoint: string, params?: BaseQueryParams, options?: UseCrudOptions<T>) {
  return useQuery({
    queryKey: [endpoint, params],
    queryFn: async () => {
      try {
        const response = await apiClient.get<BaseResponse<T>>(endpoint, {
          params
        })
        return response.data
      } catch (error) {
        throw new Error(handleApiError(error))
      }
    },
    ...options?.queryOptions
  })
}

export function useApiMutation<TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
  endpoint: string,
  options?: UseCrudOptions<TData>
): UseMutationResult<BaseResponse<TData>, TError, TVariables, TContext> {
  const queryClient = useQueryClient()

  return useMutation<BaseResponse<TData>, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      try {
        const response = await apiClient.post<BaseResponse<TData>>(endpoint, variables)
        return response.data
      } catch (error) {
        throw new Error(handleApiError(error))
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: [endpoint] })
      options?.onSuccess?.(data.data)
    },
    onError: (error: TError) => {
      options?.onError?.(error)
    }
  })
}

export function useApiUpdate<TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
  endpoint: string,
  options?: UseCrudOptions<TData>
): UseMutationResult<BaseResponse<TData>, TError, TVariables, TContext> {
  const queryClient = useQueryClient()

  return useMutation<BaseResponse<TData>, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      try {
        const response = await apiClient.put<BaseResponse<TData>>(endpoint, variables)
        return response.data
      } catch (error) {
        throw new Error(handleApiError(error))
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: [endpoint] })
      options?.onSuccess?.(data.data)
    },
    onError: (error: TError) => {
      options?.onError?.(error)
    }
  })
}

export function useApiDelete<TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
  endpoint: string,
  options?: UseCrudOptions<TData>
): UseMutationResult<BaseResponse<TData>, TError, string | number, TContext> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string | number) => {
      try {
        const response = await apiClient.delete<BaseResponse<T>>(`${endpoint}/${id}`)
        return response.data
      } catch (error) {
        throw new Error(handleApiError(error))
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: [endpoint] })
      options?.onSuccess?.(data.data)
    },
    onError: (error: Error) => {
      options?.onError?.(error)
    }
  })
}
function handleApiError(error: any): string | undefined {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred.'
}
