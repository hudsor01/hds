'use client'

import * as React from 'react'
import supabase from '@/lib/supabase'
import { Forms, UI } from '@/types'

type EmailVerificationState = {
  email: string
  code: string
} & Forms.State

export default function EmailAdditionPage() {
  const [formState, setFormState] = React.useState<EmailVerificationState>({
    email: '',
    code: '',
    isSubmitting: false,
    error: null,
    success: false
  })

  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [successful, setSuccessful] = React.useState(false)

  React.useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) return null

  if (!user?.id) {
    return <p>You must be logged in to access this page</p>
  }

  // Handle addition of the email address
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Add email to user's profile in Supabase
      const { error } = await supabase.auth.update({
        email: formState.email
      })

      if (error) throw error

      // Set to true to display second form
      // and capture the OTP code
      setIsVerifying(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle the submission of the verification code
  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.auth.verify({
        email: formState.email,
        token: formState.code,
        type: 'email'
      })

      if (error) throw error
      setSuccessful(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Display a success message if the email was added successfully
  if (successful) {
    return (
      <>
        <h1>Email added!</h1>
      </>
    )
  }

  // Display the verification form to capture the OTP code
  if (isVerifying) {
    return (
      <>
        <h1>Verify email</h1>
        <div>
          <form onSubmit={e => verifyCode(e)}>
            <div>
              <label htmlFor="code">Enter code</label>
              <input
                onChange={e => setFormState({ ...formState, code: e.target.value })}
                id="code"
                name="code"
                type="text"
                value={formState.code}
              />
            </div>
            <div>
              <button type="submit">Verify</button>
            </div>
          </form>
        </div>
      </>
    )
  }

  // Display the initial form to capture the email address
  return (
    <>
      <h1>Add Email</h1>
      <div>
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <label htmlFor="email">Enter email address</label>
            <input
              onChange={e => setFormState({ ...formState, email: e.target.value })}
              id="email"
              name="email"
              type="email"
              value={formState.email}
            />
          </div>
          <div>
            <button type="submit">Continue</button>
          </div>
        </form>
      </div>
    </>
  )
}
