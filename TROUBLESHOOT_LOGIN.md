# Troubleshoot Login Error 401

Error: `401 Unauthorized` saat login

## 🔍 Penyebab Umum

### 1. **User Belum Dibuat di Supabase Auth**
Error 401 sering terjadi karena user belum ada di database Supabase Auth.

### 2. **Email/Password Salah**
Kombinasi email dan password tidak cocok.

### 3. **Email Belum Dikonfirmasi**
User dibuat tapi email belum dikonfirmasi.

### 4. **RLS Policy Blocking**
Row Level Security mencegah akses.

---

## ✅ Solusi Langkah demi Langkah

### **Step 1: Cek User di Supabase Dashboard**

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project **wxgirtkizvsxojzslvjv**
3. Klik **"Authentication"** di sidebar kiri
4. Klik **"Users"**

**Lihat:**
- Apakah ada user dengan email `admin@alinsan.sch.id`?
- Apakah ada user dengan role `admin`?

### **Step 2: Kalau User Belum Ada → Buat Manual**

Di Supabase Dashboard → Authentication → Users:

1. Klik **"Add user"** atau **"Invite user"**
2. Pilih **"Create new user"**
3. Isi:
   - **Email**: `admin@alinsan.sch.id`
   - **Password**: `admin123` (atau password yang diinginkan)
   - ✅ Centang **"Auto-confirm email"** (penting!)
4. Klik **"Create user"**

### **Step 3: Update Profile di Database**

Setelah user dibuat di Auth, tambahkan ke tabel `profiles`:

1. Buka **"Table Editor"** di sidebar
2. Pilih tabel **"profiles"**
3. Klik **"Insert Row"**
4. Isi:
   - `id`: Copy UUID dari user yang baru dibuat (lihat di Auth → Users)
   - `email`: `admin@alinsan.sch.id`
   - `full_name`: `Administrator`
   - `role`: `admin`
   - `created_at`: (auto)
   - `updated_at`: (auto)

### **Step 4: Kalau User Sudah Ada Tapi Password Salah**

1. Di Auth → Users, cari user admin
2. Klik user tersebut
3. Klik **"Reset password"** atau **"Change password"**
4. Set password baru: `admin123`

### **Step 5: Cek RLS Policies**

1. Buka **"Table Editor"**
2. Pilih tabel **"profiles"**
3. Klik **"Policies"** tab
4. Pastikan ada policy untuk `public` atau `authenticated` yang allow SELECT

Kalau tidak ada, tambahkan policy:
```sql
CREATE POLICY "Enable read access for all users" ON "public"."profiles"
FOR SELECT USING (true);
```

---

## 🧪 Test Login

Setelah semua step di atas selesai:

1. Buka aplikasi: `https://your-app.vercel.app/login`
2. Login dengan:
   - Email: `admin@alinsan.sch.id`
   - Password: `admin123` (atau yang sudah di-set)

---

## ❓ Masih Error?

**Cek Browser Console:**
- Buka DevTools (F12)
- Tab "Console"
- Lihat error message lengkap

**Cek Network Tab:**
- Tab "Network"
- Cari request ke `supabase.co/auth/v1/token`
- Lihat response error detail

---

## 🎯 Ringkasan Checklist

- [ ] User ada di Supabase Auth
- [ ] Password benar
- [ ] Email confirmed
- [ ] Profile ada di tabel profiles dengan role `admin`
- [ ] RLS policies tidak blocking

**Coba Step 1-3 dulu!** 🚀
