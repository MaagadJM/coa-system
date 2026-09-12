import { useAuth } from '../../hooks/useAuth'
import { Sidebar } from './Sidebar'

export function DashboardLayout({ children }) {
  const { user } = useAuth()
  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? '?'

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 h-14 flex items-center justify-end">
          <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center text-white text-xs font-bold tracking-wide select-none">
            {initials}
          </div>
        </header>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
