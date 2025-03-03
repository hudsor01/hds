import { getPaymentHistory } from '@/lib/services/payments'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const filterSchema = z.object({
    tenant_id: z.string().uuid().optional(),
    property_id: z.string().uuid().optional(),
    payment_type: z.string().optional(),
    payment_status: z.string().optional(),
    start_date: z.string().datetime().optional(),
    end_date: z.string().datetime().optional(),
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(10)
})

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
            payment_type:
                searchParams.get('payment_type') || undefined,
            payment_status:
                searchParams.get('payment_status') || undefined,
            start_date: searchParams.get('start_date') || undefined,
            end_date: searchParams.get('end_date') || undefined,
            page: Number(searchParams.get('page')) || 1,
            limit: Number(searchParams.get('limit')) || 10
        }

        const validatedFilters = filterSchema.parse(filters)
        const payments = await getPaymentHistory(
            userId,
            validatedFilters
        )

        // Calculate pagination metadata
        const total: number = payments.length
        const totalPages: number = Math.ceil(
            total / validatedFilters.limit
        )
        const hasMore: boolean = validatedFilters.page < totalPages

        // Paginate results
        const start: number =
            (validatedFilters.page - 1) * validatedFilters.limit
        const end: number = start + validatedFilters.limit
        const paginatedPayments = payments.slice(start, end)

        return NextResponse.json({
            data: paginatedPayments,
            metadata: {
                total,
                page: validatedFilters.page,
                limit: validatedFilters.limit,
                totalPages,
                hasMore
            }
        })
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            )
        }
        console.error('Error fetching payment history:', error)
        return NextResponse.json(
            { error: 'Failed to fetch payment history' },
            { status: 500 }
        )
    }
}
