'use client'

import { createClient } from '@/utils/supabase/client'
import { AuthError, User, Session } from '@supabase/supabase-js'

export class AuthenticationError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export interface AuthResponse<T = any> {
  data: T | null
  error: AuthError | null
}

export class AuthService {
  private static instance: AuthService
  private supabase = createClient()

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async signIn(email: string, password: string): Promise<AuthResponse<User>> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { data: data.user, error: null }
    } catch (error) {
      return { 
        data: null, 
        error: this.handleAuthError(error as AuthError)
      }
    }
  }

  async signUp(email: string, password: string): Promise<AuthResponse<User>> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      return { data: data.user, error: null }
    } catch (error) {
      return { 
        data: null, 
        error: this.handleAuthError(error as AuthError)
      }
    }
  }

  async signOut(): Promise<AuthResponse<void>> {
    try {
      const { error } = await this.supabase.auth.signOut()
      if (error) throw error

      return { data: null, error: null }
    } catch (error) {
      return { 
        data: null, 
        error: this.handleAuthError(error as AuthError)
      }
    }
  }

  async getSession(): Promise<AuthResponse<Session>> {
    try {
      const { data: { session }, error } = await this.supabase.auth.getSession()
      if (error) throw error

      return { data: session, error: null }
    } catch (error) {
      return { 
        data: null, 
        error: this.handleAuthError(error as AuthError)
      }
    }
  }

  private handleAuthError(error: AuthError): AuthError {
    console.error('Authentication error:', error)

    const errorMessages: Record<string, string> = {
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/wrong-password': 'Invalid login credentials.',
      'auth/user-not-found': 'Invalid login credentials.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/too-many-requests': 'Too many attempts. Please try again later.',
    }

    return {
      ...error,
      message: errorMessages[error.message] || error.message
    }
  }

  subscribeToAuthChanges(callback: (session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session)
    })
  }
}