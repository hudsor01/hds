import supabase from '@/lib/supabase'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

declare const console: Console

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Validation schema for maintenance request creation/updates
const maintenanceRequestSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 characters'),
  property_id: z.string().uuid('Invalid property ID'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY']).default('LOW'),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).default('PENDING'),
  scheduled_date: z.string().datetime().optional(),
  assigned_to: z.string().uuid('Invalid assignee ID').optional(),
  estimated_cost: z.number().min(0, 'Estimated cost cannot be negative').optional()
})

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const {
      data: { user }
    } = await supabase.auth.getSession()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to access maintenance requests' },
        { status: 401 }
      )
    }

    const searchParams = req.nextUrl.searchParams
    const property_id: string | null = searchParams.get('property_id')
    const status: string | null = searchParams.get('status')
    const priority: string | null = searchParams.get('priority')
    const page: number = parseInt(searchParams.get('page') || '1')
    const limit: number = parseInt(searchParams.get('limit') || '10')

    let query = supabase
      .from('maintenance_requests')
      .select('*, properties(*)', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (property_id) {
      query = query.eq('property_id', property_id)
    }
    if (status) {
      query = query.eq('status', status)
    }
    if (priority) {
      query = query.eq('priority', priority)
    }

    const { data: requests, error, count } = await query

    if (error) {
      console.error('Error fetching maintenance requests:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      data: requests,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: count ? Math.ceil(count / limit) : 0
      }
    })
  } catch (error) {
    console.error('Error in maintenance request GET route:', error)
    return NextResponse.json({ error: 'Failed to fetch maintenance requests' }, { status: 500 })
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const {
      data: { user }
    } = await supabase.auth.getSession()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to create maintenance requests' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validatedData = maintenanceRequestSchema.parse(body)

    // Verify property ownership
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('id')
      .eq('id', validatedData.property_id)
      .eq('owner_id', user.id)
      .single()

    if (propertyError || !property) {
      return NextResponse.json(
        {
          error:
            'Property not found or you do not have permission to create maintenance requests for it'
        },
        { status: 404 }
      )
    }

    // Check for rate limiting (max 5 requests per property per day)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { data: recentRequests, error: countError } = await supabase
      .from('maintenance_requests')
      .select('id', { count: 'exact' })
      .eq('property_id', validatedData.property_id)
      .eq('user_id', user.id)
      .gte('created_at', twentyFourHoursAgo)

    if (countError) {
      console.error('Error checking request count:', countError)
      return NextResponse.json({ error: 'Failed to validate request limit' }, { status: 500 })
    }

    if ((recentRequests?.length || 0) >= 5) {
      return NextResponse.json(
        { error: 'Maximum request limit reached for this property in the last 24 hours' },
        { status: 429 }
      )
    }

    const { data: request, error } = await supabase
      .from('maintenance_requests')
      .insert([{ ...validatedData, user_id: user.id }])
      .select()
      .single()

    if (error) {
      console.error('Error creating maintenance request:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create notification for new maintenance request
    const { error: notificationError } = await supabase.from('notifications').insert([
      {
        user_id: user.id,
        type: 'MAINTENANCE',
        title: 'New Maintenance Request',
        message: `A new maintenance request has been created for property ID: ${validatedData.property_id}`,
        data: {
          request_id: request.id,
          priority: validatedData.priority,
          property_id: validatedData.property_id
        }
      }
    ])

    if (notificationError) {
      console.error('Error creating notification:', notificationError)
      // Don't fail the request if notification creation fails
    }

    return NextResponse.json({ data: request }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error in maintenance request POST route:', error)
    return NextResponse.json({ error: 'Failed to create maintenance request' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const {
      data: { user }
    } = await supabase.auth.getSession()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to update maintenance requests' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Maintenance request ID is required' }, { status: 400 })
    }

    // Verify request ownership and current status
    const { data: existingRequest, error: requestCheckError } = await supabase
      .from('maintenance_requests')
      .select('id, status, property_id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (requestCheckError || !existingRequest) {
      return NextResponse.json(
        { error: 'Maintenance request not found or you do not have permission to update it' },
        { status: 404 }
      )
    }

    // Prevent updates to completed or cancelled requests
    if (existingRequest.status === 'COMPLETED' || existingRequest.status === 'CANCELLED') {
      return NextResponse.json(
        { error: 'Cannot update completed or cancelled maintenance requests' },
        { status: 400 }
      )
    }

    const validatedData = maintenanceRequestSchema.partial().parse(updateData)

    const { data: request, error } = await supabase
      .from('maintenance_requests')
      .update(validatedData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating maintenance request:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create notification for status update if status changed
    if (validatedData.status && validatedData.status !== existingRequest.status) {
      const { error: notificationError } = await supabase.from('notifications').insert([
        {
          user_id: user.id,
          type: 'MAINTENANCE',
          title: 'Maintenance Request Updated',
          message: `Maintenance request status updated to ${validatedData.status}`,
          data: {
            request_id: id,
            property_id: existingRequest.property_id,
            old_status: existingRequest.status,
            new_status: validatedData.status
          }
        }
      ])

      if (notificationError) {
        console.error('Error creating notification:', notificationError)
        // Don't fail the request if notification creation fails
      }
    }

    return NextResponse.json({ data: request })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error in maintenance request PUT route:', error)
    return NextResponse.json({ error: 'Failed to update maintenance request' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const {
      data: { user }
    } = await supabase.auth.getSession()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to delete maintenance requests' },
        { status: 401 }
      )
    }

    const id = req.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Maintenance request ID is required' }, { status: 400 })
    }

    // Verify request ownership and status
    const { data: request, error: requestCheckError } = await supabase
      .from('maintenance_requests')
      .select('status, property_id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (requestCheckError || !request) {
      return NextResponse.json(
        { error: 'Maintenance request not found or you do not have permission to delete it' },
        { status: 404 }
      )
    }

    if (request.status === 'IN_PROGRESS') {
      return NextResponse.json(
        { error: 'Cannot delete a maintenance request that is in progress' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('maintenance_requests')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting maintenance request:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create notification for deletion
    const { error: notificationError } = await supabase.from('notifications').insert([
      {
        user_id: user.id,
        type: 'MAINTENANCE',
        title: 'Maintenance Request Deleted',
        message: 'A maintenance request has been deleted',
        data: {
          request_id: id,
          property_id: request.property_id,
          status: request.status
        }
      }
    ])

    if (notificationError) {
      console.error('Error creating notification:', notificationError)
      // Don't fail the request if notification creation fails
    }

    return NextResponse.json(
      { message: 'Maintenance request deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in maintenance request DELETE route:', error)
    return NextResponse.json({ error: 'Failed to delete maintenance request' }, { status: 500 })
  }
}
