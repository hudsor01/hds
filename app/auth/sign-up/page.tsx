'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    CircularProgress,
    IconButton,
    InputAdornment,
    Divider,
    Alert,
    Container
} from '@mui/material'
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Person as PersonIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Google as GoogleIcon
} from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { signUp, signInWithGoogle } from '@/store/slices/authSlice'
import { addNotification } from '@/store/slices/uiSlice'

const signUpSchema = z
    .object({
        fullName: z
            .string()
            .min(2, 'Full name must be at least 2 characters')
            .max(50, 'Full name must be less than 50 characters'),
        email: z
            .string()
            .min(1, 'Email is required')
            .email('Invalid email address'),
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
            )
            .regex(
                /[^A-Za-z0-9]/,
                'Password must contain at least one special character'
            ),
        confirmPassword: z.string()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    })

type SignUpValues = z.infer<typeof signUpSchema>

export default function SignUpPage() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { isLoading, error } = useAppSelector(state => state.auth)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (values: SignUpValues) => {
        try {
            await dispatch(
                signUp({
                    email: values.email,
                    password: values.password,
                    options: {
                        data: {
                            full_name: values.fullName
                        }
                    }
                })
            ).unwrap()

            dispatch(
                addNotification({
                    type: 'success',
                    message:
                        'Sign up successful! Please check your email to verify your account.'
                })
            )

            router.push('/auth/verify-email')
        } catch (error) {
            dispatch(
                addNotification({
                    type: 'error',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'Failed to sign up'
                })
            )
        }
    }

    const handleGoogleSignUp = async () => {
        try {
            await dispatch(signInWithGoogle()).unwrap()
            dispatch(
                addNotification({
                    type: 'success',
                    message: 'Successfully signed in with Google!'
                })
            )
        } catch (error) {
            dispatch(
                addNotification({
                    type: 'error',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'Failed to sign in with Google'
                })
            )
        }
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 8,
                    mb: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Paper
                    elevation={2}
                    sx={{
                        p: 4,
                        width: '100%',
                        borderRadius: 2,
                        bgcolor: 'background.paper'
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography
                            component="h1"
                            variant="h5"
                            gutterBottom
                            sx={{ fontWeight: 600 }}
                        >
                            Create Your Account
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Join Hudson Digital Solutions and
                            transform your property management
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleSignUp}
                        disabled={isLoading}
                        sx={{
                            mb: 3,
                            py: 1.5,
                            borderColor: 'divider',
                            '&:hover': {
                                borderColor: 'divider',
                                bgcolor: 'action.hover'
                            }
                        }}
                    >
                        {isLoading ? (
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
                            'Sign up with Google'
                        )}
                    </Button>

                    <Divider sx={{ mb: 3 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Or continue with email
                        </Typography>
                    </Divider>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Full Name"
                                    error={!!errors.fullName}
                                    helperText={
                                        errors.fullName?.message
                                    }
                                    disabled={isLoading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color="action" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    disabled={isLoading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon color="action" />
                                            </InputAdornment>
                                        )
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
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type={
                                        showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    error={!!errors.password}
                                    helperText={
                                        errors.password?.message
                                    }
                                    disabled={isLoading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                    edge="end"
                                                    disabled={
                                                        isLoading
                                                    }
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
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Confirm Password"
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    error={!!errors.confirmPassword}
                                    helperText={
                                        errors.confirmPassword
                                            ?.message
                                    }
                                    disabled={isLoading}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword
                                                        )
                                                    }
                                                    edge="end"
                                                    disabled={
                                                        isLoading
                                                    }
                                                >
                                                    {showConfirmPassword ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isLoading}
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
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
                                    <span>Creating Account...</span>
                                </Box>
                            ) : (
                                'Create Account'
                            )}
                        </Button>

                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Already have an account?{' '}
                                <Link
                                    href="/auth/sign-in"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Typography
                                        component="span"
                                        color="primary"
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        Sign in
                                    </Typography>
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}
