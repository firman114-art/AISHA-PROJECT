'use client'

import { useState, useEffect, useMemo } from 'react'
import { createBrowserClient } from '@/lib/supabase-browser'
import { Plus, Loader2, CheckCircle, AlertCircle, Search, Calendar, BookOpen, GraduationCap, ClipboardList, School, Users, ChevronDown } from 'lucide-react'
import { DAFTAR_SURAH } from '@/lib/constants/surah'
import { DAFTAR_KELAS, DAFTAR_SISWA, Kelas, Siswa } from '@/lib/constants/kelas-siswa'
import { JUZ_MAPPING, getDaftarJuz, SurahInJuz } from '@/lib/constants/juz'

// Kategori Jilid sesuai ketentuan
const KATEGORI_JILID = [
  { value: 'jilid_1', label: 'Jilid 1' },
  { value: 'jilid_2', label: 'Jilid 2' },
  { value: 'jilid_3', label: 'Jilid 3' },
  { value: 'jilid_4', label: 'Jilid 4' },
  { value: 'jilid_5', label: 'Jilid 5' },
  { value: 'ghorib', label: 'Ghorib' },
  { value: 'tajwid', label: 'Tajwid' },
] as const

// Sistem Predikat sesuai ketentuan
const SISTEM_PREDIKAT = [
  { value: 'mumtaz', label: 'Mumtaz (Istimewa)', shortLabel: 'Mumtaz', description: 'Istimewa', color: 'bg-red-600' },
  { value: 'jayyid_jiddan', label: 'Jayyid Jiddan (Sangat Baik)', shortLabel: 'Jayyid Jiddan', description: 'Sangat Baik', color: 'bg-red-500' },
  { value: 'jayyid', label: 'Jayyid (Baik)', shortLabel: 'Jayyid', description: 'Baik', color: 'bg-red-400' },
  { value: 'maqbul', label: 'Maqbul (Cukup)', shortLabel: 'Maqbul', description: 'Cukup', color: 'bg-gray-500' },
] as const

type JenisSetoran = 'hafalan' | 'tilawah' | 'jilid'

interface SetoranFormData {
  kelas_id: string
  murid_id: string
  jenis_setoran: JenisSetoran
  juz: string
  surat: string
  ayat_start: string
  ayat_end: string
  jilid_kategori: string
  halaman_ayat: string
  predikat: string
  err_kelancaran: number
  err_fashoah: number
  err_tajwid: number
  tanggal_setoran: string
  catatan_guru: string
}

