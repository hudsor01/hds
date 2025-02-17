'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Snackbar, Alert, AlertTitle, Box, IconButton, Typography, Button, useTheme, type AlertColor } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import type { Toast, ToastContextValue, ToastProviderProps, ToastOptions } from '@/types/components'
import { ToastContext } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'

const DEFAULT_DURATION = 5000
const MAX_TOASTS = 3

const variants = {
  initial: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 20 : -20
  }),
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.2 },
      y: { duration: 0.2, type: 'spring', stiffness: 200, damping: 20 }
    }
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
    transition: {
      opacity: { duration: 0.2 },
      x: { duration: 0.2 }
    }
  })
}

const MotionAlert = motion(Alert)

export function ToastProvider({
  children,
  maxToasts = MAX_TOASTS,
  defaultDuration = DEFAULT_DURATION,
  position = {
    vertical: 'bottom',
    horizontal: 'right'
  }
}: ToastProviderProps) {
  const theme = useTheme()
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback(
    (message: string, options?: ToastOptions) => {
      const id = Math.random().toString(36).slice(2, 9)

      setToasts(current => {
        const newToast: Toast = {
          id,
          message,
          type: options?.type || 'info',
          title: options?.title,
          duration: options?.duration || defaultDuration,
          action: options?.action,
          persist: options?.persist || false
        }

        // Remove oldest non-persistent toast if we're at max capacity
        if (current.length >= maxToasts) {
          const nonPersistentIndex = current.findIndex(toast => !toast.persist)
          if (nonPersistentIndex !== -1) {
            const updatedToasts = [...current]
            updatedToasts.splice(nonPersistentIndex, 1)
            return [...updatedToasts, newToast]
          }
        }

        return [...current, newToast]
      })

      return id
    },
    [defaultDuration, maxToasts]
  )

  const removeToast = useCallback((id: string) => {
    setToasts(current => current.filter(toast => toast.id !== id))
  }, [])

  const removeAll = useCallback(() => {
    setToasts([])
  }, [])

  // Auto dismiss non-persistent toasts
  useEffect(() => {
    const timeouts: number[] = []

    toasts.forEach(toast => {
      if (!toast.persist && toast.duration !== undefined) {
        const timeout = window.setTimeout(() => {
          removeToast(toast.id)
        }, toast.duration)
        timeouts.push(timeout)
      }
    })

    return () => {
      timeouts.forEach(timeout => {
        window.clearTimeout(timeout)
      })
    }
  }, [toasts, removeToast])

  const contextValue: ToastContextValue = {
    addToast,
    removeToast,
    removeAll,
    toasts
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Box
        sx={{
          position: 'fixed',
          [position.vertical]: theme.spacing(2),
          [position.horizontal]: theme.spacing(2),
          zIndex: theme.zIndex.snackbar,
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        <AnimatePresence mode="sync" initial={false}>
          {toasts.map(toast => (
            <MotionAlert
              key={toast.id}
              severity={toast.type}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={position.vertical === 'top' ? 1 : -1}
              sx={{
                minWidth: 300,
                maxWidth: 500,
                boxShadow: theme.shadows[3],
                backgroundColor:
                  theme.palette.mode === 'light'
                    ? theme.palette[toast.type || 'info'].light
                    : theme.palette[toast.type || 'info'].dark,
                color: theme.palette.getContrastText(
                  theme.palette[toast.type || 'info'][theme.palette.mode === 'light' ? 'light' : 'dark']
                ),
                '& .MuiAlert-message': {
                  flex: 1
                },
                border: `1px solid ${theme.palette[toast.type || 'info'].main}`
              }}
              action={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {toast.action && (
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => {
                        toast.action?.onClick()
                        if (!toast.persist) {
                          removeToast(toast.id)
                        }
                      }}
                    >
                      {toast.action.label}
                    </Button>
                  )}
                  <IconButton
                    size="small"
                    color="inherit"
                    onClick={() => {
                      removeToast(toast.id)
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
            >
              {toast.title && <AlertTitle sx={{ fontWeight: 600 }}>{toast.title}</AlertTitle>}
              <Typography variant="body2">{toast.message}</Typography>
            </MotionAlert>
          ))}
        </AnimatePresence>
      </Box>
    </ToastContext.Provider>
  )
}
