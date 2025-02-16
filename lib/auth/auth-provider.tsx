'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { AuthService } from './auth-service'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
  error: Error | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  updatePassword: async () => {},
  error: null
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()
  const authService = AuthService.getInstance()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: sessionData } = await authService.getSession()
        setSession(sessionData)
        setUser(sessionData?.user ?? null)
      } catch (error) {
        console.error('Error initializing auth:', error)
        setError(error as Error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    const { data: subscription } = authService.subscribeToAuthChanges(session => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      setIsLoading(true)
      const { data, error } = await authService.signIn(email, password)

      if (error) throw error
      if (data) {
        router.push('/dashboard')
      }
    } catch (error) {
      setError(error as Error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setError(null)
      setIsLoading(true)
      const { data, error } = await authService.signUp(email, password)

      if (error) throw error
      if (data) {
        router.push('/auth/verify-email')
      }
    } catch (error) {
      setError(error as Error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      setIsLoading(true)
      const { error } = await authService.signOut()

      if (error) throw error
      router.push('/auth/signin')
    } catch (error) {
      setError(error as Error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setError(null)
      setIsLoading(true)
      const { error } = await authService.resetPassword(email)

      if (error) throw error
    } catch (error) {
      setError(error as Error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updatePassword = async (password: string) => {
    try {
      setError(null)
      setIsLoading(true)
      const { error } = await authService.updatePassword(password)

      if (error) throw error
      router.push('/dashboard')
    } catch (error) {
      setError(error as Error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
