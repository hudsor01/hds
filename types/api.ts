import type { UserRole } from './analytics';

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface User {
  id: string;
  role: UserRole;
  email: string;
  permissions: string[];
}
