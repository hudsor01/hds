import type { GridColDef } from '@mui/x-data-grid'

export interface BaseEntity {
  id: string | number
  createdAt?: Date
  updatedAt?: Date
}

export interface BaseTableProps<T extends BaseEntity> {
  data: T[]
  isLoading?: boolean
  columns: GridColDef[]
  pageSize?: number
  onRowClick?: (row: T) => void
}

export interface BaseResponse<T> {
  data: T
  error?: string
  message?: string
}

export interface BaseQueryParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}
