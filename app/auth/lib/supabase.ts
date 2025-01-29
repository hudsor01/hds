import { createBrowserClient } from '@supabase/ssr';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const PROPERTY_TYPES = {
  SINGLE_FAMILY: 'Single Family',
  MULTI_FAMILY: 'Multi Family',
  APARTMENT: 'Apartment',
  CONDO: 'Condo',
  COMMERCIAL: 'Commercial',
} as const;

export const PROPERTY_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  MAINTENANCE: 'Under Maintenance',
  DEVELOPMENT: 'Under Development',
} as const;

// Types for our database tables
export type Property = {
  id: string;
  created_at: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  type: string;
  status: string;
  owner_id: string;
  organization_id: string;
};
