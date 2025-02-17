'use client'

import { Alert, AlertTitle, Stack, IconButton, useTheme } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import type { Toast } from '@/types/animation'
import { useToast } from '@/hooks/use-toast'
import { useAnimation } from '@/components/providers/animation-provider'

const MotionAlert = motion(Alert)

interface NotificationProviderProps {
  position?: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right' | 'center'
  }
  maxToasts?: number
  autoHideDuration?: number
}

export function NotificationProvider({
  position = { vertical: 'top', horizontal: 'right' },
  maxToasts = 3,
  autoHideDuration = 5000
}: NotificationProviderProps) {
  const theme = useTheme()
  const { toasts, removeToast } = useToast()
  const { reduceMotion } = useAnimation()

  const visibleToasts = toasts?.slice(0, maxToasts)

  const getAlertStyles = (type: Toast['type']) => {
    const baseStyles = {
      width: '100%',
      minWidth: '300px',
      maxWidth: '500px',
      boxShadow: theme.shadows[3],
      borderRadius: theme.shape.borderRadius,
      border: '1px solid'
    }

    const colorMap = {
      success: {
        backgroundColor: theme.palette.success.light,
        borderColor: theme.palette.success.main
      },
      error: {
        backgroundColor: theme.palette.error.light,
        borderColor: theme.palette.error.main
      },
      warning: {
        backgroundColor: theme.palette.warning.light,
        borderColor: theme.palette.warning.main
      },
      info: {
        backgroundColor: theme.palette.info.light,
        borderColor: theme.palette.info.main
      }
    }

    return {
      ...baseStyles,
      ...(type && colorMap[type])
    }
  }

  const toastAnimation = {
    hidden: {
      opacity: 0,
      y: position.vertical === 'top' ? -20 : 20,
      x: position.horizontal === 'right' ? 20 : position.horizontal === 'left' ? -20 : 0
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.2,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: reduceMotion ? 0 : 0.1,
        ease: 'easeIn'
      }
    }
  }

  return (
    <Stack
      spacing={1}
      sx={{
        position: 'fixed',
        [position.vertical]: 24,
        [position.horizontal]: 24,
        zIndex: theme.zIndex.snackbar,
        pointerEvents: 'none'
      }}
    >
      <AnimatePresence mode="sync" initial={false}>
        {visibleToasts?.map((toast: Toast) => {
          // Auto-hide the toast after duration
          if (autoHideDuration) {
            setTimeout(() => removeToast(toast.id), autoHideDuration)
          }

          return (
            <MotionAlert
              key={toast.id}
              severity={toast.type || 'info'}
              variant="filled"
              sx={{
                ...getAlertStyles(toast.type),
                '& .MuiAlert-message': {
                  width: '100%'
                },
                pointerEvents: 'auto'
              }}
              variants={toastAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              action={
                <IconButton aria-label="close" color="inherit" size="small" onClick={() => removeToast(toast.id)}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {toast.title && <AlertTitle sx={{ fontWeight: 600 }}>{toast.title}</AlertTitle>}
              {toast.description}
            </MotionAlert>
          )
        })}
      </AnimatePresence>
    </Stack>
  )
}

// Export for type inference
export type { NotificationProviderProps }
