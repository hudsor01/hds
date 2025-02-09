import { useState } from 'react'
import { TextField, Button, Alert, CircularProgress } from '@mui/material'
import { Mail, User, Link as LinkIcon } from 'react-feather'
import type { WaitlistJoinRequest, WaitlistJoinResponse } from '@/types/waitlist'

interface JoinFormProps {
  onSuccess?: (response: WaitlistJoinResponse) => void
  onError?: (error: string) => void
  referralCode?: string
}

export default function JoinForm({
  onSuccess,
  onError,
  referralCode: initialReferralCode,
}: JoinFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<WaitlistJoinRequest>({
    email: '',
    name: '',
    referralCode: initialReferralCode || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data: WaitlistJoinResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      setSuccess(true)
      onSuccess?.(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      onError?.(message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (success) {
    return (
      <div className="rounded-lg bg-green-50 p-6 text-center">
        <h3 className="mb-2 text-xl font-semibold text-green-800">You're on the list! 🎉</h3>
        <p className="text-green-700">Check your email for verification instructions.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <div className="relative">
        <Mail
          className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
          size={20}
        />
        <TextField
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          fullWidth
          InputProps={{
            className: 'pl-10',
          }}
          disabled={loading}
        />
      </div>

      <div className="relative">
        <User
          className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
          size={20}
        />
        <TextField
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name (optional)"
          fullWidth
          InputProps={{
            className: 'pl-10',
          }}
          disabled={loading}
        />
      </div>

      {!initialReferralCode && (
        <div className="relative">
          <LinkIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
            size={20}
          />
          <TextField
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            placeholder="Referral code (optional)"
            fullWidth
            InputProps={{
              className: 'pl-10',
            }}
            disabled={loading}
          />
        </div>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        className="h-12 bg-blue-600 hover:bg-blue-700"
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Join the Waitlist'}
      </Button>
    </form>
  )
}
