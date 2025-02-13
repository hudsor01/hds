import { ReactNode } from 'react'
import { MotionProps, Variant, Variants } from 'framer-motion'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { Prisma } from '@prisma/client'

/** User authentication and account management types */
export namespace Auth {
  /** Base user type with core properties */
  export type User = {
    id: string
    email: string
    full_name?: string
    created_at: string
    updated_at: string
  }

  export interface AccountUser {
    id: string
    full_name: string | null
    email: string
    created_at: string
    updated_at: string
  }

  /** Subscription data for user accounts */
  export type Subscription = {
    id: string
    status: string
    cancel_at_period_end?: boolean
    created: string
    current_period_end: string
    current_period_start: string
    prices?: {
      products?: any
    }
  }

  /** Available user roles in the system */
  export type Role = 'admin' | 'moderator' | 'user'
  export type PermissionLevel = 'none' | 'read' | 'write' | 'admin'
}

/** UI component and styling related types */
export namespace UI {
  /** Base props interface for UI components */
  export interface ComponentProps {
    className?: string
    style?: React.CSSProperties
    children?: ReactNode
    mode: 'light' | 'dark' | 'system'
    color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  }

  /** Component size variants */
  export type Size = 'small' | 'medium' | 'large'

  /** Button style variants */
  export type ButtonVariant = 'contained' | 'outlined' | 'text'

  /** Toast notification configuration */
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

  /** Animation configuration for UI elements */
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

// Hook specific types
export namespace Hooks {
  export type UseToastReturn = {
    showToast: (toast: UI.Toast) => void
    dismissToast: (id: string) => void
    toasts: UI.Toast[]
  }

  export type UseAnimationReturn = {
    animate: (element: HTMLElement, animation: UI.Animation) => void
    isAnimating: boolean
    stop: () => void
  }

  export type UseAuthReturn = {
    user: Auth.User | null
    isLoading: boolean
    error: string | null
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
  }

  export type UseRealtimeReturn = {
    subscribe: <T>(channel: Realtime.Channel) => Promise<Realtime.Subscription<T>>
    unsubscribe: (channelId: string) => void
    presence: Realtime.PresenceState[]
  }

  export type UseModalReturn = {
    isOpen: boolean
    openModal: (data?: any) => void
    closeModal: () => void
    modalData: any
  }
}

// Animation system types
export namespace Animations {
  export type Variant = {
    initial: Record<string, any>
    animate: Record<string, any>
    exit?: Record<string, any>
  }

  export type Transition = {
    duration?: number
    ease?: string | number[]
    delay?: number
    type?: 'tween' | 'spring' | 'inertia'
  }

  export type AnimationPreset = {
    variants: Variant
    transition?: Transition
    viewport?: {
      once?: boolean
      margin?: string
    }
  }

  export type ScrollAnimation = AnimationPreset & {
    threshold?: number
    root?: HTMLElement | null
    rootMargin?: string
  }

  /** Base animation variant structure */
  export type VariantState = 'hidden' | 'visible' | 'exit'

  /** Transition configuration */

  /** List item animation variant */
  export type ListAnimation = {
    hidden: { opacity: number; y: number }
    visible: (index: number) => {
      opacity: number
      y: number
      transition: Transition
    }
    exit: { opacity: number; y: number }
  }

  /** Data update animation variant */
  export type DataUpdateAnimation = {
    hidden: { opacity: number; scale: number }
    visible: {
      opacity: number
      scale: number
      transition: Transition
    }
  }

  /** Tab panel animation variant */
  export type TabPanelAnimation = {
    hidden: { opacity: number; x: number }
    visible: {
      opacity: number
      x: number
      transition: Transition
    }
    exit: {
      opacity: number
      x: number
    }
  }

  /** Chart animation variant */
  export type ChartAnimation = {
    hidden: { opacity: number; scale: number }
    visible: {
      opacity: number
      scale: number
      transition: Transition
    }
  }

  /** Filter animation variant */
  export type FilterAnimation = {
    hidden: { opacity: number; height: number | string }
    visible: {
      opacity: number
      height: number | string
      transition: {
        height: Transition
        opacity: { duration: number }
      }
    }
    exit: {
      opacity: number
      height: number | string
    }
  }

  /** Notification animation variant */
  export type NotificationAnimation = {
    hidden: { opacity: number; y: number }
    visible: {
      opacity: number
      y: number
      transition: Transition
    }
    exit: {
      opacity: number
      y: number
      transition: Transition
    }
  }

  /** Animation preset names */
  export type PresetName = 'list' | 'dataUpdate' | 'tabPanel' | 'chart' | 'filter' | 'notification'

  /** Animation preset map */
  export type PresetMap = {
    list: ListAnimation
    dataUpdate: DataUpdateAnimation
    tabPanel: TabPanelAnimation
    chart: ChartAnimation
    filter: FilterAnimation
    notification: NotificationAnimation
  }

