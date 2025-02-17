'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Skeleton, Stack, useTheme } from '@mui/material'
import { supabase } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  refreshUser: async () => {}
})

export function AuthProvider({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) {
  const router = useRouter()
  const theme = useTheme()
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

  const refreshUser = async () => {
    try {
      setLoading(true)
      const {
        data: { user: refreshedUser }
      } = await supabase.auth.refreshSession()
      if (refreshedUser) {
        setUser(refreshedUser)
      }
    } catch (error) {
      console.error('Error refreshing user:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut, refreshUser }}>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 3
          }}
        >
          <Stack spacing={2} width="100%" maxWidth={600}>
            <Skeleton
              variant="rectangular"
              height={60}
              sx={{
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)'
              }}
            />
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)'
              }}
            />
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.04)'
              }}
            />
          </Stack>
        </Box>
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

// Export for type inference
export type { AuthContextType }
