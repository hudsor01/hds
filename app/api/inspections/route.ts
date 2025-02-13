import supabase from '@/lib/supabase'
import supabase from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const inspectionSchema = z.object({
  property_id: z.string().uuid('Invalid property ID'),
  inspection_type: z.enum(['ROUTINE', 'MOVE_IN', 'MOVE_OUT', 'MAINTENANCE']),
  status: z.enum(['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).default('SCHEDULED'),
  scheduled_date: z.string().datetime(),
  completed_date: z.string().datetime().optional(),
  inspector_name: z.string().min(1, 'Inspector name is required'),
  findings: z
    .array(
      z.object({
        category: z.string(),
        condition: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR']),
        notes: z.string().optional(),
        photos: z.array(z.string().url()).optional()
      })
    )
    .optional(),
  notes: z.string().optional(),
  report_url: z.string().url().optional()
})

export async function GET(req: NextRequest) {
  try {
    const { userId } = await supabase()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const property_id = searchParams.get('property_id')
    const status = searchParams.get('status')
    const type = searchParams.get('type')

    let query = supabase
      .from('inspections')
      .select('*, properties(*)')
      .eq('user_id', userId)
      .order('scheduled_date', { ascending: false })

    if (property_id) {
      query = query.eq('property_id', property_id)
    }

    if (status) {
      query = query.eq('status', status)
    }

    if (type) {
      query = query.eq('inspection_type', type)
    }

    const { data: inspections, error } = await query

    if (error) {
      console.error('Error fetching inspections:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: inspections })
  } catch (error) {
    console.error('Error in inspection GET route:', error)
    return NextResponse.json({ error: 'Failed to fetch inspections' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await supabase()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = inspectionSchema.parse(body)

    // Verify property ownership
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('id')
      .eq('id', validatedData.property_id)
      .eq('user_id', userId)
      .single()

    if (propertyError || !property) {
      return NextResponse.json({ error: 'Property not found or unauthorized' }, { status: 404 })
    }

    const { data: inspection, error } = await supabase
      .from('inspections')
      .insert([{ ...validatedData, user_id: userId }])
      .select()
      .single()

    if (error) {
      console.error('Error creating inspection:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create notification for new inspection
    await supabase.from('notifications').insert([
      {
        user_id: userId,
        type: 'SYSTEM',
        title: 'New Inspection Scheduled',
        message: `A new ${validatedData.inspection_type} inspection has been scheduled for ${validatedData.scheduled_date}`,
        data: {
          inspection_id: inspection.id,
          property_id: validatedData.property_id,
          type: validatedData.inspection_type
        }
      }
    ])

    return NextResponse.json({ data: inspection }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Error in inspection POST route:', error)
    return NextResponse.json({ error: 'Failed to create inspection' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = await supabase()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Inspection ID is required' }, { status: 400 })
    }

    const validatedData = inspectionSchema.partial().parse(updateData)

    // Verify inspection ownership
    const { data: existingInspection, error: inspectionCheckError } = await supabase
      .from('inspections')
      .select('status')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (inspectionCheckError || !existingInspection) {
      return NextResponse.json({ error: 'Inspection not found or unauthorized' }, { status: 404 })
    }

    // Prevent updates to cancelled inspections
    if (existingInspection.status === 'CANCELLED') {
      return NextResponse.json({ error: 'Cannot update cancelled inspections' }, { status: 400 })
    }

    const { data: inspection, error } = await supabase
      .from('inspections')
      .update(validatedData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating inspection:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create notification for status update
    if (validatedData.status) {
      await supabase.from('notifications').insert([
        {
          user_id: userId,
          type: 'SYSTEM',
          title: 'Inspection Status Updated',
          message: `Inspection status updated to ${validatedData.status}`,
          data: {
            inspection_id: id,
            old_status: existingInspection.status,
            new_status: validatedData.status
          }
        }
      ])
    }

    return NextResponse.json({ data: inspection })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Error in inspection PUT route:', error)
    return NextResponse.json({ error: 'Failed to update inspection' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await supabase()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = req.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Inspection ID is required' }, { status: 400 })
    }

    // Verify inspection ownership and status
    const { data: inspection, error: inspectionCheckError } = await supabase
      .from('inspections')
      .select('status')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (inspectionCheckError || !inspection) {
      return NextResponse.json({ error: 'Inspection not found or unauthorized' }, { status: 404 })
    }

    if (inspection.status === 'IN_PROGRESS' || inspection.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Cannot delete in-progress or completed inspections' },
        { status: 400 }
      )
    }

    const { error } = await supabase.from('inspections').delete().eq('id', id).eq('user_id', userId)

    if (error) {
      console.error('Error deleting inspection:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Inspection deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in inspection DELETE route:', error)
    return NextResponse.json({ error: 'Failed to delete inspection' }, { status: 500 })
  }
}
