import {prisma} from '@/lib/prisma/prisma';
import {getAuth} from '@clerk/nextjs/server';
import {PaymentStatus, PaymentType} from '@prisma/client';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
  try {
    const {userId} = getAuth(request);
    if (!userId) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    // First verify access to the lease
    const lease = await prisma.leases.findUnique({
      where: {
        user_id: params.id,
      },
      select: {
        tenant_id: true,
        property_id: true,
        start_date: true,
        end_date: true,
        rent_amount: true,
        depositAmount: true,
        status: true,
      },
    });

    if (!lease) {
      return NextResponse.json({error: 'Lease not found'}, {status: 404});
    }

    // Calculate lease financials
    const payments = await prisma.payments.findMany({
      where: {
        tenant_id: lease.tenant_id,
        payment_type: {
          in: [PaymentType.RENT, PaymentType.DEPOSIT],
        },
        payment_status: {
          in: [PaymentStatus.COMPLETED],
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      select: {
        payment_amount: true,
        payment_type: true,
        payment_status: true,
        created_at: true,
        processed_at: true,
      },
    });

    const totalPaid = payments.reduce((sum, payment) => sum + payment.payment_amount, 0);
    const totalDue = Number(lease.rent_amount) * 12; // Assuming yearly calculation
    const balance = totalDue - totalPaid;

    return NextResponse.json({
      lease_details: {
        property_id: lease.property_id,
        start_date: lease.start_date,
        end_date: lease.end_date,
        status: lease.status,
      },
      financials: {
        total_paid: totalPaid,
        total_due: totalDue,
        balance,
        payment_history: payments,
      },
    });
  } catch (error) {
    return NextResponse.json({error: 'Error calculating lease financials'}, {status: 500});
  }
}
