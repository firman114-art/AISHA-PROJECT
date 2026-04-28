// Mock data untuk Kelas dan Siswa (nanti akan diganti fetch dari Supabase)

export const DAFTAR_KELAS = [
  { id: 'kelas_1_a', nama: 'Kelas 1 A', jenjang: '1' },
  { id: 'kelas_1_b', nama: 'Kelas 1 B', jenjang: '1' },
  { id: 'kelas_2_a', nama: 'Kelas 2 A', jenjang: '2' },
  { id: 'kelas_2_b', nama: 'Kelas 2 B', jenjang: '2' },
  { id: 'kelas_3_a', nama: 'Kelas 3 A', jenjang: '3' },
  { id: 'kelas_3_b', nama: 'Kelas 3 B', jenjang: '3' },
  { id: 'kelas_4_a', nama: 'Kelas 4 A', jenjang: '4' },
  { id: 'kelas_4_b', nama: 'Kelas 4 B', jenjang: '4' },
  { id: 'kelas_5_a', nama: 'Kelas 5 A', jenjang: '5' },
  { id: 'kelas_5_b', nama: 'Kelas 5 B', jenjang: '5' },
  { id: 'kelas_6_a', nama: 'Kelas 6 A', jenjang: '6' },
  { id: 'kelas_6_b', nama: 'Kelas 6 B', jenjang: '6' },
] as const

