'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react'
import { simpleLogin, getDashboardPath } from '@/lib/simple-auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Login dengan sistem auth sederhana (hardcoded)
      const result = simpleLogin(email, password)

      if (!result.success) {
        setError(result.error || 'Login gagal')
        return
      }

      if (!result.user) {
        setError('User tidak ditemukan')
        return
      }

      // Redirect berdasarkan role
      const dashboardPath = getDashboardPath(result.user.role)
      router.push(dashboardPath)
    } catch (err) {
      console.error('Login error:', err)
      setError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-red-700 hover:text-red-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 px-8 py-6 text-center">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/IMG_5195.jpg" 
                alt="SDIT Al-Insan Logo" 
                className="object-contain max-w-full max-h-full"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">AISHA</h1>
            <p className="text-red-100 mt-1">Al-Insan Student Hafidz Achievement</p>
            <p className="text-red-200 text-sm mt-1">SDIT Al-Insan Pinrang</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@sdit-alinsan.sch.id"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>

            {/* Info - Akun Demo */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800 font-semibold mb-2">📋 Akun Demo (Password: admin123)</p>
              <div className="text-xs text-blue-700 space-y-1">
                <div className="flex justify-between">
                  <span>👤 Admin:</span>
                  <span className="font-mono">admin@alinsan.sch.id</span>
                </div>
                <div className="flex justify-between">
                  <span>👨‍🏫 Guru:</span>
                  <span className="font-mono">guru@alinsan.sch.id</span>
                </div>
                <div className="flex justify-between">
                  <span>👦 Murid:</span>
                  <span className="font-mono">murid@alinsan.sch.id</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-red-600 mt-6 font-medium">
          © 2024 SDIT Al-Insan Pinrang - AISHA
        </p>
      </div>
    </div>
  )
}
