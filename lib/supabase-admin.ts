import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Admin client dengan Service Role Key
// HANYA digunakan di server-side (API routes, Server Components)
export const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.warn('Supabase URL atau Service Role Key tidak dikonfigurasi - menggunakan mock client')
    // Return mock client untuk build time
    return {
      auth: {
        admin: {
          createUser: async () => ({ data: { user: { id: 'mock-user-id' } }, error: null }),
        },
      },
    } as any
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
