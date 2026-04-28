'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, BookOpen, X } from 'lucide-react'
import { DAFTAR_SURAH } from '../constants/surah'

interface SurahDropdownProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export default function SurahDropdown({ value, onChange, required = false }: SurahDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  // Find selected surah
  const selectedSurah = DAFTAR_SURAH.find((s) => s.nama === value)

  // Filter surah based on search
  const filteredSurah = DAFTAR_SURAH.filter(
    (surah) =>
      surah.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.arti.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.nomor.toString().includes(searchTerm)
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
        <BookOpen className="w-4 h-4 mr-1.5 text-red-500" />
        Surah
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 border rounded-lg text-left flex items-center justify-between transition-all ${
          isOpen
            ? 'border-red-500 ring-2 ring-red-100 bg-white'
            : 'border-gray-300 hover:border-gray-400 bg-white'
        }`}
      >
        <div className="flex items-center">
          {selectedSurah ? (
            <>
              <span className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold mr-3">
                {selectedSurah.nomor}
              </span>
              <div>
                <span className="font-medium text-gray-900">{selectedSurah.nama}</span>
                <span className="text-xs text-gray-500 ml-2">({selectedSurah.arti})</span>
              </div>
            </>
          ) : (
            <span className="text-gray-400">Pilih Surah...</span>
          )}
        </div>
        <div className="flex items-center">
          {value && (
            <X
              className="w-4 h-4 text-gray-400 hover:text-red-500 mr-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onChange('')
              }}
            />
          )}
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-hidden">
          {/* Search header */}
          <div className="p-3 border-b border-gray-100 sticky top-0 bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Cari surah (nama, arti, atau nomor)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Menampilkan {filteredSurah.length} dari 114 surah
            </p>
          </div>

          {/* Surah list */}
          <div className="overflow-y-auto max-h-60">
            {filteredSurah.length > 0 ? (
              filteredSurah.map((surah) => (
                <button
                  key={surah.nomor}
                  type="button"
                  onClick={() => {
                    onChange(surah.nama)
                    setIsOpen(false)
                    setSearchTerm('')
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex items-center ${
                    value === surah.nama ? 'bg-red-50 border-l-4 border-red-600' : 'border-l-4 border-transparent'
                  }`}
                >
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                    {surah.nomor}
                  </span>
                  <div className="min-w-0">
                    <span className="font-medium text-gray-900 block">{surah.nama}</span>
                    <span className="text-xs text-gray-500">{surah.arti}</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-sm text-gray-500 text-center">
                <p>Surah tidak ditemukan</p>
                <p className="text-xs mt-1">Coba cari dengan kata kunci lain</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
