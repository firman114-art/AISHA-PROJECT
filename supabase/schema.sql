-- =============================================
-- Monitoring Setoran Santri - Database Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS TABLE (extends auth.users)
-- =============================================
CREATE TABLE public.users (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  nama text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'guru', 'murid')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can view own data" 
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all users" 
  ON public.users FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can insert users" 
  ON public.users FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can update users" 
  ON public.users FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =============================================
-- MURID TABLE
-- =============================================
CREATE TABLE public.murid (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users ON DELETE CASCADE NOT NULL,
  nis text UNIQUE NOT NULL,
  kelas text NOT NULL,
  tahun_masuk integer NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.murid ENABLE ROW LEVEL SECURITY;

-- Policies for murid table
CREATE POLICY "Anyone can view murid" 
  ON public.murid FOR SELECT 
  TO PUBLIC 
  USING (true);

CREATE POLICY "Admin can insert murid" 
  ON public.murid FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can update murid" 
  ON public.murid FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin can delete murid" 
  ON public.murid FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =============================================
-- SETORAN HAFALAN TABLE
-- =============================================
CREATE TABLE public.setoran_hafalan (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  murid_id uuid REFERENCES public.murid ON DELETE CASCADE NOT NULL,
  guru_id uuid REFERENCES public.users ON DELETE CASCADE NOT NULL,
  surat text NOT NULL,
  ayat_start integer NOT NULL,
  ayat_end integer NOT NULL,
  status text NOT NULL CHECK (status IN ('mengulang', 'lancar', 'bagus', 'sangat_bagus')),
  catatan text,
  tanggal date NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.setoran_hafalan ENABLE ROW LEVEL SECURITY;

-- Policies for setoran_hafalan
CREATE POLICY "Anyone can view setoran" 
  ON public.setoran_hafalan FOR SELECT 
  TO PUBLIC 
  USING (true);

CREATE POLICY "Guru and admin can insert setoran" 
  ON public.setoran_hafalan FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

CREATE POLICY "Guru and admin can update setoran" 
  ON public.setoran_hafalan FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

CREATE POLICY "Guru and admin can delete setoran" 
  ON public.setoran_hafalan FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

-- =============================================
-- SETORAN TILAWAH TABLE
-- =============================================
CREATE TABLE public.setoran_tilawah (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  murid_id uuid REFERENCES public.murid ON DELETE CASCADE NOT NULL,
  guru_id uuid REFERENCES public.users ON DELETE CASCADE NOT NULL,
  surat text NOT NULL,
  ayat_start integer NOT NULL,
  ayat_end integer NOT NULL,
  nilai integer NOT NULL CHECK (nilai >= 0 AND nilai <= 100),
  catatan text,
  tanggal date NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.setoran_tilawah ENABLE ROW LEVEL SECURITY;

-- Policies for setoran_tilawah (same as hafalan)
CREATE POLICY "Anyone can view tilawah" 
  ON public.setoran_tilawah FOR SELECT 
  TO PUBLIC 
  USING (true);

CREATE POLICY "Guru and admin can insert tilawah" 
  ON public.setoran_tilawah FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

CREATE POLICY "Guru and admin can update tilawah" 
  ON public.setoran_tilawah FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

CREATE POLICY "Guru and admin can delete tilawah" 
  ON public.setoran_tilawah FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

-- =============================================
-- SETORAN JILID TABLE
-- =============================================
CREATE TABLE public.setoran_jilid (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  murid_id uuid REFERENCES public.murid ON DELETE CASCADE NOT NULL,
  guru_id uuid REFERENCES public.users ON DELETE CASCADE NOT NULL,
  jilid integer NOT NULL,
  halaman text NOT NULL,
  status text NOT NULL CHECK (status IN ('mengulang', 'belum_lancar', 'lancar', 'bagus')),
  catatan text,
  tanggal date NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.setoran_jilid ENABLE ROW LEVEL SECURITY;

-- Policies for setoran_jilid (same as hafalan)
CREATE POLICY "Anyone can view jilid" 
  ON public.setoran_jilid FOR SELECT 
  TO PUBLIC 
  USING (true);

CREATE POLICY "Guru and admin can insert jilid" 
  ON public.setoran_jilid FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

CREATE POLICY "Guru and admin can update jilid" 
  ON public.setoran_jilid FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

CREATE POLICY "Guru and admin can delete jilid" 
  ON public.setoran_jilid FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

-- =============================================
-- PROGRESS LOGS TABLE (Unified setoran tracking)
-- =============================================
CREATE TABLE public.progress_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  murid_id uuid REFERENCES public.murid ON DELETE CASCADE NOT NULL,
  guru_id uuid REFERENCES public.users ON DELETE CASCADE NOT NULL,
  jenis_setoran text NOT NULL CHECK (jenis_setoran IN ('hafalan', 'tilawah', 'jilid')),
  -- Juz 1-30 untuk Hafalan/Tilawah (Smart Filter)
  juz integer CHECK (juz >= 1 AND juz <= 30),
  surat text,
  ayat_start integer,
  ayat_end integer,
  -- Kategori Jilid: Jilid 1-5, Ghorib, Tajwid
  jilid_kategori text,
  halaman text,
  -- Sistem Predikat: Mumtaz, Jayyid Jiddan, Jayyid, Maqbul
  status text NOT NULL,
  nilai integer CHECK (nilai >= 0 AND nilai <= 100),
  -- Counter Kesalahan (Kelancaran, Fashoah, Tajwid)
  err_kelancaran integer DEFAULT 0 CHECK (err_kelancaran >= 0),
  err_fashoah integer DEFAULT 0 CHECK (err_fashoah >= 0),
  err_tajwid integer DEFAULT 0 CHECK (err_tajwid >= 0),
  catatan text,
  tanggal date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.progress_logs ENABLE ROW LEVEL SECURITY;

-- Policies for progress_logs
CREATE POLICY "Anyone can view progress_logs" 
  ON public.progress_logs FOR SELECT 
  TO PUBLIC 
  USING (true);

CREATE POLICY "Guru and admin can insert progress_logs" 
  ON public.progress_logs FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

CREATE POLICY "Guru and admin can update progress_logs" 
  ON public.progress_logs FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

CREATE POLICY "Guru and admin can delete progress_logs" 
  ON public.progress_logs FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

-- Index for progress_logs
CREATE INDEX idx_progress_logs_murid_id ON public.progress_logs(murid_id);
CREATE INDEX idx_progress_logs_tanggal ON public.progress_logs(tanggal);
CREATE INDEX idx_progress_logs_jenis ON public.progress_logs(jenis_setoran);

-- =============================================
-- ATTENDANCE TABLE (Absensi Siswa)
-- =============================================
CREATE TABLE public.attendance (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  kelas_id text NOT NULL,
  guru_id uuid REFERENCES public.users ON DELETE CASCADE NOT NULL,
  siswa_id text NOT NULL,
  tanggal date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL CHECK (status IN ('hadir', 'sakit', 'izin', 'alpa')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  -- Unique constraint: satu siswa hanya bisa 1 absensi per hari
  UNIQUE(kelas_id, siswa_id, tanggal)
);

-- Enable RLS
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Policies for attendance
CREATE POLICY "Anyone can view attendance" 
  ON public.attendance FOR SELECT 
  TO PUBLIC 
  USING (true);

CREATE POLICY "Guru and admin can insert attendance" 
  ON public.attendance FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

CREATE POLICY "Guru and admin can update attendance" 
  ON public.attendance FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

CREATE POLICY "Guru and admin can delete attendance" 
  ON public.attendance FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

-- Indexes for attendance
CREATE INDEX idx_attendance_kelas_id ON public.attendance(kelas_id);
CREATE INDEX idx_attendance_tanggal ON public.attendance(tanggal);
CREATE INDEX idx_attendance_siswa_id ON public.attendance(siswa_id);

-- =============================================
-- TEACHER JOURNALS TABLE (Jurnal Guru)
-- =============================================
CREATE TABLE public.teacher_journals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  kelas_id text NOT NULL,
  guru_id uuid REFERENCES public.users ON DELETE CASCADE NOT NULL,
  tanggal date NOT NULL DEFAULT CURRENT_DATE,
  agenda_materi text NOT NULL,
  catatan_kejadian text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.teacher_journals ENABLE ROW LEVEL SECURITY;

-- Policies for teacher_journals
CREATE POLICY "Anyone can view teacher_journals" 
  ON public.teacher_journals FOR SELECT 
  TO PUBLIC 
  USING (true);

CREATE POLICY "Guru and admin can insert teacher_journals" 
  ON public.teacher_journals FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

CREATE POLICY "Guru and admin can update own journals" 
  ON public.teacher_journals FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

CREATE POLICY "Guru and admin can delete own journals" 
  ON public.teacher_journals FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('guru', 'admin')
    )
  );

-- Indexes for teacher_journals
CREATE INDEX idx_teacher_journals_kelas_id ON public.teacher_journals(kelas_id);
CREATE INDEX idx_teacher_journals_tanggal ON public.teacher_journals(tanggal);
CREATE INDEX idx_teacher_journals_guru_id ON public.teacher_journals(guru_id);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, nama, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nama', NEW.email),
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
-- INDEXES
-- =============================================
CREATE INDEX idx_murid_user_id ON public.murid(user_id);
CREATE INDEX idx_murid_nis ON public.murid(nis);
CREATE INDEX idx_hafalan_murid_id ON public.setoran_hafalan(murid_id);
CREATE INDEX idx_hafalan_tanggal ON public.setoran_hafalan(tanggal);
CREATE INDEX idx_tilawah_murid_id ON public.setoran_tilawah(murid_id);
CREATE INDEX idx_tilawah_tanggal ON public.setoran_tilawah(tanggal);
CREATE INDEX idx_jilid_murid_id ON public.setoran_jilid(murid_id);
CREATE INDEX idx_jilid_tanggal ON public.setoran_jilid(tanggal);

-- =============================================
-- SAMPLE DATA (Optional)
-- =============================================

-- Insert sample murid (after user is created via auth)
-- INSERT INTO public.users (id, email, nama, role) VALUES
--   ('uuid-here', 'murid1@alihsan.sch.id', 'Ahmad Fauzi', 'murid'),
--   ('uuid-here', 'murid2@alihsan.sch.id', 'Fatimah Azzahra', 'murid');

-- INSERT INTO public.murid (user_id, nis, kelas, tahun_masuk) VALUES
--   ('uuid-here', '2024001', 'Kelas 1', 2024),
--   ('uuid-here', '2024002', 'Kelas 1', 2024);
