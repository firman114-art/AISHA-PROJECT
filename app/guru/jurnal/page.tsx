'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@/lib/supabase-browser'
import { FileText, Save, Loader2, CheckCircle, School, Calendar, ClipboardList, BookOpen } from 'lucide-react'
import { DAFTAR_KELAS, Kelas } from '@/lib/constants/kelas-siswa'

export default function JurnalPage() {
  const today = new Date().toISOString().split('T')[0]
  const supabase = createBrowserClient()

  const [kelasList, setKelasList] = useState<Kelas[]>(DAFTAR_KELAS as unknown as Kelas[])
  
  const [formData, setFormData] = useState({
    kelas_id: '',
    tanggal: today,
    agenda_materi: '',
    catatan_kejadian: '',
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Ambil guru_id dari session (mock)
      const guru_id = '550e8400-e29b-41d4-a716-446655440002'

      const dataToInsert = {
        kelas_id: formData.kelas_id,
        guru_id,
        tanggal: formData.tanggal,
        agenda_materi: formData.agenda_materi,
        catatan_kejadian: formData.catatan_kejadian || null,
      }

      const { error: insertError } = await supabase
        .from('teacher_journals')
        .insert(dataToInsert)

      if (insertError) {
        console.error('Supabase error:', insertError)
        throw new Error(insertError.message)
      }

      setSuccess(true)
      // Reset form
      setFormData({
        kelas_id: '',
        tanggal: today,
        agenda_materi: '',
        catatan_kejadian: '',
      })

      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan jurnal')
    } finally {
      setLoading(false)
    }
  }

  const selectedKelas = kelasList.find(k => k.id === formData.kelas_id)

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center">
          <FileText className="w-7 h-7 mr-2 text-red-600" />
          Assalamualaikum, Ust. Abdullah
        </h1>
        <p className="mt-1 text-slate-600">Catat agenda dan kejadian di kelas SDIT Al-Insan Pinrang</p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
          <CheckCircle className="w-5 h-5 mr-2" />
          Jurnal berhasil disimpan!
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Red accent bar */}
        <div className="h-1.5 bg-red-600"></div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Pilih Kelas & Tanggal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <School className="w-4 h-4 mr-1 text-red-500" />
                Pilih Kelas <span className="text-red-500">*</span>
              </label>
              <select
                name="kelas_id"
                value={formData.kelas_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                <option value="">-- Pilih Kelas --</option>
                {kelasList.map((kelas) => (
                  <option key={kelas.id} value={kelas.id}>
                    {kelas.nama}
                  </option>
                ))}
              </select>
              {selectedKelas && (
                <p className="text-xs text-gray-500 mt-1">
                  Jenjang: {selectedKelas.jenjang}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-red-500" />
                Tanggal <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Agenda Materi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <BookOpen className="w-4 h-4 mr-1 text-red-500" />
              Agenda Materi Hari Ini <span className="text-red-500">*</span>
            </label>
            <textarea
              name="agenda_materi"
              value={formData.agenda_materi}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              placeholder="Contoh: Hafalan Juz 30 (Surah An-Naba - An-Nas), Pembelajaran Tajwid (Idgham Bighunnah)..."
            />
          </div>

          {/* Catatan Kejadian */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <ClipboardList className="w-4 h-4 mr-1 text-red-500" />
              Catatan Kejadian di Kelas (Opsional)
            </label>
            <textarea
              name="catatan_kejadian"
              value={formData.catatan_kejadian}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              placeholder="Contoh: Beberapa siswa kurang fokus saat hafalan, perlu perhatian khusus pada makhraj huruf ع dan ح..."
            />
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
                  <Save className="w-5 h-5 mr-2" />
                  Simpan Jurnal
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Info Card */}
      <div className="mt-6 bg-red-50 rounded-lg p-4 border border-red-100">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
          <FileText className="w-4 h-4 mr-1.5 text-red-600" />
          Informasi Jurnal Guru
        </h4>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Isi agenda materi dengan rinci untuk dokumentasi pembelajaran</li>
          <li>Catatan kejadian membantu evaluasi dan tindak lanjut</li>
          <li>Jurnal tersimpan aman di sistem AISHA</li>
        </ul>
      </div>
    </div>
  )
}
