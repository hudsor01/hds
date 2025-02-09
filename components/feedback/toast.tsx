'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { X, AlertCircle, CheckCircle, Info } from 'react-feather'
import { Alert, IconButton, Snackbar } from '@mui/material'
import { useState, forwardRef, type ReactNode } from 'react'

const toastVariants = cva('flex items-center justify-between gap-2 rounded-lg shadow-lg', {
  variants: {
    variant: {
      default: 'bg-white text-gray-900 dark:bg-gray-800 dark:text-white',
      success: 'bg-green-50 text-green-900 dark:bg-green-900 dark:text-green-50',
      error: 'bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-50',
      warning: 'bg-yellow-50 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-50',
      info: 'bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default'

export interface ToastProps extends VariantProps<typeof toastVariants> {
  open: boolean
  onClose: () => void
  message: string
  autoHideDuration?: number
  icon?: ReactNode
  variant?: ToastVariant
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ variant = 'default', open, onClose, message, autoHideDuration = 6000, icon }, ref) => {
    const [isOpen, setIsOpen] = useState(open)

    const handleClose = () => {
      setIsOpen(false)
      onClose()
    }

    const getIcon = () => {
      if (icon) return icon
      switch (variant) {
        case 'success':
          return <CheckCircle className="h-5 w-5 text-green-500" />
        case 'error':
          return <X className="h-5 w-5 text-red-500" />
        case 'warning':
          return <AlertCircle className="h-5 w-5 text-yellow-500" />
        case 'info':
          return <Info className="h-5 w-5 text-blue-500" />
        default:
          return null
      }
    }

    return (
      <Snackbar
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          ref={ref}
          className={toastVariants({ variant })}
          severity={
            variant === 'default'
              ? undefined
              : (variant as 'success' | 'error' | 'warning' | 'info')
          }
          icon={getIcon()}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <X className="h-4 w-4" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Snackbar>
    )
  }
)

Toast.displayName = 'Toast'
