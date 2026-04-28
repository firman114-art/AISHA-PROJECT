// Mapping Juz (1-30) ke daftar Surah yang ada di dalamnya
// Berdasarkan standar pembagian Juz Al-Quran

export interface JuzInfo {
  nomor: number
  nama: string
  surahAwal: string
  surahAkhir: string
  ayatAwal: string // format: "Surah:Ayat"
  ayatAkhir: string // format: "Surah:Ayat"
}

export interface SurahInJuz {
  nomor: number
  nama: string
  arti: string
  ayatDari: number
  ayatSampai: number
}

// Mapping detail setiap Juz
export const JUZ_MAPPING: Record<number, SurahInJuz[]> = {
  1: [
    { nomor: 1, nama: 'Al-Fatihah', arti: 'Pembukaan', ayatDari: 1, ayatSampai: 7 },
    { nomor: 2, nama: 'Al-Baqarah', arti: 'Sapi Betina', ayatDari: 1, ayatSampai: 141 },
  ],
  2: [
    { nomor: 2, nama: 'Al-Baqarah', arti: 'Sapi Betina', ayatDari: 142, ayatSampai: 252 },
  ],
  3: [
    { nomor: 2, nama: 'Al-Baqarah', arti: 'Sapi Betina', ayatDari: 253, ayatSampai: 286 },
    { nomor: 3, nama: 'Ali Imran', arti: 'Keluarga Imran', ayatDari: 1, ayatSampai: 92 },
  ],
  4: [
    { nomor: 3, nama: 'Ali Imran', arti: 'Keluarga Imran', ayatDari: 93, ayatSampai: 200 },
    { nomor: 4, nama: 'An-Nisa', arti: 'Wanita', ayatDari: 1, ayatSampai: 23 },
  ],
  5: [
    { nomor: 4, nama: 'An-Nisa', arti: 'Wanita', ayatDari: 24, ayatSampai: 147 },
  ],
  6: [
    { nomor: 4, nama: 'An-Nisa', arti: 'Wanita', ayatDari: 148, ayatSampai: 176 },
    { nomor: 5, nama: 'Al-Maidah', arti: 'Hidangan', ayatDari: 1, ayatSampai: 81 },
  ],
  7: [
    { nomor: 5, nama: 'Al-Maidah', arti: 'Hidangan', ayatDari: 82, ayatSampai: 120 },
    { nomor: 6, nama: 'Al-Anam', arti: 'Binatang Ternak', ayatDari: 1, ayatSampai: 110 },
  ],
  8: [
    { nomor: 6, nama: 'Al-Anam', arti: 'Binatang Ternak', ayatDari: 111, ayatSampai: 165 },
    { nomor: 7, nama: 'Al-Araf', arti: 'Tempat Tertinggi', ayatDari: 1, ayatSampai: 87 },
  ],
  9: [
    { nomor: 7, nama: 'Al-Araf', arti: 'Tempat Tertinggi', ayatDari: 88, ayatSampai: 206 },
    { nomor: 8, nama: 'Al-Anfal', arti: 'Rampasan Perang', ayatDari: 1, ayatSampai: 40 },
  ],
  10: [
    { nomor: 8, nama: 'Al-Anfal', arti: 'Rampasan Perang', ayatDari: 41, ayatSampai: 75 },
    { nomor: 9, nama: 'At-Taubah', arti: 'Pengampunan', ayatDari: 1, ayatSampai: 93 },
  ],
  11: [
    { nomor: 9, nama: 'At-Taubah', arti: 'Pengampunan', ayatDari: 94, ayatSampai: 129 },
    { nomor: 10, nama: 'Yunus', arti: 'Nabi Yunus', ayatDari: 1, ayatSampai: 109 },
    { nomor: 11, nama: 'Hud', arti: 'Nabi Hud', ayatDari: 1, ayatSampai: 5 },
  ],
  12: [
    { nomor: 11, nama: 'Hud', arti: 'Nabi Hud', ayatDari: 6, ayatSampai: 123 },
    { nomor: 12, nama: 'Yusuf', arti: 'Nabi Yusuf', ayatDari: 1, ayatSampai: 52 },
  ],
  13: [
    { nomor: 12, nama: 'Yusuf', arti: 'Nabi Yusuf', ayatDari: 53, ayatSampai: 111 },
    { nomor: 13, nama: 'Ar-Rad', arti: 'Guruh', ayatDari: 1, ayatSampai: 43 },
    { nomor: 14, nama: 'Ibrahim', arti: 'Nabi Ibrahim', ayatDari: 1, ayatSampai: 52 },
  ],
  14: [
    { nomor: 15, nama: 'Al-Hijr', arti: 'Hijr', ayatDari: 1, ayatSampai: 99 },
    { nomor: 16, nama: 'An-Nahl', arti: 'Lebah', ayatDari: 1, ayatSampai: 128 },
  ],
  15: [
    { nomor: 17, nama: 'Al-Isra', arti: 'Memperjalankan Malam', ayatDari: 1, ayatSampai: 111 },
    { nomor: 18, nama: 'Al-Kahf', arti: 'Goa', ayatDari: 1, ayatSampai: 74 },
  ],
  16: [
    { nomor: 18, nama: 'Al-Kahf', arti: 'Goa', ayatDari: 75, ayatSampai: 110 },
    { nomor: 19, nama: 'Maryam', arti: 'Maryam', ayatDari: 1, ayatSampai: 98 },
    { nomor: 20, nama: 'Ta Ha', arti: 'Ta Ha', ayatDari: 1, ayatSampai: 135 },
  ],
  17: [
    { nomor: 21, nama: 'Al-Anbiya', arti: 'Para Nabi', ayatDari: 1, ayatSampai: 112 },
    { nomor: 22, nama: 'Al-Hajj', arti: 'Haji', ayatDari: 1, ayatSampai: 78 },
  ],
  18: [
    { nomor: 23, nama: 'Al-Muminun', arti: 'Orang-orang Mukmin', ayatDari: 1, ayatSampai: 118 },
    { nomor: 24, nama: 'An-Nur', arti: 'Cahaya', ayatDari: 1, ayatSampai: 64 },
    { nomor: 25, nama: 'Al-Furqan', arti: 'Pembeda', ayatDari: 1, ayatSampai: 20 },
  ],
  19: [
    { nomor: 25, nama: 'Al-Furqan', arti: 'Pembeda', ayatDari: 21, ayatSampai: 77 },
    { nomor: 26, nama: 'Asy-Syuara', arti: 'Para Penyair', ayatDari: 1, ayatSampai: 227 },
    { nomor: 27, nama: 'An-Naml', arti: 'Semut-semut', ayatDari: 1, ayatSampai: 59 },
  ],
  20: [
    { nomor: 27, nama: 'An-Naml', arti: 'Semut-semut', ayatDari: 60, ayatSampai: 93 },
    { nomor: 28, nama: 'Al-Qasas', arti: 'Kisas', ayatDari: 1, ayatSampai: 88 },
    { nomor: 29, nama: 'Al-Ankabut', arti: 'Laba-laba', ayatDari: 1, ayatSampai: 45 },
  ],
  21: [
    { nomor: 29, nama: 'Al-Ankabut', arti: 'Laba-laba', ayatDari: 46, ayatSampai: 69 },
    { nomor: 30, nama: 'Ar-Rum', arti: 'Romawi', ayatDari: 1, ayatSampai: 60 },
    { nomor: 31, nama: 'Luqman', arti: 'Luqman', ayatDari: 1, ayatSampai: 34 },
    { nomor: 32, nama: 'As-Sajdah', arti: 'Sujud', ayatDari: 1, ayatSampai: 30 },
    { nomor: 33, nama: 'Al-Ahzab', arti: 'Golongan yang Bersekutu', ayatDari: 1, ayatSampai: 30 },
  ],
  22: [
    { nomor: 33, nama: 'Al-Ahzab', arti: 'Golongan yang Bersekutu', ayatDari: 31, ayatSampai: 73 },
    { nomor: 34, nama: 'Saba', arti: 'Kaum Saba', ayatDari: 1, ayatSampai: 54 },
    { nomor: 35, nama: 'Fatir', arti: 'Pencipta', ayatDari: 1, ayatSampai: 45 },
    { nomor: 36, nama: 'Ya Sin', arti: 'Yasin', ayatDari: 1, ayatSampai: 27 },
  ],
  23: [
    { nomor: 36, nama: 'Ya Sin', arti: 'Yasin', ayatDari: 28, ayatSampai: 83 },
    { nomor: 37, nama: 'As-Saffat', arti: 'Yang Berbaris', ayatDari: 1, ayatSampai: 182 },
    { nomor: 38, nama: 'Sad', arti: 'Sad', ayatDari: 1, ayatSampai: 88 },
    { nomor: 39, nama: 'Az-Zumar', arti: 'Rombongan', ayatDari: 1, ayatSampai: 31 },
  ],
  24: [
    { nomor: 39, nama: 'Az-Zumar', arti: 'Rombongan', ayatDari: 32, ayatSampai: 75 },
    { nomor: 40, nama: 'Ghafir', arti: 'Yang Mengampuni', ayatDari: 1, ayatSampai: 85 },
    { nomor: 41, nama: 'Fussilat', arti: 'Yang Dijelaskan', ayatDari: 1, ayatSampai: 46 },
  ],
  25: [
    { nomor: 41, nama: 'Fussilat', arti: 'Yang Dijelaskan', ayatDari: 47, ayatSampai: 54 },
    { nomor: 42, nama: 'Asy-Syura', arti: 'Musyawarah', ayatDari: 1, ayatSampai: 53 },
    { nomor: 43, nama: 'Az-Zukhruf', arti: 'Perhiasan', ayatDari: 1, ayatSampai: 89 },
    { nomor: 44, nama: 'Ad-Dukhan', arti: 'Kabut', ayatDari: 1, ayatSampai: 59 },
    { nomor: 45, nama: 'Al-Jasiyah', arti: 'Yang Berlutut', ayatDari: 1, ayatSampai: 37 },
  ],
  26: [
    { nomor: 46, nama: 'Al-Ahqaf', arti: 'Bukit-bukit Pasir', ayatDari: 1, ayatSampai: 35 },
    { nomor: 47, nama: 'Muhammad', arti: 'Nabi Muhammad', ayatDari: 1, ayatSampai: 38 },
    { nomor: 48, nama: 'Al-Fath', arti: 'Kemenangan', ayatDari: 1, ayatSampai: 29 },
    { nomor: 49, nama: 'Al-Hujurat', arti: 'Kamar-kamar', ayatDari: 1, ayatSampai: 18 },
    { nomor: 50, nama: 'Qaf', arti: 'Qaf', ayatDari: 1, ayatSampai: 45 },
    { nomor: 51, nama: 'Adz-Dzariyat', arti: 'Angin yang Menerbangkan', ayatDari: 1, ayatSampai: 30 },
  ],
  27: [
    { nomor: 51, nama: 'Adz-Dzariyat', arti: 'Angin yang Menerbangkan', ayatDari: 31, ayatSampai: 60 },
    { nomor: 52, nama: 'At-Tur', arti: 'Bukit', ayatDari: 1, ayatSampai: 49 },
    { nomor: 53, nama: 'An-Najm', arti: 'Bintang', ayatDari: 1, ayatSampai: 62 },
    { nomor: 54, nama: 'Al-Qamar', arti: 'Bulan', ayatDari: 1, ayatSampai: 55 },
    { nomor: 55, nama: 'Ar-Rahman', arti: 'Yang Maha Pemurah', ayatDari: 1, ayatSampai: 78 },
    { nomor: 56, nama: 'Al-Waqiah', arti: 'Hari Kiamat', ayatDari: 1, ayatSampai: 96 },
    { nomor: 57, nama: 'Al-Hadid', arti: 'Besi', ayatDari: 1, ayatSampai: 29 },
  ],
  28: [
    { nomor: 58, nama: 'Al-Mujadilah', arti: 'Wanita yang Mengajukan Gugatan', ayatDari: 1, ayatSampai: 22 },
    { nomor: 59, nama: 'Al-Hasyr', arti: 'Pengusiran', ayatDari: 1, ayatSampai: 24 },
    { nomor: 60, nama: 'Al-Mumtahanah', arti: 'Wanita yang Diuji', ayatDari: 1, ayatSampai: 13 },
    { nomor: 61, nama: 'As-Saff', arti: 'Satuan', ayatDari: 1, ayatSampai: 14 },
    { nomor: 62, nama: 'Al-Jumuah', arti: 'Jumat', ayatDari: 1, ayatSampai: 11 },
    { nomor: 63, nama: 'Al-Munafiqun', arti: 'Orang-orang Munafik', ayatDari: 1, ayatSampai: 11 },
    { nomor: 64, nama: 'At-Taghabun', arti: 'Hari Dinampakkan Kesalahan', ayatDari: 1, ayatSampai: 18 },
    { nomor: 65, nama: 'At-Talaq', arti: 'Talak', ayatDari: 1, ayatSampai: 12 },
    { nomor: 66, nama: 'At-Tahrim', arti: 'Pengharaman', ayatDari: 1, ayatSampai: 12 },
  ],
  29: [
    { nomor: 67, nama: 'Al-Mulk', arti: 'Kerajaan', ayatDari: 1, ayatSampai: 30 },
    { nomor: 68, nama: 'Al-Qalam', arti: 'Pena', ayatDari: 1, ayatSampai: 52 },
    { nomor: 69, nama: 'Al-Haqqah', arti: 'Hari Kiamat', ayatDari: 1, ayatSampai: 52 },
    { nomor: 70, nama: 'Al-Maarij', arti: 'Tempat-tempat Naik', ayatDari: 1, ayatSampai: 44 },
    { nomor: 71, nama: 'Nuh', arti: 'Nabi Nuh', ayatDari: 1, ayatSampai: 28 },
    { nomor: 72, nama: 'Al-Jinn', arti: 'Jin', ayatDari: 1, ayatSampai: 28 },
    { nomor: 73, nama: 'Al-Muzzammil', arti: 'Orang yang Berselimut', ayatDari: 1, ayatSampai: 20 },
    { nomor: 74, nama: 'Al-Muddassir', arti: 'Orang yang Berkemul', ayatDari: 1, ayatSampai: 56 },
    { nomor: 75, nama: 'Al-Qiyamah', arti: 'Hari Kebangkitan', ayatDari: 1, ayatSampai: 40 },
    { nomor: 76, nama: 'Al-Insan', arti: 'Manusia', ayatDari: 1, ayatSampai: 31 },
    { nomor: 77, nama: 'Al-Mursalat', arti: 'Malaikat yang Diutus', ayatDari: 1, ayatSampai: 50 },
  ],
  30: [
    { nomor: 78, nama: 'An-Naba', arti: 'Berita Besar', ayatDari: 1, ayatSampai: 40 },
    { nomor: 79, nama: 'An-Naziat', arti: 'Malaikat yang Mencabut', ayatDari: 1, ayatSampai: 46 },
    { nomor: 80, nama: 'Abasa', arti: 'Ia Bermuka Masam', ayatDari: 1, ayatSampai: 42 },
    { nomor: 81, nama: 'At-Takwir', arti: 'Menggulung', ayatDari: 1, ayatSampai: 29 },
    { nomor: 82, nama: 'Al-Infitar', arti: 'Terbelah', ayatDari: 1, ayatSampai: 19 },
    { nomor: 83, nama: 'Al-Mutaffifin', arti: 'Orang-orang yang Curang', ayatDari: 1, ayatSampai: 36 },
    { nomor: 84, nama: 'Al-Insyiqaq', arti: 'Terbelah', ayatDari: 1, ayatSampai: 25 },
    { nomor: 85, nama: 'Al-Buruj', arti: 'Gugusan Bintang', ayatDari: 1, ayatSampai: 22 },
    { nomor: 86, nama: 'At-Tariq', arti: 'Yang Datang di Malam Hari', ayatDari: 1, ayatSampai: 17 },
    { nomor: 87, nama: 'Al-Ala', arti: 'Yang Paling Tinggi', ayatDari: 1, ayatSampai: 19 },
    { nomor: 88, nama: 'Al-Gasyiyah', arti: 'Hari Pembalasan', ayatDari: 1, ayatSampai: 26 },
    { nomor: 89, nama: 'Al-Fajr', arti: 'Fajar', ayatDari: 1, ayatSampai: 30 },
    { nomor: 90, nama: 'Al-Balad', arti: 'Negeri', ayatDari: 1, ayatSampai: 20 },
    { nomor: 91, nama: 'Asy-Syams', arti: 'Matahari', ayatDari: 1, ayatSampai: 15 },
    { nomor: 92, nama: 'Al-Lail', arti: 'Malam', ayatDari: 1, ayatSampai: 21 },
    { nomor: 93, nama: 'Ad-Duha', arti: 'Waktu Duha', ayatDari: 1, ayatSampai: 11 },
    { nomor: 94, nama: 'Al-Insyirah', arti: 'Melapangkan', ayatDari: 1, ayatSampai: 8 },
    { nomor: 95, nama: 'At-Tin', arti: 'Buah Tin', ayatDari: 1, ayatSampai: 8 },
    { nomor: 96, nama: 'Al-Alaq', arti: 'Segumpal Darah', ayatDari: 1, ayatSampai: 19 },
    { nomor: 97, nama: 'Al-Qadr', arti: 'Kemuliaan', ayatDari: 1, ayatSampai: 5 },
    { nomor: 98, nama: 'Al-Bayyinah', arti: 'Pembuktian', ayatDari: 1, ayatSampai: 8 },
    { nomor: 99, nama: 'Az-Zalzalah', arti: 'Kegoncangan', ayatDari: 1, ayatSampai: 8 },
    { nomor: 100, nama: 'Al-Adiyat', arti: 'Kuda yang Berlari Kencang', ayatDari: 1, ayatSampai: 11 },
    { nomor: 101, nama: 'Al-Qariah', arti: 'Hari Kiamat', ayatDari: 1, ayatSampai: 11 },
    { nomor: 102, nama: 'At-Takasur', arti: 'Bermegah-megahan', ayatDari: 1, ayatSampai: 8 },
    { nomor: 103, nama: 'Al-Asr', arti: 'Waktu Asar', ayatDari: 1, ayatSampai: 3 },
    { nomor: 104, nama: 'Al-Humazah', arti: 'Pengumpat', ayatDari: 1, ayatSampai: 9 },
    { nomor: 105, nama: 'Al-Fil', arti: 'Gajah', ayatDari: 1, ayatSampai: 5 },
    { nomor: 106, nama: 'Quraisy', arti: 'Quraisy', ayatDari: 1, ayatSampai: 4 },
    { nomor: 107, nama: 'Al-Maun', arti: 'Barang-barang yang Berguna', ayatDari: 1, ayatSampai: 7 },
    { nomor: 108, nama: 'Al-Kausar', arti: 'Nikmat yang Banyak', ayatDari: 1, ayatSampai: 3 },
    { nomor: 109, nama: 'Al-Kafirun', arti: 'Orang-orang Kafir', ayatDari: 1, ayatSampai: 6 },
    { nomor: 110, nama: 'An-Nasr', arti: 'Pertolongan', ayatDari: 1, ayatSampai: 3 },
    { nomor: 111, nama: 'Al-Masad', arti: 'Gejolak Api (Sabut)', ayatDari: 1, ayatSampai: 5 },
    { nomor: 112, nama: 'Al-Ikhlas', arti: 'Ikhlas', ayatDari: 1, ayatSampai: 4 },
    { nomor: 113, nama: 'Al-Falaq', arti: 'Waktu Subuh', ayatDari: 1, ayatSampai: 5 },
    { nomor: 114, nama: 'An-Nas', arti: 'Manusia', ayatDari: 1, ayatSampai: 6 },
  ],
}

