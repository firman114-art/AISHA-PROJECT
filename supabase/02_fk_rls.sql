-- =============================================
-- FILE 2: FOREIGN KEYS & ENABLE RLS
-- Jalankan setelah File 1
-- =============================================

-- Add FK from profiles to classes
ALTER TABLE public.profiles 
  ADD CONSTRAINT fk_profiles_class 
  FOREIGN KEY (class_id) REFERENCES public.classes(id) ON DELETE SET NULL;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.murid ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;
