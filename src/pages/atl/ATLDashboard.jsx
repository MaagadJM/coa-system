import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import { ROUTES } from '../../lib/constants'

export function ATLDashboard() {
  const { user } = useAuth()
  const { projects, notifications, unreadCount, markNotificationsRead } = useProjects()
  const navigate = useNavigate()

  const newCount = unreadCount(user.id)
  const unreadNotes = notifications.filter((n) => !n.readBy.includes(user.id))

  function handleViewProjects() {
    markNotificationsRead(user.id)
    navigate(ROUTES.PROJECTS)
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}</h2>
        <p className="text-sm text-gray-500 mt-1">Audit Team Leader</p>
      </div>

      {newCount > 0 && (
        <div className="mb-5 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-5 py-4">
          <p className="text-sm text-blue-800 font-medium">
            {newCount} new project{newCount > 1 ? 's' : ''} registered and awaiting your review.
          </p>
          <button
            onClick={handleViewProjects}
            className="text-sm font-medium text-blue-700 hover:text-blue-900 underline"
          >
            View Projects
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="Total Projects" value={projects.length} />
        <StatCard label="New Notifications" value={newCount} highlight={newCount > 0} />
        <StatCard label="Complaints" value="—" />
      </div>

      {unreadNotes.length > 0 && (
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-700 mb-4">Recent Notifications</h3>
          <ul className="space-y-2">
            {unreadNotes.slice(0, 5).map((note) => (
              <li
                key={note.id}
                className="flex items-start gap-3 text-sm text-gray-700 py-2 border-b border-gray-100 last:border-0"
              >
                <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p>{note.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(note.createdAt).toLocaleString('en-PH')}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DashboardLayout>
  )
}

function StatCard({ label, value, highlight }) {
  return (
    <div className={`rounded-xl border p-5 ${highlight ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${highlight ? 'text-blue-700' : 'text-blue-900'}`}>{value}</p>
    </div>
  )
}
