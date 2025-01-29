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
          created_at: string | null
          finished_at: string | null
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
          user_id: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          created_at?: string | null
          finished_at?: string | null
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
          user_id: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          created_at?: string | null
          finished_at?: string | null
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
          user_id?: string
        }
        Relationships: []
      }
      Account: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          provider: string
          providerAccountId: string
          refresh_token: string | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          userId: string
        }
        Insert: {
          access_token?: string | null
          expires_at?: number | null
          id: string
          id_token?: string | null
          provider: string
          providerAccountId: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          userId: string
        }
        Update: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          provider?: string
          providerAccountId?: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Account_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      accounts: {
        Row: {
          access_token: string | null
          created_at: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          provider: string
          provider_account_id: string
          refresh_token: string | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          expires_at?: number | null
          id: string
          id_token?: string | null
          provider: string
          provider_account_id: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          provider?: string
          provider_account_id?: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      activities: {
        Row: {
          created_at: string | null
          description: string
          entity_id: string
          entity_type: Database["public"]["Enums"]["EntityType"]
          id: string
          type: Database["public"]["Enums"]["ActivityType"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description: string
          entity_id: string
          entity_type: Database["public"]["Enums"]["EntityType"]
          id?: string
          type: Database["public"]["Enums"]["ActivityType"]
          user_id?: string
        }
        Update: {
          created_at?: string | null
          description?: string
          entity_id?: string
          entity_type?: Database["public"]["Enums"]["EntityType"]
          id?: string
          type?: Database["public"]["Enums"]["ActivityType"]
          user_id?: string
        }
        Relationships: []
      }
      admin_audit_logs: {
        Row: {
          action: Database["public"]["Enums"]["audit_action"]
          created_at: string | null
          entity_id: string | null
          entity_type: Database["public"]["Enums"]["entity_type"]
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["audit_action"]
          created_at?: string | null
          entity_id?: string | null
          entity_type: Database["public"]["Enums"]["entity_type"]
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["audit_action"]
          created_at?: string | null
          entity_id?: string | null
          entity_type?: Database["public"]["Enums"]["entity_type"]
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      auth_attempts: {
        Row: {
          attempt_type: string
          created_at: string | null
          email: string | null
          id: string
          ip_address: unknown | null
          success: boolean
          user_agent: string | null
        }
        Insert: {
          attempt_type: string
          created_at?: string | null
          email?: string | null
          id?: string
          ip_address?: unknown | null
          success: boolean
          user_agent?: string | null
        }
        Update: {
          attempt_type?: string
          created_at?: string | null
          email?: string | null
          id?: string
          ip_address?: unknown | null
          success?: boolean
          user_agent?: string | null
        }
        Relationships: []
      }
      auth_sessions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          ip_address: unknown | null
          last_activity_at: string | null
          refresh_token: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          ip_address?: unknown | null
          last_activity_at?: string | null
          refresh_token?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          ip_address?: unknown | null
          last_activity_at?: string | null
          refresh_token?: string | null
          user_agent?: string | null
          user_id?: string | null
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
          id?: string
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
      email_templates: {
        Row: {
          body: string
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          name: string
          subject: string
          updated_at: string | null
          updated_by: string | null
          variables: Json | null
        }
        Insert: {
          body: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          updated_at?: string | null
          updated_by?: string | null
          variables?: Json | null
        }
        Update: {
          body?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          updated_at?: string | null
          updated_by?: string | null
          variables?: Json | null
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
          updated_at: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          created_by?: string | null
          date: string
          description?: string | null
          id?: string
          property_id: string
          receipt_url?: string | null
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
          updated_at?: string | null
        }
        Relationships: []
      }
      files: {
        Row: {
          created_at: string
          description: string | null
          key: string
          name: string
          size: number
          type: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          key: string
          name: string
          size: number
          type: string
          url: string
          user_id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          key?: string
          name?: string
          size?: number
          type?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      image_jobs: {
        Row: {
          compression_ratio: number | null
          created_at: string
          id: string
          optimized_size: number | null
          optimized_url: string | null
          original_size: number | null
          original_url: string
          priority: Database["public"]["Enums"]["image_job_priority"]
          processing_completed_at: string | null
          processing_started_at: string | null
          settings: Json
          status: Database["public"]["Enums"]["image_job_status"]
          tags: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          compression_ratio?: number | null
          created_at?: string
          id?: string
          optimized_size?: number | null
          optimized_url?: string | null
          original_size?: number | null
          original_url: string
          priority?: Database["public"]["Enums"]["image_job_priority"]
          processing_completed_at?: string | null
          processing_started_at?: string | null
          settings?: Json
          status?: Database["public"]["Enums"]["image_job_status"]
          tags?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          compression_ratio?: number | null
          created_at?: string
          id?: string
          optimized_size?: number | null
          optimized_url?: string | null
          original_size?: number | null
          original_url?: string
          priority?: Database["public"]["Enums"]["image_job_priority"]
          processing_completed_at?: string | null
          processing_started_at?: string | null
          settings?: Json
          status?: Database["public"]["Enums"]["image_job_status"]
          tags?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      image_presets: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          name: string
          settings: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name: string
          settings?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name?: string
          settings?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      invoice_templates: {
        Row: {
          content: Json
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          name: string
          settings: Json
          template_type: Database["public"]["Enums"]["invoice_template_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name: string
          settings?: Json
          template_type?: Database["public"]["Enums"]["invoice_template_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          name?: string
          settings?: Json
          template_type?: Database["public"]["Enums"]["invoice_template_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          created_at: string
          currency: string
          due_date: string
          id: string
          invoice_number: string
          issued_date: string
          items: Json
          notes: string | null
          paid_date: string | null
          recipient_data: Json
          status: Database["public"]["Enums"]["invoice_status"]
          subtotal: number
          tax: number
          template_id: string | null
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string
          due_date: string
          id?: string
          invoice_number: string
          issued_date?: string
          items?: Json
          notes?: string | null
          paid_date?: string | null
          recipient_data?: Json
          status?: Database["public"]["Enums"]["invoice_status"]
          subtotal?: number
          tax?: number
          template_id?: string | null
          total?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          due_date?: string
          id?: string
          invoice_number?: string
          issued_date?: string
          items?: Json
          notes?: string | null
          paid_date?: string | null
          recipient_data?: Json
          status?: Database["public"]["Enums"]["invoice_status"]
          subtotal?: number
          tax?: number
          template_id?: string | null
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
          id?: string
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
          payment_day: number
          property_id: string
          rent_amount: number
          start_date: string
          status: Database["public"]["Enums"]["leasestatus"]
          tenant_id: string
          type: Database["public"]["Enums"]["LeaseType"]
          user_id: string
        }
        Insert: {
          created_at?: string
          depositAmount: number
          documents?: string[] | null
          end_date?: string | null
          payment_day: number
          property_id: string
          rent_amount: number
          start_date: string
          status?: Database["public"]["Enums"]["leasestatus"]
          tenant_id: string
          type: Database["public"]["Enums"]["LeaseType"]
          user_id?: string
        }
        Update: {
          created_at?: string
          depositAmount?: number
          documents?: string[] | null
          end_date?: string | null
          payment_day?: number
          property_id?: string
          rent_amount?: number
          start_date?: string
          status?: Database["public"]["Enums"]["leasestatus"]
          tenant_id?: string
          type?: Database["public"]["Enums"]["LeaseType"]
          user_id?: string
        }
        Relationships: []
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
          id?: string
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
      message_threads: {
        Row: {
          created_at: string | null
          id: string
          last_message_id: string | null
          participants: string[]
          subject: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_message_id?: string | null
          participants: string[]
          subject: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_message_id?: string | null
          participants?: string[]
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
          status: Database["public"]["Enums"]["message_status"] | null
          subject: string | null
          thread_id: string | null
          updated_at: string | null
        }
        Insert: {
          attachments?: string[] | null
          content: string
          created_at?: string | null
          id?: string
          parent_id?: string | null
          read_at?: string | null
          recipient_id: string
          sender_id: string
          status?: Database["public"]["Enums"]["message_status"] | null
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
          status?: Database["public"]["Enums"]["message_status"] | null
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
          status: Database["public"]["Enums"]["notification_status"] | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          read_at?: string | null
          status?: Database["public"]["Enums"]["notification_status"] | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          read_at?: string | null
          status?: Database["public"]["Enums"]["notification_status"] | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
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
          id?: string
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
          amount: number
          created_at: string
          due_date: string
          lease_id: string
          method: Database["public"]["Enums"]["PaymentMethod"] | null
          paid_date: string | null
          property_id: string
          reference: string | null
          status: Database["public"]["Enums"]["paymentstatus"]
          tenant_id: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          due_date: string
          lease_id: string
          method?: Database["public"]["Enums"]["PaymentMethod"] | null
          paid_date?: string | null
          property_id: string
          reference?: string | null
          status?: Database["public"]["Enums"]["paymentstatus"]
          tenant_id: string
          user_id?: string
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string
          lease_id?: string
          method?: Database["public"]["Enums"]["PaymentMethod"] | null
          paid_date?: string | null
          property_id?: string
          reference?: string | null
          status?: Database["public"]["Enums"]["paymentstatus"]
          tenant_id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          phone: string | null
          role: Database["public"]["Enums"]["userrole"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["userrole"]
          user_id?: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["userrole"]
          user_id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          amenities: string[] | null
          bathrooms: number | null
          bedrooms: number | null
          city: string
          created_at: string | null
          id: string
          images: string[] | null
          manager_id: string | null
          name: string
          owner_id: string
          price: number | null
          size: number | null
          state: string
          status: string
          type: string
          updated_at: string | null
          zip: string
        }
        Insert: {
          address: string
          amenities?: string[] | null
          bathrooms?: number | null
          bedrooms?: number | null
          city: string
          created_at?: string | null
          id?: string
          images?: string[] | null
          manager_id?: string | null
          name: string
          owner_id: string
          price?: number | null
          size?: number | null
          state: string
          status?: string
          type?: string
          updated_at?: string | null
          zip: string
        }
        Update: {
          address?: string
          amenities?: string[] | null
          bathrooms?: number | null
          bedrooms?: number | null
          city?: string
          created_at?: string | null
          id?: string
          images?: string[] | null
          manager_id?: string | null
          name?: string
          owner_id?: string
          price?: number | null
          size?: number | null
          state?: string
          status?: string
          type?: string
          updated_at?: string | null
          zip?: string
        }
        Relationships: []
      }
      rent_payments: {
        Row: {
          amount: number
          created_at: string | null
          due_date: string
          id: string
          invoice_number: string | null
          late_fee: number | null
          notes: string | null
          paid_date: string | null
          payment_method: string | null
          property_id: string
          status: string
          tenant_id: string
          transaction_id: string | null
          unit_id: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          due_date: string
          id?: string
          invoice_number?: string | null
          late_fee?: number | null
          notes?: string | null
          paid_date?: string | null
          payment_method?: string | null
          property_id: string
          status?: string
          tenant_id: string
          transaction_id?: string | null
          unit_id: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          due_date?: string
          id?: string
          invoice_number?: string | null
          late_fee?: number | null
          notes?: string | null
          paid_date?: string | null
          payment_method?: string | null
          property_id?: string
          status?: string
          tenant_id?: string
          transaction_id?: string | null
          unit_id?: string
          updated_at?: string | null
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
          id?: string
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
          userId: string
        }
        Insert: {
          expires: string
          id: string
          sessionToken: string
          userId: string
        }
        Update: {
          expires?: string
          id?: string
          sessionToken?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Session_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          browser: string | null
          created_at: string
          device: string | null
          expires: string
          id: string
          ip_address: string | null
          is_revoked: boolean
          last_active: string
          operating_system: string | null
          session_token: string
          updated_at: string
          user_id: string
        }
        Insert: {
          browser?: string | null
          created_at?: string
          device?: string | null
          expires: string
          id?: string
          ip_address?: string | null
          is_revoked?: boolean
          last_active?: string
          operating_system?: string | null
          session_token: string
          updated_at?: string
          user_id: string
        }
        Update: {
          browser?: string | null
          created_at?: string
          device?: string | null
          expires?: string
          id?: string
          ip_address?: string | null
          is_revoked?: boolean
          last_active?: string
          operating_system?: string | null
          session_token?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          active_until: string | null
          created_at: string | null
          id: string
          product_id: string
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          active_until?: string | null
          created_at?: string | null
          id?: string
          product_id: string
          status: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          active_until?: string | null
          created_at?: string | null
          id?: string
          product_id?: string
          status?: string
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
          id?: string
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
          created_at: string | null
          documents: Json[] | null
          email: string
          emergency_contact: Json | null
          first_name: string
          id: string
          last_name: string
          move_in_date: string | null
          move_out_date: string | null
          phone: string | null
          status: string
          unit_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          documents?: Json[] | null
          email: string
          emergency_contact?: Json | null
          first_name: string
          id?: string
          last_name: string
          move_in_date?: string | null
          move_out_date?: string | null
          phone?: string | null
          status?: string
          unit_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          documents?: Json[] | null
          email?: string
          emergency_contact?: Json | null
          first_name?: string
          id?: string
          last_name?: string
          move_in_date?: string | null
          move_out_date?: string | null
          phone?: string | null
          status?: string
          unit_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      units: {
        Row: {
          bathrooms: number | null
          bedrooms: number | null
          created_at: string | null
          features: Json | null
          floor_plan: string | null
          id: string
          property_id: string
          rent_amount: number | null
          square_feet: number | null
          status: string
          unit_number: string
          updated_at: string | null
        }
        Insert: {
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string | null
          features?: Json | null
          floor_plan?: string | null
          id?: string
          property_id: string
          rent_amount?: number | null
          square_feet?: number | null
          status?: string
          unit_number: string
          updated_at?: string | null
        }
        Update: {
          bathrooms?: number | null
          bedrooms?: number | null
          created_at?: string | null
          features?: Json | null
          floor_plan?: string | null
          id?: string
          property_id?: string
          rent_amount?: number | null
          square_feet?: number | null
          status?: string
          unit_number?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      User: {
        Row: {
          email: string | null
          emailVerified: string | null
          id: string
          image: string | null
          name: string | null
          stripeCustomerId: string | null
          stripeSubscriptionId: string | null
          subscriptionStatus: string | null
        }
        Insert: {
          email?: string | null
          emailVerified?: string | null
          id: string
          image?: string | null
          name?: string | null
          stripeCustomerId?: string | null
          stripeSubscriptionId?: string | null
          subscriptionStatus?: string | null
        }
        Update: {
          email?: string | null
          emailVerified?: string | null
          id?: string
          image?: string | null
          name?: string | null
          stripeCustomerId?: string | null
          stripeSubscriptionId?: string | null
          subscriptionStatus?: string | null
        }
        Relationships: []
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
          id?: string
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
          notification_preferences: Json | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
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
          notification_preferences?: Json | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
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
          notification_preferences?: Json | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
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
          created_at: string | null
          email: string | null
          email_verified: string | null
          id: string
          image: string | null
          name: string | null
          password_hash: string | null
          provider: string | null
          provider_id: string | null
          stripe_customer_id: string | null
          subscription_status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          email_verified?: string | null
          id: string
          image?: string | null
          name?: string | null
          password_hash?: string | null
          provider?: string | null
          provider_id?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          email_verified?: string | null
          id?: string
          image?: string | null
          name?: string | null
          password_hash?: string | null
          provider?: string | null
          provider_id?: string | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      verification_tokens: {
        Row: {
          created_at: string | null
          expires: string
          identifier: string
          token: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires: string
          identifier: string
          token: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires?: string
          identifier?: string
          token?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      VerificationToken: {
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
      waitlist_attempts: {
        Row: {
          created_at: string
          id: string
          identifier: string
        }
        Insert: {
          created_at?: string
          id?: string
          identifier: string
        }
        Update: {
          created_at?: string
          id?: string
          identifier?: string
        }
        Relationships: []
      }
    }
    Views: {
      activity_summary: {
        Row: {
          action_count: number | null
          first_action: string | null
          last_action: string | null
          type: Database["public"]["Enums"]["ActivityType"] | null
          user_id: string | null
        }
        Relationships: []
      }
      auth_activity_metrics: {
        Row: {
          failed_attempts: number | null
          successful_attempts: number | null
          time_bucket: string | null
          total_attempts: number | null
          unique_ips: number | null
          unique_user_agents: number | null
          unique_users: number | null
        }
        Relationships: []
      }
      document_analytics: {
        Row: {
          document_types_count: Json | null
          documents_last_30_days: number | null
          total_documents: number | null
          user_id: string | null
        }
        Relationships: []
      }
      financial_analytics: {
        Row: {
          expense_breakdown: Json | null
          expenses: number | null
          late_payments: number | null
          month: string | null
          net_income: number | null
          property_id: string | null
          property_name: string | null
          revenue: number | null
        }
        Relationships: []
      }
      image_preset_usage_metrics: {
        Row: {
          avg_compression_ratio: number | null
          common_tags: string[] | null
          jobs_by_status: Json | null
          preset_id: string | null
          preset_name: string | null
          total_uses: number | null
          unique_users: number | null
          user_id: string | null
        }
        Relationships: []
      }
      invoice_template_metrics: {
        Row: {
          avg_invoice_amount: number | null
          currencies_used: string[] | null
          invoices_by_status: Json | null
          template_id: string | null
          template_name: string | null
          total_amount_generated: number | null
          total_uses: number | null
          unique_users: number | null
          user_id: string | null
        }
        Relationships: []
      }
      recent_activities: {
        Row: {
          created_at: string | null
          description: string | null
          entity_id: string | null
          entity_type: Database["public"]["Enums"]["EntityType"] | null
          type: Database["public"]["Enums"]["ActivityType"] | null
          user_id: string | null
          user_name: string | null
          user_role: Database["public"]["Enums"]["userrole"] | null
        }
        Relationships: []
      }
      user_engagement_metrics: {
        Row: {
          active_days: number | null
          activities_per_day: number | null
          activity_type_breakdown: Json | null
          last_activity: string | null
          total_activities: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      assign_maintenance_team: {
        Args: {
          request_uuid: string
          skills_needed: string[]
        }
        Returns: {
          team_member_id: string
          match_score: number
          current_workload: number
        }[]
      }
      auto_assign_maintenance_request: {
        Args: {
          request_uuid: string
        }
        Returns: string
      }
      auto_check_inventory: {
        Args: Record<PropertyKey, never>
        Returns: {
          item_id: string
          item_name: string
          current_quantity: number
          minimum_quantity: number
        }[]
      }
      auto_cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      auto_generate_security_alerts: {
        Args: Record<PropertyKey, never>
        Returns: {
          alert_type: string
          severity: string
          details: Json
        }[]
      }
      auto_schedule_maintenance: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      calculate_late_fees: {
        Args: {
          payment_id: string
          grace_period_days?: number
          late_fee_percentage?: number
        }
        Returns: number
      }
      check_auth_suspicious_activity: {
        Args: {
          check_email: string
          check_ip: unknown
          time_window?: unknown
        }
        Returns: {
          is_suspicious: boolean
          reason: string
        }[]
      }
      check_project_access: {
        Args: {
          project_id: string
          required_role?: string
        }
        Returns: boolean
      }
      create_system_notification: {
        Args: {
          p_user_id: string
          p_type: Database["public"]["Enums"]["notification_type"]
          p_title: string
          p_message: string
          p_data?: Json
        }
        Returns: string
      }
      generate_invoice_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_active_assignments_by_team: {
        Args: {
          member_ids: string[]
        }
        Returns: {
          id: string
          title: string
          priority: string
          status: string
          assigned_to: string
        }[]
      }
      get_admin_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_all_dashboard_stats: {
        Args: {
          user_uuid: string
        }
        Returns: Json
      }
      get_completed_request_counts_by_team: {
        Args: {
          member_ids: string[]
        }
        Returns: {
          user_id: string
          count: number
        }[]
      }
      get_costs_by_request_ids: {
        Args: {
          request_ids: string[]
        }
        Returns: {
          id: string
          request_id: string
          category: string
          amount: number
          vendor: string
          invoice_number: string
          payment_status: string
          payment_date: string
          created_by: string
          created_at: string
          updated_at: string
        }[]
      }
      get_financial_summary: {
        Args: {
          property_id: string
          start_date: string
          end_date: string
        }
        Returns: {
          total_income: number
          total_expenses: number
          net_income: number
          expense_breakdown: Json
          income_by_month: Json
        }[]
      }
      get_maintenance_metrics: {
        Args: {
          property_id: string
        }
        Returns: {
          total_requests: number
          pending_requests: number
          avg_completion_time: unknown
          total_cost: number
          requests_by_priority: Json
        }[]
      }
      get_metric_trends: {
        Args: {
          user_uuid: string
          start_date: string
          end_date: string
          interval_type?: string
        }
        Returns: {
          period: string
          revenue: number
          active_tenants: number
          occupancy_rate: number
          document_count: number
          activity_count: number
        }[]
      }
      get_project_burndown: {
        Args: {
          project_uuid: string
          start_date: string
          end_date: string
        }
        Returns: {
          date: string
          total_points: number
          remaining_points: number
          ideal_burndown: number
          actual_velocity: number
        }[]
      }
      get_project_trends: {
        Args: {
          user_uuid: string
          start_date: string
          end_date: string
          interval_type?: string
        }
        Returns: {
          period: string
          active_projects: number
          completed_tasks: number
          total_tasks: number
          hours_logged: number
          completion_rate: number
        }[]
      }
      get_properties_by_ids: {
        Args: {
          property_ids: string[]
        }
        Returns: {
          id: string
          name: string
          address: string
        }[]
      }
      get_property_revenue_stats: {
        Args: {
          property_uuid: string
          start_date: string
          end_date: string
        }
        Returns: {
          total_revenue: number
          paid_revenue: number
          pending_revenue: number
          late_payments: number
          collection_rate: number
        }[]
      }
      get_property_summary: {
        Args: {
          property_id: string
        }
        Returns: {
          total_units: number
          occupied_units: number
          vacant_units: number
          total_revenue: number
          pending_maintenance_requests: number
        }[]
      }
      get_property_trends: {
        Args: {
          user_uuid: string
          start_date: string
          end_date: string
          interval_type?: string
        }
        Returns: {
          period: string
          occupancy_rate: number
          revenue_collected: number
          maintenance_costs: number
          new_leases: number
          ending_leases: number
          avg_lease_rate: number
          tenant_satisfaction: number
        }[]
      }
      get_team_members_by_ids: {
        Args: {
          user_ids: string[]
        }
        Returns: {
          user_id: string
          role: string
        }[]
      }
      get_templates_by_ids: {
        Args: {
          template_ids: string[]
        }
        Returns: {
          id: string
          name: string
          checklist: string[]
        }[]
      }
      get_tenant_summary: {
        Args: {
          tenant_id: string
        }
        Returns: {
          total_payments: number
          pending_payments: number
          active_maintenance_requests: number
          lease_end_date: string
          payment_history: Json
        }[]
      }
      get_tool_dashboard_stats: {
        Args: {
          tool_name: string
          user_uuid: string
        }
        Returns: Json
      }
      get_user_activity: {
        Args: {
          user_id: string
          days?: number
        }
        Returns: {
          login_count: number
          last_login: string
          activity_summary: Json
          recent_actions: Json[]
        }[]
      }
      get_user_subscriptions: {
        Args: {
          user_uuid: string
        }
        Returns: {
          product_id: string
          is_active: boolean
          expires_at: string
        }[]
      }
      refresh_analytics_views: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      ActivityType: "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT"
      audit_action:
        | "CREATE"
        | "UPDATE"
        | "DELETE"
        | "LOGIN"
        | "LOGOUT"
        | "ADMIN_ACCESS"
        | "SETTINGS_CHANGE"
        | "PASSWORD_RESET"
        | "EMAIL_CHANGE"
        | "ROLE_CHANGE"
      entity_type:
        | "USER"
        | "PROPERTY"
        | "TENANT"
        | "MAINTENANCE"
        | "PAYMENT"
        | "LEASE"
        | "DOCUMENT"
        | "SETTINGS"
        | "EMAIL_TEMPLATE"
        | "ROUTE"
      EntityType:
        | "PROPERTY"
        | "TENANT"
        | "LEASE"
        | "PAYMENT"
        | "MAINTENANCE"
        | "DOCUMENT"
      image_job_priority: "low" | "medium" | "high"
      image_job_status: "pending" | "processing" | "completed" | "failed"
      invoice_status: "draft" | "pending" | "paid" | "overdue" | "cancelled"
      invoice_template_type: "standard" | "custom"
      leasestatus: "Active" | "Pending" | "Expired" | "Terminated"
      LeaseType: "FIXED_TERM" | "MONTH_TO_MONTH" | "WEEKLY" | "YEARLY"
      message_status: "sent" | "delivered" | "read" | "failed"
      notification_status: "unread" | "read" | "archived"
      notification_type:
        | "system"
        | "maintenance"
        | "payment"
        | "lease"
        | "message"
        | "alert"
      payment_status:
        | "pending"
        | "paid"
        | "partial"
        | "late"
        | "overdue"
        | "cancelled"
        | "refunded"
      paymentcategory:
        | "RENT"
        | "SECURITY_DEPOSIT"
        | "LATE_FEE"
        | "MAINTENANCE"
        | "UTILITIES"
        | "OTHER"
      paymentmethod:
        | "CASH"
        | "CHECK"
        | "CREDIT_CARD"
        | "BANK_TRANSFER"
        | "OTHER"
      PaymentMethod: "CREDIT_CARD" | "BANK_TRANSFER" | "CASH" | "CHECK"
      paymentstatus: "Pending" | "Paid" | "Overdue" | "Cancelled"
      paymenttype: "Rent" | "Deposit" | "Maintenance" | "Other"
      property_status:
        | "available"
        | "occupied"
        | "maintenance"
        | "renovation"
        | "off_market"
      property_type:
        | "single_family"
        | "multi_family"
        | "apartment"
        | "condo"
        | "townhouse"
        | "commercial"
        | "industrial"
        | "land"
      propertystatus: "Occupied" | "Vacant" | "Maintenance"
      propertytype: "Residential" | "Commercial" | "Industrial"
      request_status: "pending" | "approved" | "rejected"
      tenant_status:
        | "active"
        | "pending"
        | "inactive"
        | "eviction"
        | "moved_out"
      tenantstatus: "ACTIVE" | "INACTIVE" | "PENDING" | "TERMINATED"
      TenantStatus: "ACTIVE" | "INACTIVE" | "PENDING" | "REJECTED"
      tool_type:
        | "property_manager"
        | "project_manager"
        | "image_optimizer"
        | "document_manager"
      user_role:
        | "super_admin"
        | "admin"
        | "property_manager"
        | "maintenance"
        | "tenant"
        | "user"
      userrole: "Admin" | "Manager" | "Owner" | "Tenant"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
