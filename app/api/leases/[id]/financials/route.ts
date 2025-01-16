import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // First verify access to the lease
    const { data: lease, error: leaseError } = await supabase
      .from('leases')
      .select(`
        *,
        unit:units (
          *,
          property:properties (
            id,
            organization_id
          )
        )
      `)
      .eq('id', params.id)
      .single()

    if (leaseError || !lease) {
      return NextResponse.json({ error: 'Lease not found' }, { status: 404 })
    }

    // Calculate lease financials
    const { data: financials, error } = await supabase
      .rpc('calculate_lease_financials', {
        p_lease_id: params.id
      })

    if (error) throw error

    return NextResponse.json({
      lease_details: {
        unit_number: lease.unit.unit_number,
        property_id: lease.unit.property.id,
        start_date: lease.start_date,
        end_date: lease.end_date,
        status: lease.status
      },
      financials
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error calculating lease financials' },
      { status: 500 }
    )
  }
}
