import { z } from 'zod'

export const createPropertySchema = z.object({
    name: z.string().min(1, 'Property name is required'),
    address: z.string().min(1, 'Property address is required'),
    rentAmount: z
        .number()
        .positive('Rent amount must be greater than 0'),
    images: z.array(z.string()).optional(),
    occupancyStatus: z
        .enum(['VACANT', 'OCCUPIED', 'MAINTENANCE'])
        .optional()
        .default('VACANT')
})

export type CreatePropertyInput = z.infer<typeof createPropertySchema>

export const updatePropertySchema = createPropertySchema.partial()
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>
