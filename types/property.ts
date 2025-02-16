export interface Property {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  propertyType: PropertyType
  units: number
  squareFootage: number
  yearBuilt: number
  purchasePrice: number
  currentValue: number
  monthlyRent: number
  expenses: PropertyExpenses
  status: PropertyStatus
  createdAt: string
  updatedAt: string
  imageUrl?: string
}

export interface PropertyExpenses {
  mortgage?: number
  insurance: number
  propertyTax: number
  utilities: number
  maintenance: number
  other: number
}

export enum PropertyType {
  SINGLE_FAMILY = 'SINGLE_FAMILY',
  MULTI_FAMILY = 'MULTI_FAMILY',
  APARTMENT = 'APARTMENT',
  COMMERCIAL = 'COMMERCIAL',
  INDUSTRIAL = 'INDUSTRIAL',
}

export enum PropertyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  VACANT = 'VACANT',
}

export interface CreatePropertyInput {
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  propertyType: PropertyType
  units: number
  squareFootage: number
  yearBuilt: number
  purchasePrice: number
  currentValue: number
  monthlyRent: number
  expenses: PropertyExpenses
  imageUrl?: string
}

export interface UpdatePropertyInput extends Partial<CreatePropertyInput> {
  id: string
}

export interface PropertyStats {
  totalProperties: number
  totalValue: number
  totalRevenue: number
  totalExpenses: number
  occupancyRate: number
  avgRentPrice: number
}