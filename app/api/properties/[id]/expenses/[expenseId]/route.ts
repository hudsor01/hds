import supabase from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string; expenseId: string } }) {
  try {
    // Get expense with property details
    const { data: expense, error } = await supabase
      .from('expenses')
      .select(
        `
        *,
        property:properties (
          id,
          name,
          organization_id
        ),
        unit:units (
          id,
          unit_number
        )
      `
      )
      .eq('id', params.expenseId)
      .eq('property_id', params.id)
      .single()

    if (error) throw error

    if (!expense) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 })
    }

    return NextResponse.json(expense)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching expense' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string; expenseId: string } }) {
  try {
    const supabase = supabase()
    const json = await request.json()

    // Update expense
    const { data: expense, error } = await supabase
      .from('expenses')
      .update({
        category: json.category,
        amount: json.amount,
        date: json.date,
        description: json.description,
        status: json.status,
        paid_at: json.status === 'paid' ? new Date().toISOString() : null
      })
      .eq('id', params.expenseId)
      .eq('property_id', params.id)
      .select(
        `
        *,
        property:properties (
          id,
          name,
          organization_id
        ),
        unit:units (
          id,
          unit_number
        )
      `
      )
      .single()

    if (error) throw error

    return NextResponse.json(expense)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating expense' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string; expenseId: string } }) {
  try {
    const supabase = supabase()

    const { error } = await supabase.from('expenses').delete().eq('id', params.expenseId).eq('property_id', params.id)

    if (error) throw error

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting expense' }, { status: 500 })
  }
}
