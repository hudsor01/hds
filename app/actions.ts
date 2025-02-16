'use server'

import { encodedRedirect } from '@/utils/utils'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { RedirectFunction } from '@/types/auth'

export async function signUpAction(formData: FormData): Promise<ReturnType<RedirectFunction>> {
  const email = formData.get('email')
  const password = formData.get('password')
  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get('origin')

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return encodedRedirect('error', '/sign-up', 'Email and password are required')
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  })

  if (error) {
    console.error(`Authentication error: ${error.code} - ${error.message}`)
    return encodedRedirect('error', '/sign-up', error.message)
  }

  return encodedRedirect(
    'success',
    '/sign-up',
    'Thanks for signing up! Please check your email for a verification link.'
  )
}

export async function signInAction(formData: FormData): Promise<ReturnType<RedirectFunction>> {
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return encodedRedirect('error', '/sign-in', 'Email and password are required')
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message)
  }

  return redirect('/protected')
}

export async function forgotPasswordAction(formData: FormData): Promise<ReturnType<RedirectFunction>> {
  const email = formData.get('email')
  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get('origin')
  const callbackUrl = formData.get('callbackUrl')

  if (!email || typeof email !== 'string') {
    return encodedRedirect('error', '/forgot-password', 'Email is required')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`
  })

  if (error) {
    console.error(`Password reset error: ${error.message}`)
    return encodedRedirect('error', '/forgot-password', 'Could not reset password')
  }

  if (callbackUrl && typeof callbackUrl === 'string') {
    return redirect(callbackUrl)
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.'
  )
}

export async function resetPasswordAction(formData: FormData): Promise<ReturnType<RedirectFunction>> {
  const supabase = await createClient()
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')

  if (!password || !confirmPassword || typeof password !== 'string' || typeof confirmPassword !== 'string') {
    return encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password and confirm password are required'
    )
  }

  if (password !== confirmPassword) {
    return encodedRedirect('error', '/protected/reset-password', 'Passwords do not match')
  }

  const { error } = await supabase.auth.updateUser({
    password
  })

  if (error) {
    return encodedRedirect('error', '/protected/reset-password', 'Password update failed')
  }

  return encodedRedirect('success', '/protected/reset-password', 'Password updated')
}

export async function signOutAction(): Promise<ReturnType<RedirectFunction>> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/sign-in')
}