import { useCallback, useEffect, useState } from 'react'
import { DatabaseError } from '@/lib/supabase'
import { useToast } from './use-toast'

interface UseDataFetchingOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  retries?: number
  retryDelay?: number
}

interface UseDataFetchingResult<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  isError: boolean
  refetch: () => Promise<void>
}

export function useDataFetching<T>(
  fetchFn: () => Promise<T>,
  options: UseDataFetchingOptions<T> = {}
): UseDataFetchingResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showToast } = useToast()

  const { onSuccess, onError, retries = 3, retryDelay = 1000 } = options

  const fetchWithRetry = useCallback(
    async (attempt = 0): Promise<void> => {
      try {
        setIsLoading(true)
        setError(null)
        const result = await fetchFn()
        setData(result)
        onSuccess?.(result)
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred')

        if (
          attempt < retries &&
          !(error instanceof DatabaseError && error.code === 'AUTHORIZATION_ERROR')
        ) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)))
          return fetchWithRetry(attempt + 1)
        }

        setError(error)
        onError?.(error)

        if (error instanceof DatabaseError) {
          showToast({
            title: 'Error',
            description: error.message,
            variant: 'destructive'
          })
        }
      } finally {
        setIsLoading(false)
      }
    },
    [fetchFn, onSuccess, onError, retries, retryDelay, showToast]
  )

  useEffect(() => {
    fetchWithRetry()
  }, [fetchWithRetry])

  return {
    data,
    error,
    isLoading,
    isError: error !== null,
    refetch: () => fetchWithRetry()
  }
}

export function useMutation<TVariables, TData>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>
    onError?: (error: Error, variables: TVariables) => void
    onSettled?: (data: TData | undefined, error: Error | null, variables: TVariables) => void
  } = {}
) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { showToast } = useToast()

  const mutate = async (variables: TVariables): Promise<TData | undefined> => {
    setIsLoading(true)
    setError(null)
    let data: TData | undefined

    try {
      data = await mutationFn(variables)
      await options.onSuccess?.(data, variables)
      return data
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred')
      setError(error)
      options.onError?.(error, variables)

      if (error instanceof DatabaseError) {
        showToast({
          title: 'Error',
          description: error.message,
          variant: 'destructive'
        })
      }
      throw error
    } finally {
      setIsLoading(false)
      options.onSettled?.(data, error, variables)
    }
  }

  return {
    mutate,
    isLoading,
    error,
    isError: error !== null
  }
}
