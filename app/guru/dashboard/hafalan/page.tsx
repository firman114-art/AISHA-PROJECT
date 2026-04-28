'use client'

import { useState } from 'react'
import { Plus, Search, BookOpen, Calendar } from 'lucide-react'

// Mock data
const mockMurid = [
  { id: 1, nama: 'Ahmad Fauzi', kelas: 'Kelas 1' },
  { id: 2, nama: 'Fatimah Azzahra', kelas: 'Kelas 1' },
  { id: 3, nama: 'Muhammad Rizky', kelas: 'Kelas 2' },
  { id: 4, nama: 'Aisyah Putri', kelas: 'Kelas 3' },
]

const daftarSurat = [
  'Al-Fatihah', 'Al-Baqarah', 'Ali Imran', 'An-Nisa', 'Al-Maidah',
  'Al-Anam', 'Al-Araf', 'Al-Anfal', 'At-Taubah', 'Yunus',
  'Hud', 'Yusuf', 'Ar-Rad', 'Ibrahim', 'Al-Hijr',
  'An-Nahl', 'Al-Isra', 'Al-Kahf', 'Maryam', 'Ta-Ha',
]

export default function SetoranHafalanPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedMurid, setSelectedMurid] = useState<number | null>(null)

  const filteredMurid = mockMurid.filter(murid =>
    murid.nama.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Setoran Hafalan</h2>
          <p className="text-slate-600">Input setoran hafalan siswa</p>
        </div>
      </div>

      {/* Form Input */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Siswa</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="">Pilih siswa...</option>
              {mockMurid.map((murid) => (
                <option key={murid.id} value={murid.id}>{murid.nama}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Surat</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="">Pilih surat...</option>
              {daftarSurat.map((surat) => (
                <option key={surat} value={surat}>{surat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ayat</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Dari"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Sampai"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="">Pilih status...</option>
              <option value="mengulang">Mengulang</option>
              <option value="lancar">Lancar</option>
              <option value="bagus">Bagus</option>
              <option value="sangat_bagus">Sangat Bagus</option>
            </select>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Catatan</label>
            <input
              type="text"
              placeholder="Tambahkan catatan (opsional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center font-medium shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Simpan Setoran
            </button>
          </div>
        </form>
      </div>

      {/* Riwayat Setoran */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-slate-900">Riwayat Setoran Hari Ini</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Siswa</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Surat</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ayat</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-800">Ahmad Fauzi</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Al-Baqarah</td>
                  <td className="px-4 py-3 text-sm text-gray-600">1 - 5</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Sangat Bagus</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">08:30</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-800">Aisyah Putri</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Ali Imran</td>
                  <td className="px-4 py-3 text-sm text-gray-600">1 - 10</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Bagus</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">09:15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
