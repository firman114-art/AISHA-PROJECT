'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, GraduationCap, BookOpen, School, UserPlus, Settings } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase-browser'

interface Stats {
  totalMurid: number
  totalGuru: number
  totalSetoran: number
  totalKelas: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalMurid: 0,
    totalGuru: 0,
    totalSetoran: 0,
    totalKelas: 0,
  })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const supabase = createBrowserClient()
    
    async function fetchStats() {
      try {
        // Count murid
        const { count: muridCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'murid')

        // Count guru
        const { count: guruCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'guru')

        // Count setoran
        const { count: setoranCount } = await supabase
          .from('progress_logs')
          .select('*', { count: 'exact', head: true })

        // Count kelas
        const { count: kelasCount } = await supabase
          .from('classes')
          .select('*', { count: 'exact', head: true })

        setStats({
          totalMurid: muridCount || 0,
          totalGuru: guruCount || 0,
          totalSetoran: setoranCount || 0,
          totalKelas: kelasCount || 0,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

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
      {/* Welcome */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Selamat Datang, Admin!</h2>
        <p className="text-red-100">
          Pantau dan kelola data siswa, guru, dan setoran dengan mudah.
        </p>
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
