# Langkah 2: Setup Environment Variables di Vercel

Panduan lengkap dengan gambar/langkah detail

---

## 🎯 Tujuan

Menambahkan 3 environment variables ke project Vercel:
1. `NEXT_PUBLIC_SUPABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. `SUPABASE_SERVICE_ROLE_KEY`

---

## 📋 Langkah-langkah

### **Step 1: Login ke Vercel Dashboard**

1. Buka browser → [https://vercel.com](https://vercel.com)
2. Login dengan akun Anda (GitHub/GitLab/Bitbucket)
3. Klik project **"AISHA"** atau nama project Anda

---

### **Step 2: Buka Project Settings**

1. Di halaman project, cari tab menu di atas:
   ```
   [Overview] [Deployments] [Analytics] [Settings] ...
   ```
2. Klik **"Settings"** (biasanya di kanan atas)

---

### **Step 3: Pilih Environment Variables**

1. Di sidebar kiri Settings, ada menu:
   ```
   General
   Git
   Build & Development Settings
   ✓ Environment Variables  ← KLIK INI
   Domains
   ```
2. Klik **"Environment Variables"**

---

### **Step 4: Tambah Variable Pertama (NEXT_PUBLIC_SUPABASE_URL)**

Klik tombol **"Add"** atau **"New"**

Isi form:
```
NAME:  NEXT_PUBLIC_SUPABASE_URL
VALUE: https://wxgirtkizvsxojzslvjv.supabase.co
```

✅ **Centang semua environment:**
- [x] Production
- [x] Preview  
- [x] Development

Klik **"Save"**

---

### **Step 5: Tambah Variable Kedua (NEXT_PUBLIC_SUPABASE_ANON_KEY)**

Klik **"Add"** lagi

Isi form:
```
NAME:  NEXT_PUBLIC_SUPABASE_ANON_KEY
VALUE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Z2lydGtpenZzeG9qenNsdmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjE4OTYsImV4cCI6MjA5MjkzNzg5Nn0.c-tEIxGMqrcM1f_N4Q4qNrLR88yOaQPRoJIo065_0nA
```

✅ **Centang semua environment:**
- [x] Production
- [x] Preview  
- [x] Development

Klik **"Save"**

---

### **Step 6: Tambah Variable Ketiga (SUPABASE_SERVICE_ROLE_KEY)**

Klik **"Add"** lagi

Isi form:
```
NAME:  SUPABASE_SERVICE_ROLE_KEY
VALUE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Z2lydGtpenZzeG9qenNsdmp2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM2MTg5NiwiZXhwIjoyMDkyOTM3ODk2fQ.OavhKXlyjJ8r1t751orYVE-pH5xxE5-A9cuPTV-tIDg
```

✅ **Centang semua environment:**
- [x] Production
- [x] Preview  
- [x] Development

Klik **"Save"**

---

## ✅ Verifikasi

Setelah selesai, tampilan Environment Variables harus seperti ini:

```
┌─────────────────────────────────┬─────────────┬─────────┬─────────────┐
│ NAME                            │ VALUE       │ ENV     │ STATUS      │
├─────────────────────────────────┼─────────────┼─────────┼─────────────┤
│ NEXT_PUBLIC_SUPABASE_URL        │ https://... │ Prod/.. │ ✓ Encrypted │
│ NEXT_PUBLIC_SUPABASE_ANON_KEY   │ eyJhbG...   │ Prod/.. │ ✓ Encrypted │
│ SUPABASE_SERVICE_ROLE_KEY       │ eyJhbG...   │ Prod/.. │ ✓ Encrypted │
└─────────────────────────────────┴─────────────┴─────────┴─────────────┘
```

---

## 🚀 Langkah Selanjutnya (Langkah 3)

Setelah environment variables ditambahkan:

### **Redeploy Project**

**Cara 1: Via Dashboard**
1. Klik tab **"Deployments"** di atas
2. Cari commit terakhir
3. Klik titik 3 (...) → **"Redeploy"**

**Cara 2: Push Commit Baru**
```bash
git add .
git commit -m "Setup Vercel environment variables"
git push origin main
```

Vercel akan otomatis deploy ulang.

---

## ❓ Troubleshooting

### "Variable sudah ada tapi deploy masih gagal?"
→ Pastikan semua 3 variables sudah benar value-nya

### "Value terlalu panjang?"
→ Vercel support value panjang, paste saja semua

### "Tidak bisa save?"
→ Refresh halaman dan coba lagi

---

**🎉 Setelah Langkah 2 selesai, lanjut ke Langkah 3: Redeploy!**
