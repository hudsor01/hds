'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import LockResetIcon from '@mui/icons-material/LockReset'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(
                /[A-Z]/,
                'Password must contain at least one uppercase letter'
            )
            .regex(
                /[a-z]/,
                'Password must contain at least one lowercase letter'
            )
            .regex(
                /[0-9]/,
                'Password must contain at least one number'
            ),
        confirmPassword: z.string()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    })

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClientComponentClient()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema)
    })

    const onSubmit = async (data: ResetPasswordFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            const { error: updateError } =
                await supabase.auth.updateUser({
                    password: data.password
                })

            if (updateError) throw updateError

            router.push('/login?reset=success')
            router.refresh()
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to reset password'
            )
        } finally {
            setIsLoading(false)
        }
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
                    {...register('password')}
                    label="New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    disabled={isLoading}
                    className="bg-background"
                />

                <TextField
                    {...register('confirmPassword')}
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
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
                            <LockResetIcon />
                        )
                    }
                    className="mt-2"
                >
                    {isLoading ? 'Resetting...' : 'Reset password'}
                </Button>
            </form>
        </div>
    )
}
