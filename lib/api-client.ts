// lib/api-client.ts

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new APIError(
      response.status,
      error.message || 'An error occurred'
    );
  }
  return response.json();
}

export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return handleResponse(response);
  },

  async post<T>(url: string, data: any): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async put<T>(url: string, data: any): Promise<T> {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  async delete(url: string): Promise<void> {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};
