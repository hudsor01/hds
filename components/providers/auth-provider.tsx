'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Skeleton } from '@/components/skeleton'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {}
})

export function AuthProvider({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(initialUser)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user)
      } else {
        setUser(null)
        // Redirect to sign-in page if not authenticated
        router.push('/sign-in')
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const signOut = async () => {
    try {
      setLoading(true)
      await supabase.auth.signOut()
      router.push('/sign-in')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        children
      )}
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
