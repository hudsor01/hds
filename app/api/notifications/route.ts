import supabase from '@/lib/supabase'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const notificationSchema = z.object({
  type: z.enum(['SYSTEM', 'MAINTENANCE', 'PAYMENT', 'LEASE', 'MESSAGE', 'ALERT']),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  data: z.record(z.string(), z.unknown()).optional(),
  read_at: z.string().datetime().nullable().optional()
})

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await supabase.auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const type: string | null = searchParams.get('type')
    const unreadOnly: boolean = searchParams.get('unread_only') === 'true'
    const limit: number = parseInt(searchParams.get('limit') || '50', 10)
    const offset: number = parseInt(searchParams.get('offset') || '0', 10)

    const supabase = supabase()

    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (type) {
      query = query.eq('type', type)
    }

    if (unreadOnly) {
      query = query.is('read_at', null)
    }

    const { data: notifications, error } = await query

    if (error) {
      console.error('Error fetching notifications:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: notifications })
  } catch (error) {
    console.error('Error in notifications GET route:', error)
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await supabase.auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = notificationSchema.parse(body)

    const supabase = supabase()

    const { data: notification, error } = await supabase
      .from('notifications')
      .insert([{ ...validatedData, user_id: userId }])
      .select()
      .single()

    if (error) {
      console.error('Error creating notification:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: notification }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Error in notifications POST route:', error)
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await supabase.auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Notification ID is required' }, { status: 400 })
    }

    const supabase = supabase()

    // For marking as read
    if (updateData.markAsRead) {
      const { data: notification, error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single()

      if (error) {
        console.error('Error marking notification as read:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ data: notification })
    }

    // For other updates
    const validatedData = notificationSchema.partial().parse(updateData)

    const { data: notification, error } = await supabase
      .from('notifications')
      .update(validatedData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating notification:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: notification })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Error in notifications PUT route:', error)
    return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await supabase.auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id: string | null = req.nextUrl.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Notification ID is required' }, { status: 400 })
    }

    const supabase = supabase()

    // Verify notification ownership
    const { data: notification, error: notificationCheckError } = await supabase
      .from('notifications')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (notificationCheckError || !notification) {
      return NextResponse.json({ error: 'Notification not found or unauthorized' }, { status: 404 })
    }

    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) {
      console.error('Error deleting notification:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Notification deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in notifications DELETE route:', error)
    return NextResponse.json({ error: 'Failed to delete notification' }, { status: 500 })
  }
}
