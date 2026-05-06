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
    // Return mock client untuk demo dengan support method chaining
    const createMockQueryBuilder = (initialData: any[] = []) => {
      const chainMethods = {
        eq: () => chainMethods,
        neq: () => chainMethods,
        gt: () => chainMethods,
        gte: () => chainMethods,
        lt: () => chainMethods,
        lte: () => chainMethods,
        like: () => chainMethods,
        ilike: () => chainMethods,
        is: () => chainMethods,
        in: () => chainMethods,
        contains: () => chainMethods,
        containedBy: () => chainMethods,
        overlaps: () => chainMethods,
        textSearch: () => chainMethods,
        match: () => chainMethods,
        not: () => chainMethods,
        or: () => chainMethods,
        and: () => chainMethods,
        filter: () => chainMethods,
        order: () => chainMethods,
        limit: () => chainMethods,
        single: () => Promise.resolve({ data: null, error: null }),
        maybeSingle: () => Promise.resolve({ data: null, error: null }),
        csv: () => Promise.resolve({ data: null, error: null }),
        then: (callback: any) => Promise.resolve({ data: initialData, error: null }).then(callback),
      }
      return chainMethods
    }

    return {
      from: () => ({
        insert: () => Promise.resolve({ data: null, error: null }),
        upsert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
        select: () => createMockQueryBuilder([]),
      }),
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ data: null, error: null }),
        signOut: () => Promise.resolve({ error: null }),
      },
    } as any
  }
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Re-export types
export type { Database }
