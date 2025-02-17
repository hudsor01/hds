import axios from 'axios'

export class APIError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
  }
}

// Define a base type for API requests
interface APIRequest {
  [key: string]: string | number | boolean | null | undefined | APIRequest | APIRequest[]
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }))
    throw new APIError(response.status, error.message)
  }
  return response.json()
}

export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(url)
    return response.data
  },

  async post<T, D extends APIRequest = APIRequest>(url: string, data: D): Promise<T> {
    const response = await axios.post<T>(url, data)
    return response.data
  },

  async put<T, D extends APIRequest = APIRequest>(url: string, data: D): Promise<T> {
    const response = await axios.put<T>(url, data)
    return response.data
  },

  async patch<T, D extends APIRequest = APIRequest>(url: string, data: D): Promise<T> {
    const response = await axios.patch<T>(url, data)
    return response.data
  },

  async delete<T>(url: string): Promise<T> {
    const response = await axios.delete<T>(url)
    return response.data
  }
}

// Type guard for checking request data
export function isValidRequest(data: unknown): data is APIRequest {
  return (
    data !== null &&
    typeof data === 'object' &&
    !Array.isArray(data) &&
    Object.entries(data).every(([key, value]) => {
      if (value === null || value === undefined) return true
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return true
      if (Array.isArray(value)) return value.every(item => isValidRequest(item))
      return isValidRequest(value)
    })
  )
}
