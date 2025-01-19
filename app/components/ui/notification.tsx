'use client'

import type { Notification } from '@/hooks/use-notification'
import { useNotification } from '@/hooks/use-notification'
import { Alert, AlertTitle, Snackbar, Stack } from '@mui/material'

export function NotificationProvider() {
  const { notifications, removeNotification } = useNotification()

  return (
    <Stack spacing={2} sx={{ position: 'fixed', top: 24, right: 24, zIndex: 2000 }}>
      {notifications.map((notification: Notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ position: 'relative', mt: 0 }}
        >
          <Alert
            severity={notification.severity || 'info'}
            onClose={() => removeNotification(notification.id)}
            variant="filled"
            elevation={6}
            sx={{ width: '100%', minWidth: '300px' }}
          >
            {notification.title && (
              <AlertTitle>{notification.title}</AlertTitle>
            )}
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  )
}
