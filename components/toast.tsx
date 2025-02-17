'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { Alert, Snackbar, AlertTitle } from '@mui/material'
import type { AlertColor } from '@mui/material'
import { type Toast, type ToastContextType, type ToastType } from '@/types/components'

const ToastContext = createContext<ToastContextType | undefined>(undefined)

const severityMap: Record<ToastType | 'default', AlertColor> = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
  default: 'info'
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback(({ title, description, duration = 5000, type }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9)
    const newToast: Toast = { id, title: title || '', description, duration, type: type || 'info' }

    setToasts(current => [...current, newToast])

    // Auto-dismiss after duration
    setTimeout(() => {
      setToasts(current => current.filter(t => t.id !== id))
    }, duration)

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(current => current.filter(toast => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast: addToast, removeToast }}>
      {children}
      {toasts.map(toast => (
        <Snackbar
          key={toast.id}
          open={true}
          autoHideDuration={toast.duration ?? null}
          onClose={() => {
            removeToast(toast.id)
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => {
              removeToast(toast.id)
            }}
            severity={severityMap[toast.type || 'default']}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {toast.title && <AlertTitle>{toast.title}</AlertTitle>}
            {toast.description}
          </Alert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
