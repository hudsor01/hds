import { prisma } from '@/lib/prisma/prisma'
import { supabase } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await supabase()
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const lease = await prisma.leases.findUnique({
      where: {
        user_id: params.id
      },
      select: {
        user_id: true,
        tenant_id: true,
        property_id: true,
        type: true,
        start_date: true,
        end_date: true,
        rent_amount: true,
        depositAmount: true,
        payment_day: true,
        documents: true,
        created_at: true,
        status: true
      }
    })

    if (!lease) {
      return NextResponse.json({ error: 'Lease not found' }, { status: 404 })
    }

    return NextResponse.json(lease)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching lease' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await supabase()
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const json = await request.json()

    // Ensure dates are in ISO format
    if (json.start_date) json.start_date = new Date(json.start_date).toISOString()
    if (json.end_date) json.end_date = new Date(json.end_date).toISOString()

    const lease = await prisma.leases.update({
      where: {
        user_id: params.id
      },
      data: json,
      select: {
        user_id: true,
        tenant_id: true,
        property_id: true,
        type: true,
        start_date: true,
        end_date: true,
        rent_amount: true,
        depositAmount: true,
        payment_day: true,
        documents: true,
        created_at: true,
        status: true
      }
    })

    return NextResponse.json(lease)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating lease' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await supabase()
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.leases.delete({
      where: {
        user_id: params.id
      }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting lease' }, { status: 500 })
  }
}
