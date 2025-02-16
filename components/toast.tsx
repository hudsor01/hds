'use client'

import { cn } from '@/lib/utils'
import { Error as ErrorIcon, Info as InfoIcon, Warning as WarningIcon } from '@mui/icons-material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import type { ToastProps as SonnerToastProps } from 'sonner'
import { Toaster as SonnerToaster, toast } from 'sonner'

// Define toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info'

// Define toast placement
export type ToastPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'

// Define toast data
export interface ToastData {
  title?: string
  message: string
  type?: ToastType
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  onDismiss?: () => void
  icon?: React.ReactNode
  id?: string
}

// Define toast options
export interface ToastOptions extends Omit<SonnerToastProps, 'message'> {
  preserveOnUnmount?: boolean
}

// Define toast styles based on type
const toastStyles: Record<ToastType, { icon: React.ReactNode; style: React.CSSProperties }> = {
  success: {
    icon: <CheckCircleIcon className="h-5 w-5 text-success" />,
    style: {
      borderLeft: '4px solid var(--color-success)',
    }
  },
  error: {
    icon: <ErrorIcon className="h-5 w-5 text-error" />,
    style: {
      borderLeft: '4px solid var(--color-error)',
    }
  },
  warning: {
    icon: <WarningIcon className="h-5 w-5 text-warning" />,
    style: {
      borderLeft: '4px solid var(--color-warning)',
    }
  },
  info: {
    icon: <InfoIcon className="h-5 w-5 text-info" />,
    style: {
      borderLeft: '4px solid var(--color-info)',
    }
  }
}

// Base toast styles
const baseToastStyles: React.CSSProperties = {
  background: 'var(--color-background)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-foreground)',
  padding: '1rem',
  borderRadius: '0.5rem',
  fontSize: '0.875rem',
  boxShadow: 'var(--shadow-sm)',
}

// Create toast function
export function showToast({
  title,
  message,
  type = 'info',
  duration = 5000,
  action,
  onDismiss,
  icon,
  id,
  ...options
}: ToastData & ToastOptions): string {
  const toastId = id || Math.random().toString(36).substr(2, 9)
  
  const toastConfig = {
    id: toastId,
    duration,
    className: cn(
      'group',
      options.className
    ),
    style: {
      ...baseToastStyles,
      ...toastStyles[type].style,
      ...options.style,
    },
    onDismiss: () => {
      onDismiss?.()
      options.onDismiss?.()
    },
    icon: icon || toastStyles[type].icon,
    action: action && {
      label: action.label,
      onClick: () => {
        action.onClick()
        toast.dismiss(toastId)
      },
    },
  }

  switch (type) {
    case 'success':
      toast.success(title ? `${title}\n${message}` : message, toastConfig)
      break
    case 'error':
      toast.error(title ? `${title}\n${message}` : message, toastConfig)
      break
    case 'warning':
      toast(title ? `${title}\n${message}` : message, { ...toastConfig, icon: toastStyles.warning.icon })
      break
    case 'info':
    default:
      toast(title ? `${title}\n${message}` : message, { ...toastConfig, icon: toastStyles.info.icon })
  }

  return toastId
}

// Toaster component with custom styles
export function Toaster({
  position = 'bottom-right',
  ...props
}: {
  position?: ToastPlacement
  [key: string]: any
}): JSX.Element {
  return (
    <SonnerToaster
      position={position}
      toastOptions={{
        style: baseToastStyles,
        className: 'group',
      }}
      {...props}
    />
  )
}

// Export helper functions
export const dismissToast = toast.dismiss
export const clearToasts = toast.dismiss
export const promiseToast = toast.promise

// Export types
export type { SonnerToastProps }
