import { supabase } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import type { AuthResponse } from '@supabase/supabase-js'
import { AuthError } from '@supabase/supabase-js'
import process from 'process'

export async function POST(): Promise<NextResponse> {
    try {
        const { data, error }: AuthResponse =
            await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent'
                    }
                }
            })

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json({ url: data.url })
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
