-- =============================================
-- FILE 5: FUNCTIONS & TRIGGERS
-- Jalankan setelah File 4
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