export default function SetoranForm() {
  const today = new Date().toISOString().split('T')[0]
  const supabase = createBrowserClient()
  
  const [formData, setFormData] = useState<SetoranFormData>({
    kelas_id: '',
    murid_id: '',
    jenis_setoran: 'hafalan',
    juz: '',
    surat: '',
    ayat_start: '',
    ayat_end: '',
    jilid_kategori: 'jilid_1',
    halaman_ayat: '',
    predikat: 'jayyid',
    err_kelancaran: 0,
    err_fashoah: 0,
    err_tajwid: 0,
    tanggal_setoran: today,
    catatan_guru: '',
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [searchSiswa, setSearchSiswa] = useState('')
  const [showKelasDropdown, setShowKelasDropdown] = useState(false)
  const [showSiswaDropdown, setShowSiswaDropdown] = useState(false)
  const [kelasList, setKelasList] = useState<Kelas[]>(DAFTAR_KELAS as unknown as Kelas[])
  const [siswaList, setSiswaList] = useState<Siswa[]>([])
  const [fetchingKelas, setFetchingKelas] = useState(false)
  const [fetchingSiswa, setFetchingSiswa] = useState(false)

  // Fetch kelas dari Supabase saat mount
  useEffect(() => {
    async function fetchKelas() {
      setFetchingKelas(true)
      try {
        const { data, error } = await supabase
          .from('classes')
          .select('*')
          .order('nama', { ascending: true })
        
        if (error) {
          console.warn('Using mock data for classes:', error.message)
          setKelasList(DAFTAR_KELAS as unknown as Kelas[])
        } else if (data && data.length > 0) {
          setKelasList(data)
        } else {
          setKelasList(DAFTAR_KELAS as unknown as Kelas[])
        }
      } catch (err) {
        setKelasList(DAFTAR_KELAS as unknown as Kelas[])
      } finally {
        setFetchingKelas(false)
      }
    }
    
    fetchKelas()
  }, [])

  // Fetch siswa ketika kelas dipilih
  useEffect(() => {
    if (!formData.kelas_id) {
      setSiswaList([])
      return
    }
    
    // Filter dari mock data
    const filtered = DAFTAR_SISWA.filter(s => s.kelasId === formData.kelas_id)
    setSiswaList(filtered as unknown as Siswa[])
  }, [formData.kelas_id])

  // Filter siswa berdasarkan pencarian
  const filteredSiswa = useMemo(() => {
    if (!searchSiswa) return siswaList
    return siswaList.filter((s: Siswa) => 
      s.nama.toLowerCase().includes(searchSiswa.toLowerCase())
    )
  }, [searchSiswa, siswaList])

  // Get selected labels
  const selectedKelas = useMemo(() => kelasList.find(k => k.id === formData.kelas_id), [formData.kelas_id, kelasList])
  const selectedSiswa = useMemo(() => siswaList.find(s => s.id === formData.murid_id), [formData.murid_id, siswaList])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const supabase = createBrowserClient()
      
      // TODO: Ganti dengan auth user id yang sebenarnya
      const guru_id = 'mock-guru-id' // Nanti diganti dengan session user id
      
      // Cari label predikat dan jilid untuk disimpan sebagai teks
      const predikatLabel = SISTEM_PREDIKAT.find((p: typeof SISTEM_PREDIKAT[number]) => p.value === formData.predikat)?.label || formData.predikat
      const jilidLabel = KATEGORI_JILID.find((j: typeof KATEGORI_JILID[number]) => j.value === formData.jilid_kategori)?.label || formData.jilid_kategori
      
      const dataToInsert = {
        murid_id: formData.murid_id,
        guru_id,
        jenis_setoran: formData.jenis_setoran,
        // Simpan nilai predikat dan jilid sebagai teks lengkap
        status: predikatLabel,
        jilid_kategori: formData.jenis_setoran === 'jilid' ? jilidLabel : null,
        catatan: formData.catatan_guru || null,
        tanggal: formData.tanggal_setoran,
        // Counter Kesalahan (selalu disimpan untuk semua jenis setoran)
        err_kelancaran: formData.err_kelancaran,
        err_fashoah: formData.err_fashoah,
        err_tajwid: formData.err_tajwid,
        // Field kondisional berdasarkan jenis setoran
        ...(formData.jenis_setoran === 'hafalan' || formData.jenis_setoran === 'tilawah' ? {
          juz: formData.juz ? parseInt(formData.juz) : null,
          surat: formData.surat || null,
          ayat_start: formData.ayat_start ? parseInt(formData.ayat_start) : null,
          ayat_end: formData.ayat_end ? parseInt(formData.ayat_end) : null,
          halaman_ayat: formData.halaman_ayat || null,
        } : {}),
        ...(formData.jenis_setoran === 'jilid' ? {
          halaman_ayat: formData.halaman_ayat || null,
        } : {}),
      }

      const { data, error: insertError } = await supabase
        .from('progress_logs')
        .insert(dataToInsert)
        .select()

      if (insertError) {
        console.error('Supabase error:', insertError)
        throw new Error(insertError.message)
      }

      setSuccess(true)
      // Reset form
      setFormData({
        kelas_id: '',
        murid_id: '',
        jenis_setoran: 'hafalan',
        juz: '',
        surat: '',
        ayat_start: '',
        ayat_end: '',
        jilid_kategori: 'jilid_1',
        halaman_ayat: '',
        predikat: 'jayyid',
        err_kelancaran: 0,
        err_fashoah: 0,
        err_tajwid: 0,
        tanggal_setoran: today,
        catatan_guru: '',
      })
      setSearchSiswa('')

      // Sembunyikan success message setelah 3 detik
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan data')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center">
          <Plus className="w-5 h-5 mr-2 text-red-600" />
          Input Setoran Baru
        </h3>
        <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Tema Merah-Putih AISHA
        </div>
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
          <CheckCircle className="w-5 h-5 mr-2" />
          Setoran berhasil disimpan!
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Step 1: Pilih Kelas */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-100">
          <div className="flex items-center mb-3">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold mr-2">1</span>
            <label className="text-sm font-semibold text-gray-800 flex items-center">
              <School className="w-4 h-4 mr-1.5 text-red-600" />
              Pilih Kelas <span className="text-red-500 ml-1">*</span>
            </label>
          </div>
          
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowKelasDropdown(!showKelasDropdown)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
            >
              <span className={selectedKelas ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                {selectedKelas ? selectedKelas.nama : 'Pilih kelas...'}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showKelasDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showKelasDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-auto">
                {kelasList.map((kelas) => (
                  <button
                    key={kelas.id}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, kelas_id: kelas.id, murid_id: '' }))
                      setShowKelasDropdown(false)
                      setSearchSiswa('')
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <span className="font-medium text-gray-800 block">{kelas.nama}</span>
                      <span className="text-xs text-gray-500">Jenjang {kelas.jenjang}</span>
                    </div>
                    {formData.kelas_id === kelas.id && (
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Pilih Siswa (muncul setelah kelas dipilih) */}
        {formData.kelas_id && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center mb-3">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold mr-2">2</span>
              <label className="text-sm font-semibold text-gray-800 flex items-center">
                <Users className="w-4 h-4 mr-1.5 text-red-600" />
                Pilih Siswa <span className="text-red-500 ml-1">*</span>
                <span className="ml-2 text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                  {siswaList.length} siswa
                </span>
              </label>
            </div>
            
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchSiswa}
                  onChange={(e) => {
                    setSearchSiswa(e.target.value)
                    setShowSiswaDropdown(true)
                    if (!e.target.value) setFormData(prev => ({ ...prev, murid_id: '' }))
                  }}
                  onFocus={() => setShowSiswaDropdown(true)}
                  placeholder="Ketik nama siswa..."
                  className="w-full px-3 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                {formData.murid_id && selectedSiswa && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                      ✓ {selectedSiswa.nama}
                    </span>
                  </div>
                )}
              </div>
              
              {showSiswaDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-auto">
                  {filteredSiswa.length > 0 ? (
                    filteredSiswa.map((siswa: Siswa) => (
                      <button
                        key={siswa.id}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, murid_id: siswa.id }))
                          setSearchSiswa(siswa.nama)
                          setShowSiswaDropdown(false)
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <span className="font-medium text-gray-800 block">{siswa.nama}</span>
                          <span className="text-xs text-gray-500">NIS: {siswa.nis}</span>
                        </div>
                        {formData.murid_id === siswa.id && (
                          <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">✓</span>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-sm text-gray-500 text-center">
                      <p>Tidak ditemukan siswa dengan nama &quot;{searchSiswa}&quot;</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Detail Setoran (muncul setelah siswa dipilih) */}
        {formData.murid_id && (
          <div className="space-y-5 border-t border-gray-200 pt-5 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center mb-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold mr-2">3</span>
              <h4 className="text-sm font-semibold text-gray-800">Detail Setoran</h4>
            </div>

            {/* Tanggal & Jenis Setoran */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-red-500" />
                  Tanggal Setoran <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggal_setoran"
                  value={formData.tanggal_setoran}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Setoran <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {(['hafalan', 'tilawah', 'jilid'] as JenisSetoran[]).map((jenis) => {
                    const Icon = jenis === 'hafalan' ? BookOpen : jenis === 'tilawah' ? GraduationCap : ClipboardList
                    return (
                      <button
                        key={jenis}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, jenis_setoran: jenis }))}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1 ${
                          formData.jenis_setoran === jenis
                            ? 'bg-red-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{jenis.charAt(0).toUpperCase() + jenis.slice(1)}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Smart Filter: Pilih Juz terlebih dahulu */}
            {(formData.jenis_setoran === 'hafalan' || formData.jenis_setoran === 'tilawah') && (
              <div className="space-y-4">
                {/* Dropdown Juz 1-30 */}
                <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-1.5 text-red-600" />
                    Pilih Juz (1-30) <span className="text-red-500 ml-1">*</span>
                    <span className="ml-2 text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                      Smart Filter
                    </span>
                  </label>
                  <select
                    name="juz"
                    value={formData.juz}
                    onChange={(e) => {
                      const juzValue = e.target.value
                      setFormData(prev => ({ 
                        ...prev, 
                        juz: juzValue,
                        surat: '', // Reset surat saat juz berubah
                        ayat_start: '',
                        ayat_end: ''
                      }))
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  >
                    <option value="">-- Pilih Juz --</option>
                    {getDaftarJuz().map((juz) => (
                      <option key={juz.nomor} value={juz.nomor.toString()}>
                        {juz.label} ({JUZ_MAPPING[juz.nomor]?.length || 0} Surah)
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.juz 
                      ? `Menampilkan surah yang ada di Juz ${formData.juz}` 
                      : 'Pilih Juz terlebih dahulu untuk memfilter daftar surah'}
                  </p>
                </div>

                {/* Dropdown Surah - Filtered by Juz */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Surah <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="surat"
                      value={formData.surat}
                      onChange={handleChange}
                      required
                      disabled={!formData.juz}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white ${
                        !formData.juz ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
                      }`}
                    >
                      <option value="">
                        {!formData.juz 
                          ? 'Pilih Juz terlebih dahulu...' 
                          : 'Pilih Surah...'}
                      </option>
                      {formData.juz && JUZ_MAPPING[parseInt(formData.juz)]?.map((surah: SurahInJuz) => (
                        <option key={surah.nomor} value={surah.nama}>
                          {surah.nomor}. {surah.nama} ({surah.arti}) - Ayat {surah.ayatDari}-{surah.ayatSampai}
                        </option>
                      ))}
                    </select>
                    {formData.juz && (
                      <p className="text-xs text-gray-500 mt-1">
                        {JUZ_MAPPING[parseInt(formData.juz)]?.length || 0} surah di Juz {formData.juz}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ayat Dari <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      name="ayat_start"
                      value={formData.ayat_start}
                      onChange={handleChange}
                      required
                      min="1"
                      disabled={!formData.surat}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        !formData.surat ? 'bg-gray-100 text-gray-400' : ''
                      }`}
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ayat Sampai <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      name="ayat_end"
                      value={formData.ayat_end}
                      onChange={handleChange}
                      required
                      min="1"
                      disabled={!formData.surat}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        !formData.surat ? 'bg-gray-100 text-gray-400' : ''
                      }`}
                      placeholder="7"
                    />
                  </div>
                </div>
              </div>
            )}

        {/* Fields untuk Jilid - Kategori Jilid Baru */}
        {formData.jenis_setoran === 'jilid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori Jilid <span className="text-red-500">*</span>
              </label>
              <select
                name="jilid_kategori"
                value={formData.jilid_kategori}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                {KATEGORI_JILID.map((jilid: typeof KATEGORI_JILID[number]) => (
                  <option key={jilid.value} value={jilid.value}>{jilid.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Halaman <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="halaman_ayat"
                value={formData.halaman_ayat}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Contoh: 12-15 atau Hal. 20-25"
              />
            </div>
          </div>
        )}

        {/* Halaman/Ayat untuk Hafalan & Tilawah */}
        {(formData.jenis_setoran === 'hafalan' || formData.jenis_setoran === 'tilawah') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Halaman (Opsional)</label>
            <input
              type="text"
              name="halaman_ayat"
              value={formData.halaman_ayat}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Contoh: Hal. 45"
            />
          </div>
        )}

        {/* Counter Kesalahan - 3 Kolom */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-100">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-800 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1.5 text-red-600" />
              Counter Kesalahan
            </label>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
              Total: {formData.err_kelancaran + formData.err_fashoah + formData.err_tajwid} kesalahan
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Kelancaran */}
            <div className="flex flex-col items-center bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <label className="text-xs font-medium text-gray-600 mb-2">Kelancaran</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    err_kelancaran: Math.max(0, prev.err_kelancaran - 1) 
                  }))}
                  className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg active:scale-95 transition-transform shadow-md hover:bg-red-700"
                  aria-label="Kurangi kelancaran"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold text-xl text-gray-800">
                  {formData.err_kelancaran}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    err_kelancaran: prev.err_kelancaran + 1 
                  }))}
                  className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg active:scale-95 transition-transform shadow-md hover:bg-red-700"
                  aria-label="Tambah kelancaran"
                >
                  +
                </button>
              </div>
            </div>

            {/* Fashoah */}
            <div className="flex flex-col items-center bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <label className="text-xs font-medium text-gray-600 mb-2">Fashoah</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    err_fashoah: Math.max(0, prev.err_fashoah - 1) 
                  }))}
                  className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg active:scale-95 transition-transform shadow-md hover:bg-red-700"
                  aria-label="Kurangi fashoah"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold text-xl text-gray-800">
                  {formData.err_fashoah}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    err_fashoah: prev.err_fashoah + 1 
                  }))}
                  className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg active:scale-95 transition-transform shadow-md hover:bg-red-700"
                  aria-label="Tambah fashoah"
                >
                  +
                </button>
              </div>
            </div>

            {/* Tajwid */}
            <div className="flex flex-col items-center bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <label className="text-xs font-medium text-gray-600 mb-2">Tajwid</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    err_tajwid: Math.max(0, prev.err_tajwid - 1) 
                  }))}
                  className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg active:scale-95 transition-transform shadow-md hover:bg-red-700"
                  aria-label="Kurangi tajwid"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold text-xl text-gray-800">
                  {formData.err_tajwid}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    err_tajwid: prev.err_tajwid + 1 
                  }))}
                  className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg active:scale-95 transition-transform shadow-md hover:bg-red-700"
                  aria-label="Tambah tajwid"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Saran Predikat Berdasarkan Kesalahan */}
          {(() => {
            const totalError = formData.err_kelancaran + formData.err_fashoah + formData.err_tajwid
            if (totalError > 5 && formData.predikat === 'mumtaz') {
              return (
                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-yellow-700">
                    <span className="font-semibold">Saran:</span> Total kesalahan ({totalError}) cukup banyak untuk predikat Mumtaz. Pertimbangkan predikat Jayyid Jiddan atau Jayyid.
                  </p>
                </div>
              )
            } else if (totalError > 10 && (formData.predikat === 'mumtaz' || formData.predikat === 'jayyid_jiddan')) {
              return (
                <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-orange-700">
                    <span className="font-semibold">Saran:</span> Total kesalahan ({totalError}) terlalu banyak. Predikat lebih sesuai: Jayyid atau Maqbul.
                  </p>
                </div>
              )
            }
            return null
          })()}
        </div>

        {/* Sistem Predikat Baru */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Predikat Penilaian <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {SISTEM_PREDIKAT.map((predikat: typeof SISTEM_PREDIKAT[number]) => (
              <button
                key={predikat.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, predikat: predikat.value }))}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all text-center ${
                  formData.predikat === predikat.value
                    ? `${predikat.color} text-white shadow-md ring-2 ring-red-300`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="font-bold">{predikat.shortLabel}</div>
                <div className="text-[10px] opacity-90">{predikat.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Catatan Guru */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <ClipboardList className="w-4 h-4 mr-1 text-red-500" />
            Catatan Guru (Evaluasi)
          </label>
          <textarea
            name="catatan_guru"
            value={formData.catatan_guru}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            placeholder="Tulis catatan evaluasi untuk siswa... (contoh: Perlu perbaikan di makhraj huruf ح, lancar di ayat 3-5)"
          />
          <p className="text-xs text-gray-500 mt-1">Catatan ini akan tampil di laporan progress siswa.</p>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Simpan Setoran
              </>
            )}
          </button>
        </div>
          </div>
        )}
      </form>
    </div>
  )
}
