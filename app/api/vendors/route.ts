import { supabase } from '@/lib/supabase'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const vendorSchema = z.object({
  company_name: z.string().min(1, 'Company name is required'),
  contact_name: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  address: z.string().optional(),
  services: z.array(z.string()).min(1, 'At least one service must be specified'),
  rate: z.number().positive('Rate must be positive').optional(),
  rating: z.number().min(1).max(5).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']).default('ACTIVE'),
  insurance_info: z.record(z.string(), z.any()).optional(),
  license_info: z.record(z.string(), z.any()).optional(),
  notes: z.string().optional()
})

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const status = searchParams.get('status')
    const service = searchParams.get('service')

    let query = supabase
      .from('vendors')
      .select('*')
      .eq('user_id', userId)
      .order('company_name', { ascending: true })

    if (status) {
      query = query.eq('status', status)
    }

    if (service) {
      query = query.contains('services', [service])
    }

    const { data: vendors, error } = await query

    if (error) {
      console.error('Error fetching vendors:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: vendors })
  } catch (error) {
    console.error('Error in vendors GET route:', error)
    return NextResponse.json({ error: 'Failed to fetch vendors' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = vendorSchema.parse(body)

    // Check for existing vendor with same email
    const { data: existingVendor, error: checkError } = await supabase
      .from('vendors')
      .select('id')
      .eq('email', validatedData.email)
      .eq('user_id', userId)
      .single()

    if (existingVendor) {
      return NextResponse.json({ error: 'Vendor with this email already exists' }, { status: 400 })
    }

    const { data: vendor, error } = await supabase
      .from('vendors')
      .insert([{ ...validatedData, user_id: userId }])
      .select()
      .single()

    if (error) {
      console.error('Error creating vendor:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create notification for new vendor
    await supabase.from('notifications').insert([
      {
        user_id: userId,
        type: 'SYSTEM',
        title: 'New Vendor Added',
        message: `${validatedData.company_name} has been added as a vendor`,
        data: {
          vendor_id: vendor.id,
          company_name: validatedData.company_name,
          services: validatedData.services
        }
      }
    ])

    return NextResponse.json({ data: vendor }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Error in vendors POST route:', error)
    return NextResponse.json({ error: 'Failed to create vendor' }, { status: 500 })
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
      return NextResponse.json({ error: 'Vendor ID is required' }, { status: 400 })
    }

    const validatedData = vendorSchema.partial().parse(updateData)

    // Verify vendor ownership
    const { data: existingVendor, error: vendorCheckError } = await supabase
      .from('vendors')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (vendorCheckError || !existingVendor) {
      return NextResponse.json({ error: 'Vendor not found or unauthorized' }, { status: 404 })
    }

    const { data: vendor, error } = await supabase
      .from('vendors')
      .update(validatedData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating vendor:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create notification for status update if status changed
    if (validatedData.status) {
      await supabase.from('notifications').insert([
        {
          user_id: userId,
          type: 'SYSTEM',
          title: 'Vendor Status Updated',
          message: `Vendor ${vendor.company_name} status updated to ${validatedData.status}`,
          data: {
            vendor_id: id,
            company_name: vendor.company_name,
            new_status: validatedData.status
          }
        }
      ])
    }

    return NextResponse.json({ data: vendor })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Error in vendors PUT route:', error)
    return NextResponse.json({ error: 'Failed to update vendor' }, { status: 500 })
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
      return NextResponse.json({ error: 'Vendor ID is required' }, { status: 400 })
    }

    // Check for active work orders
    const { data: activeWorkOrders, error: workOrderCheckError } = await supabase
      .from('work_orders')
      .select('id')
      .eq('vendor_id', id)
      .in('status', ['PENDING', 'IN_PROGRESS'])
      .limit(1)

    if (activeWorkOrders && activeWorkOrders.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete vendor with active work orders' },
        { status: 400 }
      )
    }

    const { error } = await supabase.from('vendors').delete().eq('id', id).eq('user_id', userId)

    if (error) {
      console.error('Error deleting vendor:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Vendor deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in vendors DELETE route:', error)
    return NextResponse.json({ error: 'Failed to delete vendor' }, { status: 500 })
  }
}
