import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Database } from '@/types/db.types'

export async function getSession(): Promise<NextResponse> {
    try {
        const supabase = createClient()
        const {
            data: { session },
            error
        } = await supabase.auth.getSession()

        if (error || !session) {
            throw new Error('Unauthorized')
        }

        return NextResponse.json({ session })
    } catch (error) {
        console.error('Error getting session:', error)
        return NextResponse.json(
            { error: 'Error fetching session' },
            { status: 500 }
        )
    }
}

export async function signOut(): Promise<NextResponse> {
    try {
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()

        if (error) {
            throw new Error('Error signing out')
        }

        return NextResponse.json({
            message: 'Signed out successfully'
        })
    } catch (error) {
        console.error('Error signing out:', error)
        return NextResponse.json(
            { error: 'Error signing out' },
            { status: 500 }
        )
    }
}

export async function getCurrentUserProfile(): Promise<NextResponse> {
    try {
        const supabase = createClient()
        const {
            data: { user },
            error
        } = await supabase.auth.getUser()

        if (error || !user) {
            throw new Error('Unauthorized')
        }

        return NextResponse.json({ user })
    } catch (error) {
        console.error('Error getting user profile:', error)
        return NextResponse.json(
            { error: 'Error fetching user profile' },
            { status: 500 }
        )
    }
}

export async function updateUserProfile(updates: {
    email?: string
    password?: string
    data?: Record<string, unknown>
}): Promise<NextResponse> {
    try {
        const supabase = createClient()
        const {
            data: { user },
            error
        } = await supabase.auth.updateUser(updates)

        if (error || !user) {
            throw new Error('Error updating user profile')
        }

        return NextResponse.json({ user })
    } catch (error) {
        console.error('Error updating user profile:', error)
        return NextResponse.json(
            { error: 'Error updating user profile' },
            { status: 500 }
        )
    }
}

export async function isAuthenticated(): Promise<NextResponse> {
    try {
        const supabase = createClient()
        const {
            data: { session },
            error
        } = await supabase.auth.getSession()

        if (error || !session) {
            throw new Error('Unauthorized')
        }

        return NextResponse.json({ authenticated: true })
    } catch (error) {
        console.error('Error checking authentication:', error)
        return NextResponse.json(
            { authenticated: false },
            { status: 500 }
        )
    }
}
