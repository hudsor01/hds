import {prisma} from '@/prisma/seed';
import {getAuth} from '@clerk/nextjs/server';
import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';

// Schema for property validation
const propertySchema = z.object({
  name: z.string().min(1, 'Property name is required'),
  address: z.string().min(1, 'Property address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required').max(2, 'State must be 2 characters'),
  zip: z.string().min(5, 'ZIP code must be at least 5 characters'),
  rent_amount: z.number().positive('Rent amount must be greater than 0'),
  type: z.enum(['Residential', 'Commercial', 'Industrial']).default('Residential'),
  status: z.enum(['available', 'rented', 'maintenance', 'inactive']).default('available'),
  images: z.array(z.string().url('Invalid image URL')).optional(),
  amenities: z.array(z.string()).optional(),
  description: z.string().optional(),
});

// Schema for property updates (all fields optional)
const updatePropertySchema = propertySchema.partial();

// Error handler utility
const handleError = (error: unknown) => {
  console.error('Property API Error:', error);
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
    const body = propertySchema.parse(json);

    const property = await prisma.properties.create({
      data: {
        ...body,
        owner_id: userId,
      },
      include: {
        maintenance_requests: true,
        leases: {
          include: {
            tenant: true,
          },
        },
      },
    });

    return NextResponse.json(property);
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
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    const where = {
      owner_id: userId,
      ...(status && {status}),
      ...(type && {type}),
      ...(search && {
        OR: [
          {name: {contains: search, mode: 'insensitive'}},
          {address: {contains: search, mode: 'insensitive'}},
          {city: {contains: search, mode: 'insensitive'}},
        ],
      }),
    };

    const [properties, total] = await Promise.all([
      prisma.properties.findMany({
        where,
        include: {
          maintenance_requests: true,
          leases: {
            include: {
              tenant: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
      }),
      prisma.properties.count({where}),
    ]);

    return NextResponse.json({
      properties,
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
      return NextResponse.json({error: 'Property ID is required'}, {status: 400});
    }

    const body = updatePropertySchema.parse(updateData);

    // Verify ownership
    const existingProperty = await prisma.properties.findUnique({
      where: {id, owner_id: userId},
    });

    if (!existingProperty) {
      return NextResponse.json({error: 'Property not found'}, {status: 404});
    }

    const property = await prisma.properties.update({
      where: {id},
      data: body,
      include: {
        maintenance_requests: true,
        leases: {
          include: {
            tenant: true,
          },
        },
      },
    });

    return NextResponse.json(property);
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
      return NextResponse.json({error: 'Property ID is required'}, {status: 400});
    }

    // Verify ownership
    const existingProperty = await prisma.properties.findUnique({
      where: {id, owner_id: userId},
    });

    if (!existingProperty) {
      return NextResponse.json({error: 'Property not found'}, {status: 404});
    }

    // Check for active leases
    const activeLeases = await prisma.leases.count({
      where: {
        property_id: id,
        status: 'active',
      },
    });

    if (activeLeases > 0) {
      return NextResponse.json({error: 'Cannot delete property with active leases'}, {status: 400});
    }

    await prisma.properties.delete({
      where: {id},
    });

    return NextResponse.json({success: true});
  } catch (error) {
    return handleError(error);
  }
}

function createRouteHandlerClient(arg0: {
  cookies: () => Promise<
    import('next/dist/server/web/spec-extension/adapters/request-cookies').ReadonlyRequestCookies
  >;
}) {
  throw new Error('Function not implemented.');
}
