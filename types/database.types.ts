import type {EmailTemplate} from '../components/emails/templates';

export type Json = string | number | boolean | null | {[key: string]: Json | undefined} | Json[];

// Common types
export type Timestamp = string;
export type UUID = string;
export type Money = number;
export type Email = string;
export type PhoneNumber = string;
export type ImageUrl = string;
export type DocumentUrl = string;

// Status enums
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export enum PropertyStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  MAINTENANCE = 'maintenance',
  INACTIVE = 'inactive',
}

export enum LeaseStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  ACTIVE = 'active',
  TERMINATED = 'terminated',
  EXPIRED = 'expired',
  RENEWED = 'renewed',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled',
}

export enum MaintenanceStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum MaintenancePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  EMERGENCY = 'emergency',
}

export type ActivityType = 'property' | 'payment' | 'maintenance' | 'tenant';

export interface UseDashboardUpdatesProps {
  table: string;
  select?: string;
  onUpdate: (data: any) => void;
  onDelete: (id: string) => void;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: UUID;
          email: Email;
          full_name: string | null;
          avatar_url: ImageUrl | null;
          role: string;
          status: UserStatus;
          created_at: Timestamp;
          updated_at: Timestamp;
          last_login: Timestamp | null;
          preferences: Json | null;
          stripe_customer_id: string | null;
          subscription_status: string | null;
        };
        Insert: {
          id?: UUID;
          email: Email;
          full_name?: string | null;
          avatar_url?: ImageUrl | null;
          role?: string;
          status?: UserStatus;
          created_at?: Timestamp;
          updated_at?: Timestamp;
          last_login?: Timestamp | null;
          preferences?: Json | null;
          stripe_customer_id?: string | null;
          subscription_status?: string | null;
        };
        Update: {
          id?: UUID;
          email?: Email;
          full_name?: string | null;
          avatar_url?: ImageUrl | null;
          role?: string;
          status?: UserStatus;
          updated_at?: Timestamp;
          last_login?: Timestamp | null;
          preferences?: Json | null;
          stripe_customer_id?: string | null;
          subscription_status?: string | null;
        };
      };

      properties: {
        Row: {
          id: UUID;
          name: string;
          address: string;
          city: string;
          state: string;
          zip: string;
          type: string;
          status: PropertyStatus;
          rent_amount: Money;
          amenities: string[];
          images: ImageUrl[];
          bathrooms: number | null;
          bedrooms: number | null;
          size: number | null;
          owner_id: UUID;
          created_at: Timestamp;
          updated_at: Timestamp;
          metadata: Json | null;
        };
        Insert: {
          id?: UUID;
          name: string;
          address: string;
          city: string;
          state: string;
          zip: string;
          type: string;
          status?: PropertyStatus;
          rent_amount: Money;
          amenities?: string[];
          images?: ImageUrl[];
          bathrooms?: number | null;
          bedrooms?: number | null;
          size?: number | null;
          owner_id: UUID;
          created_at?: Timestamp;
          updated_at?: Timestamp;
          metadata?: Json | null;
        };
        Update: {
          name?: string;
          address?: string;
          city?: string;
          state?: string;
          zip?: string;
          type?: string;
          status?: PropertyStatus;
          rent_amount?: Money;
          amenities?: string[];
          images?: ImageUrl[];
          bathrooms?: number | null;
          bedrooms?: number | null;
          size?: number | null;
          updated_at?: Timestamp;
          metadata?: Json | null;
        };
      };

      leases: {
        Row: {
          id: UUID;
          property_id: UUID;
          tenant_id: UUID;
          type: string;
          status: LeaseStatus;
          start_date: Timestamp;
          end_date: Timestamp | null;
          rent_amount: Money;
          deposit_amount: Money;
          payment_day: number;
          documents: DocumentUrl[];
          created_at: Timestamp;
          updated_at: Timestamp;
          metadata: Json | null;
        };
        Insert: {
          id?: UUID;
          property_id: UUID;
          tenant_id: UUID;
          type: string;
          status?: LeaseStatus;
          start_date: Timestamp;
          end_date?: Timestamp | null;
          rent_amount: Money;
          deposit_amount: Money;
          payment_day: number;
          documents?: DocumentUrl[];
          created_at?: Timestamp;
          updated_at?: Timestamp;
          metadata?: Json | null;
        };
        Update: {
          status?: LeaseStatus;
          end_date?: Timestamp | null;
          rent_amount?: Money;
          deposit_amount?: Money;
          payment_day?: number;
          documents?: DocumentUrl[];
          updated_at?: Timestamp;
          metadata?: Json | null;
        };
      };

      payments: {
        Row: {
          id: UUID;
          lease_id: UUID;
          tenant_id: UUID;
          amount: Money;
          status: PaymentStatus;
          type: string;
          payment_method: string | null;
          payment_intent_id: string | null;
          stripe_charge_id: string | null;
          description: string | null;
          created_at: Timestamp;
          processed_at: Timestamp | null;
          metadata: Json | null;
        };
        Insert: {
          id?: UUID;
          lease_id: UUID;
          tenant_id: UUID;
          amount: Money;
          status?: PaymentStatus;
          type: string;
          payment_method?: string | null;
          payment_intent_id?: string | null;
          stripe_charge_id?: string | null;
          description?: string | null;
          created_at?: Timestamp;
          processed_at?: Timestamp | null;
          metadata?: Json | null;
        };
        Update: {
          status?: PaymentStatus;
          payment_method?: string | null;
          payment_intent_id?: string | null;
          stripe_charge_id?: string | null;
          description?: string | null;
          processed_at?: Timestamp | null;
          metadata?: Json | null;
        };
      };

      maintenance_requests: {
        Row: {
          id: UUID;
          property_id: UUID;
          tenant_id: UUID | null;
          title: string;
          description: string;
          status: MaintenanceStatus;
          priority: MaintenancePriority;
          category: string | null;
          assigned_to: UUID | null;
          images: ImageUrl[];
          cost: Money | null;
          scheduled_date: Timestamp | null;
          completed_date: Timestamp | null;
          created_at: Timestamp;
          updated_at: Timestamp;
          metadata: Json | null;
        };
        Insert: {
          id?: UUID;
          property_id: UUID;
          tenant_id?: UUID | null;
          title: string;
          description: string;
          status?: MaintenanceStatus;
          priority?: MaintenancePriority;
          category?: string | null;
          assigned_to?: UUID | null;
          images?: ImageUrl[];
          cost?: Money | null;
          scheduled_date?: Timestamp | null;
          completed_date?: Timestamp | null;
          created_at?: Timestamp;
          updated_at?: Timestamp;
          metadata?: Json | null;
        };
        Update: {
          title?: string;
          description?: string;
          status?: MaintenanceStatus;
          priority?: MaintenancePriority;
          category?: string | null;
          assigned_to?: UUID | null;
          images?: ImageUrl[];
          cost?: Money | null;
          scheduled_date?: Timestamp | null;
          completed_date?: Timestamp | null;
          updated_at?: Timestamp;
          metadata?: Json | null;
        };
      };
    };

    Views: Record<string, never>;

    Functions: Record<string, never>;

    Enums: {
      user_status: UserStatus;
      property_status: PropertyStatus;
      lease_status: LeaseStatus;
      payment_status: PaymentStatus;
      maintenance_status: MaintenanceStatus;
      maintenance_priority: MaintenancePriority;
    };
    CompositeTypes: Record<string, never>;
  };
}

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | {schema: keyof Database},
  EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | {schema: keyof Database},
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {schema: keyof Database}
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

