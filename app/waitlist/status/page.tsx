'use client'

import { useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Alert } from '@mui/material'
import StatusCard from '@/components/waitlist/status-card'
import type { WaitlistEntry } from '@/types/waitlist'

export default function WaitlistStatusPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [entry, setEntry] = useState<WaitlistEntry | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/waitlist/status?email=${encodeURIComponent(email)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch waitlist status')
      }

      setEntry(data.entry)
      setTotalCount(data.totalCount)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" className="py-12">
      <div className="text-center mb-8">
        <Typography variant="h3" component="h1" className="mb-4">
          Check Your Waitlist Status
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" className="mb-8">
          Enter your email address to see your current position and referral status.
        </Typography>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            fullWidth
            disabled={loading}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            className="h-12 bg-blue-600 hover:bg-blue-700"
          >
            Check Status
          </Button>
        </form>
      </div>

      {entry && <StatusCard entry={entry} totalCount={totalCount} />}

      <div className="mt-12 text-center">
        <Typography variant="body2" color="textSecondary">
          Not on the waitlist yet? <a href="/waitlist" className="text-blue-600 hover:text-blue-800">Join now</a>
        </Typography>
      </div>
    </Container>
  )
}
