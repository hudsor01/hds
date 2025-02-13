import { supabase } from '@/lib/supabase'
import { auth } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const leaseSchema = z.object({
  tenant_id: z.string().uuid('Invalid tenant ID'),
  property_id: z.string().uuid('Invalid property ID'),
  lease_type: z.enum(['FIXED_TERM', 'MONTH_TO_MONTH', 'WEEKLY', 'YEARLY']),
  start_date: z.string().datetime(),
  end_date: z.string().datetime().optional(),
  rent_amount: z.number().positive('Rent amount must be positive'),
  depositAmount: z.number().positive('Deposit amount must be positive'),
  payment_day: z.number().min(1).max(31),
  documents: z.array(z.string()).default([]),
  lease_status: z.enum(['Pending', 'Active', 'Terminated', 'Expired']).default('Pending')
})

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const property_id = searchParams.get('property_id')
    const tenant_id = searchParams.get('tenant_id')
    const status = searchParams.get('status')

    let query = supabase.from('leases').select('*, properties(*), tenants(*)').eq('user_id', userId)

    if (property_id) {
      query = query.eq('property_id', property_id)
    }

    if (tenant_id) {
      query = query.eq('tenant_id', tenant_id)
    }

    if (status) {
      query = query.eq('lease_status', status)
    }

    const { data: leases, error } = await query

    if (error) {
      console.error('Error fetching leases:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: leases })
  } catch (error) {
    console.error('Error in lease GET route:', error)
    return NextResponse.json({ error: 'Failed to fetch leases' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = leaseSchema.parse(body)

    // Verify property ownership and tenant association
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('id')
      .eq('id', validatedData.property_id)
      .eq('user_id', userId)
      .single()

    if (propertyError || !property) {
      return NextResponse.json({ error: 'Property not found or unauthorized' }, { status: 404 })
    }

    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('id')
      .eq('id', validatedData.tenant_id)
      .eq('user_id', userId)
      .single()

    if (tenantError || !tenant) {
      return NextResponse.json({ error: 'Tenant not found or unauthorized' }, { status: 404 })
    }

    // Check for existing active leases for this property
    const { data: existingLeases, error: leaseCheckError } = await supabase
      .from('leases')
      .select('id')
      .eq('property_id', validatedData.property_id)
      .eq('lease_status', 'Active')

    if (leaseCheckError) {
      return NextResponse.json({ error: 'Error checking existing leases' }, { status: 500 })
    }

    if (existingLeases && existingLeases.length > 0) {
      return NextResponse.json({ error: 'Property already has an active lease' }, { status: 400 })
    }

    const { data: lease, error } = await supabase
      .from('leases')
      .insert([{ ...validatedData, user_id: userId }])
      .select()
      .single()

    if (error) {
      console.error('Error creating lease:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create notification for new lease
    await supabase.from('notifications').insert([
      {
        user_id: userId,
        type: 'LEASE',
        title: 'New Lease Created',
        message: `A new lease has been created for property ID: ${validatedData.property_id}`
      }
    ])

    return NextResponse.json({ data: lease }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Error in lease POST route:', error)
    return NextResponse.json({ error: 'Failed to create lease' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Lease ID is required' }, { status: 400 })
    }

    const validatedData = leaseSchema.partial().parse(updateData)

    // Verify lease ownership
    const { data: existingLease, error: leaseCheckError } = await supabase
      .from('leases')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (leaseCheckError || !existingLease) {
      return NextResponse.json({ error: 'Lease not found or unauthorized' }, { status: 404 })
    }

    const { data: lease, error } = await supabase
      .from('leases')
      .update(validatedData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating lease:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create notification for lease update
    if (validatedData.lease_status) {
      await supabase.from('notifications').insert([
        {
          user_id: userId,
          type: 'LEASE',
          title: 'Lease Updated',
          message: `Lease status updated to ${validatedData.lease_status}`
        }
      ])
    }

    return NextResponse.json({ data: lease })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Error in lease PUT route:', error)
    return NextResponse.json({ error: 'Failed to update lease' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = req.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Lease ID is required' }, { status: 400 })
    }

    // Verify lease ownership and status
    const { data: lease, error: leaseCheckError } = await supabase
      .from('leases')
      .select('lease_status')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (leaseCheckError || !lease) {
      return NextResponse.json({ error: 'Lease not found or unauthorized' }, { status: 404 })
    }

    if (lease.lease_status === 'Active') {
      return NextResponse.json({ error: 'Cannot delete an active lease' }, { status: 400 })
    }

    const { error } = await supabase.from('leases').delete().eq('id', id).eq('user_id', userId)

    if (error) {
      console.error('Error deleting lease:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Lease deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in lease DELETE route:', error)
    return NextResponse.json({ error: 'Failed to delete lease' }, { status: 500 })
  }
}
