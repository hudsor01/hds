import { type User, type Session } from '@supabase/supabase-js'

export interface AuthError {
  message: string
  code?: string
  status?: number
}

export interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  error: AuthError | null
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface SignUpCredentials extends SignInCredentials {
  confirmPassword: string
}

export interface ResetPasswordCredentials {
  email: string
}

export interface UpdatePasswordCredentials {
  password: string
  confirmPassword: string
}

export interface AuthResponse<T = any> {
  data: T | null
  error: AuthError | null
}

export interface Profile {
  role: string
}

export interface AuthUser extends User {
  role: string
}

export interface UseSessionReturn {
  session: Session | null
  loading: boolean
}
