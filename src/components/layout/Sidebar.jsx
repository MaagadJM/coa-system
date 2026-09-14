import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import { ROLE_LABELS, ROLES, ROUTES } from '../../lib/constants'

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  )
}

const NAV_ITEMS = {
  admin: [
    { label: 'Dashboard', to: ROUTES.ADMIN, end: true, icon: <HomeIcon /> },
  ],
  agency_encoder: [
    { label: 'Dashboard', to: ROUTES.AGENCY, end: true, icon: <HomeIcon /> },
    { label: 'Projects', to: ROUTES.PROJECTS, end: true, icon: <FolderIcon /> },
  ],
  atl: [
    { label: 'Dashboard', to: ROUTES.ATL, end: true, icon: <HomeIcon /> },
    { label: 'Projects', to: ROUTES.PROJECTS, end: true, icon: <FolderIcon />, badge: true },
  ],
  sa: [
    { label: 'Dashboard', to: ROUTES.SA, end: true, icon: <HomeIcon /> },
    { label: 'Projects', to: ROUTES.PROJECTS, end: true, icon: <FolderIcon /> },
  ],
  cd: [
    { label: 'Dashboard', to: ROUTES.CD, end: true, icon: <HomeIcon /> },
    { label: 'Projects', to: ROUTES.PROJECTS, end: true, icon: <FolderIcon /> },
  ],
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { user, logout } = useAuth()
  const { unreadCount } = useProjects()
  const navigate = useNavigate()
  const [confirmingLogout, setConfirmingLogout] = useState(false)

  function handleLogout() {
    logout()
    navigate(ROUTES.LOGIN)
  }

  const navItems = NAV_ITEMS[user?.role] ?? []
  const badgeCount = user?.role === ROLES.ATL ? unreadCount(user.id) : 0

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Logout confirmation modal */}
      {confirmingLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Sign out</h3>
            <p className="text-base text-gray-500 mb-6">Are you sure you want to sign out of CAP-In?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmingLogout(false)}
                className="flex-1 px-4 py-2.5 rounded-lg text-base font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 rounded-lg text-base font-medium text-white"
                style={{ background: 'linear-gradient(145deg, #b91c1c, #ef4444)' }}
              >
                Yes, sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={[
          // Mobile: fixed drawer with margin and rounded corners
          'fixed top-3 left-3 bottom-3 z-40 w-64 rounded-2xl',
          // Desktop: part of layout flow, full height
          'lg:sticky lg:top-3 lg:h-[calc(100vh-1.5rem)] lg:z-auto lg:my-3 lg:ml-3 lg:rounded-2xl',
          collapsed ? 'lg:w-16' : 'lg:w-64',
          // Appearance
          'bg-blue-900 text-white flex flex-col overflow-hidden',
          // Slide transition
          'transform transition-all duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-[calc(100%+1rem)] lg:translate-x-0',
        ].join(' ')}
      >
        {/* Hamburger toggle — desktop only, sits at top of sidebar */}
        <div className="hidden lg:flex items-center px-3 py-4 border-b border-blue-800 shrink-0">
          <button
            onClick={onToggle}
            className="p-2 rounded-lg text-blue-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onMobileClose}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-base',
                  isActive
                    ? 'sidebar-nav-active text-white font-medium'
                    : 'sidebar-nav-item text-blue-200 hover:text-white',
                  collapsed ? 'lg:justify-center' : '',
                ].join(' ')
              }
            >
              {item.icon}
              <span className={`truncate uppercase tracking-wide ${collapsed ? 'lg:hidden' : ''}`}>
                {item.label}
              </span>
              {item.badge && badgeCount > 0 && (
                <span className={`bg-red-500 text-white text-sm font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center ml-auto ${collapsed ? 'lg:hidden' : ''}`}>
                  {badgeCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User info + sign out */}
        <div className="border-t border-blue-800 px-2 py-3">
          <div className={`mb-2 px-3 ${collapsed ? 'lg:hidden' : ''}`}>
            <p className="text-base font-medium text-white truncate">{user?.name}</p>
            <p className="text-sm font-medium text-blue-300 truncate">{ROLE_LABELS[user?.role]}</p>
            {user?.agency && (
              <p className="text-sm text-blue-500 mt-0.5 truncate">{user.agency}</p>
            )}
          </div>
          <button
            onClick={() => setConfirmingLogout(true)}
            title={collapsed ? 'Sign Out' : undefined}
            className={[
              'sidebar-nav-item w-full flex items-center gap-3 px-3 py-2 rounded-lg',
              'font-medium text-base text-blue-200 hover:text-white',
              collapsed ? 'lg:justify-center' : '',
            ].join(' ')}
          >
            <LogoutIcon />
            <span className={collapsed ? 'lg:hidden' : ''}>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
