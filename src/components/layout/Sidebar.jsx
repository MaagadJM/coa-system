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

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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

export function Sidebar({ mobileOpen, onMobileClose }) {
  const { user, logout } = useAuth()
  const { unreadCount } = useProjects()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl w-full max-w-sm mx-4 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Sign out</h3>
            <p className="text-base text-gray-500 mb-6">Are you sure you want to sign out of CAP-In?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmingLogout(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-base font-medium border border-white/60 bg-white/40 text-gray-700 hover:bg-white/60 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 rounded-xl text-base font-medium text-white bg-red-500/80 hover:bg-red-500 transition-colors"
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
          'max-lg:fixed max-lg:top-3 max-lg:left-3 max-lg:bottom-3 max-lg:z-40 rounded-2xl overflow-hidden',
          'lg:my-3 lg:ml-3 lg:shrink-0',
          'flex flex-col py-4',
          'transform transition-all duration-300 ease-in-out',
          expanded ? 'w-52' : 'w-14',
          mobileOpen ? 'translate-x-0' : '-translate-x-[calc(100%+1rem)] lg:translate-x-0',
        ].join(' ')}
        style={{}}
      >
        {/* Toggle button */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-10 h-10 ml-2 rounded-full bg-white/80 text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center mb-4 transition-colors shrink-0"
        >
          {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>

        {/* Nav items */}
        <nav className="flex flex-col gap-2 flex-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onMobileClose}
              title={!expanded ? item.label : undefined}
              className={({ isActive }) =>
                [
                  'relative h-10 rounded-full flex items-center gap-3 transition-colors whitespace-nowrap',
                  expanded ? 'px-3' : 'w-10 justify-center',
                  isActive
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-white/80 text-gray-400 hover:text-gray-600 hover:bg-gray-100',
                ].join(' ')
              }
            >
              {item.icon}
              {expanded && (
                <span className="text-sm font-medium uppercase tracking-wide">{item.label}</span>
              )}
              {item.badge && badgeCount > 0 && (
                <span className={[
                  'bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center',
                  expanded
                    ? 'ml-auto w-5 h-5 text-xs'
                    : 'absolute -top-0.5 -right-0.5 w-4 h-4',
                ].join(' ')}>
                  {badgeCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User info */}
        <div className={[
          'overflow-hidden border-t border-gray-200 transition-all duration-300 ease-in-out',
          expanded ? 'max-h-24 opacity-100 px-4 mb-3 pt-3' : 'max-h-0 opacity-0 px-4 mb-0 pt-0 border-transparent',
        ].join(' ')}>
          <p className="text-sm font-medium text-gray-700 truncate">{user?.name}</p>
          <p className="text-xs text-gray-400 truncate">{ROLE_LABELS[user?.role]}</p>
          {user?.agency && (
            <p className="text-xs text-gray-400 truncate">{user.agency}</p>
          )}
        </div>

        {/* Sign out */}
        <button
          onClick={() => setConfirmingLogout(true)}
          title={!expanded ? 'Sign Out' : undefined}
          className={[
            'h-10 rounded-full flex items-center transition-all duration-300 ease-in-out mx-2 overflow-hidden',
            expanded ? 'px-3 gap-3' : 'w-10 justify-center gap-0',
            'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-red-50',
          ].join(' ')}
        >
          <span className="shrink-0"><LogoutIcon /></span>
          <span className={[
            'text-sm font-medium whitespace-nowrap transition-opacity duration-300',
            expanded ? 'opacity-100' : 'opacity-0 w-0',
          ].join(' ')}>Sign Out</span>
        </button>
      </aside>
    </>
  )
}
