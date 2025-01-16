import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: properties, error } = await supabase
      .from('properties')
      .select(`
        *,
        units (*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(properties)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching properties' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const json = await request.json()

    const { data: property, error } = await supabase
      .from('properties')
      .insert([json])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating property' }, { status: 500 })
  }
}
