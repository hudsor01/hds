'use server'

import { redirect } from 'next/navigation'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env['NEXT_PUBLIC_SUPABASE_URL'], process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'], {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set({ name: name, value: value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.delete({ name, ...options })
      }
    }
  })
}

export async function login(formData: FormData) {
  try {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    return redirect('/dashboard')
  } catch (error) {
    console.error('Login error:', error)
    return redirect('/sign-in?error=Invalid+credentials')
  }
}

export async function signup(formData: FormData) {
  try {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    const captchaToken = formData.get('captchaToken') as string

    if (!captchaToken) {
      throw new Error('reCAPTCHA token is required')
    }

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${process.env['NEXT_PUBLIC_APP_URL']}/auth/callback`,
        captchaToken
      }
    })

    if (error) {
      console.error('Supabase auth error:', error)
      throw error
    }

    if (data.user) {
      return redirect('/verify')
    }

    return redirect('/sign-in?error=Something+went+wrong')
  } catch (error) {
    console.error('Signup error:', error)
    return redirect('/sign-in?error=Registration+failed')
  }
}
