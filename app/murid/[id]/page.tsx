'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Calendar, 
  GraduationCap, 
  ClipboardList, 
  Star,
  Sparkles,
  Info
} from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase-browser'

// Mapping predikat ke nilai bintang
const PREDIKAT_BINTANG: Record<string, number> = {
  mumtaz: 3,
  jayyid_jiddan: 2,
  jayyid: 1,
  maqbul: 0,
  dhaif: 0,
}

const PREDIKAT_LABELS: Record<string, string> = {
  mumtaz: 'Mumtaz',
  jayyid_jiddan: 'Jayyid Jiddan',
  jayyid: 'Jayyid',
  maqbul: 'Maqbul',
  dhaif: 'Dha\'if',
}

const PREDIKAT_COLORS: Record<string, string> = {
  mumtaz: 'bg-green-100 text-green-700 border-green-200',
  jayyid_jiddan: 'bg-blue-100 text-blue-700 border-blue-200',
  jayyid: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  maqbul: 'bg-orange-100 text-orange-700 border-orange-200',
  dhaif: 'bg-red-100 text-red-700 border-red-200',
}

interface ProgressLog {
  id: string
  murid_id: string
  jenis_setoran: string
  juz?: string
  surat?: string
  ayat_start?: string
  ayat_end?: string
  jilid?: string
  jilid_kategori?: string
  halaman?: string
  predikat: string
  tanggal: string
  created_at: string
}

interface MuridData {
  id: string
  nama: string
  nis: string
  kelas: string
}

