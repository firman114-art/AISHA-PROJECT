import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// POST input setoran baru
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Cek session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Get data dari request
    const { 
      studentId, 
      category, 
      juz, 
      surahName, 
      materiJilid, 
      ayatRange, 
      predikat,
      nilai,
      errKelancaran,
      errFashoah,
      errTajwid,
      catatan 
    } = await request.json()
    
    if (!studentId || !category || !predikat) {
      return NextResponse.json({ error: 'Field wajib tidak lengkap' }, { status: 400 })
    }
    
    // Insert setoran
    const { data: setoran, error } = await supabase
      .from('progress_logs')
      .insert({
        student_id: studentId,
        teacher_id: session.user.id,
        tipe: category,
        materi: surahName || materiJilid || '',
        keterangan: catatan || '',
        nilai: nilai?.toString() || '0',
        category,
        juz,
        surah_name: surahName,
        materi_jilid: materiJilid,
        ayat_range: ayatRange,
        predikat,
        err_kelancaran: errKelancaran || 0,
        err_fashoah: errFashoah || 0,
        err_tajwid: errTajwid || 0,
        tanggal: new Date().toISOString().split('T')[0],
      })
      .select()
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      setoran,
      message: 'Setoran berhasil dicatat',
      starsEarned: setoran.stars_earned
    })
    
  } catch (error) {
    console.error('Error creating setoran:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET setoran murid (untuk guru/murid)
export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Cek session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    
    let query = supabase
      .from('progress_logs')
      .select(`
        *,
        student:profiles!student_id(full_name),
        teacher:profiles!teacher_id(full_name)
      `)
      .order('created_at', { ascending: false })
    
    if (studentId) {
      query = query.eq('student_id', studentId)
    }
    
    const { data: setoran, error } = await query
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ setoran })
    
  } catch (error) {
    console.error('Error fetching setoran:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
