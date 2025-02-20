'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    CircularProgress,
    IconButton,
    InputAdornment,
    Snackbar,
    Alert
} from '@mui/material'
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material'
import { signIn } from '@/lib/supabase/auth'

const signInSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
})

type SignInValues = z.infer<typeof signInSchema>

export function SignIn() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [snackbar, setSnackbar] = useState<{
        open: boolean
        message: string
        severity: 'success' | 'error' | 'info' | 'warning'
    }>({
        open: false,
        message: '',
        severity: 'info'
    })

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<SignInValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }))
    }

    const onSubmit = async (values: SignInValues) => {
        try {
            setIsLoading(true)
            const { success, message } = await signIn(
                values.email,
                values.password
            )

            if (!success) {
                throw new Error(message)
            }

            setSnackbar({
                open: true,
                message: 'Signed in successfully',
                severity: 'success'
            })

            const returnTo =
                searchParams.get('returnTo') || '/dashboard'
            router.refresh()
            router.push(returnTo)
        } catch (error) {
            console.error('Sign in error:', error)
            setSnackbar({
                open: true,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Failed to sign in',
                severity: 'error'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 3
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    gutterBottom
                    align="center"
                >
                    Sign In
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                type="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                disabled={isLoading}
                                fullWidth
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => {
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }}
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                type="password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                disabled={isLoading}
                                fullWidth
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => {
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }}
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{ mt: 2 }}
                    >
                        {isLoading ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <CircularProgress
                                    size={20}
                                    color="inherit"
                                />
                                <span>Signing in...</span>
                            </Box>
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
