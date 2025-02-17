import { createRouteHandlerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: tenant, error } = await supabase
      .from('tenants')
      .select(
        `
        *,
        leases (
          *,
          unit:units (
            *,
            property:properties (*)
          )
        )
      `
      )
      .eq('id', params.id)
      .single()

    if (error) throw error

    return NextResponse.json(tenant)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching tenant' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const json = await request.json()

    const { data: tenant, error } = await supabase.from('tenants').update(json).eq('id', params.id).select().single()

    if (error) throw error

    return NextResponse.json(tenant)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating tenant' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { error } = await supabase.from('tenants').delete().eq('id', params.id)

    if (error) throw error

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting tenant' }, { status: 500 })
  }
}
