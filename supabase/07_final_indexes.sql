-- =============================================
-- FINAL: ADD INDEXES
-- Jalankan setelah semua kolom ditambahkan
-- =============================================

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_class_id ON public.profiles(class_id);

-- Murid indexes
CREATE INDEX IF NOT EXISTS idx_murid_user_id ON public.murid(user_id);
CREATE INDEX IF NOT EXISTS idx_murid_nis ON public.murid(nis);

-- Progress logs indexes (menggunakan nama kolom yang benar)
CREATE INDEX IF NOT EXISTS idx_progress_logs_student_id ON public.progress_logs(student_id);
CREATE INDEX IF NOT EXISTS idx_progress_logs_teacher_id ON public.progress_logs(teacher_id);
CREATE INDEX IF NOT EXISTS idx_progress_logs_tanggal ON public.progress_logs(tanggal);
CREATE INDEX IF NOT EXISTS idx_progress_logs_category ON public.progress_logs(category);
CREATE INDEX IF NOT EXISTS idx_progress_logs_predikat ON public.progress_logs(predikat);
CREATE INDEX IF NOT EXISTS idx_progress_logs_created_at ON public.progress_logs(created_at);

-- Attendance indexes
CREATE INDEX IF NOT EXISTS idx_attendance_class_id ON public.attendance(class_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON public.attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON public.attendance(student_id);

-- Teacher journals indexes
CREATE INDEX IF NOT EXISTS idx_teacher_journals_class_id ON public.teacher_journals(class_id);
CREATE INDEX IF NOT EXISTS idx_teacher_journals_date ON public.teacher_journals(date);
CREATE INDEX IF NOT EXISTS idx_teacher_journals_teacher_id ON public.teacher_journals(teacher_id);

-- Classes indexes
CREATE INDEX IF NOT EXISTS idx_classes_teacher_id ON public.classes(teacher_id);
