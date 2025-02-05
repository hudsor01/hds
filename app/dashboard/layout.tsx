'use client';

import {AuthGuard} from '@/components/auth/auth-guard';
import {DashboardHeader} from '@/components/layout/dashboard-header';
import {DashboardNav} from '@/components/layout/dashboard-nav';
import {Box, Drawer, Stack, useMediaQuery, useTheme} from '@mui/material';
import {useState} from 'react';

const SIDEBAR_WIDTH = 280;

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <AuthGuard>
      <Box sx={{display: 'flex', minHeight: '100vh'}}>
        <DashboardHeader onSidebarOpen={() => setSidebarOpen(true)} />

        <Box
          component='nav'
          sx={{
            width: {lg: SIDEBAR_WIDTH},
            flexShrink: {lg: 0},
          }}
        >
          {lgUp ? (
            <Drawer
              variant='permanent'
              sx={{
                display: {xs: 'none', lg: 'block'},
                '& .MuiDrawer-paper': {
                  width: SIDEBAR_WIDTH,
                  boxSizing: 'border-box',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                },
              }}
            >
              <Box sx={{px: 2, py: 3}}>
                <DashboardNav />
              </Box>
            </Drawer>
          ) : (
            <Drawer
              anchor='left'
              onClose={() => setSidebarOpen(false)}
              open={sidebarOpen}
              variant='temporary'
              sx={{
                display: {xs: 'block', lg: 'none'},
                '& .MuiDrawer-paper': {
                  width: SIDEBAR_WIDTH,
                  boxSizing: 'border-box',
                },
              }}
            >
              <Box sx={{px: 2, py: 3}}>
                <DashboardNav />
              </Box>
            </Drawer>
          )}
        </Box>

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            py: 8,
            px: 2,
            width: {lg: `calc(100% - ${SIDEBAR_WIDTH}px)`},
          }}
        >
          <Stack spacing={3}>
            <Box sx={{height: 64}} />
            {children}
          </Stack>
        </Box>
      </Box>
    </AuthGuard>
  );
}
