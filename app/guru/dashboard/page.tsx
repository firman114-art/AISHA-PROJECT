import { BookOpen, BookMarked, ClipboardList, Users, TrendingUp } from 'lucide-react'
import SetoranForm from '@/components/forms/SetoranForm'

const stats = [
  { label: 'Setoran Hari Ini', value: 12, icon: BookOpen, color: 'bg-red-500' },
  { label: 'Total Murid', value: 25, icon: Users, color: 'bg-blue-500' },
  { label: 'Tilawah Minggu Ini', value: 45, icon: BookMarked, color: 'bg-purple-500' },
  { label: 'Jilid Dipantau', value: 18, icon: ClipboardList, color: 'bg-orange-500' },
]

const recentSetoran = [
  { id: 1, murid: 'Ahmad Fauzi', jenis: 'Hafalan', detail: 'Al-Baqarah 1-5', status: 'bagus', tanggal: '2024-01-15' },
  { id: 2, murid: 'Fatimah Azzahra', jenis: 'Tilawah', detail: 'An-Naba', nilai: 85, tanggal: '2024-01-15' },
  { id: 3, murid: 'Muhammad Rizky', jenis: 'Jilid', detail: 'Jilid 2', status: 'lancar', tanggal: '2024-01-14' },
  { id: 4, murid: 'Aisyah Putri', jenis: 'Hafalan', detail: 'Ali Imran 1-10', status: 'sangat_bagus', tanggal: '2024-01-14' },
]

export default function GuruDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Assalamualaikum, Ust. Abdullah!</h2>
        <p className="text-red-100">
          Input dan pantau setoran hafalan, tilawah, dan jilid siswa.
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

      {/* Form Input Setoran */}
      <SetoranForm />

      {/* Recent Setoran */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Riwayat Setoran Hari Ini</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Siswa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jenis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Detail</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status/Nilai</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentSetoran.map((setoran) => (
                <tr key={setoran.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">{setoran.murid}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{setoran.jenis}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{setoran.detail}</td>
                  <td className="px-6 py-4">
                    {setoran.status ? (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        setoran.status === 'sangat_bagus' ? 'bg-red-100 text-red-700' :
                        setoran.status === 'bagus' ? 'bg-blue-100 text-blue-700' :
                        setoran.status === 'lancar' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {setoran.status.replace('_', ' ')}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600">{setoran.nilai}/100</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{setoran.tanggal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
