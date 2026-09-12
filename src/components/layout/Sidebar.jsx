import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import { ROLE_LABELS, ROLES, ROUTES } from '../../lib/constants'

const NAV_ITEMS = {
  admin: [
    { label: 'Dashboard', to: ROUTES.ADMIN, end: true },
  ],
  agency_encoder: [
    { label: 'Dashboard', to: ROUTES.AGENCY, end: true },
    { label: 'Projects', to: ROUTES.PROJECTS, end: true },
    { label: 'Register Project', to: ROUTES.PROJECT_NEW, end: true },
  ],
  atl: [
    { label: 'Dashboard', to: ROUTES.ATL, end: true },
    { label: 'Projects', to: ROUTES.PROJECTS, end: true, badge: true },
  ],
  sa: [
    { label: 'Dashboard', to: ROUTES.SA, end: true },
    { label: 'Projects', to: ROUTES.PROJECTS, end: true },
  ],
  cd: [
    { label: 'Dashboard', to: ROUTES.CD, end: true },
    { label: 'Projects', to: ROUTES.PROJECTS, end: true },
  ],
}

export function Sidebar() {
  const { user, logout } = useAuth()
  const { unreadCount } = useProjects()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate(ROUTES.LOGIN)
  }

  const [confirmingLogout, setConfirmingLogout] = useState(false)

  const navItems = NAV_ITEMS[user?.role] ?? []
  const badgeCount = user?.role === ROLES.ATL ? unreadCount(user.id) : 0

  return (
    <>
    {confirmingLogout && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-1">Sign out</h3>
          <p className="text-sm text-gray-500 mb-6">Are you sure you want to sign out of CAP-In?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmingLogout(false)}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              Yes, sign out
            </button>
          </div>
        </div>
      </div>
    )}
    <aside className="w-64 h-screen sticky top-0 bg-blue-900 text-white flex flex-col overflow-y-auto">
      <div className="px-6 py-5 border-b border-blue-800">
        <p className="text-xs uppercase tracking-widest text-blue-300 mb-1">Republic of the Philippines</p>
        <h1 className="text-lg font-bold leading-tight">CAP-In</h1>
        <p className="text-xs text-blue-300 mt-0.5">Commission on Audit</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-700 text-white font-medium'
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`
            }
          >
            <span>{item.label}</span>
            {item.badge && badgeCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center">
                {badgeCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-blue-800">
        <div className="mb-3 px-3">
          <p className="text-sm font-medium text-white truncate">{user?.name}</p>
          <p className="text-xs text-blue-300 truncate">{ROLE_LABELS[user?.role]}</p>
          {user?.agency && (
            <p className="text-xs text-blue-400 truncate mt-0.5">{user.agency}</p>
          )}
        </div>
        <button
          onClick={() => setConfirmingLogout(true)}
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-blue-200 bg-white/10 hover:bg-white/20 hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
    </>
  )
}