export default function MuridProfilePage() {
  const params = useParams()
  const supabase = createBrowserClient()
  const muridId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [murid, setMurid] = useState<MuridData | null>(null)
  const [bintangBulanIni, setBintangBulanIni] = useState(0)
  const [setoranBulanIni, setSetoranBulanIni] = useState<ProgressLog[]>([])
  const [totalSetoran, setTotalSetoran] = useState(0)

  useEffect(() => {
    const fetchMuridData = async () => {
      setLoading(true)
      
      try {
        // Hitung tanggal awal dan akhir bulan ini
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString()

        // Ambil data murid dari DAFTAR_SISWA (mock) atau Supabase
        const { DAFTAR_SISWA } = await import('@/lib/constants/kelas-siswa')
        const muridData = DAFTAR_SISWA.find(s => s.id === muridId)
        
        if (muridData) {
          setMurid({
            id: muridData.id,
            nama: muridData.nama,
            nis: muridData.nis,
            kelas: muridData.kelasId
          })
        }

        // Ambil semua progress logs untuk total setoran
        const { data: allProgressData } = await supabase
          .from('progress_logs')
          .select('*')
          .eq('murid_id', muridId)

        // Ambil progress logs bulan ini untuk bintang
        const { data: monthlyProgressData } = await supabase
          .from('progress_logs')
          .select('*')
          .eq('murid_id', muridId)
          .gte('created_at', startOfMonth)
          .lte('created_at', endOfMonth)
          .order('created_at', { ascending: false })

        if (allProgressData) {
          setTotalSetoran(allProgressData.length)
        }

        if (monthlyProgressData) {
          setSetoranBulanIni(monthlyProgressData)
          
          // Hitung total bintang
          const totalBintang = monthlyProgressData.reduce((total: number, progress: ProgressLog) => {
            return total + (PREDIKAT_BINTANG[progress.predikat] || 0)
          }, 0)
          setBintangBulanIni(totalBintang)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMuridData()
  }, [muridId, supabase])

  const getMotivasiText = (bintang: number) => {
    if (bintang >= 20) return "🌟 Luar Biasa! Kamu sudah mengumpulkan 20+ bintang!"
    if (bintang >= 15) return "⭐ Masya Allah! Terus pertahankan prestasimu!"
    if (bintang >= 10) return "✨ Hebat! Semangat kumpulkan lebih banyak bintang!"
    if (bintang >= 5) return "💪 Bagus! Ayo kejar target bintangmu!"
    if (bintang > 0) return "🌙 Mulai yang baik! Kumpulkan bintang dengan setoran Mumtaz!"
    return "🎯 Yuk mulai setoran pertamamu bulan ini!"
  }

  const formatCapaian = (progress: ProgressLog) => {
    switch (progress.jenis_setoran) {
      case 'hafalan':
        return progress.juz 
          ? `Juz ${progress.juz} (${progress.surat || '-'})`
          : `${progress.surat || '-'}: ${progress.ayat_start || '-'} - ${progress.ayat_end || '-'}`
      case 'tilawah':
        return `Tilawah: ${progress.surat || '-'}`
      case 'jilid':
        return `Jilid ${progress.jilid || '-'} (${progress.jilid_kategori || '-'})`
      default:
        return progress.surat || '-'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data siswa...</p>
        </div>
      </div>
    )
  }

  if (!murid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Siswa tidak ditemukan</p>
          <Link href="/" className="text-red-600 hover:underline mt-2 inline-block">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  const isSuperStar = bintangBulanIni > 20

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Sapaan & Card Bintang Prestasi */}
        <div className={`rounded-2xl p-6 md:p-8 text-white mb-6 shadow-xl relative overflow-hidden ${
          isSuperStar 
            ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 border-4 border-yellow-300' 
            : 'bg-gradient-to-r from-red-600 to-red-700'
        }`}>
          {/* Efek confetti untuk superstar */}
          {isSuperStar && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-4 left-4 text-2xl animate-bounce">🎉</div>
              <div className="absolute top-8 right-8 text-xl animate-pulse">✨</div>
              <div className="absolute bottom-4 left-12 text-lg animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</div>
              <div className="absolute top-12 left-1/3 text-xl animate-pulse" style={{ animationDelay: '0.3s' }}>🌟</div>
              <div className="absolute bottom-8 right-12 text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎊</div>
            </div>
          )}
          
          <div className="relative z-10">
            {/* Sapaan */}
            <div className="mb-6">
              <h2 className={`text-lg font-medium mb-1 ${isSuperStar ? 'text-yellow-900' : 'text-red-100'}`}>
                Assalamualaikum,
              </h2>
              <h1 className={`text-2xl md:text-3xl font-bold ${isSuperStar ? 'text-yellow-900' : 'text-white'}`}>
                {murid.nama}
              </h1>
              <p className={`mt-1 ${isSuperStar ? 'text-yellow-800' : 'text-red-100'}`}>
                NIS: {murid.nis} • {murid.kelas}
              </p>
            </div>

            {/* Card Bintang Bulan Ini */}
            <div className={`rounded-xl p-4 md:p-6 ${
              isSuperStar 
                ? 'bg-white/90 shadow-lg' 
                : 'bg-white/10 backdrop-blur-sm'
            }`}>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                {/* Icon Bintang Besar */}
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg ${
                  isSuperStar 
                    ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 animate-pulse' 
                    : 'bg-gradient-to-br from-yellow-400 to-yellow-500'
                }`}>
                  <Star className="w-10 h-10 md:w-12 md:h-12 text-yellow-900 fill-current" />
                  {isSuperStar && <Sparkles className="w-6 h-6 text-yellow-600 absolute -top-1 -right-1" />}
                </div>

                {/* Info Bintang */}
                <div className="text-center md:text-left flex-1">
                  <p className={`text-sm font-medium mb-1 ${isSuperStar ? 'text-gray-600' : 'text-red-100'}`}>
                    Capaian Bintang Bulan Ini
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className={`text-4xl md:text-5xl font-bold ${isSuperStar ? 'text-yellow-700' : 'text-white'}`}>
                      {bintangBulanIni}
                    </span>
                    <span className={`text-lg ${isSuperStar ? 'text-yellow-600' : 'text-red-200'}`}>★</span>
                  </div>
                  <p className={`text-sm mt-2 font-medium ${isSuperStar ? 'text-yellow-700' : 'text-red-100'}`}>
                    {getMotivasiText(bintangBulanIni)}
                  </p>
                </div>

                {/* Info tambahan */}
                <div className={`text-center md:text-right px-4 py-2 rounded-lg ${
                  isSuperStar ? 'bg-yellow-100' : 'bg-white/10'
                }`}>
                  <p className={`text-xs ${isSuperStar ? 'text-gray-600' : 'text-red-100'}`}>
                    Setoran Bulan Ini
                  </p>
                  <p className={`text-xl font-bold ${isSuperStar ? 'text-yellow-700' : 'text-white'}`}>
                    {setoranBulanIni.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Keterangan Sistem */}
            <div className={`mt-4 flex items-center justify-center md:justify-start text-xs ${
              isSuperStar ? 'text-yellow-800' : 'text-red-200'
            }`}>
              <Info className="w-3 h-3 mr-1" />
              Reset otomatis tiap awal bulan • Mumtaz: 3★ | Jayyid Jiddan: 2★ | Jayyid: 1★
            </div>
          </div>
        </div>

        {/* Tabel Riwayat Setoran Bulan Ini */}
        {setoranBulanIni.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-red-600" />
                Riwayat Setoran Bulan Ini
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Detail setoran yang menghasilkan bintang bulan ini
              </p>
            </div>
            
            {/* Tabel Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Jenis</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Capaian</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Predikat</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Bintang</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {setoranBulanIni.map((setoran) => (
                    <tr key={setoran.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(setoran.tanggal).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="capitalize px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {setoran.jenis_setoran}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {formatCapaian(setoran)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                          PREDIKAT_COLORS[setoran.predikat] || 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}>
                          {PREDIKAT_LABELS[setoran.predikat] || setoran.predikat}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="inline-flex items-center px-2 py-1 bg-yellow-50 rounded-lg">
                          <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                          <span className="text-sm font-medium text-yellow-700">
                            +{PREDIKAT_BINTANG[setoran.predikat] || 0}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* List Mobile */}
            <div className="md:hidden divide-y divide-gray-100">
              {setoranBulanIni.map((setoran) => (
                <div key={setoran.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-500">
                      {new Date(setoran.tanggal).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      PREDIKAT_COLORS[setoran.predikat] || 'bg-gray-100 text-gray-700'
                    }`}>
                      {PREDIKAT_LABELS[setoran.predikat] || setoran.predikat}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800">{formatCapaian(setoran)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500 capitalize">{setoran.jenis_setoran}</span>
                    <div className="flex items-center text-yellow-600">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      <span className="text-sm font-medium">+{PREDIKAT_BINTANG[setoran.predikat] || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Total Setoran</h3>
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-red-600">{totalSetoran}</p>
            <p className="text-xs text-gray-500">Sepanjang waktu</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Setoran Bulan Ini</h3>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-blue-600">{setoranBulanIni.length}</p>
            <p className="text-xs text-gray-500">{new Date().toLocaleDateString('id-ID', { month: 'long' })}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 col-span-2 md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Panduan Bintang</h3>
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Mumtaz: <span className="font-semibold text-yellow-600">3★</span> | 
                 Jayyid Jiddan: <span className="font-semibold text-yellow-600">2★</span> | 
                 Jayyid: <span className="font-semibold text-yellow-600">1★</span></p>
              <p className="text-gray-400">Maqbul & Dha&apos;if: 0★</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-900 text-red-100 py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm font-medium">© 2024 SDIT Al-Insan Pinrang - AISHA</p>
          <p className="text-xs text-red-300 mt-1">Mencetak generasi Qurani yang berakhlak mulia</p>
        </div>
      </footer>
    </div>
  )
}
