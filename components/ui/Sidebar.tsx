'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, GraduationCap, LogOut, LayoutDashboard, UserPlus } from 'lucide-react'
import clsx from 'clsx'

interface SidebarItem {
  href: string
  label: string
  icon: React.ElementType
}

interface SidebarProps {
  items: SidebarItem[]
  userRole: 'admin' | 'guru'
  userName: string
}

export default function Sidebar({ items, userRole, userName }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-red-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-red-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/IMG_5195.jpg" 
              alt="SDIT Al-Insan Logo" 
              className="object-contain max-w-full max-h-full"
            />
          </div>
          <div>
            <h1 className="font-bold text-lg">AISHA</h1>
            <p className="text-xs text-red-200 capitalize">{userRole} Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-red-700 text-white shadow-md'
                      : 'text-red-100 hover:bg-red-800'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-red-800">
        <div className="flex items-center space-x-3 mb-4 px-4">
          <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-red-200 capitalize">{userRole}</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-3 text-red-100 hover:bg-red-800 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Keluar</span>
        </Link>
      </div>
    </aside>
  )
}
