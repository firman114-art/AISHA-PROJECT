-- =============================================
-- FILE 6: VIEWS & DEFAULT DATA
-- Jalankan terakhir
-- =============================================

-- View for monthly stars summary
CREATE OR REPLACE VIEW public.monthly_stars_summary AS
SELECT 
  murid_id,
  DATE_TRUNC('month', created_at) as month,
  SUM(stars_earned) as total_stars,
  COUNT(*) as total_setoran
FROM public.progress_logs
GROUP BY murid_id, DATE_TRUNC('month', created_at);

-- Default school settings
INSERT INTO public.school_settings (school_name, logo_url, address, phone)
VALUES ('SDIT Al-Insan Pinrang', '/logo-alinsan.svg', 'Kabupaten Pinrang, Sulawesi Selatan', '000000000000')
ON CONFLICT DO NOTHING;
