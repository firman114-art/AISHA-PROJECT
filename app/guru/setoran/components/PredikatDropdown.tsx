'use client'

import { SISTEM_PREDIKAT } from '../constants/predikat'
import { Award } from 'lucide-react'

interface PredikatDropdownProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export default function PredikatDropdown({
  value,
  onChange,
  required = false,
}: PredikatDropdownProps) {
  const selectedPredikat = SISTEM_PREDIKAT.find((p) => p.value === value)

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <Award className="w-4 h-4 mr-1.5 text-red-500" />
        Predikat Penilaian
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {SISTEM_PREDIKAT.map((predikat) => {
          const isSelected = value === predikat.value
          return (
            <button
              key={predikat.value}
              type="button"
              onClick={() => onChange(predikat.value)}
              className={`
                relative p-3 rounded-lg border-2 transition-all text-center
                ${
                  isSelected
                    ? `${predikat.color} ${predikat.textColor} border-transparent shadow-lg ring-2 ${predikat.ringColor}`
                    : 'bg-white border-gray-200 hover:border-red-300 hover:bg-red-50'
                }
              `}
            >
              <div className={`font-bold text-sm ${isSelected ? '' : 'text-gray-900'}`}>
                {predikat.shortLabel}
              </div>
              <div className={`text-xs mt-0.5 ${isSelected ? 'opacity-90' : 'text-gray-500'}`}>
                {predikat.description}
              </div>
              
              {/* Checkmark for selected */}
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Selected label display */}
      {selectedPredikat && (
        <p className="mt-2 text-xs text-red-600 font-medium">
          Terpilih: {selectedPredikat.label}
        </p>
      )}
    </div>
  )
}
