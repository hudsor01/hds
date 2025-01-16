import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // First verify access to the organization
    const { data: membership, error: membershipError } = await supabase
      .from('organization_members')
      .select('role')
      .eq('organization_id', params.id)
      .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
      .single()

    if (membershipError || !membership) {
      return NextResponse.json({ error: 'Organization access denied' }, { status: 403 })
    }

    // Calculate portfolio metrics
    const { data: metrics, error: metricsError } = await supabase
      .rpc('calculate_portfolio_metrics', {
        p_organization_id: params.id
      })

    if (metricsError) throw metricsError

    // Calculate YoY growth
    const currentYear = new Date().getFullYear()
    const { data: growth, error: growthError } = await supabase
      .rpc('calculate_yoy_growth', {
        p_organization_id: params.id,
        p_year: currentYear
      })

    if (growthError) throw growthError

    // Get properties with their current month's financial reports
    const { data: properties, error: propertiesError } = await supabase
      .from('properties')
      .select('id, name')
      .eq('organization_id', params.id)

    if (propertiesError) throw propertiesError

    // Get current month's financial reports for all properties
    const currentDate = new Date()
    const propertyReports = await Promise.all(
      properties.map(async (property) => {
        const { data: report } = await supabase
          .rpc('generate_property_financial_report', {
            p_property_id: property.id,
            p_year: currentDate.getFullYear(),
            p_month: currentDate.getMonth() + 1
          })
        return {
          property_id: property.id,
          property_name: property.name,
          report
        }
      })
    )

    return NextResponse.json({
      portfolio_metrics: metrics,
      yoy_growth: growth,
      property_reports: propertyReports
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error calculating portfolio metrics' },
      { status: 500 }
    )
  }
}
