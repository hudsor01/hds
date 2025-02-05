import {BaseQueryParams, BaseResponse} from '@/types/common';
import axios, {AxiosError} from 'axios';
import {NextApiRequest, NextApiResponse} from 'next';
import {ZodError, ZodSchema} from 'zod';

// API client configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// Generic API functions
export async function fetchData<T>(
  endpoint: string,
  params?: BaseQueryParams,
  config?: AxiosRequestConfig,
): Promise<BaseResponse<T>> {
  const {data} = await apiClient.get<BaseResponse<T>>(endpoint, {
    params,
    ...config,
  });
  return data;
}

export async function createData<T>(
  endpoint: string,
  payload: unknown,
  config?: AxiosRequestConfig,
): Promise<BaseResponse<T>> {
  const {data} = await apiClient.post<BaseResponse<T>>(endpoint, payload, config);
  return data;
}

export async function updateData<T>(
  endpoint: string,
  id: string | number,
  payload: unknown,
  config?: AxiosRequestConfig,
): Promise<BaseResponse<T>> {
  const {data} = await apiClient.put<BaseResponse<T>>(`${endpoint}/${id}`, payload, config);
  return data;
}

export async function deleteData<T>(
  endpoint: string,
  id: string | number,
  config?: AxiosRequestConfig,
): Promise<BaseResponse<T>> {
  const {data} = await apiClient.delete<BaseResponse<T>>(`${endpoint}/${id}`, config);
  return data;
}

// API Middleware
export const withValidation = <T>(schema: ZodSchema<T>) => {
  return async (req: NextApiRequest) => {
    try {
      return await schema.parseAsync(req.body);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(error.errors.map(e => e.message).join(', '));
      }
      throw error;
    }
  };
};

export const withErrorHandler = <T>(
  handler: (req: NextApiRequest, res: NextApiResponse<BaseResponse<T>>) => Promise<void>,
) => {
  return async (req: NextApiRequest, res: NextApiResponse<BaseResponse<T>>) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Internal Server Error';
      res.status(500).json({data: null as T, error: message});
    }
  };
};

// Error handling
export function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

// Export configured client
export {apiClient};
