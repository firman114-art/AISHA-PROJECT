'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, GraduationCap, BookOpen, School, UserPlus, Settings } from 'lucide-react'
import { getCurrentUser, simpleLogout, hasRole } from '@/lib/simple-auth'
import { useRouter } from 'next/navigation'

interface Stats {
  totalMurid: number
  totalGuru: number
  totalSetoran: number
  totalKelas: number
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(getCurrentUser())
  
  // Proteksi route - redirect kalau bukan admin
  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push('/login')
      return
    }
    if (!hasRole('admin')) {
      router.push('/')
      return
    }
    setUser(currentUser)
  }, [router])

  // Mock stats (tanpa Supabase)
  const [stats, setStats] = useState<Stats>({
    totalMurid: 24,
    totalGuru: 3,
    totalSetoran: 156,
    totalKelas: 4,
  })
  const [loading, setLoading] = useState(false)

  const handleLogout = () => {
    simpleLogout()
    router.push('/login')
  }

  const menuCards = [
    {
      title: 'Kelola Guru',
      description: 'Tambah, edit, dan hapus data guru',
      icon: GraduationCap,
      href: '/admin/dashboard/guru',
      color: 'bg-purple-500',
    },
    {
      title: 'Kelola Kelas',
      description: 'Buat kelas dan assign guru',
      icon: School,
      href: '/admin/dashboard/kelas',
      color: 'bg-blue-500',
    },
    {
      title: 'Kelola Murid',
      description: 'Tambah murid ke kelas',
      icon: Users,
      href: '/admin/dashboard/murid',
      color: 'bg-green-500',
    },
    {
      title: 'Tambah User',
      description: 'Buat akun guru atau murid baru',
      icon: UserPlus,
      href: '/admin/dashboard/pengaturan',
      color: 'bg-orange-500',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header dengan Logout */}
      <div className="flex justify-between items-center">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg flex-1 mr-4">
          <h2 className="text-2xl font-bold mb-2">Selamat Datang, {user?.full_name || 'Admin'}!</h2>
          <p className="text-red-100">
            Pantau dan kelola data siswa, guru, dan setoran dengan mudah.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
        >
          Logout
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Murid</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalMurid}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Guru</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalGuru}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Setoran</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalSetoran}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Kelas</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalKelas}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <School className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Menu Admin</h3>
          <p className="text-sm text-gray-600 mt-1">Kelola guru, kelas, dan murid</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuCards.map((menu) => {
              const Icon = menu.icon
              return (
                <Link
                  key={menu.title}
                  href={menu.href}
                  className="flex items-center p-4 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors group"
                >
                  <div className={`w-12 h-12 ${menu.color} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                      {menu.title}
                    </h4>
                    <p className="text-sm text-gray-600">{menu.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
