import { z } from 'zod';

export const propertySchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  rentAmount: z.number().positive(),
});
