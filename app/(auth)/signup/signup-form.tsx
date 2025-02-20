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
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const signupSchema = z
    .object({
        email: z.string().email('Invalid email address'),
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
        confirmPassword: z.string(),
        firstName: z
            .string()
            .min(2, 'First name must be at least 2 characters'),
        lastName: z
            .string()
            .min(2, 'Last name must be at least 2 characters'),
        acceptTerms: z.boolean().refine(val => val === true, {
            message: 'You must accept the terms and conditions'
        })
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    })

type SignUpFormData = z.infer<typeof signupSchema>

export function SignUpForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClientComponentClient()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signupSchema)
    })

    const onSubmit = async (data: SignUpFormData) => {
        setIsLoading(true)
        setError(null)

        try {
            const { error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName
                    }
                }
            })

            if (authError) throw authError

            router.push('/onboarding')
            router.refresh()
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to create account'
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

                <div className="grid gap-4 md:grid-cols-2">
                    <TextField
                        {...register('firstName')}
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        disabled={isLoading}
                        className="bg-background"
                    />

                    <TextField
                        {...register('lastName')}
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        disabled={isLoading}
                        className="bg-background"
                    />
                </div>

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

                <FormControlLabel
                    control={
                        <Checkbox
                            {...register('acceptTerms')}
                            disabled={isLoading}
                            color="primary"
                        />
                    }
                    label={
                        <span className="text-sm">
                            I accept the{' '}
                            <Link
                                href="/terms"
                                className="text-primary hover:underline"
                            >
                                terms and conditions
                            </Link>
                        </span>
                    }
                />
                {errors.acceptTerms && (
                    <p className="text-error text-sm">
                        {errors.acceptTerms.message}
                    </p>
                )}

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
                            <PersonAddOutlinedIcon />
                        )
                    }
                    className="mt-2"
                >
                    {isLoading
                        ? 'Creating account...'
                        : 'Create account'}
                </Button>
            </form>

            <div className="text-center text-sm">
                <span className="text-muted-foreground">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="text-primary hover:underline"
                    >
                        Sign in
                    </Link>
                </span>
            </div>
        </div>
    )
}
