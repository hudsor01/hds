'use client'

import { Alert, AlertTitle, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'
import type { Toast } from '../../hooks/use-toast'

interface ToastProps extends Toast {
  onClose: () => void
}

export function Toast({
  title,
  description,
  severity = 'info',
  duration = 5000,
  onClose
}: ToastProps) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        onClose()
      }, 300) // Allow exit animation to complete
      return () => clearTimeout(timer)
    }
  }, [open, onClose])

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
