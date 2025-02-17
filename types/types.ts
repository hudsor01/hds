import { type ReactNode, type CSSProperties } from 'react'
import type { IconType } from 'react-icons'
import type { Variants } from 'framer-motion'
import type { ButtonProps as MuiButtonProps } from '@mui/material'

// User authentication and account management types
export interface User {
  id: string
  firstName: string
  lastName: string
  primaryEmailAddressId: string
  emailAddresses: EmailAddress[]
  publicMetadata: {
    role?: string
  }
}

export interface AccountUser {
  id: string
  full_name: string | null
  email: string
  created_at: string
  updated_at: string
}

export interface EmailAddress {
  id: string
  emailAddress: string
}

// Subscription data for user accounts
export type Subscription = {
  id: string
  status: string
  cancel_at_period_end?: boolean
  created: string
  current_period_end: string
  current_period_start: string
  prices?: {
    products?: string
  }
}

// Available user roles in the system
export type Role = 'admin' | 'moderator' | 'user'
export type PermissionLevel = 'none' | 'read' | 'write' | 'admin'
export type UserStatus = 'active' | 'inactive' | 'suspended'

// User authentication status interface
export interface AuthStatus {
  isAuthenticated: boolean
  userStatus: UserStatus
}

// User information interface
export interface UserInfo {
  user: User
  authStatus: AuthStatus
}

// Additional user information interface
export interface ExtendedUserInfo extends UserInfo {
  permissions: PermissionLevel[]
}

// UI component and styling related types
// Base props interface for UI components
export interface ComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  mode: 'light' | 'dark' | 'system'
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  size?: Size
  variant?: ButtonVariant
}

// Component size variants
export type Size = 'small' | 'medium' | 'large'

// Button style variants
export type ButtonVariant = 'contained' | 'outlined' | 'text'

// Toast notification configuration
export type Toast = {
  type: 'success' | 'error' | 'warning' | 'info'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  message: string
  duration?: number
}

// Animation configuration for UI elements
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

export interface InputBaseProps {
  error?: boolean | string
  leftIcon?: IconType | React.ReactNode
  rightIcon?: IconType | React.ReactNode
  isLoading?: boolean
  helperText?: string | React.ReactNode
  containerClassName?: string
  placeholder?: string
  required?: boolean
  minLength?: number
  maxLength?: number
  disabled?: boolean
  fullWidth?: boolean
  multiline?: boolean
  rows?: number
  rowsMax?: number
}

export interface ButtonProps extends MuiButtonProps {
  priceId?: string | null
  text: string
  highlighted?: boolean
}

// Form related types
export const Forms = {
  State: {
    IDLE: 'idle',
    SUBMITTING: 'submitting',
    SUCCESS: 'success',
    ERROR: 'error'
  },

  ValidationTypes: {
    REQUIRED: 'required',
    EMAIL: 'email',
    MIN_LENGTH: 'minLength',
    MAX_LENGTH: 'maxLength',
    PATTERN: 'pattern',
    CUSTOM: 'custom'
  }
} as const

export type FormState = (typeof Forms.State)[keyof typeof Forms.State]
export type ValidationType = (typeof Forms.ValidationTypes)[keyof typeof Forms.ValidationTypes]

export interface FormValidation {
  rule: () => boolean | Promise<boolean>
  message: string
}

export interface NameFormProps {
  userName: string
  userId: string
}

export interface EmailFormProps {
  email: string
}

export interface ContactFormProps {
  name: string
  email: string
  subject: string
  message: string
}

// Realtime related types
export const Realtime = {
  Events: {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    MESSAGE: 'message',
    ERROR: 'error'
  },

  Status: {
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    ERROR: 'error'
  }
} as const

export type RealtimeEvent = (typeof Realtime.Events)[keyof typeof Realtime.Events]
export type RealtimeStatus = (typeof Realtime.Status)[keyof typeof Realtime.Status]

export interface RealtimeChannel {
  id: string
  topic: string
  event: string
}

export interface RealtimePresenceState {
  userId: string
  status: 'online' | 'away' | 'offline'
  lastSeen?: Date
  metadata?: Record<string, unknown>
}

export interface RealtimeSubscription {
  channelId: string
  callback: () => void
  errorHandler?: () => void
}

// Notification related types
export const Notifications = {
  Types: {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
  },

  Channels: {
    EMAIL: 'email',
    PUSH: 'push',
    SMS: 'sms',
    IN_APP: 'in-app'
  }
} as const

export type NotificationType = (typeof Notifications.Types)[keyof typeof Notifications.Types]
export type NotificationChannel = (typeof Notifications.Channels)[keyof typeof Notifications.Channels]

export interface NotificationTemplate {
  id: string
  title: string
  body: string
  type: Toast['type']
  action?: {
    label: string
    url: string
  }
}

export interface NotificationItem {
  id: string
  userId: string
  templateId: string
  data: Record<string, unknown>
  read: boolean
  createdAt: Date
  readAt?: Date
  expiresAt?: Date
}

// API & Services related types
export const API = {
  Methods: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
  },

  StatusCodes: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  }
} as const

export type ApiMethod = (typeof API.Methods)[keyof typeof API.Methods]
export type ApiStatusCode = (typeof API.StatusCodes)[keyof typeof API.StatusCodes]

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  code?: string
}

export interface WebhookLog {
  id: string
  event: string
  event_type: WebhookEventType
  created_at: Date
  success: boolean
  payload: string
  url?: string
  status?: number
  request_body?: string
  response_body?: string
}

export type WebhookEventType =
  | 'user.created'
  | 'user.updated'
  | 'user.deleted'
  | 'session.created'
  | 'session.ended'
  | 'organization.created'
  | 'organization.updated'
  | 'organization.deleted'

