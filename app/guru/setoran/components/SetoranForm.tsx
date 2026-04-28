'use client'

import { useState, useMemo } from 'react'
import { createBrowserClient } from '@/lib/supabase-browser'
import { Loader2, Save, Calendar, Hash, FileText } from 'lucide-react'

import SearchableDropdown from './SearchableDropdown'
import PredikatDropdown from './PredikatDropdown'
import SurahDropdown from './SurahDropdown'
import JilidDropdown from './JilidDropdown'

import { DAFTAR_KELAS, DAFTAR_SISWA } from '../constants/data'
import { SISTEM_PREDIKAT } from '../constants/predikat'

type JenisSetoran = 'hafalan' | 'tilawah' | 'jilid'

export default function SetoranForm() {
  const today = new Date().toISOString().split('T')[0]
  const supabase = createBrowserClient()

  // Form state
  const [formData, setFormData] = useState({
    kelasId: '',
    siswaId: '',
    jenisSetoran: 'hafalan' as JenisSetoran,
    surah: '',
    ayatDari: '',
    ayatSampai: '',
    jilid: '',
    halamanAyat: '',
    predikat: 'jayyid',
    tanggal: today,
    catatan: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Filter siswa berdasarkan kelas yang dipilih
  const siswaFiltered = useMemo(() => {
    if (!formData.kelasId) return []
    return DAFTAR_SISWA.filter((s) => s.kelasId === formData.kelasId)
  }, [formData.kelasId])

  // Format options untuk dropdown
  const kelasOptions = DAFTAR_KELAS.map((k) => ({
    value: k.id,
    label: k.nama,
  }))

  const siswaOptions = siswaFiltered.map((s) => ({
    value: s.id,
    label: s.nama,
    subtitle: DAFTAR_KELAS.find((k) => k.id === s.kelasId)?.nama,
  }))

  // Handle kelas change - reset siswa
  const handleKelasChange = (kelasId: string) => {
    setFormData((prev) => ({
      ...prev,
      kelasId,
      siswaId: '', // Reset siswa saat kelas berubah
    }))
  }

  // Handle jenis setoran change
  const handleJenisChange = (jenis: JenisSetoran) => {
    setFormData((prev) => ({
      ...prev,
      jenisSetoran: jenis,
      // Reset field yang tidak relevan
      surah: jenis === 'jilid' ? prev.surah : '',
      ayatDari: jenis === 'jilid' ? prev.ayatDari : '',
      ayatSampai: jenis === 'jilid' ? prev.ayatSampai : '',
      jilid: jenis !== 'jilid' ? prev.jilid : '',
    }))
  }

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Validasi
      if (!formData.siswaId || !formData.kelasId) {
        throw new Error('Kelas dan siswa harus dipilih')
      }

      // Cari label lengkap untuk predikat dan jilid
      const predikatLabel =
        SISTEM_PREDIKAT.find((p) => p.value === formData.predikat)?.label || formData.predikat

      // Data untuk Supabase
      const dataToInsert = {
        murid_id: formData.siswaId,
        class_id: formData.kelasId,
        guru_id: 'mock-guru-id', // TODO: Ganti dengan user session
        jenis_setoran: formData.jenisSetoran,
        tanggal: formData.tanggal,
        status: predikatLabel,
        catatan: formData.catatan || null,

        // Kondisional fields
        ...(formData.jenisSetoran === 'hafalan' || formData.jenisSetoran === 'tilawah'
          ? {
              surat: formData.surah,
              ayat_start: formData.ayatDari ? parseInt(formData.ayatDari) : null,
              ayat_end: formData.ayatSampai ? parseInt(formData.ayatSampai) : null,
              halaman: formData.halamanAyat || null,
            }
          : {}),

        ...(formData.jenisSetoran === 'jilid'
          ? {
              jilid_kategori: formData.jilid,
              halaman: formData.halamanAyat || null,
            }
          : {}),
      }

      // Insert ke Supabase
      const { error: insertError } = await supabase.from('progress_logs').insert(dataToInsert)

      if (insertError) {
        console.error('Supabase error:', insertError)
        throw new Error(insertError.message)
      }

      // Success
      setSuccess(true)

      // Reset form (kecuali kelas dan tanggal untuk kemudahan input berikutnya)
      setFormData((prev) => ({
        ...prev,
        siswaId: '',
        surah: '',
        ayatDari: '',
        ayatSampai: '',
        jilid: '',
        halamanAyat: '',
        predikat: 'jayyid',
        catatan: '',
      }))

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-green-800">Setoran berhasil disimpan!</h4>
            <p className="text-sm text-green-600 mt-1">
              Data setoran telah tercatat dalam sistem AISHA.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-red-800">Gagal menyimpan</h4>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* STEP 1: Pilih Kelas */}
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
        <div className="flex items-center mb-4">
          <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm mr-3">
            1
          </span>
          <h3 className="font-semibold text-gray-900">Pilih Kelas</h3>
        </div>

        <SearchableDropdown
          label="Kelas"
          placeholder="Pilih kelas..."
          value={formData.kelasId}
          onChange={handleKelasChange}
          options={kelasOptions}
          required
        />
      </div>

      {/* STEP 2: Pilih Siswa (muncul setelah kelas dipilih) */}
      {formData.kelasId && (
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center mb-4">
            <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm mr-3">
              2
            </span>
            <h3 className="font-semibold text-gray-900">Pilih Siswa</h3>
            <span className="ml-2 text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
              {siswaOptions.length} siswa
            </span>
          </div>

          <SearchableDropdown
            label="Nama Siswa"
            placeholder="Cari dan pilih siswa..."
            value={formData.siswaId}
            onChange={(value) => setFormData((prev) => ({ ...prev, siswaId: value }))}
            options={siswaOptions}
            required
          />
        </div>
      )}

      {/* STEP 3: Detail Setoran (muncul setelah siswa dipilih) */}
      {formData.siswaId && (
        <div className="bg-white rounded-xl p-5 border-2 border-red-100 shadow-sm animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center mb-5">
            <span className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm mr-3">
              3
            </span>
            <h3 className="font-semibold text-gray-900">Detail Setoran</h3>
          </div>

          <div className="space-y-5">
            {/* Tanggal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5 text-red-500" />
                  Tanggal Setoran
                </label>
                <input
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tanggal: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
                  required
                />
              </div>

              {/* Jenis Setoran Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Jenis Setoran
                </label>
                <div className="flex rounded-lg bg-gray-100 p-1">
                  {(['hafalan', 'tilawah', 'jilid'] as JenisSetoran[]).map((jenis) => (
                    <button
                      key={jenis}
                      type="button"
                      onClick={() => handleJenisChange(jenis)}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                        formData.jenisSetoran === jenis
                          ? 'bg-red-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {jenis.charAt(0).toUpperCase() + jenis.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Fields berdasarkan jenis setoran */}
            {formData.jenisSetoran === 'hafalan' && (
              <div className="space-y-4">
                <SurahDropdown
                  value={formData.surah}
                  onChange={(value) => setFormData((prev) => ({ ...prev, surah: value }))}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
                      <Hash className="w-4 h-4 mr-1.5 text-red-500" />
                      Ayat Dari
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.ayatDari}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, ayatDari: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      placeholder="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
                      <Hash className="w-4 h-4 mr-1.5 text-red-500" />
                      Ayat Sampai
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.ayatSampai}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, ayatSampai: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      placeholder="7"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.jenisSetoran === 'tilawah' && (
              <div className="space-y-4">
                <SurahDropdown
                  value={formData.surah}
                  onChange={(value) => setFormData((prev) => ({ ...prev, surah: value }))}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
                      <Hash className="w-4 h-4 mr-1.5 text-red-500" />
                      Ayat Dari
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.ayatDari}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, ayatDari: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      placeholder="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
                      <Hash className="w-4 h-4 mr-1.5 text-red-500" />
                      Ayat Sampai
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.ayatSampai}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, ayatSampai: e.target.value }))
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      placeholder="7"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.jenisSetoran === 'jilid' && (
              <JilidDropdown
                value={formData.jilid}
                onChange={(value) => setFormData((prev) => ({ ...prev, jilid: value }))}
                required
              />
            )}

            {/* Halaman/Ayat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
                <FileText className="w-4 h-4 mr-1.5 text-red-500" />
                {formData.jenisSetoran === 'jilid' ? 'Halaman' : 'Halaman (Opsional)'}
              </label>
              <input
                type="text"
                value={formData.halamanAyat}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, halamanAyat: e.target.value }))
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                placeholder={
                  formData.jenisSetoran === 'jilid'
                    ? 'Contoh: Hal. 12-15'
                    : 'Contoh: Hal. 45'
                }
                required={formData.jenisSetoran === 'jilid'}
              />
            </div>

            {/* Predikat */}
            <PredikatDropdown
              value={formData.predikat}
              onChange={(value) => setFormData((prev) => ({ ...prev, predikat: value }))}
              required
            />

            {/* Catatan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Catatan Guru (Opsional)
              </label>
              <textarea
                value={formData.catatan}
                onChange={(e) => setFormData((prev) => ({ ...prev, catatan: e.target.value }))}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 resize-none"
                placeholder="Tambahkan catatan evaluasi untuk siswa..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      {formData.siswaId && (
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Simpan Setoran
              </>
            )}
          </button>
        </div>
      )}
    </form>
  )
}
