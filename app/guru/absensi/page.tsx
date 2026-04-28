'use client'

import { useState, useEffect, useMemo } from 'react'
import { createBrowserClient } from '@/lib/supabase-browser'
import { UserCheck, Users, Save, Loader2, CheckCircle, School, Calendar } from 'lucide-react'
import { DAFTAR_KELAS, DAFTAR_SISWA, Kelas, Siswa } from '@/lib/constants/kelas-siswa'

type StatusKehadiran = 'hadir' | 'sakit' | 'izin' | 'alpa'

interface AbsensiSiswa {
  siswa_id: string
  nama: string
  nis: string
  status: StatusKehadiran
}

const STATUS_OPTIONS: { value: StatusKehadiran; label: string; color: string; bgColor: string }[] = [
  { value: 'hadir', label: 'Hadir', color: 'text-green-700', bgColor: 'bg-green-100 border-green-300' },
  { value: 'sakit', label: 'Sakit', color: 'text-yellow-700', bgColor: 'bg-yellow-100 border-yellow-300' },
  { value: 'izin', label: 'Izin', color: 'text-blue-700', bgColor: 'bg-blue-100 border-blue-300' },
  { value: 'alpa', label: 'Alpa', color: 'text-red-700', bgColor: 'bg-red-100 border-red-300' },
]

export default function AbsensiPage() {
  const today = new Date().toISOString().split('T')[0]
  const supabase = createBrowserClient()

  const [kelasList, setKelasList] = useState<Kelas[]>(DAFTAR_KELAS as unknown as Kelas[])
  const [selectedKelas, setSelectedKelas] = useState<string>('')
  const [siswaList, setSiswaList] = useState<Siswa[]>([])
  const [absensiData, setAbsensiData] = useState<Record<string, StatusKehadiran>>({})
  const [tanggal, setTanggal] = useState<string>(today)
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [fetchingSiswa, setFetchingSiswa] = useState(false)

  // Filter siswa berdasarkan kelas yang dipilih
  const filteredSiswa = useMemo(() => {
    if (!selectedKelas) return []
    return siswaList.filter((s: Siswa) => s.kelasId === selectedKelas)
  }, [selectedKelas, siswaList])

  // Fetch siswa saat kelas dipilih
  useEffect(() => {
    if (!selectedKelas) {
      setSiswaList([])
      setAbsensiData({})
      return
    }

    setFetchingSiswa(true)
    // Filter dari mock data
    const filtered = DAFTAR_SISWA.filter(s => s.kelasId === selectedKelas)
    setSiswaList(filtered as unknown as Siswa[])
    
    // Initialize absensi dengan default 'hadir'
    const initialAbsensi: Record<string, StatusKehadiran> = {}
    filtered.forEach((s: Siswa) => {
      initialAbsensi[s.id] = 'hadir'
    })
    setAbsensiData(initialAbsensi)
    
    setFetchingSiswa(false)
  }, [selectedKelas])

  const handleStatusChange = (siswaId: string, status: StatusKehadiran) => {
    setAbsensiData(prev => ({
      ...prev,
      [siswaId]: status
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Ambil guru_id dari session (mock)
      const guru_id = '550e8400-e29b-41d4-a716-446655440002'

      // Siapkan data untuk insert
      const absensiRecords = Object.entries(absensiData).map(([siswa_id, status]) => ({
        kelas_id: selectedKelas,
        guru_id,
        siswa_id,
        tanggal,
        status,
      }))

      const { error: insertError } = await supabase
        .from('attendance')
        .insert(absensiRecords)

      if (insertError) {
        console.error('Supabase error:', insertError)
        throw new Error(insertError.message)
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan absensi')
    } finally {
      setLoading(false)
    }
  }

  const selectedKelasData = kelasList.find(k => k.id === selectedKelas)
  const totalSiswa = filteredSiswa.length
  const totalHadir = Object.values(absensiData).filter(s => s === 'hadir').length
  const totalSakit = Object.values(absensiData).filter(s => s === 'sakit').length
  const totalIzin = Object.values(absensiData).filter(s => s === 'izin').length
  const totalAlpa = Object.values(absensiData).filter(s => s === 'alpa').length

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center">
          <UserCheck className="w-7 h-7 mr-2 text-red-600" />
          Assalamualaikum, Ust. Abdullah
        </h1>
        <p className="mt-1 text-slate-600">Input absensi harian siswa SDIT Al-Insan Pinrang</p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
          <CheckCircle className="w-5 h-5 mr-2" />
          Absensi berhasil disimpan!
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Red accent bar */}
        <div className="h-1.5 bg-red-600"></div>

        <div className="p-6">
          {/* Step 1: Pilih Kelas & Tanggal */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold mr-2">1</span>
              <h3 className="text-sm font-semibold text-gray-800">Pilih Kelas & Tanggal</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <School className="w-4 h-4 mr-1 text-red-500" />
                  Kelas <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedKelas}
                  onChange={(e) => setSelectedKelas(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                >
                  <option value="">-- Pilih Kelas --</option>
                  {kelasList.map((kelas) => (
                    <option key={kelas.id} value={kelas.id}>
                      {kelas.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-red-500" />
                  Tanggal <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Daftar Siswa */}
          {selectedKelas && (
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center mb-4">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold mr-2">2</span>
                <h3 className="text-sm font-semibold text-gray-800">Input Absensi Siswa</h3>
                <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {totalSiswa} siswa
                </span>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="bg-green-50 rounded-lg p-2 text-center border border-green-200">
                  <div className="text-lg font-bold text-green-700">{totalHadir}</div>
                  <div className="text-xs text-green-600">Hadir</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-2 text-center border border-yellow-200">
                  <div className="text-lg font-bold text-yellow-700">{totalSakit}</div>
                  <div className="text-xs text-yellow-600">Sakit</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-2 text-center border border-blue-200">
                  <div className="text-lg font-bold text-blue-700">{totalIzin}</div>
                  <div className="text-xs text-blue-600">Izin</div>
                </div>
                <div className="bg-red-50 rounded-lg p-2 text-center border border-red-200">
                  <div className="text-lg font-bold text-red-700">{totalAlpa}</div>
                  <div className="text-xs text-red-600">Alpa</div>
                </div>
              </div>

              {/* Tabel Absensi */}
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-12">No</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Siswa</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NIS</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status Kehadiran</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredSiswa.map((siswa, index) => (
                      <tr key={siswa.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                              <span className="text-xs font-medium text-red-700">
                                {siswa.nama.charAt(0)}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{siswa.nama}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{siswa.nis}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-1">
                            {STATUS_OPTIONS.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleStatusChange(siswa.id, option.value)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                  absensiData[siswa.id] === option.value
                                    ? `${option.bgColor} ${option.color} border shadow-sm`
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Submit Button */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={handleSubmit}
                  disabled={loading || totalSiswa === 0}
                  className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Simpan Absensi
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!selectedKelas && (
            <div className="text-center py-12 border-t border-gray-200">
              <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Pilih kelas terlebih dahulu untuk melihat daftar siswa</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
