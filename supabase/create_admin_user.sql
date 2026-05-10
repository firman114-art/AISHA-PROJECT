-- SQL untuk membuat admin user di Supabase
-- Jalankan ini di Supabase Dashboard → SQL Editor

-- 1. Buat user di auth.users (gunakan Supabase Dashboard Auth UI)
-- Atau pakai fungsi ini kalau sudah setup admin API

-- 2. Insert profile untuk admin
-- Ganti 'UUID_ADMIN_USER' dengan UUID dari user yang dibuat di Auth

INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
VALUES (
    'UUID_ADMIN_USER',  -- GANTI INI dengan UUID dari Auth → Users
    'admin@alinsan.sch.id',
    'Administrator',
    'admin',
    NOW(),
    NOW()
)
ON CONFLICT (id) DO UPDATE 
SET 
    role = 'admin',
    updated_at = NOW();

-- 3. Verifikasi user berhasil dibuat
SELECT * FROM public.profiles WHERE role = 'admin';
