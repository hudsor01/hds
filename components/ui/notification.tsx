'use client';

import {useToast} from '@/hooks/use-toast';
import {Alert, AlertTitle, Snackbar, Stack} from '@mui/material';

export function NotificationProvider() {
  const {toasts, removeToast} = useToast();

  return (
    <Stack spacing={2} sx={{position: 'fixed', bottom: 24, right: 24, zIndex: 2000}}>
      {toasts.map(toast => (
        <Snackbar
          key={toast.id}
          open
          autoHideDuration={toast.duration || 5000}
          onClose={() => removeToast(toast.id)}
        >
          <Alert onClose={() => removeToast(toast.id)} severity='info' sx={{width: '100%'}}>
            <AlertTitle>{toast.title}</AlertTitle>
            {toast.description}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
}
