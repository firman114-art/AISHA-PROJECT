'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ClipboardList, X } from 'lucide-react'
import { KATEGORI_JILID } from '../constants/jilid'

interface JilidDropdownProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export default function JilidDropdown({ value, onChange, required = false }: JilidDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedJilid = KATEGORI_JILID.find((j) => j.value === value)

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
        <ClipboardList className="w-4 h-4 mr-1.5 text-red-500" />
        Kategori Jilid
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
        <span className={selectedJilid ? 'font-medium text-gray-900' : 'text-gray-400'}>
          {selectedJilid ? selectedJilid.label : 'Pilih Kategori Jilid...'}
        </span>
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
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-64 overflow-hidden">
          <div className="p-2 border-b border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-500 font-medium px-2">Pilih salah satu kategori:</p>
          </div>
          <div className="overflow-y-auto max-h-56 p-2 space-y-1">
            {KATEGORI_JILID.map((jilid) => (
              <button
                key={jilid.value}
                type="button"
                onClick={() => {
                  onChange(jilid.value)
                  setIsOpen(false)
                }}
                className={`w-full px-3 py-2.5 rounded-lg text-left transition-colors flex items-center ${
                  value === jilid.value
                    ? 'bg-red-50 border-2 border-red-500 text-red-700'
                    : 'hover:bg-gray-50 border-2 border-transparent text-gray-700'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-3 ${
                    value === jilid.value ? 'bg-red-500' : 'bg-gray-300'
                  }`}
                />
                <span className="font-medium">{jilid.label}</span>
                {value === jilid.value && (
                  <svg
                    className="w-5 h-5 ml-auto text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
