import { type ReactNode, type ErrorInfo } from 'react'
import type { AlertColor } from '@mui/material'

// Base Props
export interface BaseProps {
  children?: ReactNode
  className?: string
}

// Dialog Types
export interface DialogProps extends BaseProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  footer?: ReactNode
}

// Grid Types
export interface BaseGridProps<T> {
  data: T[]
  isLoading?: boolean
  pageSize?: number
  onRowClick?: (row: T) => void
}

// Activity Types
export interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: Date
  type: ActivityType
  metadata?: Record<string, string>
}

export type ActivityType = 'property' | 'payment' | 'maintenance' | 'tenant'

export interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: Date
  metadata?: Record<string, string>
}

// Typography Types
export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

// Toast System Types
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  title?: string
  message: string
  type?: ToastType
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  persist?: boolean
}

export interface ToastOptions {
  title?: string
  type?: ToastType
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  persist?: boolean
}

export interface ToastContextValue {
  addToast: (message: string, options?: ToastOptions) => string
  removeToast: (id: string) => void
  removeAll: () => void
  toasts: Toast[]
}

export interface ToastProviderProps {
  children: React.ReactNode
  maxToasts?: number
  defaultDuration?: number
  position?: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right' | 'center'
  }
}

// Error Boundary Types
export interface Props {
  children: ReactNode
  fallback?: ReactNode
}

export interface State {
  hasError: boolean
  error?: Error | undefined
  errorInfo?: ErrorInfo | undefined
}

// Input Types
export interface TextInputProps extends Omit<TextFieldProps, 'variant'> {
  label: string
  type?: string
  value: string
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
}

export type TextFieldProps = {
  label: string
  type?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
}

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

// Stats Types
export interface StatCardProps {
  title: string
  value: string
  trend: string
  trendLabel: string
  trendDirection: string
  icon: React.ComponentType<{ className?: string }>
}

// Re-export for convenience
export type { AlertColor }
