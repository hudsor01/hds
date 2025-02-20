'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createClient } from '../../lib/supabase/client'
import { createClient } from '@/lib/supabase/client'

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)
        setError(null)
        try {
            const { error: signInError } = await supabase.auth.signInWithPassword(
                {
                    email: data.email,
                    password: data.password
                }
            )

            if (signInError) throw signInError
            if (signInError) throw signInError

            router.push('/dashboard')
            router.refresh()
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to login'
            )
        } finally {
            setIsLoading(false)
    return (
        <form onSubmit={(e) => { e.preventDefault(); void handleSubmit(onSubmit)(e); }} className="space-y-4">

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
                <Alert severity="error" className="mb-4" role="alert">
                    {error}
                </Alert>
            )}

            <TextField
                {...register('email')}
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isLoading}
                className="bg-background"
            />

            <TextField
                {...register('password')}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={isLoading}
                className="bg-background"
            />

            <div className="flex items-center justify-between">
                <Link
                    href="/forgot-password"
                    className="text-primary text-sm hover:underline"
                >
                    Forgot password?
                </Link>
            </div>

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
                        <LockOutlinedIcon />
                    )
                }
                className="mt-2"
            >
                {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link
                    href="/signup"
                    className="text-primary hover:underline"
                >
                    Sign up
                </Link>
            </div>
        </form>
    )
}
