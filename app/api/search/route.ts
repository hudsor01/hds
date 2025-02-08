import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query') || '';
    const type = searchParams.get('type') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Initialize Supabase client for complex queries
    const supabase = createRouteHandlerClient({ cookies });

    let results = [];

    switch (type) {
      case 'properties':
        results = await prisma.property.findMany({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { address: { contains: query, mode: 'insensitive' } },
            ],
          },
          take: limit,
          skip: (page - 1) * limit,
          include: {
            units: true,
          },
        });
        break;

      case 'tenants':
        results = await prisma.tenant.findMany({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
            ],
          },
          take: limit,
          skip: (page - 1) * limit,
          include: {
            leases: {
              include: {
                unit: true,
              },
            },
          },
        });
        break;

      case 'maintenance':
        results = await prisma.maintenanceRequest.findMany({
          where: {
            OR: [
              { description: { contains: query, mode: 'insensitive' } },
              { status: { contains: query, mode: 'insensitive' } },
            ],
          },
          take: limit,
          skip: (page - 1) * limit,
          include: {
            unit: {
              include: {
                property: true,
              },
            },
          },
        });
        break;

      default:
        // Search across all relevant tables
        const [properties, tenants, maintenance] = await Promise.all([
          prisma.property.findMany({
            where: {
              name: { contains: query, mode: 'insensitive' },
            },
            take: limit,
          }),
          prisma.tenant.findMany({
            where: {
              name: { contains: query, mode: 'insensitive' },
            },
            take: limit,
          }),
          prisma.maintenanceRequest.findMany({
            where: {
              description: { contains: query, mode: 'insensitive' },
            },
            take: limit,
          }),
        ]);

        results = {
          properties,
          tenants,
          maintenance,
        };
    }

    return NextResponse.json({
      query,
      type,
      page,
      limit,
      results,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Error performing search' },
      { status: 500 },
    );
  }
}
