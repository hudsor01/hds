'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    Box,
    TextField,
    Button,
    Divider,
    CircularProgress,
    Typography,
    Alert,
    InputAdornment,
    IconButton
} from '@mui/material'
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Google as GoogleIcon
} from '@mui/icons-material'
import { useAppDispatch } from '@/store/hooks'
import { signIn, signInWithGoogle } from '@/store/slices/authSlice'
import {
    setGlobalLoading,
    addNotification
} from '@/store/slices/uiSlice'
import { AuthForm } from '@/components/features/auth/AuthForm'

export default function SignInPage() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()
    const returnTo = searchParams?.get('returnTo') || '/dashboard'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        dispatch(setGlobalLoading(true))

        try {
            const result = await dispatch(
                signIn({ email, password })
            ).unwrap()

            if (result) {
                dispatch(
                    addNotification({
                        type: 'success',
                        message: 'Successfully signed in!'
                    })
                )
                router.push(returnTo)
            }
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to sign in'
            )
            dispatch(
                addNotification({
                    type: 'error',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'Failed to sign in'
                })
            )
        } finally {
            setLoading(false)
            dispatch(setGlobalLoading(false))
        }
    }

    const handleGoogleSignIn = async () => {
        setError(null)
        setLoading(true)
        dispatch(setGlobalLoading(true))

        try {
            await dispatch(signInWithGoogle()).unwrap()
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to sign in with Google'
            )
            dispatch(
                addNotification({
                    type: 'error',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'Failed to sign in with Google'
                })
            )
        } finally {
            setLoading(false)
            dispatch(setGlobalLoading(false))
        }
    }

    return (
        <AuthForm title="Sign In">
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                disabled={loading}
                sx={{
                    mb: 2,
                    py: 1,
                    borderColor: 'divider',
                    '&:hover': {
                        borderColor: 'divider',
                        bgcolor: 'action.hover'
                    }
                }}
            >
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <CircularProgress size={20} />
                        <span>Connecting to Google...</span>
                    </Box>
                ) : (
                    'Sign in with Google'
                )}
            </Button>

            <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    Or continue with email
                </Typography>
            </Divider>

            <Box
                component="form"
                onSubmit={handleSignIn}
                sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon color="action" />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color="action" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    edge="end"
                                    disabled={loading}
                                >
                                    {showPassword ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                    disabled={loading}
                >
                    {loading ? (
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

                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Link
                        href="/auth/forgot-password"
                        style={{ textDecoration: 'none' }}
                    >
                        <Typography
                            color="primary"
                            sx={{ mb: 2, cursor: 'pointer' }}
                        >
                            Forgot password?
                        </Typography>
                    </Link>

                    <Divider sx={{ my: 2 }}>
                        <Typography
                            color="text.secondary"
                            variant="body2"
                        >
                            OR
                        </Typography>
                    </Divider>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Don't have an account?{' '}
                        <Link
                            href="/auth/sign-up"
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography
                                component="span"
                                color="primary"
                                sx={{ cursor: 'pointer' }}
                            >
                                Sign Up
                            </Typography>
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </AuthForm>
    )
}
