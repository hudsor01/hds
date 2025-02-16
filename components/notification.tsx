'use client'

import { Alert, AlertTitle, Stack } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import type { Toast } from '@/types/animation'
import { useToast } from '@/hooks/use-toast'
import { useAnimation } from '@/components/animation-provider'

const MotionAlert = motion(Alert)

interface NotificationProviderProps {
  position?: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right' | 'center'
  }
  maxToasts?: number
}

export function NotificationProvider({
  position = { vertical: 'top', horizontal: 'right' },
  maxToasts = 3
}: NotificationProviderProps) {
  const { toasts, removeToast } = useToast()
  const { reduceMotion } = useAnimation()

  const visibleToasts = toasts?.slice(0, maxToasts)

  const toastAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: reduceMotion ? 0 : 0.1
      }
    }
  }

  return (
    <Stack
      spacing={2}
      sx={{
        position: 'fixed',
        [position.vertical]: 24,
        [position.horizontal]: 24,
        zIndex: 2000
      }}
    >
      <AnimatePresence mode="sync" initial={false}>
        {visibleToasts?.map((toast: Toast) => (
          <MotionAlert
            key={toast.id}
            onClose={() => removeToast(toast.id)}
            severity={toast.type || 'info'}
            variants={toastAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            sx={{ width: '100%', mb: 2 }}
          >
            {toast.title && <AlertTitle>{toast.title}</AlertTitle>}
            {toast.description}
          </MotionAlert>
        ))}
      </AnimatePresence>
    </Stack>
  )
}
