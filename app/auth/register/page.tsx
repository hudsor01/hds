'use client'

import { routes } from '@/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Eye, EyeOff, Loader } from 'react-feather'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { InputGroup, InputRightElement } from '../components/ui/input-group'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

type FormData = z.infer<typeof registerSchema>

export default function RegisterPage(): React.ReactElement {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const password = watch('password')

  // Calculate password strength
  const calculatePasswordStrength = (password: string): number => {
    let score = 0
    if (!password) return 0

    // Length check
    if (password.length >= 8) score += 20
    if (password.length >= 12) score += 20

    // Character type checks
    if (/[A-Z]/.test(password)) score += 20
    if (/[0-9]/.test(password)) score += 20
    if (/[^A-Za-z0-9]/.test(password)) score += 20

    setPasswordStrength(score)
    return score
  }

  // Update password strength when password changes
  useEffect(() => {
    calculatePasswordStrength(password)
  }, [password])

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      setIsPending(true)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || 'Something went wrong!')
      }

      toast.success('Registration successful! Please check your email to verify your account.')
      router.push(routes.auth.verifyEmail)

    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unexpected error occurred')
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your details below to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="form-control w-full">
              <label htmlFor="name" className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                disabled={isPending}
                {...register('name')}
              />
              {errors.name && (
                <div className="mt-1 text-sm text-error">
                  {errors.name.message}
                </div>
              )}
            </div>

            <div className="form-control w-full">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                disabled={isPending}
                {...register('email')}
              />
              {errors.email && (
                <div className="mt-1 text-sm text-error">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="form-control w-full">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <InputGroup>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                  disabled={isPending}
                  {...register('password')}
                />
                <InputRightElement>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </InputRightElement>
              </InputGroup>
              {password && (
                <div className="mt-2">
                  <progress
                    className={`progress w-full ${
                      passwordStrength >= 80 ? 'progress-success' :
                      passwordStrength >= 60 ? 'progress-warning' :
                      'progress-error'
                    }`}
                    value={passwordStrength}
                    max="100"
                  />
                  <p className="mt-1 text-xs text-gray-600">
                    Password strength: {
                      passwordStrength >= 80 ? 'Strong' :
                      passwordStrength >= 60 ? 'Good' :
                      passwordStrength >= 40 ? 'Fair' :
                      'Weak'
                    }
                  </p>
                </div>
              )}
              {errors.password && (
                <div className="mt-1 text-sm text-error">
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="form-control w-full">
              <label htmlFor="confirmPassword" className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <InputGroup>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                  disabled={isPending}
                  {...register('confirmPassword')}
                />
                <InputRightElement>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && (
                <div className="mt-1 text-sm text-error">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full ${isPending ? 'loading' : ''}`}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            disabled={isPending}
          >
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </button>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            disabled={isPending}
          >
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
            </svg>
            Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => router.push('/auth/login')}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
