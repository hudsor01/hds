import {
    cancelRecurringPayment,
    getRecurringPayments,
    setupRecurringPayment,
    updateRecurringPayment
} from '@/lib/services/recurring-payments'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const recurringPaymentSchema = z.object({
    tenant_id: z.string().uuid('Invalid tenant ID'),
    property_id: z.string().uuid('Invalid property ID'),
    amount: z.number().positive('Amount must be positive'),
    frequency: z.enum(['monthly', 'weekly', 'yearly']),
    payment_day: z.number().min(1).max(31),
    payment_method_id: z.string(),
    description: z.string().optional(),
    metadata: z.record(z.string()).optional()
})

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { userId }: { userId: string } = await supabase.auth()
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body: unknown = await req.json()
        const validatedData = recurringPaymentSchema.parse(body)

        const recurringPayment = await setupRecurringPayment(
            userId,
            validatedData
        )

        return NextResponse.json(
            { data: recurringPayment },
            { status: 201 }
        )
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            )
        }
        console.error('Error setting up recurring payment:', error)
        return NextResponse.json(
            { error: 'Failed to set up recurring payment' },
            { status: 500 }
        )
    }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const { userId }: { userId: string } = await supabase.auth()
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const searchParams = req.nextUrl.searchParams
        const filters = {
            tenant_id: searchParams.get('tenant_id') || undefined,
            property_id: searchParams.get('property_id') || undefined,
            status: searchParams.get('status') || undefined
        }

        const payments = await getRecurringPayments(userId, filters)

        return NextResponse.json({ data: payments })
    } catch (error: unknown) {
        console.error('Error fetching recurring payments:', error)
        return NextResponse.json(
            { error: 'Failed to fetch recurring payments' },
            { status: 500 }
        )
    }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    try {
        const { userId }: { userId: string } = await supabase.auth()
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body: unknown = await req.json()
        const { id, ...updates } = body

        if (!id) {
            return NextResponse.json(
                { error: 'Payment ID is required' },
                { status: 400 }
            )
        }

        const validatedUpdates = recurringPaymentSchema
            .partial()
            .parse(updates)
        const updated = await updateRecurringPayment(
            id,
            userId,
            validatedUpdates
        )

        return NextResponse.json({ data: updated })
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            )
        }
        console.error('Error updating recurring payment:', error)
        return NextResponse.json(
            { error: 'Failed to update recurring payment' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: NextRequest
): Promise<NextResponse> {
    try {
        const { userId }: { userId: string } = await supabase.auth()
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const id: string | null = req.nextUrl.searchParams.get('id')
        if (!id) {
            return NextResponse.json(
                { error: 'Payment ID is required' },
                { status: 400 }
            )
        }

        const cancelled = await cancelRecurringPayment(id, userId)

        return NextResponse.json({ data: cancelled })
    } catch (error: unknown) {
        console.error('Error cancelling recurring payment:', error)
        return NextResponse.json(
            { error: 'Failed to cancel recurring payment' },
            { status: 500 }
        )
    }
}
