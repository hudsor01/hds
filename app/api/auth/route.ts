import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const authRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const passwordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
})

const passwordUpdateSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { type, ...data } = json

    const supabase = createClient()

    switch (type) {
      case 'signin': {
        const validatedData = authRequestSchema.parse(data)
        const { error } = await supabase.auth.signInWithPassword(validatedData)
        
        if (error) throw error
        
        return NextResponse.json({ message: 'Successfully signed in' })
      }

      case 'signup': {
        const validatedData = authRequestSchema.parse(data)
        const { error } = await supabase.auth.signUp({
          ...validatedData,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
          },
        })
        
        if (error) throw error
        
        return NextResponse.json({ message: 'Please check your email to confirm your account' })
      }

      case 'reset-password': {
        const validatedData = passwordResetSchema.parse(data)
        const { error } = await supabase.auth.resetPasswordForEmail(validatedData.email, {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/auth/update-password`,
        })
        
        if (error) throw error
        
        return NextResponse.json({ message: 'Password reset instructions sent to your email' })
      }

      case 'update-password': {
        const validatedData = passwordUpdateSchema.parse(data)
        const { error } = await supabase.auth.updateUser({
          password: validatedData.password,
        })
        
        if (error) throw error
        
        return NextResponse.json({ message: 'Password updated successfully' })
      }

      default:
        return NextResponse.json(
          { error: 'Invalid auth type' },
          { status: 400 }
        )
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation Error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    
    if (error) throw error
    
    return NextResponse.json({ message: 'Successfully signed out' })
  } catch (error) {
    console.error('Sign out error:', error)
    return NextResponse.json(
      { error: 'Failed to sign out' },
      { status: 500 }
    )
  }
}