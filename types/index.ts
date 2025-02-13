// Global types needed for Next.js and Express
import { NextComponentType, NextPageContext } from 'next'
import { AppInitialProps } from 'next/app'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { ReactNode } from 'react'

export * from './db.types'

// General Types
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// Auth Types
export type Roles = 'admin' | 'moderator' | 'user'

export interface CustomJwtSessionClaims {
  metadata: {
    role?: Roles
  }
}

export interface AuthUser {
  id: string
  email: string
  name?: string
  role: Roles
  metadata?: Record<string, unknown>
}

// UI Component Types
export interface BaseGridProps<T> {
  data: T[]
  isLoading?: boolean
  pageSize?: number
  onRowClick?: (row: T) => void
}

export interface FeatureCardProps {
  title: string
  description: string
  icon: Icon
  delay?: number
  onView?: () => void
}

// Notification Types
export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
  metadata?: Record<string, unknown>
}

// Payment Types
export interface PaymentMethod {
  id: string
  type: 'card' | 'bank_account'
  last4: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'succeeded' | 'failed'
  paymentMethod?: PaymentMethod
  metadata?: Record<string, unknown>
}

// Team Types
export interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  avatar?: string
  status: 'active' | 'inactive'
  joinedAt: Date
}

// Dashboard Types
export interface DashboardMetrics {
  properties: number
  tenants: number
  maintenanceRequests: number
  occupancyRate: number
  revenue: {
    current: number
    previous: number
    change: number
  }
  expenses: {
    current: number
    previous: number
    change: number
  }
}

export interface ChartData {
  label: string
  value: number
  previousValue?: number
  change?: number
}

// Common Types
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
  metadata?: {
    total?: number
    page?: number
    limit?: number
  }
}

// CRUD Types
export interface CrudOperations<T> {
  create: (data: Partial<T>) => Promise<T>
  read: (id: string) => Promise<T>
  update: (id: string, data: Partial<T>) => Promise<T>
  delete: (id: string) => Promise<void>
  list: (params: PaginationParams) => Promise<ApiResponse<T[]>>
}

// Command Menu Types
export interface CommandMenuItem {
  id: string
  label: string
  icon?: ReactNode
  shortcut?: string
  section?: string
  action?: () => void
}

// Navigation Types
export interface NavigationItem {
  label: string
  href: string
  icon?: ReactNode
  children?: NavigationItem[]
  isExternal?: boolean
}

// Badge Types
export interface BadgeProps {
  label: string
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  variant?: 'filled' | 'outlined'
  size?: 'small' | 'medium' | 'large'
}

// Webhook Types
export interface WebhookEvent<T = unknown> {
  id: string
  type: string
  data: T
  timestamp: string
  signature?: string
}

// Analytics Types
export interface AnalyticsEvent {
  name: string
  properties?: Record<string, unknown>
  timestamp?: Date
  userId?: string
  sessionId?: string
}

export interface AnalyticsConfig {
  enabled: boolean
  trackingId?: string
  debug?: boolean
}

// Maintenance Request Types
export interface MaintenanceRequestFilters {
  status?: string[]
  priority?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  assignedTo?: string[]
}

// About Page Types
export interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

// API Route Types
export type ApiHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<T>
) => Promise<void> | void

export interface ApiError {
  code: string
  message: string
  details?: unknown
}

export interface ApiSuccess<T> {
  data: T
  metadata?: Record<string, unknown>
}

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string | null
        sessionId: string | null
        session?: {
          id: string
          userId: string
          status: string
        }
        claims?: Record<string, unknown>
      }
      user?: AuthUser | null
    }
  }
}

// MUI Theme Augmentation
declare module '@mui/material/styles' {
  interface Components {
    MuiCharts?: {
      styleOverrides?: {
        tick?: React.CSSProperties
      }
    }
  }
}

// Package Declarations
declare module '@next/eslint-plugin-next'
declare module 'eslint-plugin-react-hooks'
declare module 'eslint-plugin-jsx-a11y'
declare module 'eslint-config-prettier'
declare module '@mui/x-charts'

// Export Icon type used in FeatureCardProps
import type { Icon } from 'react-feather'
export type { Icon }

// Declare global types
declare global {
  interface Window {
    analytics?: {
      track: (event: string, properties?: Record<string, unknown>) => void
      identify: (userId: string, traits?: Record<string, unknown>) => void
    }
  }
}

export interface Property {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  units: PropertyUnit[]
  user_id: string
  created_at: Date
  updated_at: Date
}

export interface PropertyUnit {
  id: string
  property_id: string
  number: string
  status: 'vacant' | 'occupied' | 'maintenance'
}

export interface PropertyRow extends Omit<Property, 'units'> {
  property_type: string
  property_status: string
  rent_amount: number
}

export interface Trend {
  value: number
  direction: 'up' | 'down' | 'neutral'
}

export interface EmailMetrics {
  template: string
  sent: number
  opened: number
  clicked: number
  openRate: number
  clickRate: number
}

export interface EmailMetricsProps {
  data: EmailMetrics[]
  isLoading: boolean
  error?: Error
}

export interface TimeSeriesData {
  date: string
  value: number
}

export interface LeaseFormProps {
  initialData?: {
    start_date: Date
    end_date: Date
    rent_amount: number
    security_deposit: number
    status: 'active' | 'pending' | 'expired' | 'terminated'
    property_id: string
    unit_id: string
    tenant_id: string
    tenant_name: string
    payment_frequency: 'monthly' | 'quarterly' | 'annually'
  }
  onSuccess?: () => void
}

export interface MaintenanceRequest {
  id?: string
  property_id: string
  unit_id: string
  title: string
  description: string
  priority: MaintenancePriority
  status: 'open' | 'in_progress' | 'completed' | 'cancelled'
  created_at?: Date
  updated_at?: Date
}

export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent'

export interface Session {
  id: string
  user_id: string
  expires: Date
  session_token: string
  last_active: Date
}

export interface PropertyRow {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  property_type: string
  property_status: string
  rent_amount: number
  user_id: string
  created_at: string
  updated_at: string
}

export interface Trend {
  value: number
  direction: 'up' | 'down' | 'neutral'
}

export interface EmailMetricsProps {
  data: Array<{
    template: string
    sent: number
    opened: number
    clicked: number
    openRate: number
    clickRate: number
  }>
  isLoading: boolean
  error?: Error
}

export interface TimeSeriesData {
  date: string
  value: number
}

export interface LeaseFormProps {
  initialData?: Lease
  onSuccess?: () => void
}

export interface MaintenanceRequest {
  id: string
  property_id: string
  unit_id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export type NewMaintenanceRequest = Omit<
  MaintenanceRequest,
  'id' | 'created_at' | 'updated_at' | 'status'
>

export interface PropertyUnit {
  id: string
  number: string
  property_id: string
}

export interface Lease {
  id: string
  property_id: string
  unit_id: string
  tenant_id: string
  tenant_name: string
  start_date: Date
  end_date: Date
  rent_amount: number
  security_deposit: number
  payment_frequency: 'monthly' | 'quarterly' | 'annually'
  status: 'active' | 'pending' | 'expired' | 'terminated'
  created_at: Date
  updated_at: Date
  documents?: string[]
}
