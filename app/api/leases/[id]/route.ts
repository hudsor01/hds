import {prisma} from '@/lib/db/prisma/prisma';
import {getAuth} from '@clerk/nextjs/server';
import {NextResponse} from 'next/server';

export async function GET(request: Request, {params}: {params: {id: string}}) {
  try {
    const {userId} = getAuth(request);
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const lease = await prisma.leases.findUnique({
      where: {
        user_id: params.id,
      },
      include: {
        tenant: true,
        property: true,
      },
    });

    if (!lease) {
      return NextResponse.json({error: 'Lease not found'}, {status: 404});
    }

    return NextResponse.json(lease);
  } catch (error) {
    return NextResponse.json({error: 'Error fetching lease'}, {status: 500});
  }
}

export async function PATCH(request: Request, {params}: {params: {id: string}}) {
  try {
    const {userId} = getAuth(request);
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const json = await request.json();

    // Ensure dates are in ISO format
    if (json.start_date) json.start_date = new Date(json.start_date).toISOString();
    if (json.end_date) json.end_date = new Date(json.end_date).toISOString();

    const lease = await prisma.leases.update({
      where: {
        user_id: params.id,
      },
      data: json,
      include: {
        tenant: true,
        property: true,
      },
    });

    return NextResponse.json(lease);
  } catch (error) {
    return NextResponse.json({error: 'Error updating lease'}, {status: 500});
  }
}

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
  try {
    const {userId} = getAuth(request);
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    await prisma.leases.delete({
      where: {
        user_id: params.id,
      },
    });

    return new NextResponse(null, {status: 204});
  } catch (error) {
    return NextResponse.json({error: 'Error deleting lease'}, {status: 500});
  }
}
