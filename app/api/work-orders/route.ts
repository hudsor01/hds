import { createClient } from '@/utils/supabase/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

declare const console: Console

export const dynamic = 'force-dynamic'
export const revalidate = 0

const workOrderSchema = z.object({
  vendor_id: z.string().uuid('Invalid vendor ID'),
  property_id: z.string().uuid('Invalid property ID'),
  maintenance_id: z.string().uuid('Invalid maintenance request ID').optional(),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 characters'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY']).default('LOW'),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).default('PENDING'),
  scheduled_date: z.string().datetime(),
  completed_date: z.string().datetime().optional(),
  estimated_cost: z.number().min(0, 'Estimated cost cannot be negative').optional(),
  actual_cost: z.number().min(0, 'Actual cost cannot be negative').optional(),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
  attachments: z.array(z.string().url('Invalid attachment URL')).optional()
})

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to access work orders' },
        { status: 401 }
      )
    }

    const searchParams = req.nextUrl.searchParams
    const property_id = searchParams.get('property_id')
    const vendor_id = searchParams.get('vendor_id')
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const from_date = searchParams.get('from_date')
    const to_date = searchParams.get('to_date')

    let query = supabase
      .from('work_orders')
      .select('*, vendors(*), properties(*)', { count: 'exact' })
      .eq('user_id', user.id)
      .order('scheduled_date', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    if (property_id) {
      query = query.eq('property_id', property_id)
    }
    if (vendor_id) {
      query = query.eq('vendor_id', vendor_id)
    }
    if (status) {
      query = query.eq('status', status)
    }
    if (priority) {
      query = query.eq('priority', priority)
    }
    if (from_date) {
      query = query.gte('scheduled_date', from_date)
    }
    if (to_date) {
      query = query.lte('scheduled_date', to_date)
    }

    const { data: workOrders, error, count } = await query

    if (error) {
      console.error('Error fetching work orders:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      data: workOrders,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: count ? Math.ceil(count / limit) : 0
      }
    })
  } catch (error) {
    console.error('Error in work orders GET route:', error)
    return NextResponse.json({ error: 'Failed to fetch work orders' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to create work orders' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validatedData = workOrderSchema.parse(body)

    // Verify property ownership
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('id')
      .eq('id', validatedData.property_id)
      .eq('owner_id', user.id)
      .single()

    if (propertyError || !property) {
      return NextResponse.json(
        { error: 'Property not found or you do not have permission to create work orders for it' },
        { status: 404 }
      )
    }

    // Verify vendor association
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .select('id, compunknown_name')
      .eq('id', validatedData.vendor_id)
      .eq('user_id', user.id)
      .single()

    if (vendorError || !vendor) {
      return NextResponse.json(
        { error: 'Vendor not found or you do not have permission to assign them' },
        { status: 404 }
      )
    }

    // Check for rate limiting (max 10 work orders per vendor per day)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { data: recentOrders, error: countError } = await supabase
      .from('work_orders')
      .select('id', { count: 'exact' })
      .eq('vendor_id', validatedData.vendor_id)
      .eq('user_id', user.id)
      .gte('created_at', twentyFourHoursAgo)

    if (countError) {
      console.error('Error checking work order count:', countError)
      return NextResponse.json({ error: 'Failed to validate work order limit' }, { status: 500 })
    }

    if ((recentOrders?.length || 0) >= 10) {
      return NextResponse.json(
        { error: 'Maximum work order limit reached for this vendor in the last 24 hours' },
        { status: 429 }
      )
    }

    const { data: workOrder, error } = await supabase
      .from('work_orders')
      .insert([{ ...validatedData, user_id: user.id }])
      .select()
      .single()

    if (error) {
      console.error('Error creating work order:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create notification for new work order
    const { error: notificationError } = await supabase.from('notifications').insert([
      {
        user_id: user.id,
        type: 'SYSTEM',
        title: 'New Work Order Created',
        message: `A new work order has been created for ${vendor.compunknown_name}`,
        data: {
          work_order_id: workOrder.id,
          vendor_id: validatedData.vendor_id,
          property_id: validatedData.property_id,
          priority: validatedData.priority,
          scheduled_date: validatedData.scheduled_date
        }
      }
    ])

    if (notificationError) {
      console.error('Error creating notification:', notificationError)
      // Don't fail the request if notification creation fails
    }

    return NextResponse.json({ data: workOrder }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error in work orders POST route:', error)
    return NextResponse.json({ error: 'Failed to create work order' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to update work orders' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Work order ID is required' }, { status: 400 })
    }

    // Verify work order ownership and current status
    const { data: existingWorkOrder, error: workOrderCheckError } = await supabase
      .from('work_orders')
      .select('status, vendor_id, property_id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (workOrderCheckError || !existingWorkOrder) {
      return NextResponse.json(
        { error: 'Work order not found or you do not have permission to update it' },
        { status: 404 }
      )
    }

    // Prevent updates to cancelled work orders
    if (existingWorkOrder.status === 'CANCELLED') {
      return NextResponse.json({ error: 'Cannot update cancelled work orders' }, { status: 400 })
    }

    const validatedData = workOrderSchema.partial().parse(updateData)

    // If vendor is being changed, verify new vendor association
    if (validatedData.vendor_id && validatedData.vendor_id !== existingWorkOrder.vendor_id) {
      const { data: vendor, error: vendorError } = await supabase
        .from('vendors')
        .select('id, compunknown_name')
        .eq('id', validatedData.vendor_id)
        .eq('user_id', user.id)
        .single()

      if (vendorError || !vendor) {
        return NextResponse.json(
          { error: 'New vendor not found or you do not have permission to assign them' },
          { status: 404 }
        )
      }
    }

    const { data: workOrder, error } = await supabase
      .from('work_orders')
      .update(validatedData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating work order:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create notification for status update if status changed
    if (validatedData.status && validatedData.status !== existingWorkOrder.status) {
      const { error: notificationError } = await supabase.from('notifications').insert([
        {
          user_id: user.id,
          type: 'SYSTEM',
          title: 'Work Order Status Updated',
          message: `Work order status updated to ${validatedData.status}`,
          data: {
            work_order_id: id,
            property_id: existingWorkOrder.property_id,
            vendor_id: existingWorkOrder.vendor_id,
            old_status: existingWorkOrder.status,
            new_status: validatedData.status
          }
        }
      ])

      if (notificationError) {
        console.error('Error creating notification:', notificationError)
        // Don't fail the request if notification creation fails
      }
    }

    return NextResponse.json({ data: workOrder })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error in work orders PUT route:', error)
    return NextResponse.json({ error: 'Failed to update work order' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to delete work orders' },
        { status: 401 }
      )
    }

    const id = req.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Work order ID is required' }, { status: 400 })
    }

    // Verify work order ownership and status
    const { data: workOrder, error: workOrderCheckError } = await supabase
      .from('work_orders')
      .select('status, property_id, vendor_id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (workOrderCheckError || !workOrder) {
      return NextResponse.json(
        { error: 'Work order not found or you do not have permission to delete it' },
        { status: 404 }
      )
    }

    if (workOrder.status === 'IN_PROGRESS') {
      return NextResponse.json({ error: 'Cannot delete in-progress work orders' }, { status: 400 })
    }

    const { error } = await supabase
      .from('work_orders')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting work order:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create notification for deletion
    const { error: notificationError } = await supabase.from('notifications').insert([
      {
        user_id: user.id,
        type: 'SYSTEM',
        title: 'Work Order Deleted',
        message: 'A work order has been deleted',
        data: {
          work_order_id: id,
          property_id: workOrder.property_id,
          vendor_id: workOrder.vendor_id,
          status: workOrder.status
        }
      }
    ])

    if (notificationError) {
      console.error('Error creating notification:', notificationError)
      // Don't fail the request if notification creation fails
    }

    return NextResponse.json({ message: 'Work order deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in work orders DELETE route:', error)
    return NextResponse.json({ error: 'Failed to delete work order' }, { status: 500 })
  }
}