  /** Animation hook configuration */
  export type AnimationConfig = {
    preset: PresetName
    custom?: Record<string, any>
    onComplete?: () => void
    onStart?: () => void
  }
}

// Property related types since this seems to be a property management system
export namespace Properties {
  export type Property = {
    id: string
    name: string
    address: string
    type: 'residential' | 'commercial'
    status: 'active' | 'inactive' | 'maintenance'
    units?: Unit[]
    createdAt: Date
    updatedAt: Date
  }

  export const PROPERTY_STATUS = {
    active: 'Active',
    inactive: 'Inactive'
  } as const

  export const PROPERTY_TYPES = {
    apartment: 'Apartment',
    house: 'House',
    condo: 'Condo',
    townhouse: 'Townhouse'
  } as const

  export interface PropertyInsert {
    id: string
    user_id: string
    name: string
    address: string
    city: string
    state: string
    zip: string
    property_type: keyof typeof PROPERTY_TYPES
    property_status: keyof typeof PROPERTY_STATUS
    rent_amount: number
    description?: string
    created_at: string
    updated_at: string
  }

  export type Unit = {
    id: string
    propertyId: string
    number: string
    status: 'vacant' | 'occupied' | 'maintenance'
    type: string
    rent: number
    leaseId?: string
  }

  export type Tenant = {
    id: string
    unitId: string
    name: string
    email: string
    phone?: string
    leaseStart: Date
    leaseEnd: Date
    status: 'active' | 'past' | 'pending'
  }

  export type WorkOrder = {
    id: string
    propertyId: string
    unitId?: string
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    status: 'open' | 'in_progress' | 'completed'
    assignedTo?: string
    createdAt: Date
    updatedAt: Date
  }
}

// Payment processing types
export namespace Payments {
  export type PaymentMethod = {
    id: string
    type: 'card' | 'bank' | 'other'
    last4: string
    brand?: string
    expMonth?: number
    expYear?: number
    isDefault: boolean
  }

  export type Transaction = {
    id: string
    amount: number
    currency: string
    status: 'pending' | 'completed' | 'failed' | 'refunded'
    paymentMethodId: string
    description?: string
    metadata?: Record<string, any>
    createdAt: Date
  }

  export type Invoice = {
    id: string
    customerId: string
    amount: number
    status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible'
    dueDate: Date
    items: InvoiceItem[]
  }

  export type InvoiceItem = {
    description: string
    amount: number
    quantity: number
  }

  export type StripeConfig = {
    publicKey: string
    secretKey?: string
    webhookSecret: string
    priceId?: string
  }
}

// Analytics and tracking types
export namespace Analytics {
  export type Event = {
    name: string
    properties?: Record<string, any>
    timestamp: Date
    userId?: string
    sessionId?: string
  }

  export type PageView = {
    path: string
    title?: string
    referrer?: string
    duration?: number
    timestamp: Date
  }

  export type UserSession = {
    id: string
    userId?: string
    startTime: Date
    endTime?: Date
    device: string
    browser: string
    os: string
  }

  export type MetricsSnapshot = {
    activeUsers: number
    pageViews: number
    avgSessionDuration: number
    bounceRate: number
    timeRange: 'day' | 'week' | 'month'
  }
}

// Form validation patterns
export namespace Validation {
  export type Rule<T = any> = {
    validate: (value: T) => boolean | Promise<boolean>
    message: string
    params?: Record<string, any>
  }

  export type FieldRules = {
    required?: boolean | string
    min?: number
    max?: number
    pattern?: RegExp
    custom?: Rule[]
  }

  export type ValidationResult = {
    isValid: boolean
    errors: {
      field: string
      message: string
      code?: string
    }[]
  }

  export type AsyncValidator<T> = (value: T) => Promise<ValidationResult>

  export type SyncValidator<T> = (value: T) => ValidationResult

  export type ValidationSchema = Record<string, FieldRules>
}

// Service layer types
export namespace Services {
  // Email service types
  export type EmailService = {
    send: (options: EmailOptions) => Promise<void>
    template: (name: string, data: Record<string, any>) => string
    track: (messageId: string) => Promise<EmailTrackingData>
  }

  export type EmailOptions = {
    to: string | string[]
    subject: string
    body: string
    template?: string
    templateData?: Record<string, any>
    attachments?: EmailAttachment[]
    cc?: string[]
    bcc?: string[]
  }

  export type EmailTemplate = {
    name: string
    subject: string
    body: string
    variables: string[]
  }

  export type EmailTrackingData = {
    messageId: string
    opened?: Date
    clicked?: Date
    delivered?: Date
    bounced?: Date
    complained?: Date
  }

  export type EmailAttachment = {
    filename: string
    content: Buffer | string
    contentType: string
  }

  // Middleware types
  export type MiddlewareConfig = {
    enabled: boolean
    rules?: MiddlewareRule[]
    options?: Record<string, any>
  }

  export type MiddlewareRule = {
    path: string | RegExp
    methods?: ('GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH')[]
    handler: (req: any, res: any, next: () => void) => Promise<void>
  }

