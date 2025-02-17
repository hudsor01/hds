export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          state: string
          zip_code: string
          property_type: string
          units: number
          square_footage: number
          year_built: number
          purchase_price: number
          current_value: number
          monthly_rent: number
          expenses: {
            mortgage?: number
            insurance: number
            property_tax: number
            utilities: number
            maintenance: number
            other: number
          }
          status: string
          created_at: string
          updated_at: string
          image_url?: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          state: string
          zip_code: string
          property_type: string
          units: number
          square_footage: number
          year_built: number
          purchase_price: number
          current_value: number
          monthly_rent: number
          expenses: {
            mortgage?: number
            insurance: number
            property_tax: number
            utilities: number
            maintenance: number
            other: number
          }
          status?: string
          created_at?: string
          updated_at?: string
          image_url?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          property_type?: string
          units?: number
          square_footage?: number
          year_built?: number
          purchase_price?: number
          current_value?: number
          monthly_rent?: number
          expenses?: {
            mortgage?: number
            insurance: number
            property_tax: number
            utilities: number
            maintenance: number
            other: number
          }
          status?: string
          updated_at?: string
          image_url?: string
          user_id?: string
        }
      }
      maintenance_requests: {
        Row: {
          id: string
          property_id: string
          description: string
          priority: string
          status: string
          created_at: string
          updated_at: string
          estimated_cost?: number
          assigned_to?: string
          user_id: string
        }
        Insert: {
          id?: string
          property_id: string
          description: string
          priority: string
          status?: string
          created_at?: string
          updated_at?: string
          estimated_cost?: number
          assigned_to?: string
          user_id: string
        }
        Update: {
          id?: string
          property_id?: string
          description?: string
          priority?: string
          status?: string
          updated_at?: string
          estimated_cost?: number
          assigned_to?: string
          user_id?: string
        }
      }
      financial_history: {
        Row: {
          id: string
          property_id: string
          month: string
          revenue: number
          expenses: number
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          property_id: string
          month: string
          revenue: number
          expenses: number
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          property_id?: string
          month?: string
          revenue?: number
          expenses?: number
          updated_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
