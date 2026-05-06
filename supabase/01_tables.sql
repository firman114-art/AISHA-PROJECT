-- =============================================
-- FILE 1: CREATE ALL TABLES
-- Jalankan ini terlebih dahulu
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (extends auth.users)
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'guru', 'murid')),
  class_id uuid,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CLASSES TABLE
CREATE TABLE public.classes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  teacher_id uuid REFERENCES public.profiles ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. MURID TABLE (Student Details)
CREATE TABLE public.murid (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  nis text UNIQUE NOT NULL,
  kelas text NOT NULL,
  tahun_masuk integer NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PROGRESS LOGS TABLE
CREATE TABLE public.progress_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  murid_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  teacher_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  category text NOT NULL CHECK (category IN ('Hafalan', 'Tilawah', 'Jilid')),
  juz integer CHECK (juz >= 1 AND juz <= 30),
  surah_name text,
  materi_jilid text,
  ayat_range text,
  predikat text NOT NULL CHECK (predikat IN ('mumtaz', 'jayyid_jiddan', 'jayyid', 'maqbul', 'dhaif')),
  nilai integer CHECK (nilai >= 0 AND nilai <= 100),
  err_kelancaran integer DEFAULT 0 CHECK (err_kelancaran >= 0),
  err_fashoah integer DEFAULT 0 CHECK (err_fashoah >= 0),
  err_tajwid integer DEFAULT 0 CHECK (err_tajwid >= 0),
  stars_earned integer DEFAULT 0 CHECK (stars_earned >= 0),
  catatan text,
  tanggal date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ATTENDANCE TABLE
CREATE TABLE public.attendance (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  class_id uuid REFERENCES public.classes ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('Hadir', 'Sakit', 'Izin', 'Alpa')),
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(student_id, date)
);

-- 6. TEACHER JOURNALS TABLE
CREATE TABLE public.teacher_journals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  teacher_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  class_id uuid REFERENCES public.classes ON DELETE CASCADE,
  agenda text NOT NULL,
  catatan text,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. SCHOOL SETTINGS TABLE
CREATE TABLE public.school_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  school_name text NOT NULL DEFAULT 'SDIT Al-Insan Pinrang',
  logo_url text,
  address text,
  phone text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
