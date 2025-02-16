'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import type { User, AuthError, Session } from '@supabase/supabase-js'

// Define context types
interface AuthState {
  user: User | null
  loading: boolean
  error: AuthError | null
  session: Session | null
}

interface AuthContextType extends AuthState {
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

// Define provider props
interface AuthProviderProps {
  children: ReactNode
  initialSession?: Session | null
  redirectTo?: string
  onAuthStateChange?: (session: Session | null) => void | Promise<void>
}

// Create context with undefined check
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom error for auth context
class AuthContextError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthContextError'
  }
}

export function AuthProvider({
  children,
  initialSession = null,
  redirectTo = '/sign-in',
  onAuthStateChange
}: AuthProviderProps): JSX.Element {
  // State management
  const [state, setState] = useState<AuthState>({
    user: initialSession?.user ?? null,
    session: initialSession,
    loading: true,
    error: null
  })
  
  const router = useRouter()

  // Initialize Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        name: 'session',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      }
    }
  )

  // Sign out function
  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut()
      setState(prev => ({ ...prev, user: null, session: null }))
      router.push(redirectTo)
    } catch (error) {
      console.error('Error signing out:', error)
      setState(prev => ({ 
        ...prev, 
        error: error as AuthError 
      }))
    }
  }

  // Refresh session function
  const refreshSession = async (): Promise<void> => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setState(prev => ({ 
        ...prev, 
        user: session?.user ?? null,
        session,
        error: null
      }))
    } catch (error) {
      console.error('Error refreshing session:', error)
      setState(prev => ({ 
        ...prev, 
        error: error as AuthError 
      }))
    }
  }

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setState(prev => ({
          ...prev,
          user: session?.user ?? null,
          session,
          loading: false,
          error: null
        }))
      } catch (error) {
        console.error('Error initializing auth:', error)
        setState(prev => ({
          ...prev,
          loading: false,
          error: error as AuthError
        }))
      }
    }

    void initializeAuth()
  }, [])

  // Listen for auth changes
  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setState(prev => ({
        ...prev,
        user: session?.user ?? null,
        session,
        loading: false,
        error: null
      }))

      // Handle auth state change
      if (session?.user) {
        await onAuthStateChange?.(session)
      } else {
        router.push(redirectTo)
        await onAuthStateChange?.(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [onAuthStateChange, redirectTo, router])

  // Provide auth context
  const value: AuthContextType = {
    ...state,
    signOut,
    refreshSession
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for using auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new AuthContextError(
      'useAuth must be used within an AuthProvider'
    )
  }
  
  return context
}

// Export types
export type { AuthContextType, AuthState, AuthProviderProps }
