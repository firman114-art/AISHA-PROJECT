'use client'

import { useState, useEffect, useMemo } from 'react'
import { createBrowserClient } from '@/lib/supabase-browser'
import { 
  Database, 
  Search, 
  GraduationCap, 
  BookOpen, 
  Award, 
  ChevronDown, 
  X,
  Calendar,
  User,
  AlertCircle,
  TrendingUp,
  FileText,
  History
} from 'lucide-react'
import { DAFTAR_KELAS, DAFTAR_SISWA, Siswa } from '@/lib/constants/kelas-siswa'

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
  err_kelancaran: number
  err_fashoah: number
  err_tajwid: number
  catatan?: string
  tanggal: string
  created_at: string
}

interface SiswaWithProgress extends Siswa {
  lastProgress?: ProgressLog
  totalSetoran?: number
  kelasNama?: string
  jenjang?: string
}

const PREDIKAT_COLORS: Record<string, string> = {
  mumtaz: 'bg-green-100 text-green-700 border-green-200',
  jayyid_jiddan: 'bg-blue-100 text-blue-700 border-blue-200',
  jayyid: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  maqbul: 'bg-orange-100 text-orange-700 border-orange-200',
  dhaif: 'bg-red-100 text-red-700 border-red-200',
}

const PREDIKAT_LABELS: Record<string, string> = {
  mumtaz: 'Mumtaz',
  jayyid_jiddan: 'Jayyid Jiddan',
  jayyid: 'Jayyid',
  maqbul: 'Maqbul',
  dhaif: 'Dha\'if',
}

