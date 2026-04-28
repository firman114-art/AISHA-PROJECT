// Types untuk Database
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          nama: string
          role: 'admin' | 'guru' | 'murid'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          nama: string
          role: 'admin' | 'guru' | 'murid'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          nama?: string
          role?: 'admin' | 'guru' | 'murid'
          created_at?: string
        }
      }
      murid: {
        Row: {
          id: string
          user_id: string
          nis: string
          kelas: string
          tahun_masuk: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          nis: string
          kelas: string
          tahun_masuk: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          nis?: string
          kelas?: string
          tahun_masuk?: number
          created_at?: string
        }
      }
      setoran_hafalan: {
        Row: {
          id: string
          murid_id: string
          guru_id: string
          surat: string
          ayat_start: number
          ayat_end: number
          status: 'mengulang' | 'lancar' | 'bagus' | 'sangat_bagus'
          catatan: string | null
          tanggal: string
          created_at: string
        }
        Insert: {
          id?: string
          murid_id: string
          guru_id: string
          surat: string
          ayat_start: number
          ayat_end: number
          status: 'mengulang' | 'lancar' | 'bagus' | 'sangat_bagus'
          catatan?: string
          tanggal: string
          created_at?: string
        }
        Update: {
          id?: string
          murid_id?: string
          guru_id?: string
          surat?: string
          ayat_start?: number
          ayat_end?: number
          status?: 'mengulang' | 'lancar' | 'bagus' | 'sangat_bagus'
          catatan?: string
          tanggal?: string
          created_at?: string
        }
      }
      setoran_tilawah: {
        Row: {
          id: string
          murid_id: string
          guru_id: string
          surat: string
          ayat_start: number
          ayat_end: number
          nilai: number
          catatan: string | null
          tanggal: string
          created_at: string
        }
        Insert: {
          id?: string
          murid_id: string
          guru_id: string
          surat: string
          ayat_start: number
          ayat_end: number
          nilai: number
          catatan?: string
          tanggal: string
          created_at?: string
        }
        Update: {
          id?: string
          murid_id?: string
          guru_id?: string
          surat?: string
          ayat_start?: number
          ayat_end?: number
          nilai?: number
          catatan?: string
          tanggal?: string
          created_at?: string
        }
      }
      setoran_jilid: {
        Row: {
          id: string
          murid_id: string
          guru_id: string
          jilid: number
          halaman: string
          status: 'mengulang' | 'belum_lancar' | 'lancar' | 'bagus'
          catatan: string | null
          tanggal: string
          created_at: string
        }
        Insert: {
          id?: string
          murid_id: string
          guru_id: string
          jilid: number
          halaman: string
          status: 'mengulang' | 'belum_lancar' | 'lancar' | 'bagus'
          catatan?: string
          tanggal: string
          created_at?: string
        }
        Update: {
          id?: string
          murid_id?: string
          guru_id?: string
          jilid?: number
          halaman?: string
          status?: 'mengulang' | 'belum_lancar' | 'lancar' | 'bagus'
          catatan?: string
          tanggal?: string
          created_at?: string
        }
      }
      progress_logs: {
        Row: {
          id: string
          murid_id: string
          guru_id: string
          jenis_setoran: 'hafalan' | 'tilawah' | 'jilid'
          juz: number | null
          surat: string | null
          ayat_start: number | null
          ayat_end: number | null
          jilid_kategori: string | null
          halaman: string | null
          status: string
          nilai: number | null
          err_kelancaran: number | null
          err_fashoah: number | null
          err_tajwid: number | null
          catatan: string | null
          tanggal: string
          created_at: string
        }
        Insert: {
          id?: string
          murid_id: string
          guru_id: string
          jenis_setoran: 'hafalan' | 'tilawah' | 'jilid'
          juz?: number
          surat?: string
          ayat_start?: number
          ayat_end?: number
          jilid_kategori?: string
          halaman?: string
          status: string
          nilai?: number
          err_kelancaran?: number
          err_fashoah?: number
          err_tajwid?: number
          catatan?: string
          tanggal?: string
          created_at?: string
        }
        Update: {
          id?: string
          murid_id?: string
          guru_id?: string
          jenis_setoran?: 'hafalan' | 'tilawah' | 'jilid'
          juz?: number
          surat?: string
          ayat_start?: number
          ayat_end?: number
          jilid_kategori?: string
          halaman?: string
          status?: string
          nilai?: number
          err_kelancaran?: number
          err_fashoah?: number
          err_tajwid?: number
          catatan?: string
          tanggal?: string
          created_at?: string
        }
      }
      attendance: {
        Row: {
          id: string
          kelas_id: string
          guru_id: string
          siswa_id: string
          tanggal: string
          status: 'hadir' | 'sakit' | 'izin' | 'alpa'
          created_at: string
        }
        Insert: {
          id?: string
          kelas_id: string
          guru_id: string
          siswa_id: string
          tanggal?: string
          status: 'hadir' | 'sakit' | 'izin' | 'alpa'
          created_at?: string
        }
        Update: {
          id?: string
          kelas_id?: string
          guru_id?: string
          siswa_id?: string
          tanggal?: string
          status?: 'hadir' | 'sakit' | 'izin' | 'alpa'
          created_at?: string
        }
      }
      teacher_journals: {
        Row: {
          id: string
          kelas_id: string
          guru_id: string
          tanggal: string
          agenda_materi: string
          catatan_kejadian: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          kelas_id: string
          guru_id: string
          tanggal?: string
          agenda_materi: string
          catatan_kejadian?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          kelas_id?: string
          guru_id?: string
          tanggal?: string
          agenda_materi?: string
          catatan_kejadian?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
