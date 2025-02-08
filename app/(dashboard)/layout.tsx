'use client';

import ErrorBoundary from '@/components/error/error-boundary'
import { SidebarNav } from '@/components/layout/sidebar-nav'
import LoadingState from '@/components/loading/loading-state'

import { Box } from '@mui/material'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  const {isLoaded, isSignedIn} = useAuth();

  if (!isLoaded) {
    return <LoadingState fullPage message='Loading authentication...' />;
  }

  if (!isSignedIn) {
    redirect('/sign-in');
  }

  return (
    <Box sx={{display: 'flex', minHeight: '100vh'}}>
      <SidebarNav />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: {sm: `calc(100% - 240px)`},
          ml: {sm: '240px'},
          overflow: 'auto',
        }}
      >
        <ErrorBoundary
          error={new Error('Something went wrong')}
          reset={() => window.location.reload()}
        >
          <Suspense fallback={<LoadingState message='Loading content...' />}>{children}</Suspense>
        </ErrorBoundary>
      </Box>
    </Box>
  );
}
