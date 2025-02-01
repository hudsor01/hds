import { prisma } from '@/lib/prisma'
import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createPropertySchema = z.object({
  name: z.string().min(1, 'Property name is required'),
  address: z.string().min(1, 'Property address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  rent_amount: z.number().positive('Rent amount must be greater than 0'),
  type: z.string().default('Residential'),
  status: z.string().default('available'),
  images: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    }
    }

    const json = await req.json();
    const body = createPropertySchema.parse(json);

    const property = await prisma.properties.create({
      data: {
        ...body,
        owner_id: userId,
      },
      include: {
        maintenance_requests: true,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    console.error('POST /api/properties error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    const where = {
      owner_id: userId,
      ...(status && { status }),
    };

    const [properties, total] = await Promise.all([
      prisma.properties.findMany({
        where,
        include: {
          maintenance_requests: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
      }),
      prisma.properties.count({ where }),
    ]);

    return NextResponse.json({
      properties,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('GET /api/properties error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: properties, error } = await supabase
      .from('properties')
      .select(`
        *,
        units (*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(properties)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching properties' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const json = await request.json()

    const { data: property, error } = await supabase
      .from('properties')
      .insert([json])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json({ error: 'Error creating property' }, { status: 500 })
  }
}
function createRouteHandlerClient (arg0: { cookies: () => Promise<import("next/dist/server/web/spec-extension/adapters/request-cookies").ReadonlyRequestCookies> })
{
  throw new Error('Function not implemented.')
}
