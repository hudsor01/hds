'use client';

import {useAuth} from '@clerk/nextjs';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'ADMIN' | 'PROPERTY_MANAGER' | 'OWNER' | 'TENANT' | 'USER';
}

export function AuthGuard({children, requiredRole}: AuthGuardProps) {
  const {isLoaded, isSignedIn} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return <>{children}</>;
}
