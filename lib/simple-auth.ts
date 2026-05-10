// Sistem autentikasi sederhana tanpa Supabase
// Menggunakan localStorage untuk session management
// Updated: 2026-05-10 - Trigger redeploy Vercel

export interface User {
  id: string
  email: string
  full_name: string
  role: 'admin' | 'guru' | 'murid'
}

// Akun hardcoded untuk testing
const HARDCODED_USERS: User[] = [
  {
    id: 'admin-001',
    email: 'admin@alinsan.sch.id',
    full_name: 'Administrator',
    role: 'admin'
  },
  {
    id: 'guru-001',
    email: 'guru@alinsan.sch.id',
    full_name: 'Guru Tahfidz',
    role: 'guru'
  },
  {
    id: 'murid-001',
    email: 'murid@alinsan.sch.id',
    full_name: 'Ahmad Fauzi',
    role: 'murid'
  }
]

// Password untuk semua akun (sama untuk simplicity)
const HARDCODED_PASSWORD = 'admin123'

// Login dengan email dan password
export const simpleLogin = (email: string, password: string): { success: boolean; user?: User; error?: string } => {
  // Cek password
  if (password !== HARDCODED_PASSWORD) {
    return { success: false, error: 'Password salah' }
  }

  // Cari user berdasarkan email
  const user = HARDCODED_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
  
  if (!user) {
    return { success: false, error: 'Email tidak ditemukan' }
  }

  // Simpan session ke localStorage
  localStorage.setItem('aisha_user', JSON.stringify(user))
  
  return { success: true, user }
}

// Logout
export const simpleLogout = (): void => {
  localStorage.removeItem('aisha_user')
}

// Get current user
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  
  const userStr = localStorage.getItem('aisha_user')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr) as User
  } catch {
    return null
  }
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null
}

// Check user role
export const hasRole = (role: 'admin' | 'guru' | 'murid'): boolean => {
  const user = getCurrentUser()
  return user?.role === role
}

// Redirect path berdasarkan role
export const getDashboardPath = (role: string): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard'
    case 'guru':
      return '/guru/dashboard'
    case 'murid':
      return '/murid/dashboard'
    default:
      return '/'
  }
}
