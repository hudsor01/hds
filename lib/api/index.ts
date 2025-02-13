import { BaseQueryParams, BaseResponse } from '@/types/common'
import { NextApiRequest, NextApiResponse } from 'next'
import { ZodError, ZodSchema } from 'zod'
import { supabase } from '@/utils/supabase/server'
import axios, { AxiosError } from 'axios'

export type ApiError = {
  message: string
  code?: string
  status?: number
  details?: unknown
}

export type ApiResponse<T> = {
  data: T | null
  error: ApiError | null
  metadata?: {
    timestamp: string
    requestId?: string
  }
}

// API client configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''
const DEFAULT_TIMEOUT = 30000 // 30 seconds

// Enhanced fetch wrapper with timeout and detailed error handling
async function fetchWithErrorHandling(input: RequestInfo, init?: RequestInit): Promise<Response> {
  try {
    const supabase = await supabase()
    const {
      data: { session }
    } = await supabase.auth.getSession()

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT)

    const response = await fetch(input, {
      ...init,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        ...init?.headers
      }
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    return response
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw handleError(error)
  }
}

// Generic API functions
export async function fetchData<T>(
  endpoint: string,
  params?: BaseQueryParams
): Promise<BaseResponse<T>> {
  const queryString = params ? `?${new URLSearchParams(params as Record<string, string>)}` : ''
  const response = await fetchWithErrorHandling(`${API_BASE_URL}${endpoint}${queryString}`)
  return response.json()
}

export async function createData<T>(endpoint: string, payload: unknown): Promise<BaseResponse<T>> {
  const response = await fetchWithErrorHandling(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  return response.json()
}

export async function updateData<T>(
  endpoint: string,
  id: string | number,
  payload: unknown
): Promise<BaseResponse<T>> {
  const response = await fetchWithErrorHandling(`${API_BASE_URL}${endpoint}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })
  return response.json()
}

export async function deleteData<T>(
  endpoint: string,
  id: string | number
): Promise<BaseResponse<T>> {
  const response = await fetchWithErrorHandling(`${API_BASE_URL}${endpoint}/${id}`, {
    method: 'DELETE'
  })
  return response.json()
}

// Enhanced API Middleware for Next.js API routes
export const withValidation = <T>(schema: ZodSchema<T>) => {
  return async (req: NextApiRequest, res: NextApiResponse<ApiResponse<T>>) => {
    try {
      const validated = await schema.parseAsync(req.body)
      return validated
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          data: null,
          error: {
            message: 'Validation error',
            code: 'VALIDATION_ERROR',
            details: error.errors
          }
        })
        return
      }
      throw error
    }
  }
}

export const withErrorHandler = <T>(
  handler: (req: NextApiRequest, res: NextApiResponse<ApiResponse<T>>) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse<ApiResponse<T>>) => {
    try {
      await handler(req, res)
    } catch (error) {
      console.error('API Error:', error)

      const apiError = handleError(error)
      const status = apiError.status || 500

      res.status(status).json({
        data: null,
        error: apiError,
        metadata: {
          timestamp: new Date().toISOString(),
          requestId: req.headers['x-request-id'] as string
        }
      })
    }
  }
}

// Enhanced error handling
function handleError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data?.message || error.message,
      code: error.code,
      status: error.response?.status,
      details: error.response?.data
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'ERROR',
      details: error
    }
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR'
  }
}

// API client for use in components
export const api = {
  async get<T>(endpoint: string, params?: BaseQueryParams): Promise<ApiResponse<T>> {
    try {
      const response = await fetchData<T>(endpoint, params)
      return { data: response.data as T, error: null }
    } catch (error) {
      return {
        data: {} as T,
        error: handleError(error)
      }
    }
  },

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await createData<T>(endpoint, data)
      return { data: response.data as T, error: null }
    } catch (error) {
      return {
        data: {} as T,
        error: handleError(error)
      }
    }
  },

  async put<T>(endpoint: string, id: string | number, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await updateData<T>(endpoint, id, data)
      return { data: response.data as T, error: null }
    } catch (error) {
      return {
        data: {} as T,
        error: handleError(error)
      }
    }
  },

  async delete<T>(endpoint: string, id: string | number): Promise<ApiResponse<T>> {
    try {
      const response = await deleteData<T>(endpoint, id)
      return { data: response.data as T, error: null }
    } catch (error) {
      return {
        data: {} as T,
        error: handleError(error)
      }
    }
  }
}

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'An error occurred'
  }
  return 'An unexpected error occurred'
}
