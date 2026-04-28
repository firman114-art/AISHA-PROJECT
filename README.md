# AISHA - Al-Insan Student Hafidz Achievement

Aplikasi monitoring setoran hafalan, tilawah, dan jilid untuk SDIT Al-Insan Pinrang.

## Identitas

- **Nama Aplikasi:** AISHA (Al-Insan Student Hafidz Achievement)
- **Sekolah:** SDIT Al-Insan Pinrang
- **Tema Warna:** Merah Putih 🇮🇩

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (Tema Merah Putih)
- **Database & Auth:** Supabase
- **Icons:** Lucide React
- **Utilities:** clsx

## Fitur Utama

### 1. Landing Page (Public)
- Pencarian siswa dengan search bar
- Statistik SDIT Al-Insan Pinrang
- Informasi kontak sekolah dan footer

### 2. Autentikasi
- Login untuk Admin dan Guru
- Protected routes dengan role-based access

### 3. Admin Dashboard
- **Manajemen Guru:** CRUD data guru
- **Manajemen Siswa:** CRUD data siswa
- **Laporan:** Lihat ringkasan aktivitas
- **Pengaturan:** Konfigurasi aplikasi

### 4. Guru Dashboard
- **Input Hafalan:** Catat setoran hafalan siswa
- **Input Tilawah:** Nilai bacaan tilawah
- **Input Jilid:** Monitor progress jilid
- **Data Siswa:** Lihat daftar siswa

### 5. Profil Siswa (Public)
- Visualisasi progress hafalan
- Riwayat tilawah dengan nilai
- Progress jilid
- Dapat diakses melalui search di landing page

## Setup Project

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Setup Supabase Database

Jalankan SQL berikut di Supabase SQL Editor:

```sql
-- Enable RLS
alter table public.users enable row level security;

-- Users table (extends auth.users)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  nama text not null,
  role text not null check (role in ('admin', 'guru', 'murid')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Murid table
create table public.murid (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade not null,
  nis text unique not null,
  kelas text not null,
  tahun_masuk integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Setoran Hafalan table
create table public.setoran_hafalan (
  id uuid default gen_random_uuid() primary key,
  murid_id uuid references public.murid on delete cascade not null,
  guru_id uuid references public.users on delete cascade not null,
  surat text not null,
  ayat_start integer not null,
  ayat_end integer not null,
  status text not null check (status in ('mengulang', 'lancar', 'bagus', 'sangat_bagus')),
  catatan text,
  tanggal date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Setoran Tilawah table
create table public.setoran_tilawah (
  id uuid default gen_random_uuid() primary key,
  murid_id uuid references public.murid on delete cascade not null,
  guru_id uuid references public.users on delete cascade not null,
  surat text not null,
  ayat_start integer not null,
  ayat_end integer not null,
  nilai integer not null check (nilai >= 0 and nilai <= 100),
  catatan text,
  tanggal date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Setoran Jilid table
create table public.setoran_jilid (
  id uuid default gen_random_uuid() primary key,
  murid_id uuid references public.murid on delete cascade not null,
  guru_id uuid references public.users on delete cascade not null,
  jilid integer not null,
  halaman text not null,
  status text not null check (status in ('mengulang', 'belum_lancar', 'lancar', 'bagus')),
  catatan text,
  tanggal date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Demo Login

- **Admin:** `admin@sdit-alinsan.sch.id` → Admin Dashboard
- **Guru:** `guru@sdit-alinsan.sch.id` → Guru Dashboard
- **Password:** (bebas - simulasi)

## Struktur Folder

```
app/
├── page.tsx                    # Landing page (AISHA branding)
├── login/page.tsx              # Halaman login
├── dashboard/page.tsx          # Dashboard utama
├── admin/dashboard/            # Admin routes
│   ├── layout.tsx
│   ├── page.tsx
│   ├── murid/page.tsx         # Manajemen siswa
│   └── guru/page.tsx          # Manajemen guru
├── guru/dashboard/             # Guru routes
│   ├── layout.tsx
│   ├── page.tsx
│   ├── hafalan/page.tsx
│   ├── tilawah/page.tsx
│   └── jilid/page.tsx
├── murid/[id]/page.tsx         # Public profile siswa
components/
└── ui/
    ├── Sidebar.tsx
    └── Header.tsx
lib/
└── supabase.ts                 # Supabase client
supabase/
└── schema.sql                  # Database schema
```

## Status Proyek

✅ Struktur dasar aplikasi AISHA
✅ Landing page dengan AISHA branding (Merah Putih)
✅ Login page dengan tema Merah Putih
✅ Dashboard utama (/dashboard)
✅ Admin dashboard (manajemen siswa & guru)
✅ Guru dashboard (input hafalan, tilawah, jilid)
✅ Profil siswa public
✅ Tema Merah Putih di seluruh aplikasi
⬜ Integrasi Supabase Auth
⬜ Integrasi Supabase Database (CRUD real)
⬜ Middleware autentikasi
⬜ API routes

## Lisensi

MIT License - SDIT Al-Insan Pinrang
