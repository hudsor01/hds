'use client'

import { useState, useRef } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/input'
import { Label } from '@/components/label'

export default function LoginPage() {
  const captchaRef = useRef<HCaptcha>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const onVerify = (token: string) => {
    setToken(token)
  }

  const handleSignup = async (formData: FormData) => {
    try {
      setIsLoading(true)
      setError(null)

      if (!token) {
        throw new Error('Please complete the captcha')
      }

      const email = formData.get('email') as string
      const password = formData.get('password') as string
      const fullName = formData.get('fullName') as string

      const supabase = createClient()
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          captchaToken: token
        }
      })

      if (signUpError) throw signUpError
    } catch (err) {
      console.error('Signup error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      captchaRef.current?.resetCaptcha()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <form className="space-y-4" action={handleSignup}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <HCaptcha
          ref={captchaRef}
          sitekey={process.env['NEXT_PUBLIC_HCAPTCHA_SITE_KEY']!}
          onVerify={onVerify}
          onError={() => setError('Captcha verification failed')}
        />

        {error && <div className="text-sm text-red-500">{error}</div>}

        <button
          type="submit"
          disabled={isLoading || !token}
          className="bg-primary w-full rounded p-2 text-white disabled:opacity-50"
        >
          {isLoading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
    </div>
  )
}
