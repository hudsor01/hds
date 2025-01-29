export const PROPERTY_STATUS = {
  active: 'active',
  inactive: 'inactive',
  maintenance: 'maintenance',
  sold: 'sold'
} as const

export const PROPERTY_TYPES = {
  apartment: 'apartment',
  house: 'house',
  condo: 'condo',
  townhouse: 'townhouse',
  commercial: 'commercial'
} as const

export type PropertyType = 'apartment' | 'house' | 'condo' | 'townhouse' | 'commercial'
export type PropertyStatus = 'available' | 'rented' | 'maintenance' | 'inactive'

export interface Property {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  type: PropertyType
  status: PropertyStatus
  units: PropertyUnit[]
  owner_id: string
  organization_id: string
  createdAt: Date
  updatedAt: Date
}

export interface PropertyUnit {
  id: string
  number: string
  floor?: number
  bedrooms: number
  bathrooms: number
  price: number
  sqft?: number
  status: PropertyStatus
  property_id: string
  createdAt: Date
  updatedAt: Date
}

export interface PropertyCardData {
  id: string
  title: string
  address: string
  type: PropertyType
  status: PropertyStatus
  price: number
  bedrooms: number
  bathrooms: number
  image: string
}

export type PropertySale = {
  propertyId: string
  salePrice: string
  saleDate: string
  notes?: string
}

export type PropertyStats = {
  totalProperties: number
  activeTenants: number
  monthlyRevenue: number
  occupancyRate: number
  percentageChanges: {
    properties: number
    tenants: number
    revenue: number
    occupancy: number
  }
}

export interface CreatePropertyInput {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: string;
  status: string;
}

export interface UpdatePropertyInput extends Partial<CreatePropertyInput> {}
