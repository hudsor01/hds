import { useEffect, useState } from 'react'
import { Alert, Button, CircularProgress } from '@mui/material'
import FeatherIcon from 'feather-icons-react'
import { useRouter } from 'next/router'

interface VerifyEmailProps {
  onSuccess?: (email: string) => void
  onError?: (error: string) => void
}

export default function VerifyEmail({ onSuccess, onError }: VerifyEmailProps) {
  const router = useRouter()
  const { token } = router.query

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null)

  useEffect(() => {
    if (!token || typeof token !== 'string') {
      setError('Invalid verification token')
      setLoading(false)
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/waitlist/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Verification failed')
        }

        setVerifiedEmail(data.data.email)
        onSuccess?.(data.data.email)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred'
        setError(message)
        onError?.(message)
      } finally {
        setLoading(false)
      }
    }

    verifyEmail()
  }, [token, onSuccess, onError])

  const handleResendVerification = async () => {
    if (!verifiedEmail) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/waitlist/verify', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verifiedEmail }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend verification')
      }

      setError('New verification email sent!')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      onError?.(message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <CircularProgress size={48} />
        <p className="mt-4 text-gray-600">Verifying your email...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6">
        <div className="mb-4 flex items-center">
          <FeatherIcon icon="alert-circle" className="mr-2 text-red-500" size={24} />
          <h3 className="text-xl font-semibold text-red-800">Verification Failed</h3>
        </div>
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
        {verifiedEmail && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleResendVerification}
            disabled={loading}
            className="mt-4"
          >
            Resend Verification Email
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-green-50 p-6">
      <div className="mb-4 flex items-center">
        <FeatherIcon icon="check-circle" className="mr-2 text-green-500" size={24} />
        <h3 className="text-xl font-semibold text-green-800">Email Verified Successfully</h3>
      </div>
      <p className="mb-4 text-green-700">
        Thank you for verifying your email address. You're now officially on our waitlist!
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/')}
        className="mt-4 bg-green-600 hover:bg-green-700"
      >
        Return to Home
      </Button>
    </div>
  )
}
