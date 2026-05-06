-- =============================================
-- FILE 3: RLS POLICIES
-- Jalankan setelah File 2
-- =============================================

-- PROFILES
CREATE POLICY "Admin full access on profiles" ON public.profiles FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Public view profiles" ON public.profiles FOR SELECT TO PUBLIC USING (true);

-- CLASSES
CREATE POLICY "Admin manage classes" ON public.classes FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Public view classes" ON public.classes FOR SELECT TO PUBLIC USING (true);

-- MURID
CREATE POLICY "Admin manage murid" ON public.murid FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Public view murid" ON public.murid FOR SELECT TO PUBLIC USING (true);

-- PROGRESS_LOGS
CREATE POLICY "Guru admin write progress" ON public.progress_logs FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('guru', 'admin')));
CREATE POLICY "Public view progress" ON public.progress_logs FOR SELECT TO PUBLIC USING (true);

-- ATTENDANCE
CREATE POLICY "Guru admin write attendance" ON public.attendance FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('guru', 'admin')));
CREATE POLICY "Public view attendance" ON public.attendance FOR SELECT TO PUBLIC USING (true);

-- TEACHER_JOURNALS
CREATE POLICY "Guru admin write journals" ON public.teacher_journals FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('guru', 'admin')));
CREATE POLICY "Public view journals" ON public.teacher_journals FOR SELECT TO PUBLIC USING (true);

-- SCHOOL_SETTINGS
CREATE POLICY "Admin manage settings" ON public.school_settings FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Public view settings" ON public.school_settings FOR SELECT TO PUBLIC USING (true);
