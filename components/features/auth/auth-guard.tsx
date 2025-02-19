'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Box, CircularProgress, useTheme } from '@mui/material';
import { type Session } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function getSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(session);
      } catch (error) {
        console.error('Error fetching session:', error);
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    }

    void getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        const returnTo = encodeURIComponent(pathname);
        router.push(`/auth/sign-in?returnTo=${returnTo}`);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, pathname]);

  // Show loading screen while checking auth
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CircularProgress
          size={40}
          sx={{
            color: theme.palette.primary.main,
          }}
        />
      </Box>
    );
  }

  // If not authenticated and not loading, redirect (handled in useEffect)
  if (!session) {
    return null;
  }

  // If authenticated, render children
  return <>{children}</>;
}

// HOC (Higher Order Component) to wrap protected components
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  return function WithAuthComponent(props: P) {
    return (
      <AuthGuard>
        <WrappedComponent {...props} />
      </AuthGuard>
    );
  };
}