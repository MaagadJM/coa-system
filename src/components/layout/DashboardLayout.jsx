import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Sidebar } from './Sidebar'

export function DashboardLayout({ children }) {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? '?'

  return (
    <div className="flex min-h-screen" style={{ background: '#e8e8e8' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 backdrop-blur-sm border-b border-gray-300 px-4 lg:px-8 h-14 flex items-center justify-between lg:justify-end gap-3" style={{ background: 'rgba(232,232,232,0.85)' }}>
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="neu-icon-btn lg:hidden p-2 rounded-lg text-gray-600"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="neu-icon-btn w-9 h-9 rounded-full flex items-center justify-center text-blue-900 text-sm font-bold tracking-wide select-none">
            {initials}
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
