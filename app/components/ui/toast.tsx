'use client'

import { Alert, AlertTitle, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'
import { create } from 'zustand'
import type { Toast } from '../../hooks/use-toast'

interface ToastProps extends Toast {
  onCloseAction: () => void
}

export function Toast({
  title,
  description,
  severity = 'info',
  duration = 5000,
  onCloseAction
}: ToastProps) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        onCloseAction()
      }, 300) // Allow exit animation to complete
      return () => clearTimeout(timer)
    }
    return () => {}  // Return empty cleanup function when open is true
  }, [open, onCloseAction])

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        severity={severity}
        onClose={() => setOpen(false)}
        sx={{ minWidth: '300px' }}
        elevation={6}
        variant="filled"
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {description}
      </Alert>
    </Snackbar>
  )
}

interface ToastStore {
  toast: (props: { title: string; description?: string }) => void
}

export const useToast = create<ToastStore>((set) => ({
  toast: ({ title, description }) => {
    // Implement toast notification logic here
    console.log('Toast:', title, description)
  },
}))
