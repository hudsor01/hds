import type {EmailTemplate} from '../components/emails/templates';

export type Json = string | number | boolean | null | {[key: string]: Json | undefined} | Json[];

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
      properties: {
        Row: {
          id: string;
          name: string;
          address: string;
          city: string;
          state: string;
          zip: string;
          owner_id: string;
          manager_id: string | null;
          status: 'available' | 'occupied' | 'maintenance' | 'renovation' | 'off_market';
          type: string;
          rent_amount: number;
          amenities: string[];
          images: string[];
          bathrooms: number | null;
          bedrooms: number | null;
          size: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          address: string;
          city: string;
          state: string;
          zip: string;
          owner_id: string;
          manager_id?: string | null;
          status?: 'available' | 'occupied' | 'maintenance' | 'renovation' | 'off_market';
          type?: string;
          rent_amount: number;
          amenities?: string[];
          images?: string[];
          bathrooms?: number | null;
          bedrooms?: number | null;
          size?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          address?: string;
          city?: string;
          state?: string;
          zip?: string;
          owner_id?: string;
          manager_id?: string | null;
          status?: 'available' | 'occupied' | 'maintenance' | 'renovation' | 'off_market';
          type?: string;
          rent_amount?: number;
          amenities?: string[];
          images?: string[];
          bathrooms?: number | null;
          bedrooms?: number | null;
          size?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      maintenance_requests: {
        Row: {
          id: string;
          title: string;
          description: string;
          status: string;
          priority: string;
          property_id: string | null;
          requester_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          status?: string;
          priority?: string;
          property_id?: string | null;
          requester_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          status?: string;
          priority?: string;
          property_id?: string | null;
          requester_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      payments: {
        Row: {
          user_id: string;
          lease_id: string;
          tenant_id: string;
          property_id: string | null;
          amount: number;
          due_date: string;
          paid_date: string | null;
          status: 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
          method: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'CHECK' | null;
          reference: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          lease_id: string;
          tenant_id: string;
          property_id?: string | null;
          amount: number;
          due_date: string;
          paid_date?: string | null;
          status?: 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
          method?: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'CHECK' | null;
          reference?: string | null;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          lease_id?: string;
          tenant_id?: string;
          property_id?: string | null;
          amount?: number;
          due_date?: string;
          paid_date?: string | null;
          status?: 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
          method?: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'CHECK' | null;
          reference?: string | null;
          created_at?: string;
        };
      };
      tasks: {
        Row: {
          id: number;
          name: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          user_id?: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          user_id?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      property_status: 'available' | 'occupied' | 'maintenance' | 'renovation' | 'off_market';
      payment_status: 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
      payment_method: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'CHECK';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
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
