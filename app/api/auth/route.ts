import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z, ZodError } from 'zod'
import process from 'process'
import type { AuthError, AuthResponse } from '@supabase/supabase-js'

const authRequestSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
})

const passwordResetSchema = z.object({
    email: z.string().email('Invalid email address')
})

const passwordUpdateSchema = z.object({
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
})

const authTypeSchema = z.enum([
    'signin',
    'signup',
    'reset-password',
    'update-password'
])

function isAuthError(error: unknown): error is AuthError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        'status' in error
    )
}

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const json = await request.json()
        const { type, ...data } = json

        const validatedType = authTypeSchema.parse(type)

        const supabase = createClient()

        switch (validatedType) {
            case 'signin': {
                const validatedData = authRequestSchema.parse(data)
                const { error }: AuthResponse =
                    await supabase.auth.signInWithPassword(
                        validatedData
                    )

                if (error) throw error

                return NextResponse.json({
                    message: 'Successfully signed in'
                })
            }

            case 'signup': {
                const validatedData = authRequestSchema.parse(data)
                const { error }: AuthResponse =
                    await supabase.auth.signUp({
                        ...validatedData,
                        options: {
                            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
                        }
                    })

                if (error) throw error

                return NextResponse.json({
                    message:
                        'Please check your email to confirm your account'
                })
            }

            case 'reset-password': {
                const validatedData = passwordResetSchema.parse(data)
                const { error }: AuthResponse =
                    await supabase.auth.resetPasswordForEmail(
                        validatedData.email,
                        {
                            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/auth/update-password`
                        }
                    )

                if (error) throw error

                return NextResponse.json({
                    message:
                        'Password reset instructions sent to your email'
                })
            }

            case 'update-password': {
                const validatedData = passwordUpdateSchema.parse(data)
                const { error }: AuthResponse =
                    await supabase.auth.updateUser({
                        password: validatedData.password
                    })

                if (error) throw error

                return NextResponse.json({
                    message: 'Password updated successfully'
                })
            }
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    error: 'Validation Error',
                    details: error.errors
                },
                { status: 400 }
            )
        }

        if (isAuthError(error)) {
            return NextResponse.json(
                {
                    error: 'Authentication Error',
                    message: error.message
                },
                { status: 401 }
            )
        }

        console.error('Auth error:', error)
        return NextResponse.json(
            {
                error: 'Authentication failed',
                message:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error'
            },
            { status: 500 }
        )
    }
}

export async function DELETE(): Promise<NextResponse> {
    try {
        const supabase = createClient()
        const { error }: AuthResponse = await supabase.auth.signOut()

        if (error) throw error

        return NextResponse.json({
            message: 'Successfully signed out'
        })
    } catch (error) {
        console.error('Sign out error:', error)
        return NextResponse.json(
            {
                error: 'Failed to sign out',
                message:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
