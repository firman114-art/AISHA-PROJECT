'use server'

import { createClient } from '@supabase/supabase-js'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client untuk Server Components
export const createServerClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}

// Admin client dengan Service Role (hanya untuk server-side operations)
export const createAdminClient = () => {
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Re-export types
export type { Database } from './database.types'
