import { supabase } from '@/lib/supabase'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const userSettingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('light'),
  language: z.string().min(2).max(5).default('en'),
  currency: z.string().min(3).max(3).default('USD'),
  date_format: z.string().default('MM/DD/YYYY'),
  time_format: z.enum(['12h', '24h']).default('12h'),
  notifications_enabled: z.boolean().default(true),
  email_notifications: z.boolean().default(true),
  sms_notifications: z.boolean().default(false),
})

const userSecuritySettingsSchema = z.object({
  two_factor_enabled: z.boolean().default(false),
  two_factor_method: z.enum(['EMAIL', 'SMS', 'AUTHENTICATOR']).optional(),
  backup_codes: z.array(z.string()).optional(),
  allowed_ips: z.array(z.string()).optional(),
  max_sessions: z.number().min(1).max(10).default(5),
  password_expires_at: z.string().datetime().optional(),
  require_password_change: z.boolean().default(false),
  security_questions: z.record(z.string(), z.string()).optional(),
  login_notifications: z.boolean().default(true),
})

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settingsType = req.nextUrl.searchParams.get('type') || 'user'

    let query
    if (settingsType === 'security') {
      query = supabase.from('user_security_settings').select('*').eq('user_id', userId).single()
    } else {
      query = supabase.from('user_settings').select('*').eq('id', userId).single()
    }

    const { data: settings, error } = await query

    if (error) {
      // If settings don't exist, create default ones
      if (error.code === 'PGRST116') {
        const defaultSettings =
          settingsType === 'security'
            ? {
                user_id: userId,
                two_factor_enabled: false,
                max_sessions: 5,
                require_password_change: false,
                login_notifications: true,
              }
            : {
                id: userId,
                theme: 'light',
                language: 'en',
                currency: 'USD',
                date_format: 'MM/DD/YYYY',
                time_format: '12h',
                notifications_enabled: true,
                email_notifications: true,
                sms_notifications: false,
              }

        const { data: newSettings, error: createError } = await supabase
          .from(settingsType === 'security' ? 'user_security_settings' : 'user_settings')
          .insert([defaultSettings])
          .select()
          .single()

        if (createError) {
          console.error('Error creating default settings:', createError)
          return NextResponse.json({ error: createError.message }, { status: 500 })
        }

        return NextResponse.json({ data: newSettings })
      }

      console.error('Error fetching settings:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: settings })
  } catch (error) {
    console.error('Error in settings GET route:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const settingsType = body.type || 'user'
    const { type, ...updateData } = body

    let validatedData
    if (settingsType === 'security') {
      validatedData = userSecuritySettingsSchema.partial().parse(updateData)
    } else {
      validatedData = userSettingsSchema.partial().parse(updateData)
    }

    const { data: settings, error } = await supabase
      .from(settingsType === 'security' ? 'user_security_settings' : 'user_settings')
      .update(validatedData)
      .eq(settingsType === 'security' ? 'user_id' : 'id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating settings:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create audit log for settings change
    await supabase.from('user_activity_logs').insert([
      {
        user_id: userId,
        action: 'UPDATE',
        entity: settingsType === 'security' ? 'SECURITY_SETTINGS' : 'USER_SETTINGS',
        details: {
          changes: validatedData,
        },
      },
    ])

    // Create notification for security-related changes
    if (settingsType === 'security' && validatedData.two_factor_enabled !== undefined) {
      await supabase.from('notifications').insert([
        {
          user_id: userId,
          type: 'SYSTEM',
          title: 'Security Settings Updated',
          message: `Two-factor authentication has been ${
            validatedData.two_factor_enabled ? 'enabled' : 'disabled'
          }`,
          data: {
            setting_type: 'security',
            two_factor_enabled: validatedData.two_factor_enabled,
          },
        },
      ])
    }

    return NextResponse.json({ data: settings })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Error in settings PUT route:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}

// System settings (admin only)
const systemSettingsSchema = z.object({
  key: z.string().min(1),
  value: z.any(),
  description: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()

    if (userError || !user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    const body = await req.json()
    const validatedData = systemSettingsSchema.parse(body)

    const { data: setting, error } = await supabase
      .from('system_configurations')
      .insert([{ ...validatedData, updated_by: userId }])
      .select()
      .single()

    if (error) {
      console.error('Error creating system setting:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create audit log for system setting creation
    await supabase.from('admin_audit_logs').insert([
      {
        userId,
        entityType: 'SETTINGS',
        newValues: validatedData,
      },
    ])

    return NextResponse.json({ data: setting }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error('Error in settings POST route:', error)
    return NextResponse.json({ error: 'Failed to create system setting' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()

    if (userError || !user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 403 })
    }

    const key = req.nextUrl.searchParams.get('key')
    if (!key) {
      return NextResponse.json({ error: 'Setting key is required' }, { status: 400 })
    }

    // Get the setting before deletion for audit log
    const { data: existingSetting, error: getError } = await supabase
      .from('system_configurations')
      .select('*')
      .eq('key', key)
      .single()

    if (getError) {
      console.error('Error fetching system setting:', getError)
      return NextResponse.json({ error: getError.message }, { status: 500 })
    }

    const { error } = await supabase.from('system_configurations').delete().eq('key', key)

    if (error) {
      console.error('Error deleting system setting:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Create audit log for system setting deletion
    await supabase.from('admin_audit_logs').insert([
      {
        userId,
        entityType: 'SETTINGS',
        entityId: key,
        oldValues: existingSetting,
      },
    ])

    return NextResponse.json({ message: 'System setting deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error in settings DELETE route:', error)
    return NextResponse.json({ error: 'Failed to delete system setting' }, { status: 500 })
  }
}
