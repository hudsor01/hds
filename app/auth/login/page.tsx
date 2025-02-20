import { createServerSupabase } from '@/lib/supabase/server'
import { Alert, Box, Card, CardContent, Typography } from '@mui/material'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface LoginPageProps {
    searchParams: { 
        redirectTo?: string;
        error?: string;
    }
}

export default async function LoginPage({
    searchParams
}: LoginPageProps) {
    const supabase = await createServerSupabase()

    // Check if user is already logged in
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
        redirect(searchParams.redirectTo || '/dashboard')
    }

    return (
        <Box className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardContent className="p-8">
                    <div className="text-center">
                        <Typography component="h1" variant="h5" className="mb-6">
                            Sign in to your account
                        </Typography>
                    </div>

                    {searchParams.error && (
                        <Alert severity="error" className="mb-4" role="alert">
                            {searchParams.error}
                        </Alert>
                    )}

                    <form className="space-y-6" action="/api/auth/sign-in" method="POST">
                        {searchParams.redirectTo && (
                            <input
                                type="hidden"
                                name="redirectTo"
                                value={searchParams.redirectTo}
                            />
                        )}

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
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link
                                    href="/auth/forgot-password"
                                    className="font-medium text-primary-600 hover:text-primary-500"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                                Sign in
                            </button>
                        </div>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">
                                        Not a member?
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <Link
                                    href="/auth/signup"
                                    className="font-medium text-primary-600 hover:text-primary-500"
                                >
                                    Sign up now
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}