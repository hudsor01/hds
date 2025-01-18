'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function AuthErrorPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-8 space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Authentication Error</h1>
          <p className="text-gray-500">
            There was a problem authenticating your account. Please try again.
          </p>
        </div>
        <div className="flex justify-center">
          <Button onClick={() => router.push('/login')}>
            Return to Login
          </Button>
        </div>
      </Card>
    </div>
  )
}
