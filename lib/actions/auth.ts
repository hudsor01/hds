'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DEFAULT_LOGIN_REDIRECT } from '@/app/routes'
import process from 'process'

export async function signIn(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        return { error: error.message }
    }

    // Get the return URL or use default
    const returnTo =
        cookieStore.get('returnTo')?.value || DEFAULT_LOGIN_REDIRECT
    cookieStore.delete('returnTo')

    redirect(returnTo)
}

export async function signUp(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName
            },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
        }
    })

    if (error) {
        return { error: error.message }
    }

    return { success: 'Check your email to confirm your account' }
}

export async function signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
        return { error: error.message }
    }

    redirect('/sign-in')
}

export async function resetPassword(formData: FormData) {
    const email = formData.get('email') as string
    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(
        email,
        {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
        }
    )

    if (error) {
        return { error: error.message }
    }

    return { success: 'Check your email for the password reset link' }
}

export async function updatePassword(formData: FormData) {
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.updateUser({
        password
    })

    if (error) {
        return { error: error.message }
    }

    return { success: 'Password updated successfully' }
}

// Session utility
export async function getSession() {
    const supabase = createClient()
    const {
        data: { session }
    } = await supabase.auth.getSession()
    return session
}

// Initial profile setup
export async function setupProfile(formData: FormData) {
    const supabase = createClient()
    const session = await getSession()

    if (!session?.user) {
        return { error: 'Not authenticated' }
    }

    const companyName = formData.get('companyName') as string
    const role = formData.get('role') as string
    const phone = formData.get('phone') as string

    const { error } = await supabase.from('profiles').upsert({
        id: session.user.id,
        company_name: companyName,
        role,
        phone,
        updated_at: new Date().toISOString()
    })

    if (error) {
        return { error: error.message }
    }

    redirect('/dashboard')
}
