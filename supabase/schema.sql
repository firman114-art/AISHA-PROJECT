-- =============================================
-- AISHA - Monitoring Setoran Santri
-- Database Schema for Supabase (UNIFIED VERSION)
-- =============================================
-- Jalankan seluruh file ini SEKALI di Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- STEP 1: CREATE ALL TABLES
-- =============================================

-- 1. PROFILES TABLE (extends auth.users)
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'guru', 'murid')),
  class_id uuid, -- FK to classes (added later)
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

-- 4. PROGRESS LOGS TABLE (Unified setoran tracking)
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

-- 5. ATTENDANCE TABLE (Absensi Siswa)
CREATE TABLE public.attendance (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  class_id uuid REFERENCES public.classes ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('Hadir', 'Sakit', 'Izin', 'Alpa')),
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(student_id, date)
);

-- 6. TEACHER JOURNALS TABLE (Jurnal Guru)
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

-- =============================================
-- STEP 2: ADD FOREIGN KEYS (Circular deps)
-- =============================================

ALTER TABLE public.profiles 
  ADD CONSTRAINT fk_profiles_class 
  FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE SET NULL;

-- =============================================
-- STEP 3: ENABLE RLS ON ALL TABLES
-- =============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.murid ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;

-- =============================================
-- STEP 4: CREATE RLS POLICIES
-- =============================================

-- PROFILES: Admin full, Public read
CREATE POLICY "Admin full access on profiles" ON public.profiles FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Public view profiles" ON public.profiles FOR SELECT TO PUBLIC USING (true);

-- CLASSES: Admin manage, Public read
CREATE POLICY "Admin manage classes" ON public.classes FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Public view classes" ON public.classes FOR SELECT TO PUBLIC USING (true);

-- MURID: Admin manage, Public read
CREATE POLICY "Admin manage murid" ON public.murid FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Public view murid" ON public.murid FOR SELECT TO PUBLIC USING (true);

-- PROGRESS_LOGS: Guru/Admin write, Public read
CREATE POLICY "Guru admin write progress" ON public.progress_logs FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('guru', 'admin')));
CREATE POLICY "Public view progress" ON public.progress_logs FOR SELECT TO PUBLIC USING (true);

-- ATTENDANCE: Guru/Admin write, Public read
CREATE POLICY "Guru admin write attendance" ON public.attendance FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('guru', 'admin')));
CREATE POLICY "Public view attendance" ON public.attendance FOR SELECT TO PUBLIC USING (true);

-- TEACHER_JOURNALS: Guru/Admin write, Public read
CREATE POLICY "Guru admin write journals" ON public.teacher_journals FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('guru', 'admin')));
CREATE POLICY "Public view journals" ON public.teacher_journals FOR SELECT TO PUBLIC USING (true);

-- SCHOOL_SETTINGS: Admin manage, Public read
CREATE POLICY "Admin manage settings" ON public.school_settings FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Public view settings" ON public.school_settings FOR SELECT TO PUBLIC USING (true);

-- =============================================
-- STEP 5: CREATE INDEXES
-- =============================================

CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_class_id ON public.profiles(class_id);
CREATE INDEX idx_murid_user_id ON public.murid(user_id);
CREATE INDEX idx_murid_nis ON public.murid(nis);
CREATE INDEX idx_progress_logs_murid_id ON public.progress_logs(murid_id);
CREATE INDEX idx_progress_logs_teacher_id ON public.progress_logs(teacher_id);
CREATE INDEX idx_progress_logs_tanggal ON public.progress_logs(tanggal);
CREATE INDEX idx_progress_logs_category ON public.progress_logs(category);
CREATE INDEX idx_progress_logs_predikat ON public.progress_logs(predikat);
CREATE INDEX idx_progress_logs_created_at ON public.progress_logs(created_at);
CREATE INDEX idx_attendance_class_id ON public.attendance(class_id);
CREATE INDEX idx_attendance_date ON public.attendance(date);
CREATE INDEX idx_attendance_student_id ON public.attendance(student_id);
CREATE INDEX idx_teacher_journals_class_id ON public.teacher_journals(class_id);
CREATE INDEX idx_teacher_journals_date ON public.teacher_journals(date);
CREATE INDEX idx_teacher_journals_teacher_id ON public.teacher_journals(teacher_id);
CREATE INDEX idx_classes_teacher_id ON public.classes(teacher_id);

-- =============================================
-- STEP 6: FUNCTIONS & TRIGGERS
-- =============================================

-- Function to calculate stars from predikat
CREATE OR REPLACE FUNCTION public.calculate_stars(predikat text)
RETURNS integer AS $$
BEGIN
  RETURN CASE predikat
    WHEN 'mumtaz' THEN 3
    WHEN 'jayyid_jiddan' THEN 2
    WHEN 'jayyid' THEN 1
    ELSE 0
  END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to auto-set stars_earned
CREATE OR REPLACE FUNCTION public.set_stars_earned()
RETURNS TRIGGER AS $$
BEGIN
  NEW.stars_earned := public.calculate_stars(NEW.predikat);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-setting stars
CREATE TRIGGER trg_set_stars_earned
  BEFORE INSERT OR UPDATE OF predikat ON public.progress_logs
  FOR EACH ROW EXECUTE FUNCTION public.set_stars_earned();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id, NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'murid')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- STEP 7: VIEWS
-- =============================================

CREATE OR REPLACE VIEW public.monthly_stars_summary AS
SELECT 
  murid_id,
  DATE_TRUNC('month', created_at) as month,
  SUM(stars_earned) as total_stars,
  COUNT(*) as total_setoran
FROM public.progress_logs
GROUP BY murid_id, DATE_TRUNC('month', created_at);

-- =============================================
-- STEP 8: DEFAULT DATA
-- =============================================

INSERT INTO public.school_settings (school_name, logo_url, address, phone)
VALUES ('SDIT Al-Insan Pinrang', '/logo-alinsan.svg', 'Kabupaten Pinrang, Sulawesi Selatan', '000000000000')
ON CONFLICT DO NOTHING;

-- =============================================
-- DONE! Database siap digunakan.
-- =============================================
