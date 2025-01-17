import { supabase } from '@/lib/supabase'
import { type Session } from '@supabase/supabase-js'

export async function getSession(): Promise<Session | null> {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) {
    console.error('Error getting session:', error.message)
    return null
  }
  return session
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error.message)
    throw error
  }
  window.location.href = '/login'
}

export async function getUserProfile() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting user:', error.message)
    return null
  }
  return user
}

export async function updateUserProfile(updates: { email?: string; password?: string; data?: Record<string, any> }) {
  const { data: { user }, error } = await supabase.auth.updateUser(updates)
  if (error) {
    console.error('Error updating user:', error.message)
    throw error
  }
  return user
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  })
  if (error) {
    console.error('Error resetting password:', error.message)
    throw error
  }
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })
  if (error) {
    console.error('Error updating password:', error.message)
    throw error
  }
}

// Helper to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return !!session
}
