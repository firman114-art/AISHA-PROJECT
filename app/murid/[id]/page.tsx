'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Award, TrendingUp, Calendar, GraduationCap, ClipboardList } from 'lucide-react'

// Mock data untuk detail murid
const mockMuridDetail = {
  id: '1',
  nama: 'Ahmad Fauzi',
  nis: '2024001',
  kelas: 'Kelas 1',
  tahun_masuk: 2024,
  total_hafalan: 5,
  total_jilid: 2,
  progress_hafalan: [
    { surat: 'Al-Fatihah', ayat: '1-7', tanggal: '2024-01-10', status: 'sangat_bagus' },
    { surat: 'Al-Baqarah', ayat: '1-5', tanggal: '2024-01-15', status: 'bagus' },
    { surat: 'Al-Baqarah', ayat: '6-10', tanggal: '2024-01-20', status: 'lancar' },
    { surat: 'Al-Baqarah', ayat: '11-15', tanggal: '2024-01-25', status: 'bagus' },
    { surat: 'Al-Baqarah', ayat: '16-20', tanggal: '2024-01-30', status: 'sangat_bagus' },
  ],
  progress_tilawah: [
    { surat: 'An-Naba', nilai: 85, tanggal: '2024-01-12' },
    { surat: 'An-Naziat', nilai: 88, tanggal: '2024-01-19' },
    { surat: 'Abasa', nilai: 90, tanggal: '2024-01-26' },
  ],
  progress_jilid: [
    { jilid: 1, halaman: '1-20', status: 'lancar', tanggal: '2024-01-05' },
    { jilid: 2, halaman: '1-15', status: 'bagus', tanggal: '2024-01-28' },
  ]
}

export default function MuridProfilePage() {
  const params = useParams()
  const murid = mockMuridDetail

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Pencarian
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
              <GraduationCap className="w-12 h-12 text-red-600" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-2">{murid.nama}</h1>
              <p className="text-red-100 mb-4">NIS: {murid.nis} • {murid.kelas}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                  Tahun Masuk: {murid.tahun_masuk}
                </span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                  {murid.total_hafalan} Surat Dihafal
                </span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                  Jilid {murid.total_jilid}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Hafalan</h3>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-red-600">{murid.total_hafalan}</p>
            <p className="text-sm text-gray-600">Surat telah dihafal</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Tilawah</h3>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-purple-600">{murid.progress_tilawah.length}</p>
            <p className="text-sm text-gray-600">Surat telah dinilai</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Jilid</h3>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-orange-600">Jilid {murid.total_jilid}</p>
            <p className="text-sm text-gray-600">Progress jilid</p>
          </div>
        </div>

        {/* Detail Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hafalan Detail */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-red-50">
              <h3 className="text-lg font-semibold text-red-800 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Progress Hafalan
              </h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {murid.progress_hafalan.map((item, index) => (
                <div key={index} className="p-4 border-b border-gray-100 last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-medium text-gray-800">{item.surat}</p>
                      <p className="text-sm text-gray-600">Ayat {item.ayat}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'sangat_bagus' ? 'bg-red-100 text-red-700' :
                      item.status === 'bagus' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {item.tanggal}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tilawah Detail */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-purple-50">
              <h3 className="text-lg font-semibold text-purple-800 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Progress Tilawah
              </h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {murid.progress_tilawah.map((item, index) => (
                <div key={index} className="p-4 border-b border-gray-100 last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-medium text-gray-800">{item.surat}</p>
                      <p className="text-sm text-gray-600">Nilai: {item.nilai}/100</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-600">{item.nilai}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {item.tanggal}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Jilid Detail */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-orange-50">
              <h3 className="text-lg font-semibold text-orange-800 flex items-center">
                <ClipboardList className="w-5 h-5 mr-2" />
                Progress Jilid
              </h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {murid.progress_jilid.map((item, index) => (
                <div key={index} className="p-4 border-b border-gray-100 last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-medium text-gray-800">Jilid {item.jilid}</p>
                      <p className="text-sm text-gray-600">Halaman {item.halaman}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'lancar' ? 'bg-green-100 text-green-700' :
                      item.status === 'bagus' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {item.tanggal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-900 text-red-100 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm font-medium">© 2024 SDIT Al-Insan Pinrang - AISHA</p>
        </div>
      </footer>
    </div>
  )
}
