import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Admin client dengan Service Role Key
// HANYA digunakan di server-side (API routes, Server Components)
export const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase URL atau Service Role Key tidak dikonfigurasi')
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
