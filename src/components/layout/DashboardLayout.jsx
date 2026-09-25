import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Sidebar } from './Sidebar'

export function DashboardLayout({ children }) {
  const { user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? '?'

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Gradient background layer */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 30%, #c8960a 55%, #cc1f1f 100%)',
        }}
      />

      {/* Frosted overlay */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'rgba(230, 233, 238, 0.82)',
          backdropFilter: 'blur(60px)',
          WebkitBackdropFilter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-screen w-full overflow-hidden">
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <header
            className="sticky top-0 z-10 px-4 lg:px-4 h-14 flex items-center justify-between shrink-0 bg-white/0 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none"
          >
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-full text-gray-500 hover:bg-white/30 transition-colors"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-800 tracking-tight">CAP-In</span>
              <span className="hidden sm:inline text-sm text-gray-400">· Commission on Audit</span>
            </div>

            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/50 text-gray-600 text-sm font-bold tracking-wide select-none">
              {initials}
            </div>
          </header>

          <main className="flex-1 p-6 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
