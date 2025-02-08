import { supabase } from '@/lib/supabase';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for tenant creation/updates
const tenantSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  property_id: z.string().uuid('Invalid property ID'),
  tenant_status: z.enum(['active', 'inactive', 'pending']).default('pending'),
  move_in_date: z.string().datetime().optional(),
  move_out_date: z.string().datetime().optional(),
  emergency_contact: z.record(z.string(), z.any()).optional(),
  documents: z.array(z.any()).optional(),
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

    let query = supabase.from('tenants').select('*, properties(*)').eq('user_id', userId);

    if (property_id) {
      query = query.eq('property_id', property_id);
    }

    if (status) {
      query = query.eq('tenant_status', status);
    }

    const {data: tenants, error} = await query;

    if (error) {
      console.error('Error fetching tenants:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({data: tenants});
  } catch (error) {
    console.error('Error in tenant GET route:', error);
    return NextResponse.json({error: 'Failed to fetch tenants'}, {status: 500});
  }
}

export async function POST(req: NextRequest) {
  try {
    const {userId} = await auth();
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await req.json();
    const validatedData = tenantSchema.parse(body);

    // Verify that the property belongs to the user
    const {data: property, error: propertyError} = await supabase
      .from('properties')
      .select('id')
      .eq('id', validatedData.property_id)
      .eq('user_id', userId)
      .single();

    if (propertyError || !property) {
      return NextResponse.json({error: 'Property not found or unauthorized'}, {status: 404});
    }

    const {data: tenant, error} = await supabase
      .from('tenants')
      .insert([{...validatedData, user_id: userId}])
      .select()
      .single();

    if (error) {
      console.error('Error creating tenant:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    // Create notification for new tenant
    await supabase.from('notifications').insert([
      {
        user_id: userId,
        type: 'TENANT',
        title: 'New Tenant Added',
        message: `${validatedData.first_name} ${validatedData.last_name} has been added as a tenant.`,
      },
    ]);

    return NextResponse.json({data: tenant}, {status: 201});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in tenant POST route:', error);
    return NextResponse.json({error: 'Failed to create tenant'}, {status: 500});
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
      return NextResponse.json({error: 'Tenant ID is required'}, {status: 400});
    }

    const validatedData = tenantSchema.partial().parse(updateData);

    const {data: tenant, error} = await supabase
      .from('tenants')
      .update(validatedData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating tenant:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    if (!tenant) {
      return NextResponse.json({error: 'Tenant not found'}, {status: 404});
    }

    return NextResponse.json({data: tenant});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in tenant PUT route:', error);
    return NextResponse.json({error: 'Failed to update tenant'}, {status: 500});
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
      return NextResponse.json({error: 'Tenant ID is required'}, {status: 400});
    }

    // First check if tenant exists and belongs to user
    const {data: tenant, error: fetchError} = await supabase
      .from('tenants')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (fetchError || !tenant) {
      return NextResponse.json({error: 'Tenant not found or unauthorized'}, {status: 404});
    }

    const {error} = await supabase.from('tenants').delete().eq('id', id).eq('user_id', userId);

    if (error) {
      console.error('Error deleting tenant:', error);
      return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({message: 'Tenant deleted successfully'}, {status: 200});
  } catch (error) {
    console.error('Error in tenant DELETE route:', error);
    return NextResponse.json({error: 'Failed to delete tenant'}, {status: 500});
  }
}
