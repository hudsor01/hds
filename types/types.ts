import { ReactNode } from 'react'
import { MotionProps, Variant, Variants } from 'framer-motion'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { Prisma } from '@prisma/client'

// Auth & Account related types
export namespace Auth {
  export type User = {
    id: string
    email: string
    full_name?: string
    created_at: string
    updated_at: string
  }

  export type Subscription = {
    id: string
    status: string
    price_id?: string
    quantity?: number
    cancel_at_period_end?: boolean
    created: string
    current_period_end: string
    current_period_start: string
    prices?: {
      products?: any
    }
  }

  export type Role = 'admin' | 'moderator' | 'user'
  export type PermissionLevel = 'none' | 'read' | 'write' | 'admin'
}

// UI related types
export namespace UI {
  export interface ComponentProps {
    className?: string
    style?: React.CSSProperties
    children?: ReactNode
  }

  export type Theme = {
    mode: 'light' | 'dark' | 'system'
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  }

  export type Size = 'small' | 'medium' | 'large'
  export type ButtonVariant = 'contained' | 'outlined' | 'text'

  export type Toast = {
    type: 'success' | 'error' | 'warning' | 'info'
    position?:
      | 'top-right'
      | 'top-left'
      | 'bottom-right'
      | 'bottom-left'
      | 'top-center'
      | 'bottom-center'
    message: string
    duration?: number
  }

  export type Animation = {
    config: {
      duration?: number
      delay?: number
      ease?: string | number[]
      repeat?: number
      repeatType?: 'loop' | 'reverse' | 'mirror'
    }
    variants?: Variants
  }
}

// Form related types
export namespace Forms {
  export type State = {
    isSubmitting: boolean
    error: string | null
    success: boolean
  }

  export type Validation = {
    rule: (value: any) => boolean | Promise<boolean>
    message: string
  }

  export interface NameFormProps {
    userName: string
    userId: string
  }

  export interface EmailFormProps {
    email: string
  }
}

// Realtime related types
export namespace Realtime {
  export type Channel = {
    id: string
    topic: string
    event: string
  }

  export type PresenceState = {
    userId: string
    status: 'online' | 'away' | 'offline'
    lastSeen?: Date
    metadata?: Record<string, any>
  }

  export type Subscription<T = any> = {
    channelId: string
    callback: (payload: T) => void
    errorHandler?: (error: Error) => void
  }

  export type UpdateEvent<T = any> = DB.RealtimeEvent<T>
}

// Notification related types
export namespace Notifications {
  export type Preferences = {
    email: boolean
    push: boolean
    sms: boolean
    inApp: boolean
  }

  export type Template = {
    id: string
    title: string
    body: string
    type: UI.Toast['type']
    action?: {
      label: string
      url: string
    }
  }

  export type Item = {
    id: string
    userId: string
    templateId: string
    data: Record<string, any>
    read: boolean
    createdAt: Date
    readAt?: Date
    expiresAt?: Date
  }

  export type State = {
    notifications: Item[]
    unreadCount: number
    isLoading: boolean
    error?: string
  }
}

// API & Services related types
export namespace API {
  export type Response<T = any> = {
    success: boolean
    data?: T
    error?: string
    code?: string
  }

  export type QueryParams = {
    page?: number
    limit?: number
    offset?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    search?: string
    filters?: Record<string, any>
  }

  export type EmailConfig = {
    from: string
    replyTo?: string
    templates: Record<
      string,
      {
        subject: string
        body: string
        variables?: string[]
      }
    >
  }

  export type Payment = {
    method: {
      id: string
      type: 'card' | 'bank_account'
      last4: string
      expMonth?: number
      expYear?: number
      isDefault: boolean
    }
  }
}

// Database related types
export namespace DB {
  export type Config = {
    url: string
    ssl?: boolean
    maxConnections?: number
  }

  export type QueryOptions = {
    include?: Record<string, boolean>
    select?: Record<string, boolean>
    where?: Record<string, any>
    orderBy?: Record<string, 'asc' | 'desc'>
    take?: number
    skip?: number
  }

  export type RealtimeEvent<T = any> = {
    type: 'INSERT' | 'UPDATE' | 'DELETE'
    table: string
    record: T
    oldRecord?: T
    timestamp: number
  }
}

// Error handling types
export namespace Errors {
  export type AppError = {
    code: string
    message: string
    details?: Record<string, any>
    source?: string
    stack?: string
  }

  export type ValidationError = {
    field: string
    message: string
    code?: string
  }

  export type ErrorState = {
    hasError: boolean
    error: AppError | null
    validationErrors?: ValidationError[]
  }
}

// Common state management types
export namespace States {
  export type LoadingState = {
    isLoading: boolean
    error: string | null
    lastUpdated?: Date
  }

  export type AsyncState<T> = {
    data: T | null
    isLoading: boolean
    error: string | null
    isSuccess: boolean
  }

  export type PaginatedState<T> = AsyncState<T> & {
    page: number
    totalPages: number
    hasMore: boolean
  }

  export type FilterState = {
    search: string
    filters: Record<string, any>
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }

  export type ModalState = {
    isOpen: boolean
    data?: any
    type?: string
  }

  export type ProcessState = {
    status: 'idle' | 'pending' | 'success' | 'error'
    progress?: number
    step?: number
    totalSteps?: number
  }
}

// Request/Response pattern types
export namespace Network {
  export type RequestConfig = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    headers?: Record<string, string>
    body?: any
    params?: Record<string, string>
    timeout?: number
    retry?: number
  }

  export type PaginatedResponse<T> = {
    items: T[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }

  export type ApiError = {
    status: number
    code: string
    message: string
    details?: any
  }

  export type ApiResult<T> = {
    data?: T
    error?: ApiError
    meta?: Record<string, any>
  }
}

// Utility types
export type WithChildren<T = {}> = T & { children: ReactNode }
export type WithClassName<T = {}> = T & { className?: string }
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type AsyncCallback<T = void> = (...args: any[]) => Promise<T>
export type ErrorCallback = (error: Error) => void
export type LoadingCallback = (loading: boolean) => void
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T
