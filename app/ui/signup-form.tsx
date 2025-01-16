'use client'

import { Button } from 'my-app/app/components/ui/button'
import { Input } from 'my-app/app/components/ui/input'
import { Label } from 'my-app/app/components/ui/label'
import { register } from 'my-app/app/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'

export default function SignUpForm() {
  const [state, dispatch] = useFormState(register, null)
  const { pending } = useFormStatus()

  return (
    <form action={dispatch} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          required
          className="mt-1"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? 'Creating account...' : 'Sign Up'}
      </Button>
    </form>
  )
}
