'use client'

import { useToast } from '@/hooks/use-toast'
import { Alert, AlertTitle, Stack } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { ErrorBoundary } from 'react-error-boundary'
import { slideInOut } from '@/lib/animation-variants'
import { useAnimation } from '@/components/providers/animation-provider'

const MotionAlert = motion(Alert)

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

function ToastErrorFallback({ error }: { error: Error }) {
  return (
    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
      <AlertTitle>Error</AlertTitle>
      {error.message}
    </Alert>
  )
}

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
  const { reduceMotion, duration } = useAnimation()
  const visibleToasts = toasts?.slice(0, maxToasts)

  const animatedVariants = {
    ...slideInOut,
    visible: {
      ...slideInOut.visible,
      transition: {
        ...slideInOut.visible.transition,
        duration: reduceMotion ? 0 : duration
      }
    }
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Stack
        spacing={2}
        sx={{
          position: 'fixed',
          [position.vertical]: 24,
          [position.horizontal]: 24,
          zIndex: 2000,
          pointerEvents: 'none'
        }}
      >
        <AnimatePresence mode="sync" initial={false}>
          {visibleToasts?.map(toast => (
            <motion.div
              key={toast.id}
              layout
              style={{ pointerEvents: 'auto' }}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={animatedVariants}
            >
              <ErrorBoundary FallbackComponent={ToastErrorFallback}>
                <MotionAlert
                  onClose={() => removeToast(toast.id)}
                  severity={toast.type || 'info'}
                  sx={{ width: '100%', mb: 2 }}
                  role="alert"
                  aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
                >
                  {toast.title && <AlertTitle>{toast.title}</AlertTitle>}
                  {toast.description}
                </MotionAlert>
              </ErrorBoundary>
            </motion.div>
          ))}
        </AnimatePresence>
      </Stack>
    </motion.div>
  )
}