// types/database.ts
interface BaseRecord {
  id: string;
  createdAt: Date;
}

export interface WaitlistEntry extends BaseRecord {
  email: string;
  status: 'active' | 'invited' | 'converted';
  position: number | null;
  source?: string;
  referralCode?: string;
}

export interface EmailEvent extends BaseRecord {
  waitlistId: string;
  template: string; // Assuming EmailTemplate is a string type
  sentAt: Date;
  openedAt?: Date;
  clickedAt?: Date;
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed';
  metadata?: Record<string, any>;
}

export interface AnalyticsEvent extends BaseRecord {
  eventType: 'signup' | 'email_open' | 'email_click' | 'conversion';
  waitlistId: string;
  metadata?: Record<string, any>;
}

// types/api.ts
export interface WaitlistResponse {
  entry: WaitlistEntry;
  position: number;
  estimatedAccessDate?: Date;
}

export interface EmailStats {
  sent: number;
  opened: number;
  clicked: number;
  openRate: number;
  clickRate: number;
  averageTimeToOpen?: number;
}

export interface WaitlistStats {
  totalSignups: number;
  activeMembers: number;
  conversionRate: number;
  growthRate: number;
  emailMetrics: Record<EmailTemplate, EmailStats>;
}

export interface Session {
  id: string;
  userId: string;
  sessionToken: string;
  expires: Date;
}
