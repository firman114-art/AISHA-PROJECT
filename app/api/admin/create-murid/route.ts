import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const adminSupabase = createAdminClient()
    
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
    const { email, password, fullName, nis, kelas, tahunMasuk } = await request.json()
    
    if (!email || !password || !fullName || !nis || !kelas || !tahunMasuk) {
      return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
    }
    
    // Step 1: Buat user di auth.users menggunakan admin client
    const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role: 'murid',
      },
    })
    
    if (authError || !authData.user) {
      return NextResponse.json({ error: authError?.message || 'Failed to create user' }, { status: 500 })
    }
    
    // Step 2: Insert ke tabel murid
    const { data: newMurid, error: muridError } = await supabase
      .from('murid')
      .insert({
        user_id: authData.user.id,
        nis,
        kelas,
        tahun_masuk: tahunMasuk,
      })
      .select()
      .single()
    
    if (muridError) {
      return NextResponse.json({ error: muridError.message }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      userId: authData.user.id,
      murid: newMurid,
      message: `Murid ${fullName} dengan NIS ${nis} berhasil dibuat` 
    })
    
  } catch (error) {
    console.error('Error creating murid:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
