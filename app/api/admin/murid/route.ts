import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET semua murid
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Cek session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { data: murid, error } = await supabase
      .from('murid')
      .select(`
        *,
        user:profiles(id, full_name, email)
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ murid })
    
  } catch (error) {
    console.error('Error fetching murid:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST tambah murid baru
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
    
    if (profile?.role !== 'admin' && profile?.role !== 'guru') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    // Get data dari request
    const { userId, nis, kelas, tahunMasuk } = await request.json()
    
    if (!userId || !nis || !kelas || !tahunMasuk) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
    }
    
    // Insert murid baru
    const { data: newMurid, error } = await supabase
      .from('murid')
      .insert({
        user_id: userId,
        nis,
        kelas,
        tahun_masuk: tahunMasuk,
      })
      .select()
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      murid: newMurid,
      message: `Murid dengan NIS ${nis} berhasil ditambahkan` 
    })
    
  } catch (error) {
    console.error('Error creating murid:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