  export type RateLimitConfig = {
    windowMs: number
    max: number
    message?: string
    statusCode?: number
    headers?: boolean
    skipFailedRequests?: boolean
    skipSuccessfulRequests?: boolean
  }

  // Authentication service types
  export type AuthService = {
    verify: (token: string) => Promise<Auth.User>
    generateToken: (user: Auth.User) => Promise<string>
    hashPassword: (password: string) => Promise<string>
    comparePassword: (password: string, hash: string) => Promise<boolean>
  }

  // Cache service types
  export type CacheOptions = {
    ttl: number
    namespace?: string
    serialize?: boolean
  }

  export type CacheService = {
    get: <T>(key: string) => Promise<T | null>
    set: <T>(key: string, value: T, options?: CacheOptions) => Promise<void>
    delete: (key: string) => Promise<void>
    clear: (namespace?: string) => Promise<void>
  }

  // Storage service types
  export type StorageOptions = {
    bucket?: string
    acl?: 'private' | 'public-read'
    metadata?: Record<string, string>
    contentType?: string
  }

  export type StorageService = {
    upload: (file: File | Buffer, path: string, options?: StorageOptions) => Promise<string>
    download: (path: string) => Promise<Buffer>
    delete: (path: string) => Promise<void>
    getSignedUrl: (path: string, expiresIn?: number) => Promise<string>
  }

  // Logger service types
  export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

  export type LogEntry = {
    level: LogLevel
    message: string
    timestamp: Date
    context?: Record<string, any>
    error?: Error
  }

  export type LoggerService = {
    log: (entry: LogEntry) => void
    debug: (message: string, context?: Record<string, any>) => void
    info: (message: string, context?: Record<string, any>) => void
    warn: (message: string, context?: Record<string, any>) => void
    error: (message: string, error?: Error, context?: Record<string, any>) => void
  }
}

/** Configuration related types */
export namespace Config {
  /** Environment configuration */
  export type Env = {
    NODE_ENV: 'development' | 'production' | 'test'
    API_URL: string
    DATABASE_URL: string
    SUPABASE_URL: string
    SUPABASE_KEY: string
    STRIPE_KEY: string
    STRIPE_WEBHOOK_SECRET: string
    EMAIL_FROM: string
    AWS_REGION?: string
    REDIS_URL?: string
    SENTRY_DSN?: string
  }

  /** App-wide configuration */
  export type AppConfig = {
    name: string
    version: string
    apiVersion: string
    debug: boolean
    features: Record<string, boolean>
    maintenance: boolean
    theme: UI.Theme
  }

  /** Service configuration */
  export type ServiceConfig = {
    email: Services.EmailOptions
    storage: Services.StorageOptions
    cache: Services.CacheOptions
    logger: {
      level: Services.LogLevel
      targets: ('console' | 'file' | 'remote')[]
    }
    rateLimit: Services.RateLimitConfig
    cors: {
      origin: string | string[]
      methods: string[]
      credentials: boolean
    }
  }

  /** Route configuration */
  export type RouteConfig = {
    path: string
    auth?: boolean
    roles?: Auth.Role[]
    rateLimit?: Partial<Services.RateLimitConfig>
    middleware?: string[]
  }

  /** Feature flag configuration */
  export type FeatureConfig = {
    name: string
    enabled: boolean
    rolloutPercentage?: number
    dependencies?: string[]
    rules?: {
      condition: string
      value: any
    }[]
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

// Advanced utility types
/** Makes all properties deeply required and non-nullable */
export type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>
}

/** Creates a type that requires at least one of the properties */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

/** Creates a type that requires exactly one of the properties */
export type RequireExactlyOne<T, Keys extends keyof T = keyof T> = {
  [K in Keys]: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, never>>
}[Keys] &
  Pick<T, Exclude<keyof T, Keys>>

/** Makes specific properties optional */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

/** Type safe object keys */
export type TypedKeys<T> = keyof T

/** Type safe object entries */
export type TypedEntries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

/** React specific utility types */
export namespace React {
  /** Props with children and className */
  export type PropsWithChildrenAndClass<P = unknown> = P & {
    children?: ReactNode
    className?: string
  }

  /** Forward ref component type */
  export type ForwardRefComponent<P = unknown, T = any> = {
    (props: PropsWithChildrenAndClass<P>, ref: React.Ref<T>): React.ReactElement | null
    displayName?: string
  }

  /** Prop type with ref */
  export type PropWithRef<P = unknown, T = any> = P & { ref?: React.Ref<T> }
}

/** Next.js specific types */
export namespace Next {
  /** Page props with layout */
  export type PageWithLayout<P = {}, IP = P> = {
    (props: P): ReactNode
    getLayout?: (page: ReactNode) => ReactNode
    getInitialProps?: (ctx: any) => Promise<IP>
  }

  /** API handler response */
  export type ApiResponse<T = any> = {
    data?: T
    error?: string
    statusCode?: number
  }
}
