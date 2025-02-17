import { type ReactNode, type ErrorInfo } from 'react'

export interface BaseProps {
  children?: ReactNode
  className?: string
}

export interface DialogProps extends BaseProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  footer?: ReactNode
}

export interface BaseGridProps<T> {
  data: T[]
  isLoading?: boolean
  pageSize?: number
  onRowClick?: (row: T) => void
}

export interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: Date
  type: 'property' | 'payment' | 'maintenance' | 'tenant'
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

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export interface Toast {
  id: string
  title?: string
  description: string
  duration?: number
  type?: ToastType
}

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastContextType {
  toasts: Toast[]
  toast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
}

export interface Props {
  children: ReactNode
  fallback?: ReactNode
}

export interface State {
  hasError: boolean
  error?: Error | undefined
  errorInfo?: ErrorInfo | undefined
}

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

export interface StatCardProps {
  title: string
  value: string
  trend: string
  trendLabel: string
  trendDirection: string
  icon: React.ComponentType<{ className?: string }>
}
