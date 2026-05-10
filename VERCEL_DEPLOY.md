# Vercel Deployment Guide

Panduan deploy AISHA ke Vercel

## 🚀 Langkah Deploy

### 1. Setup Environment Variables di Vercel

Buka Project Settings → Environment Variables, tambahkan:

```
NEXT_PUBLIC_SUPABASE_URL=https://wxgirtkizvsxojzslvjv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Z2lydGtpenZzeG9qenNsdmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjE4OTYsImV4cCI6MjA5MjkzNzg5Nn0.c-tEIxGMqrcM1f_N4Q4qNrLR88yOaQPRoJIo065_0nA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Z2lydGtpenZzeG9qenNsdmp2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM2MTg5NiwiZXhwIjoyMDkyOTM3ODk2fQ.OavhKXlyjJ8r1t751orYVE-pH5xxE5-A9cuPTV-tIDg
```

**PENTING:**
- ✅ `NEXT_PUBLIC_SUPABASE_URL` → pilih **Production**, **Preview**, **Development**
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` → pilih **Production**, **Preview**, **Development**  
- ✅ `SUPABASE_SERVICE_ROLE_KEY` → pilih **Production**, **Preview**, **Development**

### 2. Build Command (Default)

Vercel akan otomatis menggunakan:
```
npm run build
```

### 3. Output Directory (Default)
```
.next
```

### 4. Install Command (Default)
```
npm install
```

---

## 🔧 Troubleshooting

### Error: "SUPABASE_SERVICE_ROLE_KEY is not defined"

**Solusi:** Pastikan environment variable sudah di-set di Vercel Dashboard:
1. Project Settings → Environment Variables
2. Cek apakah `SUPABASE_SERVICE_ROLE_KEY` sudah ada
3. Jika belum, tambahkan manual

### Error: "Build failed"

**Solusi:** 
1. Cek build logs di Vercel
2. Pastikan tidak ada TypeScript error
3. Jalankan `npm run build` di local untuk cek error

### Error: "Cannot find module"

**Solusi:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## ✅ Checklist Sebelum Deploy

- [ ] Semua environment variables ter-set di Vercel
- [ ] Database Supabase sudah di-setup (tables, RLS, functions)
- [ ] Admin user sudah dibuat di Supabase Auth
- [ ] `npm run build` berhasil di local tanpa error

---

## 🌐 URL Production

Setelah deploy berhasil, aplikasi akan tersedia di:
`https://your-project-name.vercel.app`

---

**SDIT Al-Insan Pinrang - AISHA** ⭐
