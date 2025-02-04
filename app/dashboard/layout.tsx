'use client';

import {AuthGuard} from '@/components/auth/auth-guard';
import {DashboardHeader} from '@/components/layout/dashboard-header';
import {DashboardNav} from '@/components/layout/dashboard-nav';
import {DashboardSkeleton} from '@/components/layout/dashboard-skeleton';
import {Box, Drawer, IconButton, Stack, Toolbar, useMediaQuery, useTheme} from '@mui/material';
import {motion} from 'framer-motion';
import type {Route} from 'next';
import Link from 'next/link';
import {Suspense, useState} from 'react';
import {BarChart2, FileText, Home, Key, Menu, Settings, Tool, Users, X} from 'react-feather';

const DRAWER_WIDTH = 280;

const sidebarItems = [
  {title: 'Dashboard', href: '/dashboard' as Route, icon: Home},
  {title: 'Properties', href: '/dashboard/properties' as Route, icon: Key},
  {title: 'Tenants', href: '/dashboard/tenants' as Route, icon: Users},
  {title: 'Maintenance', href: '/dashboard/maintenance' as Route, icon: Tool},
  {title: 'Documents', href: '/dashboard/documents' as Route, icon: FileText},
  {title: 'Analytics', href: '/dashboard/analytics' as Route, icon: BarChart2},
  {title: 'Settings', href: '/dashboard/settings' as Route, icon: Settings},
];

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawer = (
    <Stack
      sx={{
        height: '100%',
        width: DRAWER_WIDTH,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{minHeight: '64px!important', px: 2}}>
        {isMobile && (
          <IconButton onClick={() => setMobileOpen(false)} sx={{ml: 'auto'}}>
            <X size={20} />
          </IconButton>
        )}
      </Toolbar>

      <Stack sx={{p: 2, gap: 1, flex: 1}}>
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.href}
              initial={{opacity: 0, x: -20}}
              animate={{opacity: 1, x: 0}}
              transition={{delay: index * 0.1}}
            >
              <Link href={item.href} passHref legacyBehavior>
                <Stack
                  component='a'
                  direction='row'
                  alignItems='center'
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    color: 'text.secondary',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'translateX(4px)',
                    },
                    '&.active': {
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      fontWeight: 600,
                    },
                  }}
                >
                  <Icon size={20} style={{marginRight: 12}} />
                  {item.title}
                </Stack>
              </Link>
            </motion.div>
          );
        })}
      </Stack>
    </Stack>
  );

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AuthGuard>
        <div className='flex h-screen'>
          <DashboardNav />
          <div className='flex flex-col flex-1 w-full'>
            <DashboardHeader />
            <main className='p-6'>{children}</main>
          </div>
        </div>
        <Box sx={{display: 'flex', minHeight: '100vh', bgcolor: 'background.default'}}>
          {/* Mobile Header */}
          {isMobile && (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: theme.zIndex.appBar,
                bgcolor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider',
                p: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconButton onClick={() => setMobileOpen(true)}>
                <Menu size={20} />
              </IconButton>
            </Box>
          )}

          {/* Desktop Drawer */}
          <Drawer
            variant='permanent'
            sx={{
              display: {xs: 'none', lg: 'block'},
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                bgcolor: 'background.paper',
                border: 'none',
                height: '100vh',
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Mobile Drawer */}
          <Drawer
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            sx={{
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                bgcolor: 'background.paper',
                border: 'none',
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Main Content */}
          <Box
            component='main'
            sx={{
              flexGrow: 1,
              width: {lg: `calc(100% - ${DRAWER_WIDTH}px)`},
              ml: {lg: `${DRAWER_WIDTH}px`},
              pt: {xs: 8, lg: 3},
              px: {xs: 2, sm: 3, lg: 4},
              pb: 3,
              minHeight: '100vh',
            }}
          >
            {children}
          </Box>
        </Box>
      </AuthGuard>
    </Suspense>
  );
}
