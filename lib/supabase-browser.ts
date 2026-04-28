'use client'

import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Client untuk Client Components (Browser)
export const createBrowserClient = () => {
  // Fallback untuk development/demo mode
  if (!supabaseUrl || !supabaseAnonKey || 
      supabaseUrl === 'https://your-project.supabase.co' ||
      supabaseAnonKey === 'your-anon-key-here') {
    console.warn('Supabase env vars not configured. Running in mock mode.')
    // Return mock client untuk demo
    return {
      from: () => ({
        insert: () => Promise.resolve({ data: null, error: null }),
        select: () => Promise.resolve({ data: [], error: null }),
      }),
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      },
    } as any
  }
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Re-export types
export type { Database }
