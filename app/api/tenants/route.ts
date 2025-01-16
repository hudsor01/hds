import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: tenants, error } = await supabase
      .from('tenants')
      .select(`
        *,
        leases (
          *,
          unit:units (
            *,
            property:properties (*)
          )
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(tenants)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching tenants' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const json = await request.json()

    const { data: tenant, error } = await supabase
      .from('tenants')
      .insert([json])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(tenant)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating tenant' }, { status: 500 })
  }
}
