import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Sidebar } from './Sidebar'

export function DashboardLayout({ children }) {
  const { user } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? '?'

  return (
    <div className="flex min-h-screen" style={{ background: '#f9fcff' }}>
      {/* Full-height sidebar column */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Right column: header + content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="sticky top-0 z-10 border-b border-gray-200 px-4 h-16 flex items-center justify-between shrink-0"
          style={{ background: 'rgba(249,252,255,0.95)' }}
        >
          {/* Hamburger — mobile only (desktop toggle is inside the sidebar) */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-xl font-bold text-blue-900 tracking-tight">CAP-In</span>
            <span className="text-sm text-gray-400">· Commission on Audit</span>
          </div>

          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-100 text-blue-900 text-sm font-bold tracking-wide select-none">
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
