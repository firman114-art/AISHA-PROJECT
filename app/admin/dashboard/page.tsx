import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react'

// Mock data untuk statistik
const stats = [
  { label: 'Total Murid', value: 156, icon: Users, color: 'bg-blue-500' },
  { label: 'Total Guru', value: 24, icon: GraduationCap, color: 'bg-purple-500' },
  { label: 'Setoran Bulan Ini', value: 342, icon: BookOpen, color: 'bg-red-500' },
  { label: 'Rata-rata Nilai', value: 85, icon: TrendingUp, color: 'bg-orange-500' },
]

// Mock data untuk aktivitas terbaru
const recentActivities = [
  { id: 1, action: 'Setoran Hafalan', murid: 'Ahmad Fauzi', guru: 'Ust. Abdullah', surat: 'Al-Baqarah 1-5', status: 'bagus', time: '2 menit yang lalu' },
  { id: 2, action: 'Setoran Tilawah', murid: 'Fatimah Azzahra', guru: 'Ust. Ahmad', surat: 'An-Naba', status: 'lancar', time: '15 menit yang lalu' },
  { id: 3, action: 'Setoran Jilid', murid: 'Muhammad Rizky', guru: 'Ust. Abdullah', surat: 'Jilid 2', status: 'lancar', time: '30 menit yang lalu' },
  { id: 4, action: 'Setoran Hafalan', murid: 'Aisyah Putri', guru: 'Ust. Ahmad', surat: 'Ali Imran 1-10', status: 'sangat_bagus', time: '1 jam yang lalu' },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Selamat Datang, Admin!</h2>
        <p className="text-red-100">
          Pantau dan kelola data siswa, guru, dan setoran dengan mudah.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Aktivitas Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aktivitas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Murid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guru</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Detail</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{activity.action}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{activity.murid}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{activity.guru}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{activity.surat}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activity.status === 'sangat_bagus' ? 'bg-red-100 text-red-700' :
                      activity.status === 'bagus' ? 'bg-blue-100 text-blue-700' :
                      activity.status === 'lancar' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {activity.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
