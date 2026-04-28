// Sistem Predikat Penilaian
export const SISTEM_PREDIKAT = [
  { 
    value: 'mumtaz', 
    label: 'Mumtaz (Istimewa)', 
    shortLabel: 'Mumtaz',
    description: 'Istimewa',
    color: 'bg-red-600',
    textColor: 'text-white',
    ringColor: 'ring-red-300'
  },
  { 
    value: 'jayyid_jiddan', 
    label: 'Jayyid Jiddan (Sangat Baik)', 
    shortLabel: 'Jayyid Jiddan',
    description: 'Sangat Baik',
    color: 'bg-red-500',
    textColor: 'text-white',
    ringColor: 'ring-red-200'
  },
  { 
    value: 'jayyid', 
    label: 'Jayyid (Baik)', 
    shortLabel: 'Jayyid',
    description: 'Baik',
    color: 'bg-red-400',
    textColor: 'text-white',
    ringColor: 'ring-red-100'
  },
  { 
    value: 'maqbul', 
    label: 'Maqbul (Cukup)', 
    shortLabel: 'Maqbul',
    description: 'Cukup',
    color: 'bg-gray-500',
    textColor: 'text-white',
    ringColor: 'ring-gray-200'
  },
] as const

export type Predikat = typeof SISTEM_PREDIKAT[number]
