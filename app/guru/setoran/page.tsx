import SetoranForm from './components/SetoranForm'

export default function SetoranPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Input Setoran Baru</h1>
          <p className="mt-2 text-slate-600">Catat setoran hafalan, tilawah, dan jilid siswa</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Red accent bar */}
          <div className="h-2 bg-red-600"></div>
          
          <div className="p-6 sm:p-8">
            <SetoranForm />
          </div>
        </div>
      </div>
    </div>
  )
}
