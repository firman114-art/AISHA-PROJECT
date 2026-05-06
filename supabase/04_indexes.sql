-- =============================================
-- FILE 4: INDEXES
-- Jalankan setelah File 3
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
