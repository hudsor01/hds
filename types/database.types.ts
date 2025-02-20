export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            _prisma_migrations: {
                Row: {
                    applied_steps_count: number
                    checksum: string
                    finished_at: string | null
                    id: string
                    logs: string | null
                    migration_name: string
                    rolled_back_at: string | null
                    started_at: string
                }
                Insert: {
                    applied_steps_count?: number
                    checksum: string
                    finished_at?: string | null
                    id: string
                    logs?: string | null
                    migration_name: string
                    rolled_back_at?: string | null
                    started_at?: string
                }
                Update: {
                    applied_steps_count?: number
                    checksum?: string
                    finished_at?: string | null
                    id?: string
                    logs?: string | null
                    migration_name?: string
                    rolled_back_at?: string | null
                    started_at?: string
                }
                Relationships: []
            }
            accounts: {
                Row: {
                    access_token: string | null
                    account_type: string
                    expires_at: number | null
                    id: string
                    id_token: string | null
                    provider: string
                    provider_account_id: string
                    refresh_token: string | null
                    scope: string | null
                    session_state: string | null
                    token_type: string | null
                    user_id: string
                }
                Insert: {
                    access_token?: string | null
                    account_type: string
                    expires_at?: number | null
                    id: string
                    id_token?: string | null
                    provider: string
                    provider_account_id: string
                    refresh_token?: string | null
                    scope?: string | null
                    session_state?: string | null
                    token_type?: string | null
                    user_id: string
                }
                Update: {
                    access_token?: string | null
                    account_type?: string
                    expires_at?: number | null
                    id?: string
                    id_token?: string | null
                    provider?: string
                    provider_account_id?: string
                    refresh_token?: string | null
                    scope?: string | null
                    session_state?: string | null
                    token_type?: string | null
                    user_id?: string
                }
                Relationships: []
            }
            activity: {
                Row: {
                    activity_log_id: string
                    activity_type: Database['public']['Enums']['ActivityType']
                    created_at: string | null
                    description: string
                    entityId: string
                    entityType: Database['public']['Enums']['EntityType']
                    id: string
                    updated_at: string | null
                    userId: string
                }
                Insert: {
                    activity_log_id: string
                    activity_type: Database['public']['Enums']['ActivityType']
                    created_at?: string | null
                    description: string
                    entityId: string
                    entityType: Database['public']['Enums']['EntityType']
                    id: string
                    updated_at?: string | null
                    userId: string
                }
                Update: {
                    activity_log_id?: string
                    activity_type?: Database['public']['Enums']['ActivityType']
                    created_at?: string | null
                    description?: string
                    entityId?: string
                    entityType?: Database['public']['Enums']['EntityType']
                    id?: string
                    updated_at?: string | null
                    userId?: string
                }
                Relationships: []
            }
            AdminAuditLog: {
                Row: {
                    created_at: string | null
                    entityId: string | null
                    entityType: Database['public']['Enums']['EntityType']
                    id: string
                    ipAddress: string | null
                    newValues: Json | null
                    oldValues: Json | null
                    userAgent: string | null
                    userId: string | null
                }
                Insert: {
                    created_at?: string | null
                    entityId?: string | null
                    entityType: Database['public']['Enums']['EntityType']
                    id: string
                    ipAddress?: string | null
                    newValues?: Json | null
                    oldValues?: Json | null
                    userAgent?: string | null
                    userId?: string | null
                }
                Update: {
                    created_at?: string | null
                    entityId?: string | null
                    entityType?: Database['public']['Enums']['EntityType']
                    id?: string
                    ipAddress?: string | null
                    newValues?: Json | null
                    oldValues?: Json | null
                    userAgent?: string | null
                    userId?: string | null
                }
                Relationships: []
            }
            documents: {
                Row: {
                    created_at: string | null
                    description: string | null
                    id: string
                    lease_id: string | null
                    name: string
                    property_id: string | null
                    size: number | null
                    type: string
                    updated_at: string | null
                    uploaded_by: string
                    url: string
                }
                Insert: {
                    created_at?: string | null
                    description?: string | null
                    id: string
                    lease_id?: string | null
                    name: string
                    property_id?: string | null
                    size?: number | null
                    type: string
                    updated_at?: string | null
                    uploaded_by: string
                    url: string
                }
                Update: {
                    created_at?: string | null
                    description?: string | null
                    id?: string
                    lease_id?: string | null
                    name?: string
                    property_id?: string | null
                    size?: number | null
                    type?: string
                    updated_at?: string | null
                    uploaded_by?: string
                    url?: string
                }
                Relationships: []
            }
            expenses: {
                Row: {
                    amount: number
                    category: string
                    created_at: string | null
                    created_by: string | null
                    date: string
                    description: string | null
                    id: string
                    property_id: string
                    receipt_url: string | null
                    tenant_id: string | null
                    updated_at: string | null
                }
                Insert: {
                    amount: number
                    category: string
                    created_at?: string | null
                    created_by?: string | null
                    date: string
                    description?: string | null
                    id: string
                    property_id: string
                    receipt_url?: string | null
                    tenant_id?: string | null
                    updated_at?: string | null
                }
                Update: {
                    amount?: number
                    category?: string
                    created_at?: string | null
                    created_by?: string | null
                    date?: string
                    description?: string | null
                    id?: string
                    property_id?: string
                    receipt_url?: string | null
                    tenant_id?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            inspections: {
                Row: {
                    completed_date: string | null
                    created_at: string
                    findings: Json | null
                    id: string
                    inspection_type: string
                    inspector_name: string
                    notes: string | null
                    property_id: string
                    report_url: string | null
                    scheduled_date: string
                    status: string
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    completed_date?: string | null
                    created_at?: string
                    findings?: Json | null
                    id: string
                    inspection_type: string
                    inspector_name: string
                    notes?: string | null
                    property_id: string
                    report_url?: string | null
                    scheduled_date: string
                    status?: string
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    completed_date?: string | null
                    created_at?: string
                    findings?: Json | null
                    id?: string
                    inspection_type?: string
                    inspector_name?: string
                    notes?: string | null
                    property_id?: string
                    report_url?: string | null
                    scheduled_date?: string
                    status?: string
                    updated_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'inspections_property_id_fkey'
                        columns: ['property_id']
                        isOneToOne: false
                        referencedRelation: 'properties'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'inspections_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            ip_blacklist: {
                Row: {
                    added_by: string | null
                    created_at: string | null
                    expires_at: string | null
                    id: string
                    ip_address: unknown
                    reason: string
                }
                Insert: {
                    added_by?: string | null
                    created_at?: string | null
                    expires_at?: string | null
                    id: string
                    ip_address: unknown
                    reason: string
                }
                Update: {
                    added_by?: string | null
                    created_at?: string | null
                    expires_at?: string | null
                    id?: string
                    ip_address?: unknown
                    reason?: string
                }
                Relationships: []
            }
            leases: {
                Row: {
                    created_at: string
                    depositAmount: number
                    documents: string[] | null
                    end_date: string | null
                    lease_status: string | null
                    lease_type: Database['public']['Enums']['LeaseType']
                    payment_day: number
                    property_id: string
                    rent_amount: number
                    start_date: string
                    tenant_id: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    depositAmount: number
                    documents?: string[] | null
                    end_date?: string | null
                    lease_status?: string | null
                    lease_type: Database['public']['Enums']['LeaseType']
                    payment_day: number
                    property_id: string
                    rent_amount: number
                    start_date: string
                    tenant_id: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    depositAmount?: number
                    documents?: string[] | null
                    end_date?: string | null
                    lease_status?: string | null
                    lease_type?: Database['public']['Enums']['LeaseType']
                    payment_day?: number
                    property_id?: string
                    rent_amount?: number
                    start_date?: string
                    tenant_id?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'leases_property_id_fkey'
                        columns: ['property_id']
                        isOneToOne: false
                        referencedRelation: 'properties'
                        referencedColumns: ['id']
                    }
                ]
            }
            login_history: {
                Row: {
                    created_at: string | null
                    failure_reason: string | null
                    id: string
                    ip_address: string | null
                    success: boolean | null
                    user_agent: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    failure_reason?: string | null
                    id: string
                    ip_address?: string | null
                    success?: boolean | null
                    user_agent?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    failure_reason?: string | null
                    id?: string
                    ip_address?: string | null
                    success?: boolean | null
                    user_agent?: string | null
                    user_id?: string | null
                }
                Relationships: []
            }
            maintenance_requests: {
                Row: {
                    created_at: string
                    description: string
                    id: string
                    priority: string
                    property_id: string
                    title: string
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    description: string
                    id: string
                    priority?: string
                    property_id: string
                    title: string
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    description?: string
                    id?: string
                    priority?: string
                    property_id?: string
                    title?: string
                    updated_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'maintenance_requests_property_id_fkey'
                        columns: ['property_id']
                        isOneToOne: false
                        referencedRelation: 'properties'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'maintenance_requests_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            message_threads: {
                Row: {
                    created_at: string | null
                    id: string
                    last_message_id: string | null
                    participants: string[] | null
                    subject: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    id: string
                    last_message_id?: string | null
                    participants?: string[] | null
                    subject: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    last_message_id?: string | null
                    participants?: string[] | null
                    subject?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            messages: {
                Row: {
                    attachments: string[] | null
                    content: string
                    created_at: string | null
                    id: string
                    parent_id: string | null
                    read_at: string | null
                    recipient_id: string
                    sender_id: string
                    subject: string | null
                    thread_id: string | null
                    updated_at: string | null
                }
                Insert: {
                    attachments?: string[] | null
                    content: string
                    created_at?: string | null
                    id: string
                    parent_id?: string | null
                    read_at?: string | null
                    recipient_id: string
                    sender_id: string
                    subject?: string | null
                    thread_id?: string | null
                    updated_at?: string | null
                }
                Update: {
                    attachments?: string[] | null
                    content?: string
                    created_at?: string | null
                    id?: string
                    parent_id?: string | null
                    read_at?: string | null
                    recipient_id?: string
                    sender_id?: string
                    subject?: string | null
                    thread_id?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            notifications: {
                Row: {
                    created_at: string | null
                    data: Json | null
                    id: string
                    message: string
                    read_at: string | null
                    title: string
                    type: Database['public']['Enums']['NotificationType']
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    created_at?: string | null
                    data?: Json | null
                    id: string
                    message: string
                    read_at?: string | null
                    title: string
                    type: Database['public']['Enums']['NotificationType']
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    created_at?: string | null
                    data?: Json | null
                    id?: string
                    message?: string
                    read_at?: string | null
                    title?: string
                    type?: Database['public']['Enums']['NotificationType']
                    updated_at?: string | null
                    user_id?: string
                }
                Relationships: []
            }
            organization_members: {
                Row: {
                    created_at: string
                    id: string
                    organization_id: string
                    role: string | null
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    id: string
                    organization_id: string
                    role?: string | null
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    organization_id?: string
                    role?: string | null
                    updated_at?: string | null
                    user_id?: string
                }
                Relationships: []
            }
            organizations: {
                Row: {
                    created_at: string | null
                    name: string
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    created_at?: string | null
                    name: string
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    created_at?: string | null
                    name?: string
                    updated_at?: string | null
                    user_id?: string
                }
                Relationships: []
            }
            password_reset_requests: {
                Row: {
                    created_at: string | null
                    expires_at: string
                    id: string
                    token: string
                    used_at: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    expires_at: string
                    id: string
                    token: string
                    used_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    expires_at?: string
                    id?: string
                    token?: string
                    used_at?: string | null
                    user_id?: string | null
                }
                Relationships: []
            }
            payments: {
                Row: {
                    created_at: string
                    id: string
                    payment_amount: number
                    payment_date: string
                    payment_method: string
                    payment_notes: string | null
                    payment_status: string
                    payment_type: string
                    property_id: string
                    tenant_id: string
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    id: string
                    payment_amount: number
                    payment_date: string
                    payment_method: string
                    payment_notes?: string | null
                    payment_status?: string
                    payment_type: string
                    property_id: string
                    tenant_id: string
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    payment_amount?: number
                    payment_date?: string
                    payment_method?: string
                    payment_notes?: string | null
                    payment_status?: string
                    payment_type?: string
                    property_id?: string
                    tenant_id?: string
                    updated_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'payments_property_id_fkey'
                        columns: ['property_id']
                        isOneToOne: false
                        referencedRelation: 'properties'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'payments_tenant_id_fkey'
                        columns: ['tenant_id']
                        isOneToOne: false
                        referencedRelation: 'tenants'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'payments_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            profiles: {
                Row: {
                    user_id: string
                }
                Insert: {
                    user_id: string
                }
                Update: {
                    user_id?: string
                }
                Relationships: []
            }
            properties: {
                Row: {
                    address: string
                    city: string
                    created_at: string
                    id: string
                    name: string
                    property_status: string
                    property_type: string
                    rent_amount: number
                    state: string
                    updated_at: string
                    user_id: string
                    zip: string
                }
                Insert: {
                    address: string
                    city: string
                    created_at?: string
                    id: string
                    name: string
                    property_status?: string
                    property_type?: string
                    rent_amount: number
                    state: string
                    updated_at?: string
                    user_id: string
                    zip: string
                }
                Update: {
                    address?: string
                    city?: string
                    created_at?: string
                    id?: string
                    name?: string
                    property_status?: string
                    property_type?: string
                    rent_amount?: number
                    state?: string
                    updated_at?: string
                    user_id?: string
                    zip?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'properties_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            rent_payment: {
                Row: {
                    created_at: string | null
                    due_date: string
                    id: string
                    invoice_number: string | null
                    late_fee: number | null
                    notes: string | null
                    paid_date: string | null
                    payment_amount: number
                    payment_status: string
                    PaymentMethod: string | null
                    property_id: string
                    tenant_id: string
                    transaction_id: string | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    due_date: string
                    id: string
                    invoice_number?: string | null
                    late_fee?: number | null
                    notes?: string | null
                    paid_date?: string | null
                    payment_amount: number
                    payment_status?: string
                    PaymentMethod?: string | null
                    property_id: string
                    tenant_id: string
                    transaction_id?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    due_date?: string
                    id?: string
                    invoice_number?: string | null
                    late_fee?: number | null
                    notes?: string | null
                    paid_date?: string | null
                    payment_amount?: number
                    payment_status?: string
                    PaymentMethod?: string | null
                    property_id?: string
                    tenant_id?: string
                    transaction_id?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            schema_migrations: {
                Row: {
                    version: string
                }
                Insert: {
                    version: string
                }
                Update: {
                    version?: string
                }
                Relationships: []
            }
            security_audit_log: {
                Row: {
                    created_at: string | null
                    event_type: string
                    id: string
                    ip_address: unknown | null
                    metadata: Json | null
                    new_values: Json | null
                    old_values: Json | null
                    resource_id: string | null
                    resource_type: string
                    severity: string
                    user_agent: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    event_type: string
                    id: string
                    ip_address?: unknown | null
                    metadata?: Json | null
                    new_values?: Json | null
                    old_values?: Json | null
                    resource_id?: string | null
                    resource_type: string
                    severity: string
                    user_agent?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    event_type?: string
                    id?: string
                    ip_address?: unknown | null
                    metadata?: Json | null
                    new_values?: Json | null
                    old_values?: Json | null
                    resource_id?: string | null
                    resource_type?: string
                    severity?: string
                    user_agent?: string | null
                    user_id?: string | null
                }
                Relationships: []
            }
            Session: {
                Row: {
                    expires: string
                    id: string
                    sessionToken: string
                    user_id: string
                }
                Insert: {
                    expires: string
                    id: string
                    sessionToken: string
                    user_id: string
                }
                Update: {
                    expires?: string
                    id?: string
                    sessionToken?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'Session_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            subscriptions: {
                Row: {
                    active_until: string | null
                    created_at: string | null
                    id: string
                    product_id: string
                    stripe_customer_id: string | null
                    stripe_price_amount: number | null
                    stripe_price_currency: string | null
                    stripe_price_id: string | null
                    stripe_price_interval: string | null
                    stripe_price_usage_type: string | null
                    stripe_product_id: string | null
                    stripe_subscription_id: string | null
                    subscription_end_date: string | null
                    subscription_start_date: string | null
                    subscription_status: string
                    subscription_type: string
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    active_until?: string | null
                    created_at?: string | null
                    id: string
                    product_id: string
                    stripe_customer_id?: string | null
                    stripe_price_amount?: number | null
                    stripe_price_currency?: string | null
                    stripe_price_id?: string | null
                    stripe_price_interval?: string | null
                    stripe_price_usage_type?: string | null
                    stripe_product_id?: string | null
                    stripe_subscription_id?: string | null
                    subscription_end_date?: string | null
                    subscription_start_date?: string | null
                    subscription_status: string
                    subscription_type: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    active_until?: string | null
                    created_at?: string | null
                    id?: string
                    product_id?: string
                    stripe_customer_id?: string | null
                    stripe_price_amount?: number | null
                    stripe_price_currency?: string | null
                    stripe_price_id?: string | null
                    stripe_price_interval?: string | null
                    stripe_price_usage_type?: string | null
                    stripe_product_id?: string | null
                    stripe_subscription_id?: string | null
                    subscription_end_date?: string | null
                    subscription_start_date?: string | null
                    subscription_status?: string
                    subscription_type?: string
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: []
            }
            system_configurations: {
                Row: {
                    description: string | null
                    id: string
                    key: string
                    updated_at: string | null
                    updated_by: string | null
                    value: Json
                }
                Insert: {
                    description?: string | null
                    id: string
                    key: string
                    updated_at?: string | null
                    updated_by?: string | null
                    value: Json
                }
                Update: {
                    description?: string | null
                    id?: string
                    key?: string
                    updated_at?: string | null
                    updated_by?: string | null
                    value?: Json
                }
                Relationships: []
            }
            tenants: {
                Row: {
                    created_at: string
                    documents: Json[] | null
                    email: string
                    emergency_contact: Json | null
                    first_name: string
                    id: string
                    last_name: string
                    move_in_date: string | null
                    move_out_date: string | null
                    phone: string | null
                    property_id: string
                    tenant_status: string
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    created_at?: string
                    documents?: Json[] | null
                    email: string
                    emergency_contact?: Json | null
                    first_name: string
                    id: string
                    last_name: string
                    move_in_date?: string | null
                    move_out_date?: string | null
                    phone?: string | null
                    property_id: string
                    tenant_status?: string
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    created_at?: string
                    documents?: Json[] | null
                    email?: string
                    emergency_contact?: Json | null
                    first_name?: string
                    id?: string
                    last_name?: string
                    move_in_date?: string | null
                    move_out_date?: string | null
                    phone?: string | null
                    property_id?: string
                    tenant_status?: string
                    updated_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'tenants_property_id_fkey'
                        columns: ['property_id']
                        isOneToOne: false
                        referencedRelation: 'properties'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'tenants_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            user_activity_logs: {
                Row: {
                    action: string
                    created_at: string | null
                    details: Json | null
                    entity: string
                    entity_id: string | null
                    id: string
                    ip_address: string | null
                    user_agent: string | null
                    user_id: string | null
                }
                Insert: {
                    action: string
                    created_at?: string | null
                    details?: Json | null
                    entity: string
                    entity_id?: string | null
                    id: string
                    ip_address?: string | null
                    user_agent?: string | null
                    user_id?: string | null
                }
                Update: {
                    action?: string
                    created_at?: string | null
                    details?: Json | null
                    entity?: string
                    entity_id?: string | null
                    id?: string
                    ip_address?: string | null
                    user_agent?: string | null
                    user_id?: string | null
                }
                Relationships: []
            }
            user_profiles: {
                Row: {
                    auth_user: string
                    avatar_url: string | null
                    company_name: string | null
                    company_position: string | null
                    created_at: string | null
                    email: string
                    first_name: string | null
                    id: string
                    last_login_at: string | null
                    last_login_ip: string | null
                    last_name: string | null
                    lease_id: string | null
                    maintenance_request_id: string | null
                    notification_preferences: Json | null
                    phone: string | null
                    property_id: string | null
                    tenant_id: string | null
                    timezone: string | null
                    updated_at: string | null
                }
                Insert: {
                    auth_user: string
                    avatar_url?: string | null
                    company_name?: string | null
                    company_position?: string | null
                    created_at?: string | null
                    email: string
                    first_name?: string | null
                    id: string
                    last_login_at?: string | null
                    last_login_ip?: string | null
                    last_name?: string | null
                    lease_id?: string | null
                    maintenance_request_id?: string | null
                    notification_preferences?: Json | null
                    phone?: string | null
                    property_id?: string | null
                    tenant_id?: string | null
                    timezone?: string | null
                    updated_at?: string | null
                }
                Update: {
                    auth_user?: string
                    avatar_url?: string | null
                    company_name?: string | null
                    company_position?: string | null
                    created_at?: string | null
                    email?: string
                    first_name?: string | null
                    id?: string
                    last_login_at?: string | null
                    last_login_ip?: string | null
                    last_name?: string | null
                    lease_id?: string | null
                    maintenance_request_id?: string | null
                    notification_preferences?: Json | null
                    phone?: string | null
                    property_id?: string | null
                    tenant_id?: string | null
                    timezone?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            user_security_settings: {
                Row: {
                    allowed_ips: unknown[] | null
                    backup_codes: string[] | null
                    last_password_change: string | null
                    login_notifications: boolean | null
                    max_sessions: number | null
                    password_expires_at: string | null
                    require_password_change: boolean | null
                    security_questions: Json | null
                    two_factor_enabled: boolean | null
                    two_factor_method: string | null
                    updated_at: string | null
                    user_id: string
                }
                Insert: {
                    allowed_ips?: unknown[] | null
                    backup_codes?: string[] | null
                    last_password_change?: string | null
                    login_notifications?: boolean | null
                    max_sessions?: number | null
                    password_expires_at?: string | null
                    require_password_change?: boolean | null
                    security_questions?: Json | null
                    two_factor_enabled?: boolean | null
                    two_factor_method?: string | null
                    updated_at?: string | null
                    user_id: string
                }
                Update: {
                    allowed_ips?: unknown[] | null
                    backup_codes?: string[] | null
                    last_password_change?: string | null
                    login_notifications?: boolean | null
                    max_sessions?: number | null
                    password_expires_at?: string | null
                    require_password_change?: boolean | null
                    security_questions?: Json | null
                    two_factor_enabled?: boolean | null
                    two_factor_method?: string | null
                    updated_at?: string | null
                    user_id?: string
                }
                Relationships: []
            }
            user_settings: {
                Row: {
                    created_at: string | null
                    currency: string | null
                    date_format: string | null
                    email_notifications: boolean | null
                    id: string
                    language: string | null
                    notifications_enabled: boolean | null
                    sms_notifications: boolean | null
                    theme: string | null
                    time_format: string | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    currency?: string | null
                    date_format?: string | null
                    email_notifications?: boolean | null
                    id: string
                    language?: string | null
                    notifications_enabled?: boolean | null
                    sms_notifications?: boolean | null
                    theme?: string | null
                    time_format?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    currency?: string | null
                    date_format?: string | null
                    email_notifications?: boolean | null
                    id?: string
                    language?: string | null
                    notifications_enabled?: boolean | null
                    sms_notifications?: boolean | null
                    theme?: string | null
                    time_format?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            users: {
                Row: {
                    clerkId: string
                    created_at: string
                    deleted_at: string | null
                    email: string
                    id: string
                    image: string | null
                    name: string | null
                    role: string
                    stripe_customer_id: string | null
                    subscription_status: string | null
                    updated_at: string
                }
                Insert: {
                    clerkId: string
                    created_at?: string
                    deleted_at?: string | null
                    email: string
                    id: string
                    image?: string | null
                    name?: string | null
                    role?: string
                    stripe_customer_id?: string | null
                    subscription_status?: string | null
                    updated_at?: string
                }
                Update: {
                    clerkId?: string
                    created_at?: string
                    deleted_at?: string | null
                    email?: string
                    id?: string
                    image?: string | null
                    name?: string | null
                    role?: string
                    stripe_customer_id?: string | null
                    subscription_status?: string | null
                    updated_at?: string
                }
                Relationships: []
            }
            vendors: {
                Row: {
                    address: string | null
                    company_name: string
                    contact_name: string
                    created_at: string
                    email: string
                    id: string
                    insurance_info: Json | null
                    license_info: Json | null
                    notes: string | null
                    phone: string
                    rate: number | null
                    rating: number | null
                    services: string[] | null
                    status: string
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    address?: string | null
                    company_name: string
                    contact_name: string
                    created_at?: string
                    email: string
                    id: string
                    insurance_info?: Json | null
                    license_info?: Json | null
                    notes?: string | null
                    phone: string
                    rate?: number | null
                    rating?: number | null
                    services?: string[] | null
                    status?: string
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    address?: string | null
                    company_name?: string
                    contact_name?: string
                    created_at?: string
                    email?: string
                    id?: string
                    insurance_info?: Json | null
                    license_info?: Json | null
                    notes?: string | null
                    phone?: string
                    rate?: number | null
                    rating?: number | null
                    services?: string[] | null
                    status?: string
                    updated_at?: string
                    user_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'vendors_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    }
                ]
            }
            verification_tokens: {
                Row: {
                    expires: string
                    identifier: string
                    token: string
                }
                Insert: {
                    expires: string
                    identifier: string
                    token: string
                }
                Update: {
                    expires?: string
                    identifier?: string
                    token?: string
                }
                Relationships: []
            }
            waitlist: {
                Row: {
                    created_at: string | null
                    email: string
                    id: string
                    position: number
                    referral_code: string
                    referred_by: string | null
                    status: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    id?: string
                    position: number
                    referral_code: string
                    referred_by?: string | null
                    status?: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    id?: string
                    position?: number
                    referral_code?: string
                    referred_by?: string | null
                    status?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            waitlist_attempts: {
                Row: {
                    created_at: string
                    id: string
                    identifier: string
                }
                Insert: {
                    created_at?: string
                    id: string
                    identifier: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    identifier?: string
                }
                Relationships: []
            }
            waitlist_events: {
                Row: {
                    email: string
                    id: string
                    metadata: Json | null
                    timestamp: string | null
                    type: string
                }
                Insert: {
                    email: string
                    id?: string
                    metadata?: Json | null
                    timestamp?: string | null
                    type: string
                }
                Update: {
                    email?: string
                    id?: string
                    metadata?: Json | null
                    timestamp?: string | null
                    type?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'waitlist_events_email_fkey'
                        columns: ['email']
                        isOneToOne: false
                        referencedRelation: 'waitlist'
                        referencedColumns: ['email']
                    }
                ]
            }
            work_orders: {
                Row: {
                    actual_cost: number | null
                    completed_date: string | null
                    created_at: string
                    description: string
                    estimated_cost: number | null
                    id: string
                    maintenance_id: string | null
                    notes: string | null
                    priority: string
                    property_id: string
                    scheduled_date: string
                    status: string
                    title: string
                    updated_at: string
                    user_id: string
                    vendor_id: string
                }
                Insert: {
                    actual_cost?: number | null
                    completed_date?: string | null
                    created_at?: string
                    description: string
                    estimated_cost?: number | null
                    id: string
                    maintenance_id?: string | null
                    notes?: string | null
                    priority?: string
                    property_id: string
                    scheduled_date: string
                    status?: string
                    title: string
                    updated_at?: string
                    user_id: string
                    vendor_id: string
                }
                Update: {
                    actual_cost?: number | null
                    completed_date?: string | null
                    created_at?: string
                    description?: string
                    estimated_cost?: number | null
                    id?: string
                    maintenance_id?: string | null
                    notes?: string | null
                    priority?: string
                    property_id?: string
                    scheduled_date?: string
                    status?: string
                    title?: string
                    updated_at?: string
                    user_id?: string
                    vendor_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'work_orders_property_id_fkey'
                        columns: ['property_id']
                        isOneToOne: false
                        referencedRelation: 'properties'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'work_orders_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'work_orders_vendor_id_fkey'
                        columns: ['vendor_id']
                        isOneToOne: false
                        referencedRelation: 'vendors'
                        referencedColumns: ['id']
                    }
                ]
            }
        }
        Views: {
            waitlist_daily_stats: {
                Row: {
                    date: string | null
                    email_opens: number | null
                    link_clicks: number | null
                    referrals: number | null
                    signups: number | null
                }
                Relationships: []
            }
        }
        Functions: {
            calculate_portfolio_investment_metrics: {
                Args: {
                    p_organization_id: string
                    p_year?: number
                }
                Returns: {
                    property_id: string
                    property_name: string
                    total_revenue: number
                    total_expenses: number
                    net_operating_income: number
                    roi_percentage: number
                    occupancy_rate: number
                }[]
            }
            calculate_property_occupancy: {
                Args: {
                    p_property_id: string
                }
                Returns: {
                    total_units: number
                    occupied_units: number
                    occupancy_rate: number
                }[]
            }
            calculate_property_roi: {
                Args: {
                    p_property_id: string
                    p_year?: number
                }
                Returns: {
                    metric_name: string
                    metric_value: number
                    calculation_notes: string
                }[]
            }
            create_lease: {
                Args: {
                    p_unit_id: string
                    p_tenant_id: string
                    p_start_date: string
                    p_end_date: string
                    p_rent_amount: number
                    p_security_deposit: number
                }
                Returns: {
                    lease_id: string
                    status: string
                }[]
            }
            generate_investment_performance_report: {
                Args: {
                    p_organization_id: string
                    p_year?: number
                }
                Returns: {
                    metric_name: string
                    current_value: number
                    previous_value: number
                    yoy_change: number
                    notes: string
                }[]
            }
            get_tenant_lease_history: {
                Args: {
                    p_tenant_id: string
                }
                Returns: {
                    lease_id: string
                    property_name: string
                    unit_number: string
                    start_date: string
                    end_date: string
                    rent_amount: number
                    status: string
                }[]
            }
            get_top_referrers: {
                Args: {
                    limit_count: number
                }
                Returns: {
                    email: string
                    referral_count: number
                    positions_gained: number
                }[]
            }
            renew_lease: {
                Args: {
                    p_lease_id: string
                    p_new_end_date: string
                    p_new_rent_amount?: number
                }
                Returns: string
            }
            update_lease_statuses: {
                Args: Record<PropertyKey, never>
                Returns: number
            }
            update_maintenance_request: {
                Args: {
                    p_request_id: string
                    p_new_status: string
                    p_assigned_to?: string
                }
                Returns: string
            }
            update_waitlist_positions: {
                Args: {
                    p_referrer_position: number
                    p_new_position: number
                }
                Returns: undefined
            }
            uuid_generate_v1: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
            uuid_generate_v1mc: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
            uuid_generate_v3: {
                Args: {
                    namespace: string
                    name: string
                }
                Returns: string
            }
            uuid_generate_v4: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
            uuid_generate_v5: {
                Args: {
                    namespace: string
                    name: string
                }
                Returns: string
            }
            uuid_nil: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
            uuid_ns_dns: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
            uuid_ns_oid: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
            uuid_ns_url: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
            uuid_ns_x500: {
                Args: Record<PropertyKey, never>
                Returns: string
            }
        }

        Enums: {
            ActivityType:
                | 'CREATE'
                | 'UPDATE'
                | 'DELETE'
                | 'LOGIN'
                | 'LOGOUT'
            AuditAction:
                | 'CREATE'
                | 'UPDATE'
                | 'DELETE'
                | 'LOGIN'
                | 'LOGOUT'
                | 'ADMIN_ACCESS'
                | 'SETTINGS_CHANGE'
                | 'PASSWORD_RESET'
                | 'EMAIL_CHANGE'
                | 'ROLE_CHANGE'
            EntityType:
                | 'USER'
                | 'PROPERTY'
                | 'TENANT'
                | 'LEASE'
                | 'PAYMENT'
                | 'MAINTENANCE'
                | 'DOCUMENT'
                | 'SETTINGS'
                | 'EMAIL_TEMPLATE'
                | 'ROUTE'
            ImageJobPriority: 'LOW' | 'MEDIUM' | 'HIGH'
            ImageJobStatus:
                | 'PENDING'
                | 'PROCESSING'
                | 'COMPLETED'
                | 'FAILED'
            InvoiceStatus:
                | 'DRAFT'
                | 'PENDING'
                | 'PAID'
                | 'OVERDUE'
                | 'CANCELLED'
            InvoiceTemplateType: 'STANDARD' | 'CUSTOM'
            LeaseType:
                | 'FIXED_TERM'
                | 'MONTH_TO_MONTH'
                | 'WEEKLY'
                | 'YEARLY'
            MessageStatus: 'SENT' | 'DELIVERED' | 'READ' | 'FAILED'
            NotificationStatus: 'UNREAD' | 'READ' | 'ARCHIVED'
            NotificationType:
                | 'SYSTEM'
                | 'MAINTENANCE'
                | 'PAYMENT'
                | 'LEASE'
                | 'MESSAGE'
                | 'ALERT'
            PaymentMethod:
                | 'CASH'
                | 'CHECK'
                | 'CREDIT_CARD'
                | 'BANK_TRANSFER'
                | 'OTHER'
            PaymentStatus:
                | 'PENDING'
                | 'PAID'
                | 'COMPLETED'
                | 'FAILED'
                | 'CANCELLED'
                | 'REFUNDED'
                | 'OVERDUE'
                | 'LATE'
                | 'PARTIAL'
            PaymentType:
                | 'RENT'
                | 'DEPOSIT'
                | 'SUBSCRIPTION'
                | 'LATE_FEE'
                | 'MAINTENANCE'
                | 'UTILITIES'
                | 'SECURITY_DEPOSIT'
                | 'OTHER'
            PropertyStatus:
                | 'AVAILABLE'
                | 'OCCUPIED'
                | 'VACANT'
                | 'MAINTENANCE'
                | 'RENOVATION'
                | 'OFF_MARKET'
            PropertyType:
                | 'SINGLE_FAMILY'
                | 'MULTI_FAMILY'
                | 'APARTMENT'
                | 'CONDO'
                | 'TOWNHOUSE'
                | 'COMMERCIAL'
                | 'INDUSTRIAL'
                | 'LAND'
            RequestStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
            SubscriptionStatus:
                | 'ACTIVE'
                | 'PAST_DUE'
                | 'CANCELLED'
                | 'INCOMPLETE'
                | 'INCOMPLETE_EXPIRED'
                | 'TRIALING'
                | 'UNPAID'
            TenantStatus:
                | 'ACTIVE'
                | 'INACTIVE'
                | 'PENDING'
                | 'REJECTED'
            ToolType:
                | 'PROPERTY_MANAGER'
                | 'PROJECT_MANAGER'
                | 'IMAGE_OPTIMIZER'
                | 'DOCUMENT_MANAGER'
            UserRole:
                | 'SUPER_ADMIN'
                | 'ADMIN'
                | 'PROPERTY_MANAGER'
                | 'PROPERTY_OWNER'
                | 'MAINTENANCE'
                | 'TENANT'
                | 'USER'
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

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

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof PublicSchema['CompositeTypes']
        | { schema: keyof Database },
    CompositeTypeName extends
        PublicCompositeTypeNameOrOptions extends {
            schema: keyof Database
        }
            ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
            : never = never
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
}
    ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
      ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
      : never
