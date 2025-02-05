import {prisma} from '@/lib/prisma';
import {getAuth} from '@clerk/nextjs/server';
import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';

// Schema for tenant validation
const tenantSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  property_id: z.string().uuid('Invalid property ID'),
  status: z.enum(['active', 'inactive', 'pending']).default('active'),
  move_in_date: z.string().datetime().optional(),
  move_out_date: z.string().datetime().optional(),
  emergency_contact: z
    .object({
      name: z.string().min(1, 'Emergency contact name is required'),
      phone: z.string().min(10, 'Emergency contact phone must be at least 10 digits'),
      relationship: z.string().min(1, 'Relationship is required'),
    })
    .optional(),
  documents: z.array(z.string().url('Invalid document URL')).optional(),
});

// Schema for tenant updates (all fields optional)
const updateTenantSchema = tenantSchema.partial();

// Error handler utility
const handleError = (error: unknown) => {
  console.error('Tenant API Error:', error);
  if (error instanceof z.ZodError) {
    return NextResponse.json({error: error.errors}, {status: 400});
  }
  return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
};

export async function POST(req: NextRequest) {
  try {
    const {userId} = getAuth(req);
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const json = await req.json();
    const body = tenantSchema.parse(json);

    // Verify property ownership
    const property = await prisma.properties.findUnique({
      where: {
        id: body.property_id,
        user_id: userId,
      },
    });

    if (!property) {
      return NextResponse.json({error: 'Property not found or unauthorized'}, {status: 404});
    }

    const tenant = await prisma.tenants.create({
      data: {
        ...body,
        user_id: userId,
        emergency_contact: body.emergency_contact || {},
        documents: body.documents || [],
      },
      include: {
        property: true,
        maintenance_requests: true,
      },
    });

    return NextResponse.json(tenant);
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const {userId} = getAuth(req);
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const {searchParams} = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10')));
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const propertyId = searchParams.get('propertyId');

    const where = {
      user_id: userId,
      ...(status && {status}),
      ...(propertyId && {property_id: propertyId}),
      ...(search && {
        OR: [
          {first_name: {contains: search}},
          {last_name: {contains: search}},
          {email: {contains: search}},
        ],
      }),
    };

    const [tenants, total] = await Promise.all([
      prisma.tenants.findMany({
        where,
        include: {
          property: true,
          maintenance_requests: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
      }),
      prisma.tenants.count({where}),
    ]);

    return NextResponse.json({
      tenants,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      limit,
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const {userId} = getAuth(req);
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const json = await req.json();
    const {id, ...updateData} = json;

    if (!id) {
      return NextResponse.json({error: 'Tenant ID is required'}, {status: 400});
    }

    const body = updateTenantSchema.parse(updateData);

    // Verify tenant belongs to user
    const existingTenant = await prisma.tenants.findUnique({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!existingTenant) {
      return NextResponse.json({error: 'Tenant not found'}, {status: 404});
    }

    // If property_id is being updated, verify ownership
    if (body.property_id) {
      const property = await prisma.properties.findUnique({
        where: {
          id: body.property_id,
          user_id: userId,
        },
      });

      if (!property) {
        return NextResponse.json({error: 'Property not found or unauthorized'}, {status: 404});
      }
    }

    const tenant = await prisma.tenants.update({
      where: {id},
      data: {
        ...body,
        emergency_contact: body.emergency_contact || undefined,
        documents: body.documents || undefined,
      },
      include: {
        property: true,
        maintenance_requests: true,
      },
    });

    return NextResponse.json(tenant);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const {userId} = getAuth(req);
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({error: 'Tenant ID is required'}, {status: 400});
    }

    // Verify tenant belongs to user
    const existingTenant = await prisma.tenants.findUnique({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!existingTenant) {
      return NextResponse.json({error: 'Tenant not found'}, {status: 404});
    }

    // Check for active leases
    const activeLeases = await prisma.leases.count({
      where: {
        tenant_id: id,
        status: 'Pending',
      },
    });

    if (activeLeases > 0) {
      return NextResponse.json({error: 'Cannot delete tenant with active leases'}, {status: 400});
    }

    await prisma.tenants.delete({
      where: {id},
    });

    return NextResponse.json({success: true});
  } catch (error) {
    return handleError(error);
  }
}