export interface WebhookPayload {
  [key: string]: unknown
}

export type QueryParams = {
  page?: number
  limit?: number
  offset?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  filters?: Record<string, unknown>
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
    type: 'card' | 'bank' | 'other'
    last4: string
    expMonth?: number
    expYear?: number
    isDefault: boolean
  }
}

// Property related types since this seems to be a property management system
export const Properties = {
  Types: {
    RESIDENTIAL: 'residential',
    COMMERCIAL: 'commercial',
    INDUSTRIAL: 'industrial',
    MIXED_USE: 'mixed-use'
  },

  Status: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
    DEVELOPMENT: 'development'
  }
} as const

export type PropertyType = (typeof Properties.Types)[keyof typeof Properties.Types]
export type PropertyStatus = (typeof Properties.Status)[keyof typeof Properties.Status]

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

export interface PropertyInsert {
  id: string
  user_id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  property_type: PropertyType
  property_status: PropertyStatus
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

// Payment processing types
export const Payments = {
  Methods: {
    CARD: 'card',
    BANK_TRANSFER: 'bank_transfer',
    DIGITAL_WALLET: 'digital_wallet'
  },

  Status: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded'
  }
} as const

export type PaymentStatus = (typeof Payments.Status)[keyof typeof Payments.Status]

export interface PaymentMethod {
  id: string
  type: 'card' | 'bank' | 'other'
  last4: string
  brand?: string
  expMonth?: number
  expYear?: number
  isDefault: boolean
}

export interface Transaction {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentMethodId: string
  description?: string
  metadata?: Record<string, unknown>
  createdAt: Date
}

export interface Invoice {
  id: string
  customerId: string
  amount: number
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible'
  dueDate: Date
  items: InvoiceItem[]
}

export interface InvoiceItem {
  description: string
  amount: number
  quantity: number
}

export interface StripeConfig {
  publicKey: string
  secretKey?: string
  webhookSecret: string
  priceId?: string
}

export type Team = {
  id: string
  stripeCustomerId?: string | null
  stripeProductId?: string | null
  stripeSubscriptionId?: string | null
  planName?: string | null
  subscriptionStatus?: 'active' | 'trialing' | 'canceled' | 'unpaid'
}

// Analytics and tracking types
export interface Event {
  name: string
  properties?: Record<string, unknown>
  timestamp: Date
  userId?: string
  sessionId?: string
}

export interface PageView {
  path: string
  title?: string
  referrer?: string
  duration?: number
  timestamp: Date
}

export interface UserSession {
  id: string
  userId?: string
  startTime: Date
  endTime?: Date
  device: string
  browser: string
  os: string
}

export interface MetricsSnapshot {
  activeUsers: number
  pageViews: number
  avgSessionDuration: number
  bounceRate: number
  timeRange: 'day' | 'week' | 'month'
}

// Form validation patterns
export interface ValidationRule {
  validate: () => boolean | Promise<boolean>
  message: string
  params?: Record<string, unknown>
}

export interface FieldRules {
  required?: boolean | string
  min?: number
  max?: number
  pattern?: RegExp
  custom?: ValidationRule[]
}

export interface ValidationResult {
  isValid: boolean
  errors: {
    field: string
    message: string
    code?: string
  }[]
}

export interface AsyncValidator {
  validate: () => boolean | Promise<boolean>
  message: string
}

export type SyncValidator<T> = (value: T) => ValidationResult

export interface ValidationSchema {
  [key: string]: FieldRules
}

// Service layer types
export interface EmailOptions {
  to: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject: string
  body: string
}

export interface EmailTrackingData {
  id: string
  message: string
  status: string
}

export interface EmailService {
  send: (emailOptions: EmailOptions) => Promise<void>
  template: (templateName: string, data: Record<string, unknown>) => string
  track: (message: string) => Promise<EmailTrackingData>
}

// Utility types
export type WithChildren<T = object> = T & { children: ReactNode }
export type WithClassName<T = object> = T & { className?: string }
export type Nullable<T> = T | null
export type MaybeUndefined<T> = T | undefined
export type AsyncCallback<T = void> = () => Promise<T>
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// Advanced utility types - updated to use TypeScript built-ins where possible
// Makes all properties deeply required and non-nullable
export type DeepRequired<T> = Required<{
  [P in keyof T]: T[P] extends object ? DeepRequired<T[P]> : T[P]
}>

// Creates a type that requires at least one of the properties
export type RequireAtLeastOne<T, K extends keyof T = keyof T> = Omit<T, K> &
  { [P in K]-?: Required<Pick<T, P>> & Partial<Pick<T, Exclude<K, P>>> }[K]

// Creates a type that requires exactly one of the properties
export type RequireExactlyOne<T, K extends keyof T = keyof T> = Omit<T, K> &
  { [P in K]: Required<Pick<T, P>> & Record<Exclude<K, P>, never> }[K]

// Makes specific properties optional
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Type safe object keys - using TypeScript's keyof
export type TypedKeys<T> = keyof T

// Type safe object entries - using TypeScript's built-in types
export type TypedEntries<T> = [keyof T, T[keyof T]][]

// React specific utility types
export type PropsWithChildrenAndClass<P = object> = P & {
  children?: ReactNode
  className?: string
}

// Utility type improvements
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown> ? DeepReadonly<T[P]> : T[P]
}

// Export type groups as objects
export const UI = {
  Toast: {} as Toast,
  Animation: {} as Animation,
  ComponentProps: {} as ComponentProps,
  ButtonProps: {} as ButtonProps,
  InputBaseProps: {} as InputBaseProps
} as const
