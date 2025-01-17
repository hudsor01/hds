'use client'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function GoogleSignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
          Connecting...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <FcGoogle className="h-5 w-5" />
          Sign in with Google
        </div>
      )}
    </Button>
  )
}
