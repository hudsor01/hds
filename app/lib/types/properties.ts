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
  type: keyof typeof PROPERTY_TYPES
  status: keyof typeof PROPERTY_STATUS
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
}
