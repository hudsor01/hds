import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: leases, error } = await supabase
      .from('leases')
      .select(`
        *,
        unit:units (
          *,
          property:properties (*)
        ),
        tenant:tenants (*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(leases)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching leases' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const json = await request.json()

    // Ensure dates are in ISO format
    if (json.start_date) json.start_date = new Date(json.start_date).toISOString()
    if (json.end_date) json.end_date = new Date(json.end_date).toISOString()

    const { data: lease, error } = await supabase
      .from('leases')
      .insert([json])
      .select(`
        *,
        unit:units (
          *,
          property:properties (*)
        ),
        tenant:tenants (*)
      `)
      .single()

    if (error) throw error

    return NextResponse.json(lease)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating lease' }, { status: 500 })
  }
}
