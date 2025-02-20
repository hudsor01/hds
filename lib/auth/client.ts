import { createBrowserClient } from '@supabase/ssr'
import process from 'process'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const createClient = () => {
    return createBrowserClient(supabaseUrl, supabaseKey)
}

export default createClient()
