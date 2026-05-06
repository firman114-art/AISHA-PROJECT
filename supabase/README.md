# AISHA Database Setup Guide

Panduan lengkap untuk setup database AISHA di Supabase.

## 📋 Prasyarat

- Akun Supabase (https://supabase.com)
- Project Supabase yang sudah dibuat

## 🚀 Cara Menjalankan SQL di Supabase

### Langkah 1: Buka SQL Editor

1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Klik menu **"SQL Editor"** di sidebar kiri
4. Klik tombol **"New Query"**

### Langkah 2: Copy & Paste Schema

1. Buka file `schema.sql` di project Anda
2. Copy seluruh isi file (Ctrl+A, Ctrl+C)
3. Paste ke SQL Editor Supabase
4. Klik tombol **"Run"** (▶️) atau tekan Ctrl+Enter

### Langkah 3: Verifikasi Setup

Jalankan query berikut di SQL Editor untuk cek:

```sql
-- Cek tabel yang sudah dibuat
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Hasil yang diharapkan:
- `profiles`
- `classes`
- `murid`
- `setoran_hafalan`
- `setoran_tilawah`
- `setoran_jilid`
- `progress_logs`
- `attendance`
- `teacher_journals`
- `school_settings`

### Langkah 4: Cek Trigger

```sql
-- Cek trigger untuk auto-insert profile
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public';
```

## 🔐 Setup Environment Variables

Tambahkan file `.env.local` di root project:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Cara mendapatkan credentials:
1. Di Supabase Dashboard → Project Settings → API
2. Copy "URL" dan "anon public"

## 👥 Membuat User Pertama (Admin)

### Cara 1: Via Supabase Auth UI

1. Di Supabase Dashboard → Authentication → Users
2. Klik "Add User"
3. Isi email dan password
4. Tambahkan metadata:
   ```json
   {
     "full_name": "Administrator",
     "role": "admin"
   }
   ```

### Cara 2: Via SQL

```sql
-- Note: Ini hanya contoh, user sebaiknya dibuat via Auth UI
-- karena password harus di-hash oleh Supabase Auth

-- Cek apakah trigger berjalan
SELECT * FROM public.profiles WHERE role = 'admin';
```

## 📊 Struktur Database

### Tabel Utama

| Tabel | Deskripsi | RLS |
|-------|-----------|-----|
| `profiles` | Data user (admin/guru/murid) | Public read, Admin full |
| `classes` | Data kelas | Public read, Admin manage |
| `murid` | Detail siswa (NIS, kelas) | Public read, Admin manage |
| `progress_logs` | Setoran dengan predikat & bintang | Public read, Guru/Admin write |
| `attendance` | Absensi siswa | Public read, Guru/Admin write |
| `teacher_journals` | Jurnal guru harian | Public read, Guru/Admin write |
| `school_settings` | Pengaturan sekolah | Public read, Admin manage |

### Sistem Predikat & Bintang

| Predikat | Bintang |
|----------|---------|
| `mumtaz` | ⭐⭐⭐ (3) |
| `jayyid_jiddan` | ⭐⭐ (2) |
| `jayyid` | ⭐ (1) |
| `maqbul` | 0 |
| `dhaif` | 0 |

Bintang dihitung otomatis via trigger `trg_set_stars_earned`.

## 🔄 Trigger & Functions

### Auto-insert Profile (on signup)
- **Function**: `handle_new_user()`
- **Trigger**: `on_auth_user_created`
- **Aksi**: Otomatis membuat record di `profiles` saat user signup

### Auto-calculate Stars
- **Function**: `calculate_stars()`, `set_stars_earned()`
- **Trigger**: `trg_set_stars_earned`
- **Aksi**: Otomatis set `stars_earned` berdasarkan predikat

## 🛠️ Troubleshooting

### Error: "relation does not exist"
```sql
-- Cek apakah tabel ada
SELECT * FROM pg_tables WHERE tablename = 'profiles';
```

### Error: "policy already exists"
```sql
-- Drop existing policies
DROP POLICY IF EXISTS "policy_name" ON table_name;
```

### Reset Database (Hati-hati!)
```sql
-- Drop semua tabel (HATI-HATI - data akan hilang!)
DROP TABLE IF EXISTS public.progress_logs CASCADE;
DROP TABLE IF EXISTS public.attendance CASCADE;
DROP TABLE IF EXISTS public.teacher_journals CASCADE;
DROP TABLE IF EXISTS public.school_settings CASCADE;
DROP TABLE IF EXISTS public.setoran_hafalan CASCADE;
DROP TABLE IF EXISTS public.setoran_tilawah CASCADE;
DROP TABLE IF EXISTS public.setoran_jilid CASCADE;
DROP TABLE IF EXISTS public.murid CASCADE;
DROP TABLE IF EXISTS public.classes CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
```

## 📱 Testing Connection

Setelah setup, test dengan query sederhana:

```sql
-- Cek school settings
SELECT * FROM public.school_settings;

-- Cek view monthly stars
SELECT * FROM public.monthly_stars_summary LIMIT 5;
```

## 🔗 Integrasi dengan Next.js

Pastikan `lib/supabase-browser.ts` dan `lib/supabase-server.ts` sudah dikonfigurasi dengan benar menggunakan URL dan Anon Key dari project Supabase Anda.

## 📚 Dokumentasi Lanjutan

- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Functions](https://supabase.com/docs/guides/database/functions)

---

**SDIT Al-Insan Pinrang - AISHA** ⭐
