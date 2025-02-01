import { prisma } from '@/lib/prisma'
import { createPropertySchema } from '@/lib/validations/property'
import { auth } from '@clerk/nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const json = await request.json();
    const body = createPropertySchema.parse(json);

    const property = await prisma.property.create({
      data: {
        ...body,
        ownerId: userId,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error('POST /api/properties error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const properties = await prisma.property.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        tenants: true,
        maintenance: true,
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error('GET /api/properties error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET() {
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
