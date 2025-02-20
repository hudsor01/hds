import { Box, Card, CardContent, Typography } from '@mui/material'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <Box className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center">
            <Typography component="h1" variant="h5" className="mb-6">
              Reset your password
            </Typography>
          </div>
          <form className="space-y-6" action="/api/auth/reset-password" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Reset password
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </Box>
  )
}