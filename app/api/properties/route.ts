import { supabase } from '@/lib/supabase/server'
import { createPropertySchema, updatePropertySchema, type Property } from '@/types/properties'
import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const queryParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  status: z.string().optional(),
  type: z.string().optional(),
  sort: z.enum(['created_at', 'monthly_rent', 'square_feet']).optional(),
  order: z.enum(['asc', 'desc']).default('desc')
})

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req: NextRequest) {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to access properties' },
        { status: 401 }
      )
    }

    const searchParams = req.nextUrl.searchParams
    const query = queryParamsSchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      status: searchParams.get('status'),
      type: searchParams.get('type'),
      sort: searchParams.get('sort'),
      order: searchParams.get('order')
    })

    let supabaseQuery = supabase
      .from('properties')
      .select('*, units(*)', { count: 'exact' })
      .eq('owner_id', user.id)
      .range((query.page - 1) * query.limit, query.page * query.limit - 1)

    if (query.status) {
      supabaseQuery = supabaseQuery.eq('status', query.status)
    }
    if (query.type) {
      supabaseQuery = supabaseQuery.eq('type', query.type)
    }
    if (query.sort) {
      supabaseQuery = supabaseQuery.order(query.sort, { ascending: query.order === 'asc' })
    }

    const { data: properties, error, count } = await supabaseQuery

    if (error) {
      console.error('Error fetching properties:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      data: properties as Property[],
      pagination: {
        page: query.page,
        limit: query.limit,
        total: count || 0,
        pages: count ? Math.ceil(count / query.limit) : 0
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error in properties GET route:', error)
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to create properties' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validatedData = createPropertySchema.parse(body)

    const { data: property, error } = await supabase
      .from('properties')
      .insert([{ ...validatedData, owner_id: user.id }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A property with this address already exists' },
          { status: 409 }
        )
      }
      console.error('Error creating property:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: property as Property }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error in properties POST route:', error)
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to update properties' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Property ID is required' }, { status: 400 })
    }

    // Verify property ownership
    const { data: existingProperty } = await supabase
      .from('properties')
      .select('id')
      .eq('id', id)
      .eq('owner_id', user.id)
      .single()

    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Property not found or you do not have permission to update it' },
        { status: 404 }
      )
    }

    const validatedData = updatePropertySchema.parse(updateData)

    const { data: property, error } = await supabase
      .from('properties')
      .update(validatedData)
      .eq('id', id)
      .eq('owner_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating property:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: property as Property })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error in properties PUT route:', error)
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to delete properties' },
        { status: 401 }
      )
    }

    const id = req.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Property ID is required' }, { status: 400 })
    }

    // Verify property ownership
    const { data: existingProperty } = await supabase
      .from('properties')
      .select('id')
      .eq('id', id)
      .eq('owner_id', user.id)
      .single()

    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Property not found or you do not have permission to delete it' },
        { status: 404 }
      )
    }

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)
      .eq('owner_id', user.id)

    if (error) {
      console.error('Error deleting property:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Property deleted successfully' })
  } catch (error) {
    console.error('Error in properties DELETE route:', error)
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 })
  }
}