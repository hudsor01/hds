// components/layout/dashboard-layout.tsx
import { UserButton } from '@clerk/nextjs'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { useState } from 'react'
import { NotificationsMenu } from '../notifications/notifications-menu'
import { DashboardSidebar } from './dashboard-sidebar'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          boxShadow: 1
        }}
      >
        <Toolbar sx={{ justifyContent: 'flex-end', gap: 2 }}>
          <IconButton
            color="inherit"
            onClick={(e) => setNotificationsAnchor(e.currentTarget)}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: {
                  width: 40,
                  height: 40
                }
              }
            }}
          />
        </Toolbar>
      </AppBar>

      <DashboardSidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: 10,
          backgroundColor: 'background.default'
        }}
      >
        {children}
      </Box>

      <NotificationsMenu
        anchorEl={notificationsAnchor}
        onClose={() => setNotificationsAnchor(null)}
      />
    </Box>
  );
}
