import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createClient = () => createClientComponentClient<Database>()

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

// Types for our database tables
export type Property = {
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
}

export type Unit = {
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

export type Tenant = {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'pending'
}

export type Lease = {
  id: string
  created_at: string
  unit_id: string
  tenant_id: string
  start_date: string
  end_date: string
  rent_amount: number
  security_deposit: number
  status: 'active' | 'pending' | 'expired' | 'terminated'
}

export type MaintenanceRequest = {
  id: string
  created_at: string
  unit_id: string
  tenant_id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'completed' | 'cancelled'
  assigned_to?: string
  completed_at?: string
}
