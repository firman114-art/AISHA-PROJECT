'use client'

import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, MoreVertical, GraduationCap } from 'lucide-react'

// Mock data murid
const mockMurid = [
  { id: 1, nama: 'Ahmad Fauzi', nis: '2024001', kelas: 'Kelas 1', tahun_masuk: 2024, total_hafalan: 5, total_jilid: 2 },
  { id: 2, nama: 'Muhammad Rizky', nis: '2024002', kelas: 'Kelas 2', tahun_masuk: 2023, total_hafalan: 8, total_jilid: 3 },
  { id: 3, nama: 'Fatimah Azzahra', nis: '2024003', kelas: 'Kelas 1', tahun_masuk: 2024, total_hafalan: 3, total_jilid: 1 },
  { id: 4, nama: 'Aisyah Putri', nis: '2024004', kelas: 'Kelas 3', tahun_masuk: 2022, total_hafalan: 12, total_jilid: 4 },
  { id: 5, nama: 'Umar bin Khattab', nis: '2024005', kelas: 'Kelas 2', tahun_masuk: 2023, total_hafalan: 6, total_jilid: 2 },
]

export default function ManajemenMuridPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredMurid = mockMurid.filter(murid =>
    murid.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    murid.nis.includes(searchQuery)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manajemen Siswa</h2>
          <p className="text-slate-600">Kelola data siswa</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Siswa
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama atau NIS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tahun Masuk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hafalan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jilid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMurid.map((murid) => (
                <tr key={murid.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">{murid.nis}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{murid.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{murid.kelas}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{murid.tahun_masuk}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                      {murid.total_hafalan} Surat
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      Jilid {murid.total_jilid}
                    </span>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal - Simplified */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Tambah Siswa Baru</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIS</label>
                <input type="text" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                <select className="w-full px-3 py-2 border rounded-lg">
                  <option>Kelas 1</option>
                  <option>Kelas 2</option>
                  <option>Kelas 3</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
