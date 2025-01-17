import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

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
