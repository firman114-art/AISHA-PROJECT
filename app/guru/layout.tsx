import GuruSidebar from '@/components/ui/GuruSidebar'
import Header from '@/components/ui/Header'

export default function GuruLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <GuruSidebar userName="Ust. Abdullah" />
      <div className="flex-1 flex flex-col">
        <Header title="AISHA - Panel Guru" />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
