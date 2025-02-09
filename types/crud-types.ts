import type { ReactNode } from 'react'

export interface CrudOptions<T> {
  resourceName: string
  endpoint: string
  onCreateSuccess?: (data: T) => void
  onUpdateSuccess?: (data: T) => void
  onDeleteSuccess?: () => void
}

export interface Entity {
  id: string
  [key: string]: any
}

export interface UseDashboardCrudOptions<T extends Entity> {
  table: string
  select?: string
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export interface BaseCrudItem {
  id: string
  [key: string]: unknown
}

export interface CrudContainerProps<T extends BaseCrudItem> {
  title: string
  children: ReactNode
  loading?: boolean
  className?: string
}
