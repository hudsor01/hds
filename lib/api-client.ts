import axios from 'axios';

export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new APIError(response.status, error.message || 'An error occurred');
  }
  return response.json();
}

export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(url);
    return response.data;
  },

  async post<T>(url: string, data: any): Promise<T> {
    const response = await axios.post<T>(url, data);
    return response.data;
  },

  async put<T>(url: string, data: any): Promise<T> {
    const response = await axios.put<T>(url, data);
    return response.data;
  },

  async patch<T>(url: string, data: any): Promise<T> {
    const response = await axios.patch<T>(url, data);
    return response.data;
  },

  async delete<T>(url: string): Promise<T> {
    const response = await axios.delete<T>(url);
    return response.data;
  },
};
