import { z } from 'zod'

export const roleSchema = z.object({
  id: z.string(),
  name: z.enum(['OWNER', 'PROPERTY_MANAGER', 'MAINTENANCE', 'TENANT']),
  organizationId: z.string(),
  userId: z.string(),
  permissions: z.array(z.string()),
})

export type Role = z.infer<typeof roleSchema>
