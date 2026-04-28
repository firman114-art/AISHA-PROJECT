'use client'

import { Bell, Search, Menu } from 'lucide-react'

interface HeaderProps {
  title: string
  onMenuClick?: () => void
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
          />
        </div>
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  )
}
