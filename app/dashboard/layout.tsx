'use client';

import {AuthGuard} from '@/components/auth/auth-guard';
import {DashboardHeader} from '@/components/layout/dashboard-header';
import {DashboardNav} from '@/components/layout/dashboard-nav';
import {Box, Drawer, Stack, useMediaQuery, useTheme} from '@mui/material';
import {useState} from 'react';

const SIDEBAR_WIDTH = 280;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({children}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <AuthGuard>
      <Box sx={{display: 'flex', minHeight: '100vh'}}>
        <DashboardHeader
          onSidebarOpen={() => setSidebarOpen(true)}
          onSidebarToggle={handleSidebarToggle}
          sidebarCollapsed={sidebarCollapsed}
        />

        <Box
          component='nav'
          sx={{
            width: {
              lg: sidebarCollapsed ? 80 : SIDEBAR_WIDTH,
            },
            flexShrink: {lg: 0},
            transition: theme.transitions.create('width', {
              duration: theme.transitions.duration.standard,
            }),
          }}
        >
          {lgUp ? (
            <Drawer
              variant='permanent'
              sx={{
                display: {xs: 'none', lg: 'block'},
                '& .MuiDrawer-paper': {
                  width: sidebarCollapsed ? 80 : SIDEBAR_WIDTH,
                  boxSizing: 'border-box',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                  transition: theme.transitions.create('width', {
                    duration: theme.transitions.duration.standard,
                  }),
                  overflowX: 'hidden',
                },
              }}
            >
              <Box sx={{px: sidebarCollapsed ? 1 : 2, py: 3}}>
                <DashboardNav collapsed={sidebarCollapsed} />
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
                  overflowX: 'hidden',
                },
              }}
            >
              <Box sx={{px: 2, py: 3}}>
                <DashboardNav collapsed={false} />
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
            width: {
              lg: `calc(100% - ${sidebarCollapsed ? 80 : SIDEBAR_WIDTH}px)`,
            },
            transition: theme.transitions.create(['width', 'margin'], {
              duration: theme.transitions.duration.standard,
            }),
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
