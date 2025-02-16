import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters')
})

export const signUpSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
