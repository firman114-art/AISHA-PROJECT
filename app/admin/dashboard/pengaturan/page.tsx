'use client'

import { useState } from 'react'
import { 
  Settings, 
  School, 
  MapPin, 
  Phone, 
  Mail, 
  Save, 
  Upload,
  CheckCircle,
  Image as ImageIcon
} from 'lucide-react'

export default function PengaturanPage() {
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    namaSekolah: 'SDIT Al-Insan Pinrang',
    logoUrl: '/IMG_5195.jpg',
    alamat: 'Jl. Pendidikan No. 123, Pinrang, Sulawesi Selatan',
    telepon: '(0421) 123456',
    email: 'info@sdit-alinsan.sch.id',
    website: 'www.sdit-alinsan.sch.id'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulasi penyimpanan
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header dengan Sapaan */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Assalamualaikum, Admin</h1>
            <p className="text-red-100 mt-1">Pengaturan Sistem AISHA</p>
          </div>
          <Settings className="w-12 h-12 text-red-200" />
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center text-green-700">
          <CheckCircle className="w-5 h-5 mr-2" />
          Pengaturan berhasil disimpan!
        </div>
      )}

      {/* Form Pengaturan */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section: Informasi Sekolah */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-1 bg-red-600"></div>
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <School className="w-5 h-5 mr-2 text-red-600" />
              Informasi Sekolah
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Sekolah
                </label>
                <input
                  type="text"
                  name="namaSekolah"
                  value={formData.namaSekolah}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Sekolah
                </label>
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-gray-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={formData.logoUrl} 
                      alt="Logo Sekolah" 
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      name="logoUrl"
                      value={formData.logoUrl}
                      onChange={handleChange}
                      placeholder="URL Logo Sekolah"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
                    />
                    <p className="text-sm text-gray-500">
                      Masukkan URL logo atau upload file logo (JPG/PNG)
                    </p>
                    <button
                      type="button"
                      className="mt-2 inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      <Upload className="w-4 h-4 mr-1.5" />
                      Upload Logo Baru
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Kontak & Alamat */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-1 bg-red-600"></div>
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-600" />
              Kontak & Alamat (Tampilan Footer)
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat Lengkap
                </label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Phone className="w-4 h-4 mr-1 text-gray-400" />
                    Telepon
                  </label>
                  <input
                    type="text"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Mail className="w-4 h-4 mr-1 text-gray-400" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website Sekolah
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Simpan */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md"
          >
            <Save className="w-5 h-5 mr-2" />
            Simpan Pengaturan
          </button>
        </div>
      </form>
    </div>
  )
}
