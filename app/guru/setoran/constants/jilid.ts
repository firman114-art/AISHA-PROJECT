// Kategori Jilid sesuai ketentuan
export const KATEGORI_JILID = [
  { value: 'jilid_1', label: 'Jilid 1' },
  { value: 'jilid_2', label: 'Jilid 2' },
  { value: 'jilid_3', label: 'Jilid 3' },
  { value: 'jilid_4', label: 'Jilid 4' },
  { value: 'jilid_5', label: 'Jilid 5' },
  { value: 'ghorib', label: 'Ghorib' },
  { value: 'tajwid', label: 'Tajwid' },
] as const

export type KategoriJilid = typeof KATEGORI_JILID[number]
