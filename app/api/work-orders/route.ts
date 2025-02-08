import { supabase } from '@/lib/supabase';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const workOrderSchema = z.object({
  vendor_id: z.string().uuid('Invalid vendor ID'),
  property_id: z.string().uuid('Invalid property ID'),
  maintenance_id: z.string().uuid('Invalid maintenance request ID').optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY']).default('LOW'),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).default('PENDING'),
  scheduled_date: z.string().datetime(),
  completed_date: z.string().datetime().optional(),
  estimated_cost: z.number().positive('Estimated cost must be positive').optional(),
  actual_cost: z.number().positive('Actual cost must be positive').optional(),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const searchParams = req.nextUrl.searchParams;
    const property_id = searchParams.get('property_id');
    const vendor_id = searchParams.get('vendor_id');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    let query = supabase
      .from('work_orders')
      .select('*, vendors(*), properties(*)')
      .eq('user_id', userId)
      .order('scheduled_date', {ascending: false});

    if (property_id) {
      query = query.eq('property_id', property_id);
    }

    if (vendor_id) {
      query = query.eq('vendor_id', vendor_id);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (priority) {
      query = query.eq('priority', priority);
    }

    const {data: workOrders, error} = await query;

    if (error) {
      console.error('Error fetching work orders:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({data: workOrders});
  } catch (error) {
    console.error('Error in work orders GET route:', error);
    return NextResponse.json({error: 'Failed to fetch work orders'}, {status: 500});
  }
}

export async function POST(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await req.json();
    const validatedData = workOrderSchema.parse(body);

    // Verify property ownership
    const {data: property, error: propertyError} = await supabase
      .from('properties')
      .select('id')
      .eq('id', validatedData.property_id)
      .eq('user_id', userId)
      .single();

    if (propertyError || !property) {
      return NextResponse.json({error: 'Property not found or unauthorized'}, {status: 404});
    }

    // Verify vendor association
    const {data: vendor, error: vendorError} = await supabase
      .from('vendors')
      .select('id, company_name')
      .eq('id', validatedData.vendor_id)
      .eq('user_id', userId)
      .single();

    if (vendorError || !vendor) {
      return NextResponse.json({error: 'Vendor not found or unauthorized'}, {status: 404});
    }

    const {data: workOrder, error} = await supabase
      .from('work_orders')
      .insert([{...validatedData, user_id: userId}])
      .select()
      .single();

    if (error) {
      console.error('Error creating work order:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    // Create notification for new work order
    await supabase.from('notifications').insert([
      {
        user_id: userId,
        type: 'SYSTEM',
        title: 'New Work Order Created',
        message: `A new work order has been created for ${vendor.company_name}`,
        data: {
          work_order_id: workOrder.id,
          vendor_id: validatedData.vendor_id,
          property_id: validatedData.property_id,
          priority: validatedData.priority,
        },
      },
    ]);

    return NextResponse.json({data: workOrder}, {status: 201});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in work orders POST route:', error);
    return NextResponse.json({error: 'Failed to create work order'}, {status: 500});
  }
}

export async function PUT(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await req.json();
    const {id, ...updateData} = body;

    if (!id) {
      return NextResponse.json({error: 'Work order ID is required'}, {status: 400});
    }

    const validatedData = workOrderSchema.partial().parse(updateData);

    // Verify work order ownership
    const {data: existingWorkOrder, error: workOrderCheckError} = await supabase
      .from('work_orders')
      .select('status')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (workOrderCheckError || !existingWorkOrder) {
      return NextResponse.json({error: 'Work order not found or unauthorized'}, {status: 404});
    }

    // Prevent updates to cancelled work orders
    if (existingWorkOrder.status === 'CANCELLED') {
      return NextResponse.json({error: 'Cannot update cancelled work orders'}, {status: 400});
    }

    const {data: workOrder, error} = await supabase
      .from('work_orders')
      .update(validatedData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating work order:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    // Create notification for status update
    if (validatedData.status) {
      await supabase.from('notifications').insert([
        {
          user_id: userId,
          type: 'SYSTEM',
          title: 'Work Order Status Updated',
          message: `Work order status updated to ${validatedData.status}`,
          data: {
            work_order_id: id,
            old_status: existingWorkOrder.status,
            new_status: validatedData.status,
          },
        },
      ]);
    }

    return NextResponse.json({data: workOrder});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in work orders PUT route:', error);
    return NextResponse.json({error: 'Failed to update work order'}, {status: 500});
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({error: 'Work order ID is required'}, {status: 400});
    }

    // Verify work order ownership and status
    const {data: workOrder, error: workOrderCheckError} = await supabase
      .from('work_orders')
      .select('status')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (workOrderCheckError || !workOrder) {
      return NextResponse.json({error: 'Work order not found or unauthorized'}, {status: 404});
    }

    if (workOrder.status === 'IN_PROGRESS') {
      return NextResponse.json({error: 'Cannot delete in-progress work orders'}, {status: 400});
    }

    const {error} = await supabase.from('work_orders').delete().eq('id', id).eq('user_id', userId);

    if (error) {
      console.error('Error deleting work order:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({message: 'Work order deleted successfully'}, {status: 200});
  } catch (error) {
    console.error('Error in work orders DELETE route:', error);
    return NextResponse.json({error: 'Failed to delete work order'}, {status: 500});
  }
}
