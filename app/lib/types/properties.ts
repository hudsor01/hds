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

export type Property = {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  type: 'apartment' | 'house' | 'condo' | 'townhouse' | 'commercial'
  status: 'active' | 'inactive' | 'maintenance' | 'sold'
  units: Array<{
    id: string
    number: string
    bedrooms: number
    bathrooms: number
    sqft: number
    rent: number
    status: 'vacant' | 'occupied' | 'maintenance'
  }>
  createdAt: Date
  updatedAt: Date
  owner_id: string
  organization_id: string
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
