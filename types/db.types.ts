import type { MaintenanceRequest } from './maintenance-requests'

// Base types
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]
export type Timestamp = string
export type UUID = string
export type Money = number
export type Email = string
export type PhoneNumber = string
export type ImageUrl = string
export type DocumentUrl = string

// Status Enums
export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended',
    PENDING = 'pending'
}

export interface UserDetails {
    id: string
    full_name: string | null
    email: string | null
    created_at: string
    updated_at: string
}

export interface Subscription {
    id: string
    user_id: string
    status: string
    price_id: string | null
    quantity: number | null
    cancel_at_period_end: boolean
    created_at: string
    current_period_start: string
    current_period_end: string
    ended_at: string | null
    cancel_at: string | null
    canceled_at: string | null
    trial_start: string | null
    trial_end: string | null
}

export enum PropertyStatus {
    AVAILABLE = 'available',
    OCCUPIED = 'occupied',
    MAINTENANCE = 'maintenance',
    INACTIVE = 'inactive'
}

export enum LeaseStatus {
    DRAFT = 'draft',
    PENDING = 'pending',
    ACTIVE = 'active',
    TERMINATED = 'terminated',
    EXPIRED = 'expired',
    RENEWED = 'renewed'
}

// Constants
export const PROPERTY_TYPES = {
    SINGLE_FAMILY: 'Single Family',
    MULTI_FAMILY: 'Multi Family',
    APARTMENT: 'Apartment',
    CONDO: 'Condo',
    COMMERCIAL: 'Commercial'
} as const

export const PROPERTY_STATUS = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    MAINTENANCE: 'Under Maintenance',
    DEVELOPMENT: 'Under Development'
} as const

export const LEASE_STATUS = {
    active: 'active',
    pending: 'pending',
    expired: 'expired',
    terminated: 'terminated'
} as const

export interface UseDashboardUpdatesProps {
    table: string
    select?: string
    onUpdate: (data: unknown) => void
    onDelete: (id: string) => void
}

export const PAYMENT_FREQUENCY = {
    monthly: 'monthly',
    quarterly: 'quarterly',
    annually: 'annually'
} as const

export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
    REFUNDED = 'refunded',
    CANCELLED = 'cancelled'
}

export enum MaintenanceStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

export enum MaintenancePriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    EMERGENCY = 'emergency'
}

export type ActivityType =
    | 'property'
    | 'payment'
    | 'maintenance'
    | 'tenant'

// Database Interfaces
export interface Property {
    id: string
    created_at: string
    name: string
    address: string
    city: string
    state: string
    zip_code: string
    type: string
    status: string
    owner_id: string
    organization_id: string
    bedrooms?: number
    bathrooms?: number
    square_feet?: number
    updated_at?: string
}

export interface Unit {
    id: string
    created_at: string
    property_id: string
    unit_number: string
    bedrooms: number
    bathrooms: number
    square_feet: number
    rent_amount: number
    status: 'vacant' | 'occupied' | 'maintenance'
}

export interface Tenant {
    id: string
    created_at: string
    first_name: string
    last_name: string
    email: string
    phone: string
    status: 'active' | 'inactive' | 'pending'
    user_id?: string
    updated_at?: string
}

export interface Lease {
    id: string
    property_id: string
    tenant_id: string
    start_date: string
    end_date: string
    rent_amount: number
    status: 'active' | 'pending' | 'expired'
    created_at: string
    updated_at: string
    propertyName?: string
    tenantName?: string
    securityDeposit?: number
    paymentFrequency?: keyof typeof PAYMENT_FREQUENCY
    documents?: LeaseDocument[]
    termsAccepted?: boolean
    utilityResponsibilities?: {
        electricity: 'tenant' | 'landlord'
        water: 'tenant' | 'landlord'
        gas: 'tenant' | 'landlord'
        internet: 'tenant' | 'landlord'
    }
}

export interface LeaseDocument {
    id: string
    type: 'lease_agreement' | 'addendum' | 'termination_notice'
    url: string
    uploadedAt: Date
}

export interface Activity {
    id: string
    type: ActivityType
    title: string
    description: string
    timestamp: Date
    metadata?: Record<string, unknown>
}

// Waitlist related types
export interface WaitlistEntry extends BaseRecord {
    email: string
    status: 'active' | 'invited' | 'converted'
    position: number | null
    source?: string
    referralCode?: string
}

export interface EmailEvent extends BaseRecord {
    waitlistId: string
    template: string
    sentAt: Date
    openedAt?: Date
    clickedAt?: Date
    status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed'
    metadata?: Record<string, unknown>
}

export interface AnalyticsEvent extends BaseRecord {
    eventType: 'signup' | 'email_open' | 'email_click' | 'conversion'
    waitlistId: string
    metadata?: Record<string, unknown>
}

export interface WaitlistResponse {
    entry: WaitlistEntry
    position: number
    estimatedAccessDate?: Date
}

export interface EmailStats {
    sent: number
    opened: number
    clicked: number
    openRate: number
    clickRate: number
    averageTimeToOpen?: number
}

export interface WaitlistStats {
    totalSignups: number
    activeMembers: number
    conversionRate: number
    growthRate: number
}

