import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { prisma } from '@/lib/prisma/prisma';
import { TRPCError } from '@trpc/server';

export const propertyRouter = router({
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      const properties = await prisma.properties.findMany({
        where: {
          user_id: ctx.user.id,
        },
        include: {
          tenants: true,
          leases: true,
        },
      });
      return properties;
    }),
    
  getById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const property = await prisma.properties.findUnique({
        where: {
          id: input.id,
          user_id: ctx.user.id,
        },
        include: {
          tenants: true,
          leases: true,
          maintenance_requests: true,
          payments: true,
        },
      });

      if (!property) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Property not found',
        });
      }

      return property;
    }),

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      address: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      zip: z.string().min(1),
      property_type: z.string(),
      rent_amount: z.number().positive(),
    }))
    .mutation(async ({ ctx, input }) => {
      const property = await prisma.properties.create({
        data: {
          ...input,
          user_id: ctx.user.id,
        },
      });
      return property;
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      name: z.string().min(1).optional(),
      address: z.string().min(1).optional(),
      city: z.string().min(1).optional(),
      state: z.string().min(1).optional(),
      zip: z.string().min(1).optional(),
      property_type: z.string().optional(),
      rent_amount: z.number().positive().optional(),
      property_status: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      
      const property = await prisma.properties.update({
        where: {
          id,
          user_id: ctx.user.id,
        },
        data,
      });
      
      return property;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await prisma.properties.delete({
        where: {
          id: input.id,
          user_id: ctx.user.id,
        },
      });
      
      return { success: true };
    }),
});
