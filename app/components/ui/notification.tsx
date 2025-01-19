'use client'

import { Alert, AlertTitle, Snackbar, Stack } from '@mui/material'
import type { Toast } from '../../hooks/use-toast'
import { useToast } from '../../hooks/use-toast'

export function NotificationProvider() {
  const { toasts, removeToast } = useToast()

  return (
    <Stack spacing={2} sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2000 }}>
      {toasts.map((toast: Toast) => (
        <Snackbar
          key={toast.id}
          open={true}
          autoHideDuration={toast.duration || 5000}
          onClose={() => removeToast(toast.id)}
        >
          <Alert
            onClose={() => removeToast(toast.id)}
            severity={toast.severity || 'info'}
            sx={{ width: '100%' }}
          >
            {toast.title && <AlertTitle>{toast.title}</AlertTitle>}
            {toast.description}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  )
}
