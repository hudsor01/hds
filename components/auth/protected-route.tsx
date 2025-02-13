'use client'

import { useRouter, redirect } from 'next/navigation'
import { supabase } from '@/utils/supabase/server'
import type { UserRole } from '@prisma/client'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export async function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const supabase = supabase()
  const router = useRouter()

  try {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    if (error || !user) {
      redirect('/sign-in')
    }

    // If roles are specified, check user's role
    if (allowedRoles?.length) {
      const { data: dbUser } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!dbUser || !allowedRoles.includes(dbUser.role as UserRole)) {
        redirect('/unauthorized')
      }
    }

    return <>{children}</>
  } catch (error) {
    console.error('Protected route error:', error)
    redirect('/sign-in')
  }
}