// Helper function untuk mendapatkan daftar Juz (1-30)
export const getDaftarJuz = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    nomor: i + 1,
    label: `Juz ${i + 1}`,
  }))
}

// Helper function untuk mendapatkan surah berdasarkan juz
export const getSurahByJuz = (juzNomor: number): SurahInJuz[] => {
  return JUZ_MAPPING[juzNomor] || []
}

// Helper function untuk mengecek apakah surah ada di juz tertentu
export const isSurahInJuz = (juzNomor: number, surahNama: string): boolean => {
  const surahList = JUZ_MAPPING[juzNomor]
  if (!surahList) return false
  return surahList.some(s => s.nama.toLowerCase() === surahNama.toLowerCase())
}

// Info ringkas setiap juz
export const JUZ_INFO: JuzInfo[] = [
  { nomor: 1, nama: 'Juz 1', surahAwal: 'Al-Fatihah', surahAkhir: 'Al-Baqarah', ayatAwal: '1:1', ayatAkhir: '2:141' },
  { nomor: 2, nama: 'Juz 2', surahAwal: 'Al-Baqarah', surahAkhir: 'Al-Baqarah', ayatAwal: '2:142', ayatAkhir: '2:252' },
  { nomor: 3, nama: 'Juz 3', surahAwal: 'Al-Baqarah', surahAkhir: 'Ali Imran', ayatAwal: '2:253', ayatAkhir: '3:92' },
  { nomor: 4, nama: 'Juz 4', surahAwal: 'Ali Imran', surahAkhir: 'An-Nisa', ayatAwal: '3:93', ayatAkhir: '4:23' },
  { nomor: 5, nama: 'Juz 5', surahAwal: 'An-Nisa', surahAkhir: 'An-Nisa', ayatAwal: '4:24', ayatAkhir: '4:147' },
  { nomor: 6, nama: 'Juz 6', surahAwal: 'An-Nisa', surahAkhir: 'Al-Maidah', ayatAwal: '4:148', ayatAkhir: '5:81' },
  { nomor: 7, nama: 'Juz 7', surahAwal: 'Al-Maidah', surahAkhir: 'Al-Anam', ayatAwal: '5:82', ayatAkhir: '6:110' },
  { nomor: 8, nama: 'Juz 8', surahAwal: 'Al-Anam', surahAkhir: 'Al-Araf', ayatAwal: '6:111', ayatAkhir: '7:87' },
  { nomor: 9, nama: 'Juz 9', surahAwal: 'Al-Araf', surahAkhir: 'Al-Anfal', ayatAwal: '7:88', ayatAkhir: '8:40' },
  { nomor: 10, nama: 'Juz 10', surahAwal: 'Al-Anfal', surahAkhir: 'At-Taubah', ayatAwal: '8:41', ayatAkhir: '9:93' },
  { nomor: 11, nama: 'Juz 11', surahAwal: 'At-Taubah', surahAkhir: 'Hud', ayatAwal: '9:94', ayatAkhir: '11:5' },
  { nomor: 12, nama: 'Juz 12', surahAwal: 'Hud', surahAkhir: 'Yusuf', ayatAwal: '11:6', ayatAkhir: '12:52' },
  { nomor: 13, nama: 'Juz 13', surahAwal: 'Yusuf', surahAkhir: 'Ibrahim', ayatAwal: '12:53', ayatAkhir: '14:52' },
  { nomor: 14, nama: 'Juz 14', surahAwal: 'Al-Hijr', surahAkhir: 'An-Nahl', ayatAwal: '15:1', ayatAkhir: '16:128' },
  { nomor: 15, nama: 'Juz 15', surahAwal: 'Al-Isra', surahAkhir: 'Al-Kahf', ayatAwal: '17:1', ayatAkhir: '18:74' },
  { nomor: 16, nama: 'Juz 16', surahAwal: 'Al-Kahf', surahAkhir: 'Ta Ha', ayatAwal: '18:75', ayatAkhir: '20:135' },
  { nomor: 17, nama: 'Juz 17', surahAwal: 'Al-Anbiya', surahAkhir: 'Al-Hajj', ayatAwal: '21:1', ayatAkhir: '22:78' },
  { nomor: 18, nama: 'Juz 18', surahAwal: 'Al-Muminun', surahAkhir: 'Al-Furqan', ayatAwal: '23:1', ayatAkhir: '25:20' },
  { nomor: 19, nama: 'Juz 19', surahAwal: 'Al-Furqan', surahAkhir: 'An-Naml', ayatAwal: '25:21', ayatAkhir: '27:59' },
  { nomor: 20, nama: 'Juz 20', surahAwal: 'An-Naml', surahAkhir: 'Al-Ankabut', ayatAwal: '27:60', ayatAkhir: '29:45' },
  { nomor: 21, nama: 'Juz 21', surahAwal: 'Al-Ankabut', surahAkhir: 'Al-Ahzab', ayatAwal: '29:46', ayatAkhir: '33:30' },
  { nomor: 22, nama: 'Juz 22', surahAwal: 'Al-Ahzab', surahAkhir: 'Ya Sin', ayatAwal: '33:31', ayatAkhir: '36:27' },
  { nomor: 23, nama: 'Juz 23', surahAwal: 'Ya Sin', surahAkhir: 'Az-Zumar', ayatAwal: '36:28', ayatAkhir: '39:31' },
  { nomor: 24, nama: 'Juz 24', surahAwal: 'Az-Zumar', surahAkhir: 'Fussilat', ayatAwal: '39:32', ayatAkhir: '41:46' },
  { nomor: 25, nama: 'Juz 25', surahAwal: 'Fussilat', surahAkhir: 'Al-Jasiyah', ayatAwal: '41:47', ayatAkhir: '45:37' },
  { nomor: 26, nama: 'Juz 26', surahAwal: 'Al-Ahqaf', surahAkhir: 'Adz-Dzariyat', ayatAwal: '46:1', ayatAkhir: '51:30' },
  { nomor: 27, nama: 'Juz 27', surahAwal: 'Adz-Dzariyat', surahAkhir: 'Al-Hadid', ayatAwal: '51:31', ayatAkhir: '57:29' },
  { nomor: 28, nama: 'Juz 28', surahAwal: 'Al-Mujadilah', surahAkhir: 'At-Tahrim', ayatAwal: '58:1', ayatAkhir: '66:12' },
  { nomor: 29, nama: 'Juz 29', surahAwal: 'Al-Mulk', surahAkhir: 'Al-Mursalat', ayatAwal: '67:1', ayatAkhir: '77:50' },
  { nomor: 30, nama: 'Juz 30', surahAwal: 'An-Naba', surahAkhir: 'An-Nas', ayatAwal: '78:1', ayatAkhir: '114:6' },
]
