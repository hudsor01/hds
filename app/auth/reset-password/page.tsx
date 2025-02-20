'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Alert,
    InputAdornment,
    IconButton
} from '@mui/material'
import {
    Lock as LockIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { updatePassword } from '@/store/slices/authSlice'
import { addNotification } from '@/store/slices/uiSlice'

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

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector(state => state.auth)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (values: ResetPasswordValues) => {
        setError(null)

        try {
            await dispatch(
                updatePassword({ password: values.password })
            ).unwrap()

            dispatch(
                addNotification({
                    type: 'success',
                    message: 'Password has been successfully reset.'
                })
            )

            router.push('/auth/sign-in')
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to reset password'
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
                        borderRadius: 2
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography
                            component="h1"
                            variant="h5"
                            gutterBottom
                            sx={{ fontWeight: 600 }}
                        >
                            Reset Your Password
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Please enter your new password below.
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="New Password"
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
                                    label="Confirm New Password"
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
                                    <span>Resetting Password...</span>
                                </Box>
                            ) : (
                                'Reset Password'
                            )}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    )
}
