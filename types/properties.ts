import { z } from 'zod'

export const propertyTypeEnum = z.enum(['apartment', 'house', 'condo', 'duplex', 'townhouse'])

export const propertyStatusEnum = z.enum(['available', 'rented', 'maintenance', 'listed', 'inactive'])

export const propertySchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  owner_id: z.string().uuid(),
  address: z.string().min(1, 'Address is required'),
  type: propertyTypeEnum,
  bedrooms: z.number().min(0, 'Number of bedrooms cannot be negative'),
  bathrooms: z.number().min(0, 'Number of bathrooms cannot be negative'),
  square_feet: z.number().min(0, 'Square footage cannot be negative'),
  description: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  status: propertyStatusEnum.default('available'),
  monthly_rent: z.number().min(0, 'Monthly rent cannot be negative'),
  deposit: z.number().min(0, 'Deposit cannot be negative').optional(),
  images: z.array(z.string().url()).optional(),
  location: z
    .object({
      latitude: z.number(),
      longitude: z.number()
    })
    .optional()
})

export const createPropertySchema = propertySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  owner_id: true
})

export const updatePropertySchema = createPropertySchema.partial()

export type ZodProperty = z.infer<typeof propertySchema>
export type CreateProperty = z.infer<typeof createPropertySchema>
export type UpdateProperty = z.infer<typeof updatePropertySchema>
export type PropertyType = z.infer<typeof propertyTypeEnum>
export type ZodPropertyStatus = z.infer<typeof propertyStatusEnum>
export interface PropertyWithStats extends Property {
  occupancy_rate?: number
  total_units?: number
  vacant_units?: number
  total_revenue?: number
  pending_maintenance?: number
}

// Define enums for property status
export enum PropertyStatus {
  Available = 'available',
  Rented = 'rented',
  Maintenance = 'maintenance'
}

// Define base property interface
export interface Property {
  id: string
  name: string
  address: string
  status: PropertyStatus
  units: number
  revenue: number
  createdAt?: string
  updatedAt?: string
}
