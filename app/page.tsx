'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, BookOpen, GraduationCap, Users, Phone, Mail, MapPin, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

// Mock data untuk pencarian murid
const mockMuridData = [
  { id: '1', nama: 'Ahmad Fauzi', kelas: 'Kelas 1', nis: '2024001', total_hafalan: 5, total_jilid: 2 },
  { id: '2', nama: 'Muhammad Rizky', kelas: 'Kelas 2', nis: '2024002', total_hafalan: 8, total_jilid: 3 },
  { id: '3', nama: 'Fatimah Azzahra', kelas: 'Kelas 1', nis: '2024003', total_hafalan: 3, total_jilid: 1 },
  { id: '4', nama: 'Aisyah Putri', kelas: 'Kelas 3', nis: '2024004', total_hafalan: 12, total_jilid: 4 },
  { id: '5', nama: 'Umar bin Khattab', kelas: 'Kelas 2', nis: '2024005', total_hafalan: 6, total_jilid: 2 },
  { id: '6', nama: 'Khalid Al-Walid', kelas: 'Kelas 1', nis: '2024006', total_hafalan: 4, total_jilid: 1 },
  { id: '7', nama: 'Siti Khadijah', kelas: 'Kelas 3', nis: '2024007', total_hafalan: 10, total_jilid: 3 },
  { id: '8', nama: 'Abu Bakar Ash-Shiddiq', kelas: 'Kelas 2', nis: '2024008', total_hafalan: 7, total_jilid: 2 },
]

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof mockMuridData>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockMuridData.filter(murid =>
        murid.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        murid.nis.includes(searchQuery)
      )
      setSearchResults(filtered)
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Assalamualaikum</h1>
                <p className="text-xs text-red-600">Pinrang</p>
              </div>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Masuk Admin/Guru
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-red-600 mb-2">
            AISHA
          </h1>
          <p className="text-lg text-slate-700 mb-2 font-medium">
            Al-Insan Student Hafidz Achievement
          </p>
          <p className="text-base text-slate-500 mb-8 max-w-2xl mx-auto">
            SDIT Al-Insan Pinrang
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-red-500" />
              <input
                type="text"
                placeholder="Cari Nama Siswa untuk Lihat Progres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 text-lg border-2 border-red-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all shadow-lg"
              />
            </div>

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-red-100 overflow-hidden z-50">
                {searchResults.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto">
                    {searchResults.map((murid) => (
                      <Link
                        key={murid.id}
                        href={`/murid/${murid.id}`}
                        className="flex items-center justify-between p-4 hover:bg-red-50 transition-colors border-b border-red-50 last:border-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{murid.nama}</p>
                            <p className="text-sm text-red-600">{murid.kelas} • NIS: {murid.nis}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                            {murid.total_hafalan} Surat
                          </span>
                          <ChevronRight className="w-5 h-5 text-red-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-red-600">
                    <p>Tidak ada siswa dengan nama atau NIS tersebut.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-red-100">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">150+</h3>
              <p className="text-red-600">Siswa Aktif</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-red-100">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">500+</h3>
              <p className="text-red-600">Setoran Hafalan</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-red-100">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">20+</h3>
              <p className="text-red-600">Tenaga Pengajar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Fitur Monitoring
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-red-50 rounded-xl">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">Setoran Hafalan</h4>
              <p className="text-slate-700">
                Catat dan pantau progress hafalan Al-Quran siswa dengan detail surat dan ayat.
              </p>
            </div>
            <div className="p-6 bg-red-50 rounded-xl">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">Tilawah Harian</h4>
              <p className="text-slate-700">
                Evaluasi bacaan Al-Quran siswa dengan sistem penilaian yang terstruktur.
              </p>
            </div>
            <div className="p-6 bg-red-50 rounded-xl">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">Jilid WAFA</h4>
              <p className="text-slate-700">
                Monitoring pembelajaran membaca Al-Quran melalui buku Jilid WAFA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-900 text-red-100 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-6 h-6" />
            <h4 className="text-lg font-semibold text-white">SDIT Al-Insan Pinrang</h4>
          </div>
          <p className="text-red-300 text-sm">
            Mencetak generasi Qurani yang berakhlak mulia dan berprestasi.
          </p>
        </div>
      </footer>
    </div>
  )
}
