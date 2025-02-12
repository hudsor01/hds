import { prisma } from '@/lib/db'
import { createPaymentIntent, createStripeCustomer } from '@/lib/stripe'
import { paymentSchema, type PaymentRecord } from '@/types/payments'
import { PaymentStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await req.json()
    const body = paymentSchema.parse(json)

    // Verify lease belongs to user
    const lease = await prisma.leases.findUnique({
      where: {
        user_id: body.leaseId
      },
      select: {
        tenant_id: true,
        property_id: true
      }
    })

    if (!lease) {
      return NextResponse.json({ error: 'Lease not found' }, { status: 404 })
    }

    // Get tenant details
    const tenant = await prisma.tenants.findUnique({
      where: { id: lease.tenant_id },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        stripe_customer_id: true
      }
    })

    if (!tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 })
    }

    let stripeCustomerId = tenant.stripe_customer_id

    if (!stripeCustomerId) {
      const customer = await createStripeCustomer({
        email: tenant.email,
        name: `${tenant.first_name} ${tenant.last_name}`,
        metadata: {
          tenantId: tenant.id,
          userId
        }
      })
      stripeCustomerId = customer.id

      // Update tenant with Stripe customer ID
      await prisma.tenants.update({
        where: { id: tenant.id },
        data: { stripe_customer_id: customer.id }
      })
    }

    // Create payment intent
    const paymentIntent = await createPaymentIntent({
      amount: body.payment_amount,
      customer: stripeCustomerId,
      metadata: {
        leaseId: body.leaseId,
        propertyId: lease.property_id,
        tenantId: lease.tenant_id,
        payment_type: body.payment_type
      }
    })

    // Record the payment attempt
    const paymentRecord: PaymentRecord = {
      tenant_id: lease.tenant_id,
      payment_amount: body.payment_amount,
      payment_status: PaymentStatus.PENDING,
      payment_type: body.payment_type,
      description: body.description,
      payment_intent_id: paymentIntent.id
    }

    await prisma.payments.create({ data: paymentRecord })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    console.error('Payment API Error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Error processing payment'
      },
      { status: 500 }
    )
  }
}

// Get payment history for a lease
export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const leaseId = searchParams.get('leaseId')
    const status = searchParams.get('status')
    const startDate = searchParams.get('startDate')
      ? new Date(searchParams.get('startDate')!)
      : undefined
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined

    if (!leaseId) {
      return NextResponse.json({ error: 'Lease ID is required' }, { status: 400 })
    }

    // Verify lease belongs to user
    const lease = await prisma.leases.findUnique({
      where: { user_id: leaseId },
      select: { tenant_id: true }
    })

    if (!lease) {
      return NextResponse.json({ error: 'Lease not found' }, { status: 404 })
    }

    const where = {
      tenant_id: lease.tenant_id,
      ...(status && { status }),
      ...(startDate &&
        endDate && {
          created_at: {
            gte: startDate,
            lte: endDate
          }
        })
    }

    const payments = await prisma.payments.findMany({
      where,
      orderBy: {
        created_at: 'desc'
      }
    })

    return NextResponse.json(payments)
  } catch (error) {
    console.error('Payment History API Error:', error)
    return NextResponse.json({ error: 'Error fetching payment history' }, { status: 500 })
  }
}
