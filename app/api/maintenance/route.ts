import { supabase } from '@/lib/supabase';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for maintenance request creation/updates
const maintenanceRequestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  property_id: z.string().uuid('Invalid property ID'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY']).default('LOW'),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).default('PENDING'),
});

export async function GET(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const searchParams = req.nextUrl.searchParams;
    const property_id = searchParams.get('property_id');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    let query = supabase
      .from('maintenance_requests')
      .select('*, properties(*)')
      .eq('user_id', userId);

    if (property_id) {
      query = query.eq('property_id', property_id);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (priority) {
      query = query.eq('priority', priority);
    }

    const {data: requests, error} = await query;

    if (error) {
      console.error('Error fetching maintenance requests:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({data: requests});
  } catch (error) {
    console.error('Error in maintenance request GET route:', error);
    return NextResponse.json({error: 'Failed to fetch maintenance requests'}, {status: 500});
  }
}

export async function POST(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await req.json();
    const validatedData = maintenanceRequestSchema.parse(body);

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

    const {data: request, error} = await supabase
      .from('maintenance_requests')
      .insert([{...validatedData, user_id: userId}])
      .select()
      .single();

    if (error) {
      console.error('Error creating maintenance request:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    // Create notification for new maintenance request
    await supabase.from('notifications').insert([
      {
        user_id: userId,
        type: 'MAINTENANCE',
        title: 'New Maintenance Request',
        message: `A new maintenance request has been created for property ID: ${validatedData.property_id}`,
        data: {
          request_id: request.id,
          priority: validatedData.priority,
        },
      },
    ]);

    return NextResponse.json({data: request}, {status: 201});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in maintenance request POST route:', error);
    return NextResponse.json({error: 'Failed to create maintenance request'}, {status: 500});
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
      return NextResponse.json({error: 'Maintenance request ID is required'}, {status: 400});
    }

    const validatedData = maintenanceRequestSchema.partial().parse(updateData);

    // Verify request ownership
    const {data: existingRequest, error: requestCheckError} = await supabase
      .from('maintenance_requests')
      .select('id, status')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (requestCheckError || !existingRequest) {
      return NextResponse.json(
        {error: 'Maintenance request not found or unauthorized'},
        {status: 404},
      );
    }

    // Prevent updates to completed or cancelled requests
    if (existingRequest.status === 'COMPLETED' || existingRequest.status === 'CANCELLED') {
      return NextResponse.json(
        {error: 'Cannot update completed or cancelled maintenance requests'},
        {status: 400},
      );
    }

    const {data: request, error} = await supabase
      .from('maintenance_requests')
      .update(validatedData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating maintenance request:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    // Create notification for status update
    if (validatedData.status) {
      await supabase.from('notifications').insert([
        {
          user_id: userId,
          type: 'MAINTENANCE',
          title: 'Maintenance Request Updated',
          message: `Maintenance request status updated to ${validatedData.status}`,
          data: {
            request_id: id,
            old_status: existingRequest.status,
            new_status: validatedData.status,
          },
        },
      ]);
    }

    return NextResponse.json({data: request});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in maintenance request PUT route:', error);
    return NextResponse.json({error: 'Failed to update maintenance request'}, {status: 500});
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
      return NextResponse.json({error: 'Maintenance request ID is required'}, {status: 400});
    }

    // Verify request ownership and status
    const {data: request, error: requestCheckError} = await supabase
      .from('maintenance_requests')
      .select('status')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (requestCheckError || !request) {
      return NextResponse.json(
        {error: 'Maintenance request not found or unauthorized'},
        {status: 404},
      );
    }

    if (request.status === 'IN_PROGRESS') {
      return NextResponse.json(
        {error: 'Cannot delete a maintenance request that is in progress'},
        {status: 400},
      );
    }

    const {error} = await supabase
      .from('maintenance_requests')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting maintenance request:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({message: 'Maintenance request deleted successfully'}, {status: 200});
  } catch (error) {
    console.error('Error in maintenance request DELETE route:', error);
    return NextResponse.json({error: 'Failed to delete maintenance request'}, {status: 500});
  }
}
