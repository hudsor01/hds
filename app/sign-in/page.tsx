'use client'

import { useRef, useReducer } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { z } from 'zod'

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Name must be at least 2 characters')
})

type FormState = {
  isLoading: boolean
  error: string | null
  token: string | null
}

const initialState: FormState = {
  isLoading: false,
  error: null,
  token: null
}

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TOKEN'; payload: string | null }

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_TOKEN':
      return { ...state, token: action.payload }
    default:
      return state
  }
}

export default function LoginPage() {
  const supabase = createClient()
  const captchaRef = useRef<HCaptcha>(null)
  const [state, dispatch] = useReducer(reducer, initialState)

  const onVerify = (token: string) => {
    dispatch({ type: 'SET_TOKEN', payload: token })
  }

  const validateForm = (formData: FormData) => {
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      fullName: formData.get('fullName')
    }

    const result = signUpSchema.safeParse(data)
    if (!result.success) {
      const firstError = result.error.errors[0]
      if (firstError) {
        throw new Error(firstError.message)
      } else {
        throw new Error('Validation failed')
      }
    }

    return result.data
  }

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })

    try {
      if (!state.token) {
        throw new Error('Please complete the captcha')
      }

      const formData = new FormData(event.currentTarget)
      const validatedData = validateForm(formData)

      const { error: signUpError } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          data: { full_name: validatedData.fullName },
          captchaToken: state.token,
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (signUpError) throw signUpError

      // Redirect or show success message
      window.location.href = '/verify'
    } catch (err) {
      console.error('Signup error:', err)
      dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'An error occurred' })
      captchaRef.current?.resetCaptcha()
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>

          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" type="text" required />
          </div>

          <div className="flex w-full justify-center">
            <HCaptcha
              ref={captchaRef}
              sitekey={process.env['NEXT_PUBLIC_HCAPTCHA_SITE_KEY']!}
              onVerify={onVerify}
              onError={() => dispatch({ type: 'SET_ERROR', payload: 'Captcha verification failed' })}
            />
          </div>

          {state.error && <div className="text-sm text-red-500">{state.error}</div>}

          <button
            type="submit"
            disabled={state.isLoading || !state.token}
            className="bg-primary mt-4 w-full rounded p-2 text-white disabled:opacity-50"
          >
            {state.isLoading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  )
}
