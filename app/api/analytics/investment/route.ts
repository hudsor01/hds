import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/ssr'

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const propertyId: string | null = searchParams.get('propertyId')
    const organizationId: string | null = searchParams.get('organizationId')
    const year: number = parseInt(searchParams.get('year') || new Date().getFullYear().toString())

    const supabase = createRouteHandlerClient({ cookies })

    if (propertyId) {
      // Get property-specific ROI metrics
      const { data: roiMetrics, error: roiError }: { data: any; error: any } = await supabase.rpc(
        'calculate_property_roi',
        {
          p_property_id: propertyId,
          p_year: year
        }
      )

      if (roiError) throw roiError

      return NextResponse.json({ roiMetrics })
    }

    if (organizationId) {
      // Get organization-wide investment metrics
      const supabaseClient = createRouteHandlerClient({ cookies })
      const { data: portfolioMetrics, error: portfolioError }: { data: any; error: any } =
        await supabaseClient.rpc('calculate_portfolio_investment_metrics', {
          p_organization_id: organizationId,
          p_year: year
        })

      if (portfolioError) throw portfolioError

      // Get investment performance report
      const { data: performanceReport, error: reportError }: { data: any; error: any } =
        await supabase.rpc('generate_investment_performance_report', {
          p_organization_id: organizationId,
          p_year: year
        })

      if (reportError) throw reportError

      return NextResponse.json({
        portfolioMetrics,
        performanceReport
      })
    }

    return NextResponse.json(
      { error: 'Either propertyId or organizationId is required' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Investment analytics error:', error)
    return NextResponse.json({ error: 'Error fetching investment analytics' }, { status: 500 })
  }
}
