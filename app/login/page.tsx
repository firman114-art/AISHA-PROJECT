'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BookOpen, Eye, EyeOff, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react'

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

    // Simulasi login (akan diganti dengan Supabase auth)
    try {
      // TODO: Implement Supabase auth
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // })
      
      // Simulasi delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock redirect berdasarkan role
      if (email.includes('admin')) {
        router.push('/admin/dashboard')
      } else {
        router.push('/guru/dashboard')
      }
    } catch (err) {
      setError('Email atau password salah')
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
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-red-600" />
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

            {/* Demo Info */}
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
              <p className="text-sm text-red-700 font-medium mb-2">Demo Login:</p>
              <ul className="text-xs text-red-600 space-y-1">
                <li>• admin@sdit-alinsan.sch.id → Admin Dashboard</li>
                <li>• guru@sdit-alinsan.sch.id → Guru Dashboard</li>
                <li>• Password bebas (simulasi)</li>
              </ul>
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
