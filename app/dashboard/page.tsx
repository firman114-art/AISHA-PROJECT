import { BookOpen, Users, GraduationCap, Award } from 'lucide-react'
import Link from 'next/link'

const quickLinks = [
  { href: '/admin/dashboard', label: 'Admin Dashboard', icon: GraduationCap, color: 'bg-red-600', desc: 'Manajemen data' },
  { href: '/guru/dashboard', label: 'Guru Dashboard', icon: BookOpen, color: 'bg-blue-600', desc: 'Input setoran' },
  { href: '/', label: 'Cari Siswa', icon: Users, color: 'bg-green-600', desc: 'Lihat progres' },
]

export default function MainDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-red-600 mb-2">AISHA</h1>
          <p className="text-lg text-slate-700">Al-Insan Student Hafidz Achievement</p>
          <p className="text-slate-500">SDIT Al-Insan Pinrang</p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all text-center"
              >
                <div className={`w-14 h-14 ${link.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{link.label}</h3>
                <p className="text-sm text-slate-600">{link.desc}</p>
              </Link>
            )
          })}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-12">
          © 2024 SDIT Al-Insan Pinrang - AISHA
        </p>
      </div>
    </div>
  )
}
