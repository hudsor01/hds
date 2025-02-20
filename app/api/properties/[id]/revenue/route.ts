import createServerClient from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { searchParams } = new URL(request.url)
        const startDate =
            searchParams.get('startDate') ||
            new Date(new Date().getFullYear(), 0, 1).toISOString()
        const endDate =
            searchParams.get('endDate') || new Date().toISOString()

        const cookieStore = cookies()
        const supabase = createServerClient({ cookies: cookieStore })

        // First verify access to the property
        const { data: property, error: propertyError } =
            await supabase
                .from('properties')
                .select('id, organization_id')
                .eq('id', params.id)
                .single()

        if (propertyError || !property) {
            return NextResponse.json(
                { error: 'Property not found' },
                { status: 404 }
            )
        }

        // Calculate revenue
        const { data: revenue, error } = await supabase.rpc(
            'calculate_property_revenue',
            {
                p_property_id: params.id,
                p_start_date: startDate,
                p_end_date: endDate
            }
        )

        if (error) throw error

        // Get financial report for current month
        const currentDate = new Date()
        const { data: financialReport, error: reportError } =
            await supabase.rpc('generate_property_financial_report', {
                p_property_id: params.id,
                p_year: currentDate.getFullYear(),
                p_month: currentDate.getMonth() + 1
            })

        if (reportError) throw reportError

        return NextResponse.json({
            revenue,
            currentMonthReport: financialReport
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Error calculating property revenue' },
            { status: 500 }
        )
    }
}
