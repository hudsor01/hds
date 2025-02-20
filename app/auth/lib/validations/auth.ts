import { z } from 'zod'

export const passwordSchema = z
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
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
    )

export const SignupSchema = z
    .object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Invalid email address'),
        password: passwordSchema,
        confirmPassword: z.string()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    })

export const SigninSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    remember: z.boolean().optional()
})

export const ForgotPasswordSchema = z.object({
    email: z.string().email('Invalid email address')
})

export const ResetPasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    })

export const UpdatePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(1, 'Current password is required'),
        newPassword: passwordSchema,
        confirmNewPassword: z.string()
    })
    .refine(data => data.newPassword === data.confirmNewPassword, {
        message: "Passwords don't match",
        path: ['confirmNewPassword']
    })

export type SignupFormData = z.infer<typeof SignupSchema>
export type SigninFormData = z.infer<typeof SigninSchema>
export type ForgotPasswordFormData = z.infer<
    typeof ForgotPasswordSchema
>
export type ResetPasswordFormData = z.infer<
    typeof ResetPasswordSchema
>
export type UpdatePasswordFormData = z.infer<
    typeof UpdatePasswordSchema
>
