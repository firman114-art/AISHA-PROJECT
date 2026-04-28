'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, X } from 'lucide-react'

interface SearchableDropdownProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string, item?: any) => void
  options: { value: string; label: string; subtitle?: string }[]
  required?: boolean
  disabled?: boolean
  icon?: React.ReactNode
}

export default function SearchableDropdown({
  label,
  placeholder,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  icon,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Find selected option label
  const selectedOption = options.find((opt) => opt.value === value)

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Reset search when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('')
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
        {icon && <span className="mr-1.5 text-red-500">{icon}</span>}
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {/* Display selected value or search input */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-4 py-2.5 border rounded-lg text-left flex items-center justify-between transition-all ${
            disabled
              ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              : isOpen
              ? 'border-red-500 ring-2 ring-red-100 bg-white'
              : 'border-gray-300 hover:border-gray-400 bg-white'
          }`}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className="flex items-center">
            {value && (
              <X
                className="w-4 h-4 text-gray-400 hover:text-red-500 mr-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange('')
                  setSearchTerm('')
                }}
              />
            )}
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-72 overflow-hidden">
            {/* Search input in dropdown */}
            <div className="p-3 border-b border-gray-100 sticky top-0 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Cari..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Options list */}
            <div className="overflow-y-auto max-h-56">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value, option)
                      setIsOpen(false)
                      setSearchTerm('')
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-red-50 transition-colors flex flex-col ${
                      value === option.value ? 'bg-red-50 border-l-4 border-red-600' : ''
                    }`}
                  >
                    <span className="font-medium text-gray-900">{option.label}</span>
                    {option.subtitle && (
                      <span className="text-xs text-gray-500 mt-0.5">{option.subtitle}</span>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-sm text-gray-500 text-center">
                  Tidak ditemukan hasil untuk &quot;{searchTerm}&quot;
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
