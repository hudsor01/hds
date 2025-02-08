'use client';

import { Box } from '@mui/material';
import { Suspense } from 'react';
import LoadingState from '@/components/loading/loading-state';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        router.push('/login');
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarNav />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          ml: { sm: '240px' },
          overflow: 'auto',
        }}
      >
        <Suspense fallback={<LoadingState />}>{children}</Suspense>
      </Box>
    </Box>
  );
}
