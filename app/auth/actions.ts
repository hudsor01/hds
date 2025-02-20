'use server'

import supabase from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { signInSchema, signUpSchema } from '@/lib/validations/auth'
import { z } from 'zod'
import type { AuthError } from '@supabase/supabase-js'
import process from 'process'

const emailSchema = z.string().email()
const passwordSchema = z.string().min(6)

function getFormValue(
    formData: FormData,
    key: string,
    schema: z.ZodType<string>
): string {
    const value = formData.get(key)
    if (typeof value !== 'string') {
        return redirect(
            `/auth/sign-in?error=${encodeURIComponent('Invalid form data')}`
        )
    }
    const result = schema.safeParse(value)
    if (!result.success) {
        return redirect(
            `/auth/sign-in?error=${encodeURIComponent(result.error.errors[0]?.message)}`
        )
    }
    return result.data
}

export async function signIn(formData: FormData): Promise<void> {
    const validationResult = signInSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    if (!validationResult.success) {
        return redirect(
            `/auth/sign-in?error=${encodeURIComponent(validationResult.error.errors[0]?.message)}`
        )
    }

    const { email, password } = validationResult.data
    const { error }: { error: AuthError | null } =
        await supabase.auth.signInWithPassword({
            email,
            password
        })

    if (error) {
        return redirect(
            '/auth/sign-in?error=' + encodeURIComponent(error.message)
        )
    }

    revalidatePath('/', 'layout')
    return redirect('/dashboard')
}

export async function signUp(formData: FormData): Promise<void> {
    const validationResult = signUpSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    })

    if (!validationResult.success) {
        return redirect(
            `/auth/sign-up?error=${encodeURIComponent(validationResult.error.errors[0]?.message)}`
        )
    }

    const { email, password } = validationResult.data
    const { error }: { error: AuthError | null } =
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
            }
        })

    if (error) {
        return redirect(
            '/auth/sign-up?error=' + encodeURIComponent(error.message)
        )
    }

    return redirect('/auth/verify-email')
}

export async function signOut(): Promise<void> {
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    return redirect('/')
}

export async function resetPassword(
    formData: FormData
): Promise<void> {
    const email = getFormValue(formData, 'email', emailSchema)
    const { error }: { error: AuthError | null } =
        await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/auth/update-password`
        })

    if (error) {
        return redirect(
            '/auth/reset-password?error=' +
                encodeURIComponent(error.message)
        )
    }

    return redirect(
        '/auth/reset-password?message=Check your email for a password reset link'
    )
}

export async function updatePassword(
    formData: FormData
): Promise<void> {
    const password = getFormValue(
        formData,
        'password',
        passwordSchema
    )
    const confirmPassword = getFormValue(
        formData,
        'confirmPassword',
        passwordSchema
    )

    if (password !== confirmPassword) {
        return redirect(
            '/auth/update-password?error=Passwords do not match'
        )
    }

    const { error }: { error: AuthError | null } =
        await supabase.auth.updateUser({ password })

    if (error) {
        return redirect(
            '/auth/update-password?error=' +
                encodeURIComponent(error.message)
        )
    }

    return redirect(
        '/auth/sign-in?message=Password updated successfully'
    )
}

interface RedirectInfo {
    path: string
    error?: string
    message?: string
}

function createRedirectURL({
    path,
    error,
    message
}: RedirectInfo): string {
    const url = new URL(path, process.env.NEXT_PUBLIC_SITE_URL)
    if (error) url.searchParams.set('error', error)
    if (message) url.searchParams.set('message', message)
    return url.toString()
}
