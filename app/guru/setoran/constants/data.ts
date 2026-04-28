// Mock Data Kelas dan Siswa
export const DAFTAR_KELAS = [
  { id: 'kelas_1_a', nama: 'Kelas 1 A' },
  { id: 'kelas_1_b', nama: 'Kelas 1 B' },
  { id: 'kelas_2_a', nama: 'Kelas 2 A' },
  { id: 'kelas_2_b', nama: 'Kelas 2 B' },
  { id: 'kelas_3_a', nama: 'Kelas 3 A' },
  { id: 'kelas_3_b', nama: 'Kelas 3 B' },
  { id: 'kelas_4_a', nama: 'Kelas 4 A' },
  { id: 'kelas_4_b', nama: 'Kelas 4 B' },
  { id: 'kelas_5_a', nama: 'Kelas 5 A' },
  { id: 'kelas_5_b', nama: 'Kelas 5 B' },
  { id: 'kelas_6_a', nama: 'Kelas 6 A' },
  { id: 'kelas_6_b', nama: 'Kelas 6 B' },
] as const

export const DAFTAR_SISWA = [
  { id: 'siswa_001', nama: 'Ahmad Fauzi', kelasId: 'kelas_1_a' },
  { id: 'siswa_002', nama: 'Fatimah Azzahra', kelasId: 'kelas_1_a' },
  { id: 'siswa_003', nama: 'Muhammad Rizky', kelasId: 'kelas_1_a' },
  { id: 'siswa_004', nama: 'Aisyah Putri', kelasId: 'kelas_1_b' },
  { id: 'siswa_005', nama: 'Umar bin Khattab', kelasId: 'kelas_1_b' },
  { id: 'siswa_006', nama: 'Zaid bin Thabit', kelasId: 'kelas_2_a' },
  { id: 'siswa_007', nama: 'Khalid bin Walid', kelasId: 'kelas_2_a' },
  { id: 'siswa_008', nama: 'Bilal bin Rabah', kelasId: 'kelas_2_b' },
  { id: 'siswa_009', nama: 'Salman al-Farisi', kelasId: 'kelas_2_b' },
  { id: 'siswa_010', nama: 'Abu Bakar as-Siddiq', kelasId: 'kelas_3_a' },
  { id: 'siswa_011', nama: 'Utsman bin Affan', kelasId: 'kelas_3_a' },
  { id: 'siswa_012', nama: 'Ali bin Abi Talib', kelasId: 'kelas_3_b' },
  { id: 'siswa_013', nama: 'Saad bin Abi Waqqas', kelasId: 'kelas_3_b' },
  { id: 'siswa_014', nama: 'Hamzah bin Abdul Muttalib', kelasId: 'kelas_4_a' },
  { id: 'siswa_015', nama: 'Jaafar bin Abi Talib', kelasId: 'kelas_4_a' },
  { id: 'siswa_016', nama: 'Abdullah bin Masud', kelasId: 'kelas_4_b' },
  { id: 'siswa_017', nama: 'Amar bin Yasir', kelasId: 'kelas_4_b' },
  { id: 'siswa_018', nama: 'Anas bin Malik', kelasId: 'kelas_5_a' },
  { id: 'siswa_019', nama: 'Usamah bin Zaid', kelasId: 'kelas_5_a' },
  { id: 'siswa_020', nama: 'Abu Hurairah', kelasId: 'kelas_5_b' },
  { id: 'siswa_021', nama: 'Abdullah bin Abbas', kelasId: 'kelas_5_b' },
  { id: 'siswa_022', nama: 'Abdullah bin Umar', kelasId: 'kelas_6_a' },
  { id: 'siswa_023', nama: 'Muadh bin Jabal', kelasId: 'kelas_6_a' },
  { id: 'siswa_024', nama: 'Abu Ubaidah bin Jarrah', kelasId: 'kelas_6_b' },
]

export type Kelas = typeof DAFTAR_KELAS[number]
export type Siswa = typeof DAFTAR_SISWA[number]
