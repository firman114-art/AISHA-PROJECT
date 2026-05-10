'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Edit2, Trash2, GraduationCap, X, Loader2 } from 'lucide-react'

interface Guru {
  id: string
  full_name: string
  email: string
  created_at: string
}

// Mock data guru
const MOCK_GURU: Guru[] = [
  {
    id: '1',
    full_name: 'Ustadz Ahmad',
    email: 'ahmad@alinsan.sch.id',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    full_name: 'Ustadzah Fatima',
    email: 'fatima@alinsan.sch.id',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    full_name: 'Ustadz Ibrahim',
    email: 'ibrahim@alinsan.sch.id',
    created_at: new Date().toISOString()
  }
]

// Get guru from localStorage or use mock
const getGuruList = (): Guru[] => {
  if (typeof window === 'undefined') return MOCK_GURU
  const stored = localStorage.getItem('aisha_guru_list')
  if (stored) {
    return JSON.parse(stored)
  }
  localStorage.setItem('aisha_guru_list', JSON.stringify(MOCK_GURU))
  return MOCK_GURU
}

// Save guru to localStorage
const saveGuruList = (guru: Guru[]) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('aisha_guru_list', JSON.stringify(guru))
}

export default function ManajemenGuruPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [guruList, setGuruList] = useState<Guru[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  })

  // Fetch guru data dari localStorage/mock
  useEffect(() => {
    const guru = getGuruList()
    setGuruList(guru)
    setLoading(false)
  }, [])

  const filteredGuru = guruList.filter(guru =>
    guru.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guru.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      // Simulasi API call - simpan ke localStorage
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newGuru: Guru = {
        id: Date.now().toString(),
        full_name: formData.fullName,
        email: formData.email,
        created_at: new Date().toISOString()
      }
      
      const updatedList = [...guruList, newGuru]
      saveGuruList(updatedList)
      setGuruList(updatedList)
      
      setMessage('✅ Guru berhasil ditambahkan!')
      setFormData({ email: '', password: '', fullName: '' })
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowAddModal(false)
        setMessage('')
      }, 2000)
    } catch (err) {
      setMessage('❌ Terjadi kesalahan. Coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manajemen Guru</h2>
          <p className="text-slate-600">Kelola data tenaga pengajar</p>
        </div>
        <button
          onClick={() => {
            console.log('Opening modal...')
            setShowAddModal(true)
          }}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md active:scale-95 transform"
          type="button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Guru
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Dibuat</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredGuru.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      Belum ada data guru. Klik "Tambah Guru" untuk menambahkan.
                    </td>
                  </tr>
                ) : (
                  filteredGuru.map((guru) => (
                    <tr key={guru.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-red-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-800">{guru.full_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{guru.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(guru.created_at).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Guru Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          style={{ zIndex: 9999 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddModal(false)
          }}
        >
          <div 
            className="bg-white rounded-xl shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Tambah Guru Baru</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {message}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Ustadz Ahmad"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="guru@alinsan.sch.id"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Minimal 6 karakter</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    'Simpan'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
