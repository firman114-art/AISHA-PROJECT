# Panduan Lengkap: Buat Admin User di Supabase

## 🎯 Tujuan
Membuat user admin yang bisa login ke aplikasi AISHA.

---

## 📋 Langkah demi Langkah (dengan Gambaran)

### **B1-B5: Buat User di Authentication** ✅ (Sudah dilakukan)

Hasil dari B1-B5:
- User baru dibuat di Auth
- Anda punya **UUID** (contoh: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
- Simpan/copy UUID ini!

---

### **B6: Tambahkan ke Tabel "profiles"** ⚠️ (Bagian yang kurang jelas)

Setelah user dibuat di Auth, Anda harus tambahkan data ke tabel `profiles` di Database.

#### **Step 6.1: Buka Table Editor**

1. Di Supabase Dashboard, lihat **sidebar kiri**:
   ```
   📊 Dashboard
   🔐 Authentication  ← Tadi disini (B1-B5)
   📋 Database      ← Klik ini
      ├─ Tables
      ├─ Functions
      └─ Triggers
   ```
2. Klik **"Database"** → **"Tables"**
3. Cari tabel bernama **"profiles"**
4. Klik tabel **"profiles"**

#### **Step 6.2: Insert Row (Tambah Data Baru)**

Setelah klik tabel "profiles", Anda akan lihat tampilan seperti Excel/spreadsheet.

1. Klik tombol **"Insert Row"** (biasanya di kanan atas, warna hijau/biru)
   
   Atau klik **"+"** (tambah) icon

2. Isi form yang muncul:

   | Kolom | Nilai yang diisi | Contoh |
   |-------|------------------|--------|
   | `id` | **UUID dari Auth** (B5) | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
   | `email` | Email admin | `admin@alinsan.sch.id` |
   | `full_name` | Nama lengkap | `Administrator` |
   | `role` | Role user | `admin` |
   | `created_at` | Biarkan auto | (kosongkan, auto-fill) |
   | `updated_at` | Biarkan auto | (kosongkan, auto-fill) |

3. Klik **"Save"** atau **"Insert"**

---

## 🖼️ Visualisasi

### **Tampilan Table Editor:**
```
┌─────────────────────────────────────────────────────────┐
│  Table: profiles                                    [+] │
├─────────────────────────────────────────────────────────┤
│ id │ email │ full_name │ role │ created_at │ updated_at  │
├────┼───────┼───────────┼──────┼────────────┼────────────┤
│    │       │           │      │            │            │  ← Baris kosong
└────┴───────┴───────────┴──────┴────────────┴────────────┘
                          ↑
                    Klik [+] Insert Row
```

### **Setelah Insert:**
```
┌─────────────────────────────────────────────────────────┐
│  Table: profiles                                    [+] │
├─────────────────────────────────────────────────────────┤
│ id           │ email                 │ role   │ ...    │
├──────────────┼───────────────────────┼────────┼────────┤
│ a1b2c3d4-... │ admin@alinsan.sch.id  │ admin  │ ...    │  ✓
└──────────────┴───────────────────────┴────────┴────────┘
```

---

## ❓ Kenapa Harus 2 Langkah?

| Langkah | Lokasi | Fungsi |
|---------|--------|--------|
| **B1-B5** | Auth | Buat user bisa login (email+password) |
| **B6** | Database | Tambah info profil (nama, role) |

**Auth** dan **Database** di Supabase itu terpisah:
- **Auth** = Cuma email & password untuk login
- **Database (profiles)** = Info tambahan seperti nama, role, dll

---

## ✅ Verifikasi Berhasil

Setelah B6 selesai, coba:
1. Buka aplikasi Vercel (URL production)
2. Login dengan:
   - Email: `admin@alinsan.sch.id`
   - Password: `admin123` (atau yang Anda set)
3. Kalau berhasil → Anda masuk Dashboard! 🎉

---

## 🆘 Masih Bingung?

**Alternatif: Pakai SQL Langsung**

Kalau tabel profiles sudah ada, jalankan SQL ini di SQL Editor:

```sql
INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
VALUES (
    'PASTE_UUID_DISINI',  -- Ganti dengan UUID dari Auth → Users
    'admin@alinsan.sch.id',
    'Administrator',
    'admin',
    NOW(),
    NOW()
);
```

Cara jalankan SQL:
1. Supabase Dashboard → **"SQL Editor"** (di sidebar kiri)
2. New Query
3. Paste SQL di atas
4. Ganti `'PASTE_UUID_DISINI'` dengan UUID asli
5. Klik **"Run"**

---

**Mau coba pakai SQL Editor saja? Lebih mudah!** 🚀
