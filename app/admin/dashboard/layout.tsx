import AdminSidebar from '@/components/ui/AdminSidebar'
import Header from '@/components/ui/Header'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar userName="Administrator" />
      <div className="flex-1 flex flex-col">
        <Header title="Admin Dashboard - AISHA" />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
