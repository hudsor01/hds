import {prisma} from '@/lib/prisma';
import {getAuth} from '@clerk/nextjs/server';
import {LeaseType} from '@prisma/client';
import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';

// Schema for lease validation
const leaseSchema = z.object({
  tenant_id: z.string().uuid('Invalid tenant ID'),
  property_id: z.string().uuid('Invalid property ID'),
  type: z.nativeEnum(LeaseType),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional(),
  rent_amount: z.number().positive('Rent amount must be greater than 0'),
  depositAmount: z.number().positive('Deposit amount must be greater than 0'),
  payment_day: z.number().min(1).max(31),
  documents: z.array(z.string().url('Invalid document URL')).default([]),
  status: z.enum(['Pending', 'Active', 'Terminated', 'Expired']).default('Pending'),
});

// Schema for lease updates (all fields optional)
const updateLeaseSchema = leaseSchema.partial();

// Error handler utility
const handleError = (error: unknown) => {
  console.error('Lease API Error:', error);
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
    const body = leaseSchema.parse(json);

    // Verify property ownership and tenant relationship
    const [property, tenant] = await Promise.all([
      prisma.properties.findUnique({
        where: {
          id: body.property_id,
          user_id: userId,
        },
      }),
      prisma.tenants.findUnique({
        where: {
          id: body.tenant_id,
          user_id: userId,
        },
      }),
    ]);

    if (!property) {
      return NextResponse.json({error: 'Property not found or unauthorized'}, {status: 404});
    }

    if (!tenant) {
      return NextResponse.json({error: 'Tenant not found or unauthorized'}, {status: 404});
    }

    // Check for existing active leases for this property
    const existingLease = await prisma.leases.findFirst({
      where: {
        property_id: body.property_id,
        status: 'Active',
        end_date: {
          gt: new Date(),
        },
      },
    });

    if (existingLease) {
      return NextResponse.json({error: 'Property already has an active lease'}, {status: 400});
    }

    const lease = await prisma.leases.create({
      data: {
        ...body,
        user_id: userId,
      },
    });

    return NextResponse.json(lease);
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
    const status = searchParams.get('status') as
      | 'Pending'
      | 'Active'
      | 'Terminated'
      | 'Expired'
      | null;
    const propertyId = searchParams.get('propertyId');
    const tenantId = searchParams.get('tenantId');
    const type = searchParams.get('type') as LeaseType | null;

    const where = {
      user_id: userId,
      ...(status && {status}),
      ...(propertyId && {property_id: propertyId}),
      ...(tenantId && {tenant_id: tenantId}),
      ...(type && {type}),
    };

    const [leases, total] = await Promise.all([
      prisma.leases.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
      }),
      prisma.leases.count({where}),
    ]);

    return NextResponse.json({
      leases,
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
      return NextResponse.json({error: 'Lease ID is required'}, {status: 400});
    }

    const body = updateLeaseSchema.parse(updateData);

    // Verify lease belongs to user
    const existingLease = await prisma.leases.findUnique({
      where: {
        user_id: id,
      },
    });

    if (!existingLease) {
      return NextResponse.json({error: 'Lease not found'}, {status: 404});
    }

    // If property_id or tenant_id is being updated, verify ownership
    if (body.property_id || body.tenant_id) {
      const [property, tenant] = await Promise.all([
        body.property_id
          ? prisma.properties.findUnique({
              where: {
                id: body.property_id,
                user_id: userId,
              },
            })
          : null,
        body.tenant_id
          ? prisma.tenants.findUnique({
              where: {
                id: body.tenant_id,
                user_id: userId,
              },
            })
          : null,
      ]);

      if (body.property_id && !property) {
        return NextResponse.json({error: 'Property not found or unauthorized'}, {status: 404});
      }

      if (body.tenant_id && !tenant) {
        return NextResponse.json({error: 'Tenant not found or unauthorized'}, {status: 404});
      }
    }

    const lease = await prisma.leases.update({
      where: {user_id: id},
      data: body,
    });

    return NextResponse.json(lease);
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
      return NextResponse.json({error: 'Lease ID is required'}, {status: 400});
    }

    // Verify lease belongs to user
    const existingLease = await prisma.leases.findUnique({
      where: {user_id: id},
    });

    if (!existingLease) {
      return NextResponse.json({error: 'Lease not found'}, {status: 404});
    }

    // Only allow deletion of non-active leases
    if (existingLease.status === 'Active') {
      return NextResponse.json(
        {error: 'Cannot delete an active lease. Please terminate it first.'},
        {status: 400},
      );
    }

    await prisma.leases.delete({
      where: {user_id: id},
    });

    return NextResponse.json({success: true});
  } catch (error) {
    return handleError(error);
  }
}
