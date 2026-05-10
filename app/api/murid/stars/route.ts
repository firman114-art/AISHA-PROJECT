import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET total bintang murid (untuk dashboard murid & guru)
export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Cek session
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId') || session.user.id
    const month = searchParams.get('month') || new Date().toISOString().slice(0, 7) // YYYY-MM
    
    // Get total stars per bulan
    const { data: starsData, error: starsError } = await supabase
      .from('progress_logs')
      .select('stars_earned, created_at')
      .eq('student_id', studentId)
      .gte('created_at', `${month}-01`)
      .lte('created_at', `${month}-31`)
    
    if (starsError) {
      return NextResponse.json({ error: starsError.message }, { status: 500 })
    }
    
    const totalStars = starsData?.reduce((sum, log) => sum + (log.stars_earned || 0), 0) || 0
    const totalSetoran = starsData?.length || 0
    
    // Get detail setoran
    const { data: setoran, error: setoranError } = await supabase
      .from('progress_logs')
      .select(`
        *,
        teacher:profiles!teacher_id(full_name)
      `)
      .eq('student_id', studentId)
      .gte('created_at', `${month}-01`)
      .lte('created_at', `${month}-31`)
      .order('created_at', { ascending: false })
    
    if (setoranError) {
      return NextResponse.json({ error: setoranError.message }, { status: 500 })
    }
    
    return NextResponse.json({ 
      totalStars,
      totalSetoran,
      setoran
    })
    
  } catch (error) {
    console.error('Error fetching stars:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
