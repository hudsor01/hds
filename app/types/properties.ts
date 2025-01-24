import { PROPERTY_STATUS, PROPERTY_TYPES } from "@/auth/lib/constants"

export type Property = {
  id: string
  name: string
  address: string
  units: string[]
  status: keyof typeof PROPERTY_STATUS
  type: keyof typeof PROPERTY_TYPES
}

export type NewProperty = Omit<Property, 'id'>

export type UpdateProperty = Partial<NewProperty> & {
  id: string
}

export interface PropertySale {
  propertyId: string
  salePrice: string
  saleDate: string
  notes?: string
}
