'use client'

import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, GraduationCap } from 'lucide-react'

// Mock data guru (Wali Kelas)
const mockGuru = [
  { id: 1, nama: 'Ust. Abdullah', email: 'abdullah@alihsan.sch.id', no_hp: '08123456789', jumlah_murid: 25 },
  { id: 2, nama: 'Ust. Ahmad', email: 'ahmad@alihsan.sch.id', no_hp: '08123456790', jumlah_murid: 30 },
  { id: 3, nama: 'Ustz. Fatimah', email: 'fatimah@alihsan.sch.id', no_hp: '08123456791', jumlah_murid: 28 },
  { id: 4, nama: 'Ust. Muhammad', email: 'muhammad@alihsan.sch.id', no_hp: '08123456792', jumlah_murid: 22 },
]

export default function ManajemenGuruPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredGuru = mockGuru.filter(guru =>
    guru.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guru.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manajemen Guru</h2>
          <p className="text-slate-600">Kelola data tenaga pengajar</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md"
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No. HP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Murid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredGuru.map((guru) => (
                <tr key={guru.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-red-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{guru.nama}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{guru.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{guru.no_hp}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{guru.jumlah_murid} murid</td>
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
    </div>
  )
}
