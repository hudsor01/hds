import { supabase } from '@/utils/supabase/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

declare const console: Console

export const dynamic = 'force-dynamic'
export const revalidate = 0

const propertySchema = z.object({
  address: z.string().min(1, 'Address is required'),
  type: z.enum(['apartment', 'house', 'condo', 'duplex', 'townhouse']),
  bedrooms: z.number().min(0, 'Number of bedrooms cannot be negative'),
  bathrooms: z.number().min(0, 'Number of bathrooms cannot be negative'),
  square_feet: z.number().min(0, 'Square footage cannot be negative'),
  description: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  status: z.enum(['available', 'rented', 'maintenance']).optional()
})

export async function GET(req: NextRequest) {
  try {
    const supabase = await supabase()
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
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const type = searchParams.get('type')

    let query = supabase
      .from('properties')
      .select('*, units(*)')
      .eq('owner_id', user.id)
      .range((page - 1) * limit, page * limit - 1)

    if (status) {
      query = query.eq('status', status)
    }
    if (type) {
      query = query.eq('type', type)
    }

    const { data: properties, error, count } = await query

    if (error) {
      console.error('Error fetching properties:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      data: properties,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: count ? Math.ceil(count / limit) : 0
      }
    })
  } catch (error) {
    console.error('Error in properties GET route:', error)
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await supabase()
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
    const validatedData = propertySchema.parse(body)

    const { data: property, error } = await supabase
      .from('properties')
      .insert([{ ...validatedData, owner_id: user.id }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        // Unique constraint violation
        return NextResponse.json(
          { error: 'A property with this address already exists' },
          { status: 409 }
        )
      }
      console.error('Error creating property:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: property }, { status: 201 })
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
    const supabase = await supabase()
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

    const validatedData = propertySchema.partial().parse(updateData)

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

    return NextResponse.json({ data: property })
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
    const supabase = await supabase()
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

    return NextResponse.json({ message: 'Property deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in properties DELETE route:', error)
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 })
  }
}
