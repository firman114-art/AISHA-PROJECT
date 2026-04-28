'use client'

import Sidebar from './Sidebar'
import { LayoutDashboard, Users, GraduationCap, BookOpen, Settings } from 'lucide-react'

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/dashboard/guru', label: 'Manajemen Guru', icon: GraduationCap },
  { href: '/admin/dashboard/murid', label: 'Manajemen Siswa', icon: Users },
  { href: '/admin/dashboard/laporan', label: 'Laporan', icon: BookOpen },
  { href: '/admin/dashboard/pengaturan', label: 'Pengaturan', icon: Settings },
]

export default function AdminSidebar({ userName }: { userName: string }) {
  return <Sidebar items={adminNavItems} userRole="admin" userName={userName} />
}