// Database schema type
export type Database = {
    public: {
        Tables: {
            users: {
                Row: {
                    id: UUID
                    email: Email
                    full_name: string | null
                    avatar_url: ImageUrl | null
                    role: string
                    status: UserStatus
                    created_at: Timestamp
                    updated_at: Timestamp
                    last_login: Timestamp | null
                    preferences: Json | null
                    stripe_customer_id: string | null
                    subscription_status: string | null
                }
                Insert: {
                    id?: UUID
                    email: Email
                    full_name?: string | null
                    avatar_url?: ImageUrl | null
                    role?: string
                    status?: UserStatus
                    created_at?: Timestamp
                    updated_at?: Timestamp
                    last_login?: Timestamp | null
                    preferences?: Json | null
                    stripe_customer_id?: string | null
                    subscription_status?: string | null
                }
                Update: {
                    id?: UUID
                    email?: Email
                    full_name?: string | null
                    avatar_url?: ImageUrl | null
                    role?: string
                    status?: UserStatus
                    updated_at?: Timestamp
                    last_login?: Timestamp | null
                    preferences?: Json | null
                    stripe_customer_id?: string | null
                    subscription_status?: string | null
                }
            }

            properties: {
                Row: Property
                Insert: Omit<
                    Property,
                    'id' | 'created_at' | 'updated_at'
                >
                Update: Partial<Omit<Property, 'id'>>
            }

            leases: {
                Row: Lease
                Insert: Omit<
                    Lease,
                    'id' | 'created_at' | 'updated_at'
                >
                Update: Partial<Omit<Lease, 'id'>>
            }

            payments: {
                Row: {
                    id: UUID
                    lease_id: UUID
                    tenant_id: UUID
                    amount: Money
                    status: PaymentStatus
                    type: string
                    payment_method: string | null
                    payment_intent_id: string | null
                    stripe_charge_id: string | null
                    description: string | null
                    created_at: Timestamp
                    created_at: Timestamp | null
                    metadata: Json | null
                }
                Insert: {
                    id?: UUID
                    lease_id: UUID
                    tenant_id: UUID
                    amount: Money
                    status?: PaymentStatus
                    type: string
                    payment_method?: string | null
                    payment_intent_id?: string | null
                    stripe_charge_id?: string | null
                    description?: string | null
                    created_at?: Timestamp
                    created_at?: Timestamp | null
                    metadata?: Json | null
                }
                Update: {
                    status?: PaymentStatus
                    payment_method?: string | null
                    payment_intent_id?: string | null
                    stripe_charge_id?: string | null
                    description?: string | null
                    created_at?: Timestamp | null
                    metadata?: Json | null
                }
            }

            maintenance_requests: {
                Row: MaintenanceRequest
                Insert: Omit<
                    MaintenanceRequest,
                    'id' | 'created_at' | 'updated_at'
                >
                Update: Partial<Omit<MaintenanceRequest, 'id'>>
            }

            tenants: {
                Row: Tenant
                Insert: Omit<
                    Tenant,
                    'id' | 'created_at' | 'updated_at'
                >
                Update: Partial<Omit<Tenant, 'id'>>
            }

            waitlist: {
                Row: {
                    id: string
                    email: string
                    name: string
                    position: number
                    status: 'pending' | 'invited' | 'joined'
                    referral_code: string | null
                    referred_by: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<
                    Database['public']['Tables']['waitlist']['Row'],
                    | 'id'
                    | 'position'
                    | 'status'
                    | 'referral_code'
                    | 'created_at'
                    | 'updated_at'
                >
                Update: Partial<
                    Omit<
                        Database['public']['Tables']['waitlist']['Row'],
                        'id'
                    >
                >
            }

            waitlist_events: {
                Row: {
                    id: string
                    waitlist_id: string
                    event_type:
                        | 'status_change'
                        | 'position_change'
                        | 'referral'
                    event_data: Json
                    created_at: string
                }
                Insert: Omit<
                    Database['public']['Tables']['waitlist_events']['Row'],
                    'id' | 'created_at'
                >
                Update: never
            }
        }

        Views: {
            [_ in never]: never
        }

        Functions: {
            [_ in never]: never
        }

        Enums: {
            user_status: UserStatus
            property_status: PropertyStatus
            lease_status: LeaseStatus
            payment_status: PaymentStatus
            maintenance_status: MaintenanceStatus
            maintenance_priority: MaintenancePriority
        }
        CompositeTypes: Record<string, never>
    }
}

// Helper types
export type DatabaseTables = Database['public']['Tables']
type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database
    }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
              Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
          Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
            PublicSchema['Views'])
      ? (PublicSchema['Tables'] &
            PublicSchema['Views'])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
          ? R
          : never
      : never

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof PublicSchema['Tables']
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database
    }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Insert: infer I
        }
          ? I
          : never
      : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof PublicSchema['Tables']
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database
    }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Update: infer U
        }
          ? U
          : never
      : never

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof PublicSchema['Enums']
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends {
        schema: keyof Database
    }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
      ? PublicSchema['Enums'][PublicEnumNameOrOptions]
      : never

export interface BaseRecord {
    id: string
    createdAt: Date
}

export interface AnalyticsQuerySchemaType {
    startDate: Date
    endDate: Date
    interval: 'day' | 'week' | 'month'
    metrics: string[]
}
