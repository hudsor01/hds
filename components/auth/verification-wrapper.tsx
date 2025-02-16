'use client'

import { Box, CircularProgress, Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

interface VerificationWrapperProps {
  children: React.ReactNode
}

export function VerificationWrapper({ children }: VerificationWrapperProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) {
    return (
      <Box className="flex-center h-screen">
        <CircularProgress />
      </Box>
    )
  }

  if (!user?.id) {
    return (
      <Box className="p-4">
        <Alert severity="error">You must be logged in to access this page</Alert>
      </Box>
    )
  }

  return children
}
