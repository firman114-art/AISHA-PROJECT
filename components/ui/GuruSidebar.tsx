'use client'

import Sidebar from './Sidebar'
import { LayoutDashboard, BookOpen, GraduationCap, UserCheck, FileText } from 'lucide-react'

const guruNavItems = [
  { href: '/guru/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/guru/absensi', label: 'Absensi Siswa', icon: UserCheck },
  { href: '/guru/jurnal', label: 'Jurnal Guru', icon: FileText },
  { href: '/guru/dashboard/siswa', label: 'Data Siswa', icon: GraduationCap },
  { href: '/guru/setoran', label: 'Input Setoran', icon: BookOpen },
]

export default function GuruSidebar({ userName }: { userName: string }) {
  return <Sidebar items={guruNavItems} userRole="guru" userName={userName} />
}
