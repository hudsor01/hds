// server/routers/properties.ts
import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

// Zod schema for property
export const propertySchema = z.object({
  name: z.string().min(1, 'Property name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(5, 'Valid ZIP code is required'),
  property_type: z.enum(['SINGLE_FAMILY', 'MULTI_FAMILY', 'APARTMENT', 'CONDO', 'COMMERCIAL']),
  rent_amount: z.number().positive('Rent amount must be positive'),
});

export const propertiesRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('properties')
      .select('*')
      .eq('user_id', ctx.user.id);

    if (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      });
    }

    return data;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
