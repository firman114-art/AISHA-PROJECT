import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET semua guru
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Cek session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { data: guru, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, created_at')
      .eq('role', 'guru')
      .order('full_name')
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ guru })
    
  } catch (error) {
    console.error('Error fetching guru:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