export const DAFTAR_SISWA = [
  // Kelas 1 A
  { id: 'siswa_001', nama: 'Ahmad Fauzi', kelasId: 'kelas_1_a', nis: '2024001' },
  { id: 'siswa_002', nama: 'Fatimah Azzahra', kelasId: 'kelas_1_a', nis: '2024002' },
  { id: 'siswa_003', nama: 'Muhammad Rizky', kelasId: 'kelas_1_a', nis: '2024003' },
  { id: 'siswa_004', nama: 'Aisyah Putri', kelasId: 'kelas_1_a', nis: '2024004' },
  { id: 'siswa_005', nama: 'Umar bin Khattab', kelasId: 'kelas_1_a', nis: '2024005' },
  
  // Kelas 1 B
  { id: 'siswa_006', nama: 'Zaid bin Thabit', kelasId: 'kelas_1_b', nis: '2024006' },
  { id: 'siswa_007', nama: 'Khalid bin Walid', kelasId: 'kelas_1_b', nis: '2024007' },
  { id: 'siswa_008', nama: 'Bilal bin Rabah', kelasId: 'kelas_1_b', nis: '2024008' },
  { id: 'siswa_009', nama: 'Salman al-Farisi', kelasId: 'kelas_1_b', nis: '2024009' },
  { id: 'siswa_010', nama: 'Abu Bakar as-Siddiq', kelasId: 'kelas_1_b', nis: '2024010' },
  
  // Kelas 2 A
  { id: 'siswa_011', nama: 'Utsman bin Affan', kelasId: 'kelas_2_a', nis: '2024011' },
  { id: 'siswa_012', nama: 'Ali bin Abi Talib', kelasId: 'kelas_2_a', nis: '2024012' },
  { id: 'siswa_013', nama: 'Saad bin Abi Waqqas', kelasId: 'kelas_2_a', nis: '2024013' },
  { id: 'siswa_014', nama: 'Hamzah bin Abdul Muttalib', kelasId: 'kelas_2_a', nis: '2024014' },
  { id: 'siswa_015', nama: 'Jaafar bin Abi Talib', kelasId: 'kelas_2_a', nis: '2024015' },
  
  // Kelas 2 B
  { id: 'siswa_016', nama: 'Abdullah bin Masud', kelasId: 'kelas_2_b', nis: '2024016' },
  { id: 'siswa_017', nama: 'Amar bin Yasir', kelasId: 'kelas_2_b', nis: '2024017' },
  { id: 'siswa_018', nama: 'Anas bin Malik', kelasId: 'kelas_2_b', nis: '2024018' },
  { id: 'siswa_019', nama: 'Usamah bin Zaid', kelasId: 'kelas_2_b', nis: '2024019' },
  { id: 'siswa_020', nama: 'Abu Hurairah', kelasId: 'kelas_2_b', nis: '2024020' },
  
  // Kelas 3 A
  { id: 'siswa_021', nama: 'Abdullah bin Abbas', kelasId: 'kelas_3_a', nis: '2024021' },
  { id: 'siswa_022', nama: 'Abdullah bin Umar', kelasId: 'kelas_3_a', nis: '2024022' },
  { id: 'siswa_023', nama: 'Muadh bin Jabal', kelasId: 'kelas_3_a', nis: '2024023' },
  { id: 'siswa_024', nama: 'Abu Ubaidah bin Jarrah', kelasId: 'kelas_3_a', nis: '2024024' },
  
  // Kelas 3 B
  { id: 'siswa_025', nama: 'Abdurrahman bin Auf', kelasId: 'kelas_3_b', nis: '2024025' },
  { id: 'siswa_026', nama: 'Thalhah bin Ubaidillah', kelasId: 'kelas_3_b', nis: '2024026' },
  { id: 'siswa_027', nama: 'Zubair bin Awwam', kelasId: 'kelas_3_b', nis: '2024027' },
  { id: 'siswa_028', nama: 'Saad bin Muadh', kelasId: 'kelas_3_b', nis: '2024028' },
  
  // Kelas 4 A
  { id: 'siswa_029', nama: 'Abu Darda', kelasId: 'kelas_4_a', nis: '2024029' },
  { id: 'siswa_030', nama: 'Ibnul Abbas', kelasId: 'kelas_4_a', nis: '2024030' },
  { id: 'siswa_031', nama: 'Hassan bin Thabit', kelasId: 'kelas_4_a', nis: '2024031' },
  { id: 'siswa_032', nama: 'Samura bin Jundub', kelasId: 'kelas_4_a', nis: '2024032' },
  
  // Kelas 4 B
  { id: 'siswa_033', nama: 'Imran bin Husain', kelasId: 'kelas_4_b', nis: '2024033' },
  { id: 'siswa_034', nama: 'Abu Musa al-Asyari', kelasId: 'kelas_4_b', nis: '2024034' },
  { id: 'siswa_035', nama: 'Abu Sufyan', kelasId: 'kelas_4_b', nis: '2024035' },
  { id: 'siswa_036', nama: "Khalid bin Sa'id", kelasId: 'kelas_4_b', nis: '2024036' },
  
  // Kelas 5 A
  { id: 'siswa_037', nama: 'Abdullah bin Rawahah', kelasId: 'kelas_5_a', nis: '2024037' },
  { id: 'siswa_038', nama: 'Abu Dujanah', kelasId: 'kelas_5_a', nis: '2024038' },
  { id: 'siswa_039', nama: 'Miqdad bin Amr', kelasId: 'kelas_5_a', nis: '2024039' },
  { id: 'siswa_040', nama: 'Sahl bin Saad', kelasId: 'kelas_5_a', nis: '2024040' },
  
  // Kelas 5 B
  { id: 'siswa_041', nama: 'Abdullah bin Amr', kelasId: 'kelas_5_b', nis: '2024041' },
  { id: 'siswa_042', nama: 'Abu Ayyub al-Ansari', kelasId: 'kelas_5_b', nis: '2024042' },
  { id: 'siswa_043', nama: 'Ubadah bin Samit', kelasId: 'kelas_5_b', nis: '2024043' },
  { id: 'siswa_044', nama: 'Rafi bin Khadij', kelasId: 'kelas_5_b', nis: '2024044' },
  
  // Kelas 6 A
  { id: 'siswa_045', nama: 'Jabir bin Abdullah', kelasId: 'kelas_6_a', nis: '2024045' },
  { id: 'siswa_046', nama: 'Hudzaifah bin Yaman', kelasId: 'kelas_6_a', nis: '2024046' },
  { id: 'siswa_047', nama: 'Abdullah bin Zubair', kelasId: 'kelas_6_a', nis: '2024047' },
  { id: 'siswa_048', nama: 'Miqdad bin Aswad', kelasId: 'kelas_6_a', nis: '2024048' },
  
  // Kelas 6 B
  { id: 'siswa_049', nama: 'Abu Said al-Khudri', kelasId: 'kelas_6_b', nis: '2024049' },
  { id: 'siswa_050', nama: 'Wahb bin Saad', kelasId: 'kelas_6_b', nis: '2024050' },
  { id: 'siswa_051', nama: 'Zaid bin Arqam', kelasId: 'kelas_6_b', nis: '2024051' },
  { id: 'siswa_052', nama: 'Thabit bin Qais', kelasId: 'kelas_6_b', nis: '2024052' },
]

export type Kelas = typeof DAFTAR_KELAS[number]
export type Siswa = typeof DAFTAR_SISWA[number]
