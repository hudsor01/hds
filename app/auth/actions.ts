'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { signInSchema, signUpSchema } from '@/lib/validations/auth'

export async function signIn(formData: FormData) {
  const validationResult = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validationResult.success) {
    return redirect(`/auth/sign-in?error=${encodeURIComponent(validationResult.error.errors[0]?.message)}`)
  }

  const { email, password } = validationResult.data
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/auth/sign-in?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  return redirect('/dashboard')
}

export async function signUp(formData: FormData) {
  const validationResult = signUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!validationResult.success) {
    return redirect(`/auth/sign-up?error=${encodeURIComponent(validationResult.error.errors[0]?.message)}`)
  }

  const { email, password } = validationResult.data
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    return redirect('/auth/sign-up?error=' + encodeURIComponent(error.message))
  }

  return redirect('/auth/verify-email')
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  return redirect('/')
}

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    return redirect('/auth/reset-password?error=Email is required')
  }

  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/auth/update-password`,
  })

  if (error) {
    return redirect('/auth/reset-password?error=' + encodeURIComponent(error.message))
  }

  return redirect('/auth/reset-password?message=Check your email for a password reset link')
}

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return redirect('/auth/update-password?error=Passwords do not match')
  }

  const supabase = createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return redirect('/auth/update-password?error=' + encodeURIComponent(error.message))
  }

  return redirect('/auth/sign-in?message=Password updated successfully')
}