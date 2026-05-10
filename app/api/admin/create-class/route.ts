import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Cek session admin
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Cek role admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
    
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    // Get data dari request
    const { name, teacherId } = await request.json()
    
    if (!name) {
      return NextResponse.json({ error: 'Nama kelas wajib diisi' }, { status: 400 })
    }
    
    // Insert kelas baru
    const { data: newClass, error } = await supabase
      .from('classes')
      .insert({
        name,
        teacher_id: teacherId || null,
      })
      .select()
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      class: newClass,
      message: `Kelas ${name} berhasil dibuat` 
    })
    
  } catch (error) {
    console.error('Error creating class:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET semua kelas
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data: classes, error } = await supabase
      .from('classes')
      .select(`
        *,
        teacher:profiles(id, full_name)
      `)
      .order('name')
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ classes })
    
  } catch (error) {
    console.error('Error fetching classes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
