'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address')
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const supabase = createClientComponentClient()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema)
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const { error: resetError } =
                await supabase.auth.resetPasswordForEmail(
                    data.email,
                    {
                        redirectTo: `${window.location.origin}/reset-password`
                    }
                )

            if (resetError) throw resetError

            setSuccess(true)
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to send reset email'
            )
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <Alert severity="success" className="mb-4">
                Check your email for a password reset link. You can
                close this page.
            </Alert>
        )
    }

    return (
        <div className="flex flex-col space-y-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                {error && (
                    <Alert severity="error" className="mb-4">
                        {error}
                    </Alert>
                )}

                <TextField
                    {...register('email')}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={isLoading}
                    className="bg-background"
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading}
                    startIcon={
                        isLoading ? (
                            <CircularProgress size={20} />
                        ) : (
                            <EmailOutlinedIcon />
                        )
                    }
                    className="mt-2"
                >
                    {isLoading ? 'Sending...' : 'Send reset link'}
                </Button>
            </form>

            <div className="text-center text-sm">
                <Link
                    href="/login"
                    className="text-primary hover:underline"
                >
                    Back to login
                </Link>
            </div>
        </div>
    )
}
