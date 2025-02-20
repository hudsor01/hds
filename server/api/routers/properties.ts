import { z } from 'zod'
import { router, protectedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'
import { toJsonSchema } from 'zod-to-json-schema'

// Zod schema for property
export const propertySchema = z.object({
    name: z.string().min(1, 'Property name is required'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zip: z.string().min(5, 'Valid ZIP code is required'),
    property_type: z.enum([
        'SINGLE_FAMILY',
        'MULTI_FAMILY',
        'APARTMENT',
        'CONDO',
        'COMMERCIAL'
    ]),
    rent_amount: z.number().positive('Rent amount must be positive')
})

// Convert to JSON Schema for documentation/validation
export const propertyJsonSchema = toJsonSchema(propertySchema)

export const propertiesRouter = router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const { data, error } = await ctx.supabase
            .from('properties')
            .select('*')
            .eq('user_id', ctx.user.id)

        if (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: error.message
            })
        }

        return data
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ ctx, input }) => {
            const { data, error } = await ctx.supabase
                .from('properties')
                .select('*')
                .eq('id', input.id)
                .eq('user_id', ctx.user.id)
                .single()

            if (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: error.message
                })
            }

            if (!data) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Property not found'
                })
            }

            return data
        }),

    create: protectedProcedure
        .input(propertySchema)
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await ctx.supabase
                .from('properties')
                .insert([
                    {
                        ...input,
                        user_id: ctx.user.id
                    }
                ])
                .select()
                .single()

            if (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: error.message
                })
            }

            return data
        }),

    update: protectedProcedure
        .input(
            propertySchema.partial().extend({
                id: z.string().uuid()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...updates } = input

            const { data, error } = await ctx.supabase
                .from('properties')
                .update(updates)
                .eq('id', id)
                .eq('user_id', ctx.user.id)
                .select()
                .single()

            if (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: error.message
                })
            }

            if (!data) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Property not found'
                })
            }

            return data
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const { error } = await ctx.supabase
                .from('properties')
                .delete()
                .eq('id', input.id)
                .eq('user_id', ctx.user.id)

            if (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: error.message
                })
            }

            return { success: true }
        })
})