export default function DataSiswaPage() {
  const supabase = createBrowserClient()
  
  const [siswaList, setSiswaList] = useState<SiswaWithProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedKelas, setSelectedKelas] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSiswa, setSelectedSiswa] = useState<SiswaWithProgress | null>(null)
  const [riwayatSetoran, setRiwayatSetoran] = useState<ProgressLog[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingRiwayat, setLoadingRiwayat] = useState(false)

  // Fetch siswa dengan progress terakhir
  useEffect(() => {
    const fetchSiswaData = async () => {
      setLoading(true)
      
      try {
        // Ambil semua progress_logs untuk mendapatkan data terakhir
        const { data: progressData, error: progressError } = await supabase
          .from('progress_logs')
          .select('*')
          .order('tanggal', { ascending: false })

        if (progressError) {
          console.error('Error fetching progress:', progressError)
        }

        // Create kelas lookup map with string keys
        const kelasMap = new Map<string, typeof DAFTAR_KELAS[number]>(
          DAFTAR_KELAS.map(k => [k.id as string, k])
        )

        // Gabungkan data siswa dengan progress
        const siswaWithProgress: SiswaWithProgress[] = DAFTAR_SISWA.map((siswa: Siswa) => {
          const siswaProgress = progressData?.filter((p: ProgressLog) => p.murid_id === siswa.id) || []
          const lastProgress = siswaProgress[0]
          const kelasInfo = kelasMap.get(siswa.kelasId as string)
          
          return {
            ...siswa,
            lastProgress,
            totalSetoran: siswaProgress.length,
            kelasNama: kelasInfo?.nama || siswa.kelasId,
            jenjang: kelasInfo?.jenjang || '-'
          }
        })

        setSiswaList(siswaWithProgress)
      } catch (err) {
        console.error('Error:', err)
        // Fallback ke data mock jika error
        setSiswaList(DAFTAR_SISWA.map((s: Siswa) => ({ ...s, totalSetoran: 0 })))
      } finally {
        setLoading(false)
      }
    }

    fetchSiswaData()
  }, [supabase])

  // Filter siswa berdasarkan kelas dan search
  const filteredSiswa = useMemo(() => {
    return siswaList.filter((siswa) => {
      const matchKelas = selectedKelas ? siswa.kelasId === selectedKelas : true
      const matchSearch = searchQuery 
        ? siswa.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          siswa.nis.toLowerCase().includes(searchQuery.toLowerCase())
        : true
      return matchKelas && matchSearch
    })
  }, [siswaList, selectedKelas, searchQuery])

  // Fetch riwayat setoran untuk modal
  const handleLihatBukuSaku = async (siswa: SiswaWithProgress) => {
    setSelectedSiswa(siswa)
    setModalOpen(true)
    setLoadingRiwayat(true)

    try {
      const { data, error } = await supabase
        .from('progress_logs')
        .select('*')
        .eq('murid_id', siswa.id)
        .order('tanggal', { ascending: false })

      if (error) {
        console.error('Error fetching riwayat:', error)
        setRiwayatSetoran([])
      } else {
        setRiwayatSetoran(data || [])
      }
    } catch (err) {
      console.error('Error:', err)
      setRiwayatSetoran([])
    } finally {
      setLoadingRiwayat(false)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedSiswa(null)
    setRiwayatSetoran([])
  }

  const formatCapaian = (progress?: ProgressLog) => {
    if (!progress) return '-'
    
    switch (progress.jenis_setoran) {
      case 'hafalan':
        return progress.juz 
          ? `Juz ${progress.juz} (${progress.surat || '-'})`
          : `${progress.surat || '-'}: ${progress.ayat_start || '-'} - ${progress.ayat_end || '-'}`
      case 'tilawah':
        return `Tilawah: ${progress.surat || '-'}: ${progress.ayat_start || '-'} - ${progress.ayat_end || '-'}`
      case 'jilid':
        return `Jilid ${progress.jilid || '-'} (${progress.jilid_kategori || '-'})${progress.halaman ? ` - Hal. ${progress.halaman}` : ''}`
      default:
        return '-'
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center">
          <Database className="w-7 h-7 mr-2 text-red-600" />
          Database Prestasi Siswa SDIT Al-Insan Pinrang
        </h1>
        <p className="mt-1 text-slate-600">Pantau perkembangan hafalan dan setoran santri</p>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filter Kelas */}
          <div className="sm:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <GraduationCap className="w-4 h-4 mr-1 text-red-500" />
              Filter Kelas
            </label>
            <div className="relative">
              <select
                value={selectedKelas}
                onChange={(e) => setSelectedKelas(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white appearance-none"
              >
                <option value="">Semua Kelas</option>
                {DAFTAR_KELAS.map((kelas) => (
                  <option key={kelas.id} value={kelas.id}>
                    {kelas.nama}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Search className="w-4 h-4 mr-1 text-red-500" />
              Cari Siswa
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan nama atau NIS..."
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Stats */}
          <div className="sm:w-auto flex items-end">
            <div className="bg-red-50 rounded-lg px-4 py-2 border border-red-100">
              <span className="text-2xl font-bold text-red-700">{filteredSiswa.length}</span>
              <span className="text-sm text-red-600 ml-1">siswa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-1 bg-red-600"></div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">Memuat data siswa...</p>
            </div>
          ) : filteredSiswa.length === 0 ? (
            <div className="p-8 text-center">
              <User className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Tidak ada siswa yang ditemukan</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-12">No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Siswa</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kelas</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center">
                      <BookOpen className="w-3 h-3 mr-1" />
                      Capaian Terakhir
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center justify-center">
                      <Award className="w-3 h-3 mr-1" />
                      Predikat
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredSiswa.map((siswa, index) => (
                  <tr key={siswa.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-sm text-gray-500">{index + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <span className="text-sm font-semibold text-red-700">
                            {siswa.nama.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{siswa.nama}</div>
                          <div className="text-xs text-gray-500">NIS: {siswa.nis}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {siswa.kelasNama}
                      </span>
                      <div className="text-xs text-gray-500 mt-0.5">Jenjang: {siswa.jenjang}</div>
                    </td>
                    <td className="px-4 py-4">
                      {siswa.lastProgress ? (
                        <div>
                          <div className="text-sm text-gray-900">{formatCapaian(siswa.lastProgress)}</div>
                          <div className="text-xs text-gray-500 flex items-center mt-0.5">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(siswa.lastProgress.tanggal).toLocaleDateString('id-ID')}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {siswa.lastProgress ? (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                          PREDIKAT_COLORS[siswa.lastProgress.predikat] || 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}>
                          {PREDIKAT_LABELS[siswa.lastProgress.predikat] || siswa.lastProgress.predikat}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleLihatBukuSaku(siswa)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                      >
                        <History className="w-4 h-4 mr-1.5" />
                        Lihat Buku Saku
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Buku Saku */}
      {modalOpen && selectedSiswa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-red-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center">
                <FileText className="w-6 h-6 text-white mr-2" />
                <div>
                  <h2 className="text-xl font-bold text-white">Buku Saku - {selectedSiswa.nama}</h2>
                  <p className="text-red-100 text-sm">{selectedSiswa.kelasNama} | NIS: {selectedSiswa.nis}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:bg-red-700 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-6">
              {loadingRiwayat ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500">Memuat riwayat setoran...</p>
                </div>
              ) : riwayatSetoran.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Belum ada riwayat setoran</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {riwayatSetoran.map((setoran) => (
                    <div key={setoran.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      {/* Header Setoran */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border mr-3 ${
                            PREDIKAT_COLORS[setoran.predikat] || 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}>
                            {PREDIKAT_LABELS[setoran.predikat] || setoran.predikat}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1" />
                            {new Date(setoran.tanggal).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full capitalize">
                          {setoran.jenis_setoran}
                        </span>
                      </div>

                      {/* Detail Setoran */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">Capaian</p>
                          <p className="text-sm font-medium text-gray-900">{formatCapaian(setoran)}</p>
                        </div>
                        
                        {setoran.catatan && (
                          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                            <p className="text-xs text-yellow-600 mb-1 flex items-center">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Catatan Guru
                            </p>
                            <p className="text-sm text-gray-800">{setoran.catatan}</p>
                          </div>
                        )}
                      </div>

                      {/* Error Counter */}
                      <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                        <span className="text-xs font-medium text-gray-500 flex items-center">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          Kesalahan:
                        </span>
                        <div className="flex gap-3">
                          <span className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded-full">
                            Kelancaran: {setoran.err_kelancaran || 0}
                          </span>
                          <span className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded-full">
                            Fashoah: {setoran.err_fashoah || 0}
                          </span>
                          <span className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded-full">
                            Tajwid: {setoran.err_tajwid || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center bg-gray-50 flex-shrink-0">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 mr-1.5 text-red-600" />
                Total Setoran: <span className="font-semibold text-gray-900 ml-1">{riwayatSetoran.length}</span>
              </div>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
