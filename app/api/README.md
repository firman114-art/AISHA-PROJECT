# AISHA API Routes

Dokumentasi API Server untuk AISHA (Al-Insan Student Hafidz Achievement)

## 🔐 Autentikasi

Semua API route menggunakan Supabase Auth. Pastikan user sudah login dan session cookie tersedia.

---

## 👨‍💼 Admin API

### 1. Create User (Guru/Murid)
```
POST /api/admin/create-user
```

**Body:**
```json
{
  "email": "guru@alinsan.sch.id",
  "password": "password123",
  "fullName": "Ustadz Ahmad",
  "role": "guru" // atau "murid"
}
```

**Response:**
```json
{
  "success": true,
  "userId": "uuid",
  "message": "User guru berhasil dibuat"
}
```

---

### 2. Create Class (Kelas)
```
POST /api/admin/create-class
GET  /api/admin/create-class
```

**POST Body:**
```json
{
  "name": "Kelas 1A",
  "teacherId": "uuid-guru" // optional
}
```

**GET Response:**
```json
{
  "classes": [
    {
      "id": "uuid",
      "name": "Kelas 1A",
      "teacher": {
        "id": "uuid",
        "full_name": "Ustadz Ahmad"
      }
    }
  ]
}
```

---

### 3. List Guru
```
GET /api/admin/list-guru
```

**Response:**
```json
{
  "guru": [
    {
      "id": "uuid",
      "full_name": "Ustadz Ahmad",
      "email": "guru@alinsan.sch.id",
      "created_at": "2026-05-10"
    }
  ]
}
```

---

### 4. Murid Management
```
GET  /api/admin/murid
POST /api/admin/murid
```

**POST Body:**
```json
{
  "userId": "uuid-murid",
  "nis": "12345",
  "kelas": "Kelas 1A",
  "tahunMasuk": 2026
}
```

---

### 5. Create Murid (with User)
```
POST /api/admin/create-murid
```

**Body:**
```json
{
  "email": "murid@alinsan.sch.id",
  "password": "password123",
  "fullName": "Ahmad Santri",
  "nis": "12345",
  "kelas": "Kelas 1A",
  "tahunMasuk": 2026
}
```

---

## 👨‍🏫 Guru API

### Input Setoran
```
POST /api/guru/setoran
GET  /api/guru/setoran?studentId=uuid
```

**POST Body:**
```json
{
  "studentId": "uuid-murid",
  "category": "Hafalan", // Hafalan / Tilawah / Jilid
  "juz": 1,
  "surahName": "Al-Fatihah",
  "materiJilid": null,
  "ayatRange": "1-7",
  "predikat": "mumtaz", // mumtaz / jayyid_jiddan / jayyid / maqbul / dhaif
  "nilai": 85,
  "errKelancaran": 0,
  "errFashoah": 0,
  "errTajwid": 0,
  "catatan": "Lancar"
}
```

**Response:**
```json
{
  "success": true,
  "setoran": { ... },
  "message": "Setoran berhasil dicatat",
  "starsEarned": 3 // otomatis dari predikat
}
```

---

## 👨‍🎓 Murid API

### Get Stars Summary
```
GET /api/murid/stars?studentId=uuid&month=2026-05
```

**Response:**
```json
{
  "totalStars": 15,
  "totalSetoran": 8,
  "setoran": [
    {
      "id": "uuid",
      "predikat": "mumtaz",
      "stars_earned": 3,
      "teacher": {
        "full_name": "Ustadz Ahmad"
      }
    }
  ]
}
```

---

## 🌟 Sistem Predikat & Bintang

| Predikat | Bintang |
|----------|---------|
| `mumtaz` | 3 ⭐⭐⭐ |
| `jayyid_jiddan` | 2 ⭐⭐ |
| `jayyid` | 1 ⭐ |
| `maqbul` | 0 |
| `dhaif` | 0 |

Bintang dihitung otomatis via database trigger saat insert/update `progress_logs`.

---

## 🛡️ Role Access Control

| Endpoint | Role yang Bisa Akses |
|----------|---------------------|
| `/api/admin/*` | admin |
| `/api/guru/setoran` | guru, admin |
| `/api/murid/stars` | murid, guru, admin |

---

## 🔧 Setup Service Role Key

Untuk fitur admin create user, perlu setup **Service Role Key** di Supabase:

1. Dashboard → Project Settings → API
2. Copy "service_role" key
3. Tambah ke `.env.local`:
```bash
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Catatan:** Service Role Key memiliki akses penuh, jangan expose ke client-side!
