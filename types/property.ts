import type { MaintenanceRequest } from './maintenance_requests'
import type { Tenant } from './tenant'
import type { Database } from './supabase_db.types'
import type { Task } from './task'

export const PROPERTY_STATUS = {
  active: 'active',
  inactive: 'inactive',
  maintenance: 'maintenance',
  sold: 'sold',
} as const;

export const PROPERTY_TYPES = {
  apartment: 'apartment',
  house: 'house',
  condo: 'condo',
  townhouse: 'townhouse',
  commercial: 'commercial',
} as const;

// Reference the enums from Supabase
export type PropertyType = Database['public']['Enums']['PropertyType'];
export type PropertyStatus = Database['public']['Enums']['PropertyStatus'];

// Base property type from Supabase
export type PropertyRow = Database['public']['Tables']['properties']['Row'];
export type PropertyInsert = Database['public']['Tables']['properties']['Insert'];
export type PropertyUpdate = Database['public']['Tables']['properties']['Update'];

export type Property = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
};

// Extended types for UI components
export interface PropertyListProps {
  properties: PropertyRow[];
  isLoading?: boolean;
}

export interface PropertyCardProps {
  property: PropertyRow;
  tenant?: Database['public']['Tables']['tenants']['Row'];
  lease?: Database['public']['Tables']['leases']['Row'];
}

export interface PropertyMetrics {
  total_properties: number;
  occupancy_rate: number;
  avg_rent: number;
  total_revenue: number;
  properties_by_type: Partial<Record<PropertyType, number>>;
  properties_by_status: Partial<Record<PropertyStatus, number>>;
}

export interface PropertyTableProps {
  properties: PropertyRow[];
  isLoading: boolean;
}

// Removed redundant extends and simplified with Pick
export type CreatePropertyInput = Pick<
  PropertyInsert,
  Exclude<keyof PropertyInsert, 'id' | 'created_at' | 'updated_at'>
>;
export type UpdatePropertyInput = Partial<CreatePropertyInput>;

// Property sale tracking with strict types
export interface PropertySale {
  propertyId: PropertyRow['id'];
  salePrice: number;
  saleDate: string; // ISO date string
  notes?: string;
}

// Property statistics for dashboard with strict number types
export interface PropertyStats {
  totalProperties: number;
  activeTenants: number;
  monthlyRevenue: number;
  occupancyRate: number;
  percentageChanges: {
    properties: number;
    tenants: number;
    revenue: number;
    occupancy: number;
  };
}

export interface PropertyUnit {
  id: string;
  number: string;
  floor?: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  sqft?: number;
  status: PropertyStatus;
  property_id: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  description: string;
  amenities: string[];
  floorplan: string;
  utilities: string[];
  lease_length: string;
  lease_type: string;
  lease_status: string;
  lease_start_date: Date;
  lease_end_date: Date;
}

export interface PropertyCardData {
  id: string;
  title: string;
  address: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  description: string;
  amenities: string[];
  floorplan: string;
  utilities: string[];
  lease_length: string;
  lease_type: string;
  lease_status: string;
  lease_start_date: Date;
  lease_end_date: Date;
  property_id: string;
  createdAt: Date;
  updatedAt: Date;
  property: Property;
  unit: PropertyUnit;
  tenant: Tenant;
  maintenance_requests: MaintenanceRequest[];
  documents: Document[];
  notes: Note[];
  events: Event[];
  tasks: Task[];
}

type Task = Database['public']['Tables']['tasks']['Row'];
