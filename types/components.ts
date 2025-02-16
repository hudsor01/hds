import { type ReactNode } from 'react'

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
