import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables')
}

// createBrowserClient is REQUIRED for SSR middleware to work correctly with cookies
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
