'use client'

import { useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  Award, 
  Calendar,
  BookOpen,
  BarChart3,
  ChevronUp,
  ChevronDown
} from 'lucide-react'

// Mock data untuk laporan
const mockStats = {
  totalSetoranHariIni: 45,
  totalSiswaMumtaz: 28,
  persentaseKehadiran: 94,
  totalSiswa: 150,
  perbandinganKemarin: +12
}

const mockRankingKelas = [
  { kelas: 'Kelas 6 A', totalSetoran: 156, jumlahSiswa: 25 },
  { kelas: 'Kelas 5 B', totalSetoran: 142, jumlahSiswa: 24 },
  { kelas: 'Kelas 6 B', totalSetoran: 138, jumlahSiswa: 24 },
  { kelas: 'Kelas 5 A', totalSetoran: 135, jumlahSiswa: 25 },
  { kelas: 'Kelas 4 A', totalSetoran: 128, jumlahSiswa: 26 },
  { kelas: 'Kelas 4 B', totalSetoran: 122, jumlahSiswa: 25 },
]

const mockPredikatStats = [
  { predikat: 'Mumtaz', jumlah: 28, color: 'bg-green-500', width: '28%' },
  { predikat: 'Jayyid Jiddan', jumlah: 42, color: 'bg-blue-500', width: '42%' },
  { predikat: 'Jayyid', jumlah: 56, color: 'bg-yellow-500', width: '56%' },
  { predikat: 'Maqbul', jumlah: 18, color: 'bg-orange-500', width: '18%' },
  { predikat: 'Dhaif', jumlah: 6, color: 'bg-red-500', width: '6%' },
]

export default function LaporanPage() {
  const [periode, setPeriode] = useState('hari-ini')

  return (
    <div className="space-y-6">
      {/* Header dengan Sapaan */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Assalamualaikum, Admin</h1>
            <p className="text-red-100 mt-1">Ringkasan Laporan SDIT Al-Insan Pinrang</p>
          </div>
          <BarChart3 className="w-12 h-12 text-red-200" />
        </div>
      </div>

      {/* Filter Periode */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-red-600" />
          <select 
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="hari-ini">Hari Ini</option>
            <option value="minggu-ini">Minggu Ini</option>
            <option value="bulan-ini">Bulan Ini</option>
            <option value="semester">Semester Ini</option>
          </select>
        </div>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Setoran */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-red-600" />
            </div>
            <div className={`flex items-center text-sm font-medium ${mockStats.perbandinganKemarin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {mockStats.perbandinganKemarin >= 0 ? (
                <ChevronUp className="w-4 h-4 mr-1" />
              ) : (
                <ChevronDown className="w-4 h-4 mr-1" />
              )}
              {Math.abs(mockStats.perbandinganKemarin)}%
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-900">{mockStats.totalSetoranHariIni}</h3>
          <p className="text-gray-500 text-sm mt-1">Total Setoran Hari Ini</p>
        </div>

        {/* Siswa Mumtaz */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">
              {Math.round((mockStats.totalSiswaMumtaz / mockStats.totalSiswa) * 100)}%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900">{mockStats.totalSiswaMumtaz}</h3>
          <p className="text-gray-500 text-sm mt-1">Siswa Predikat Mumtaz</p>
        </div>

        {/* Persentase Kehadiran */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-blue-600 font-medium">
              {mockStats.totalSiswa} Siswa
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-900">{mockStats.persentaseKehadiran}%</h3>
          <p className="text-gray-500 text-sm mt-1">Persentase Kehadiran</p>
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${mockStats.persentaseKehadiran}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grafik Predikat & Peringkat Kelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribusi Predikat */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
            Distribusi Predikat Siswa
          </h3>
          <div className="space-y-4">
            {mockPredikatStats.map((item) => (
              <div key={item.predikat} className="flex items-center">
                <span className="w-28 text-sm text-gray-600">{item.predikat}</span>
                <div className="flex-1 mx-3">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
                <span className="w-10 text-sm font-medium text-gray-800 text-right">
                  {item.jumlah}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Peringkat Kelas */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-red-600" />
            Peringkat Kelas (Setoran Terbanyak)
          </h3>
          <div className="space-y-3">
            {mockRankingKelas.map((kelas, index) => (
              <div key={kelas.kelas} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index < 3 ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium text-gray-800">{kelas.kelas}</p>
                  <p className="text-sm text-gray-500">{kelas.jumlahSiswa} Siswa</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">{kelas.totalSetoran}</p>
                  <p className="text-xs text-gray-500">Setoran</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
