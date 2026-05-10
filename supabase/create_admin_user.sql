-- SQL untuk membuat admin user di Supabase
-- Jalankan ini di Supabase Dashboard → SQL Editor
-- ⚠️ IMPORTANT: Ganti 'UUID_ADMIN_USER' dengan UUID dari user yang dibuat di Auth → Users

-- Cara:
-- 1. Buka Supabase Dashboard → Authentication → Users
-- 2. Buat user baru dengan email: admin@alinsan.sch.id, password: admin123
-- 3. Copy UUID user tersebut
-- 4. Ganti 'UUID_ADMIN_USER' di bawah dengan UUID yang dicopy
-- 5. Jalankan SQL ini

-- Insert admin profile
-- Ganti 'UUID_ADMIN_USER' dengan UUID dari user yang dibuat di Auth

-- Insert admin profile (tanpa created_at dan updated_at)
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
    'UUID_ADMIN_USER',  -- GANTI INI dengan UUID dari Auth → Users
    'admin@alinsan.sch.id',
    'Administrator',
    'admin'
)
ON CONFLICT (id) DO UPDATE 
SET 
    role = 'admin';

-- 3. Verifikasi user berhasil dibuat
SELECT * FROM public.profiles WHERE role = 'admin';
