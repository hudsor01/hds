import CustomerPortalForm from '@/components/forms/CustomerPortalForm'
import EmailForm from '@/components/forms/EmailForm'
import NameForm from '@/components/forms/NameForm'
import { ErrorBoundary } from '@/components/error/error-boundary'
import { createServerClient } from '@supabase/ssr'
import { getSubscription } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Container, Typography, Box, Alert, Skeleton } from '@mui/material'
import type { Subscription, UserDetails } from '@/types/database'

export default async function AccountPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getSession()

    if (!user || userError) {
      throw new Error(userError?.message || 'User not found')
    }

    const [subscriptionResult, userDetailsResult] = await Promise.allSettled([
      getSubscription(supabase),
      supabase
        .from('users')
        .select('id, full_name, email, created_at, updated_at')
        .eq('id', user.id)
        .single()
    ])

    // Type guard for userDetails
    if (
      userDetailsResult.status === 'rejected' ||
      !userDetailsResult.value?.data ||
      userDetailsResult.value.error
    ) {
      console.error(
        'User details error:',
        userDetailsResult.status === 'rejected'
          ? userDetailsResult.reason
          : userDetailsResult.value?.error
      )
      redirect('/onboarding')
    }

    const subscription = subscriptionResult.status === 'fulfilled' ? subscriptionResult.value : null

    const userDetails = userDetailsResult.value.data

    return (
      <ErrorBoundary
        fallback={
          <Container maxWidth="md" className="py-8">
            <Alert severity="error" className="mb-4">
              Something went wrong. Please try again later.
            </Alert>
          </Container>
        }
      >
        <Box component="section" className="min-h-screen">
          {/* Header Section */}
          <Box className="bg-gradient-to-b from-gray-900 to-black py-16 sm:py-24">
            <Container maxWidth="xl" className="px-4 sm:px-6 lg:px-8">
              <Box className="text-center">
                <Typography
                  variant="h1"
                  className="text-4xl font-extrabold text-white sm:text-6xl"
                  gutterBottom
                >
                  Account Settings
                </Typography>
                <Typography
                  variant="h2"
                  className="mx-auto mt-5 max-w-2xl text-xl text-gray-300 sm:text-2xl"
                >
                  Manage your profile and subscription
                </Typography>
              </Box>
            </Container>
          </Box>

          {/* Content Section */}
          <Container maxWidth="xl" className="px-4 py-8 sm:px-6 lg:px-8">
            <Box className="mx-auto grid max-w-3xl gap-8">
              {/* Subscription Management */}
              <Box className="surface p-6">
                <Typography variant="h6" className="mb-4">
                  Subscription
                </Typography>
                <CustomerPortalForm subscription={subscription} />
              </Box>

              {/* Personal Information */}
              <Box className="surface p-6">
                <Typography variant="h6" className="mb-4">
                  Personal Information
                </Typography>
                <Box className="space-y-6">
                  <NameForm userName={userDetails.full_name ?? ''} userId={userDetails.id} />
                  <EmailForm userEmail={user.email ?? ''} userId={userDetails.id} />
                </Box>
              </Box>

              {/* Account Details */}
              <Box className="surface p-6">
                <Typography variant="h6" className="mb-4">
                  Account Details
                </Typography>
                <Box className="space-y-2 text-sm text-gray-500">
                  <p>Member since: {new Date(userDetails.created_at).toLocaleDateString()}</p>
                  <p>Last updated: {new Date(userDetails.updated_at).toLocaleDateString()}</p>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </ErrorBoundary>
    )
  } catch (error) {
    console.error('Account page error:', error)
    redirect('/signin')
  }
}

// Loading state
export function Loading() {
  return (
    <Container maxWidth="xl" className="px-4 py-8 sm:px-6 lg:px-8">
      <Box className="space-y-6">
        <Skeleton variant="rectangular" height={200} />
        <Skeleton variant="rectangular" height={400} />
      </Box>
    </Container>
  )
}
