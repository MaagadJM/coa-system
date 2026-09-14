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

  const firstName = user.name.split(' ')[0]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <DashboardLayout>
      <div className="mb-8 rounded-2xl px-8 py-6 text-white" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e3a8a 35%, rgba(200, 150, 10, 0.4) 70%, rgba(204, 31, 31, 0.4) 100%)' }}>
        <p className="text-base text-blue-300 mb-1">Audit Team Leader</p>
        <h2 className="text-3xl font-bold">{greeting}, {firstName}!</h2>
        <p className="text-base text-blue-200 mt-1">Review registered projects and log your audit actions.</p>
      </div>

      {newCount > 0 && (
        <div className="mb-6 flex items-center justify-between bg-blue-50 border-l-4 border-blue-500 rounded-r-xl px-5 py-4">
          <p className="text-base text-blue-800 font-medium">
            {newCount} new project{newCount > 1 ? 's' : ''} registered and awaiting your review.
          </p>
          <button
            onClick={handleViewProjects}
            className="text-base font-semibold text-blue-700 hover:text-blue-900 underline"
          >
            View Projects
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="Total Projects" value={projects.length} color="blue" />
        <StatCard label="New Notifications" value={newCount} color={newCount > 0 ? 'red' : 'blue'} />
        <StatCard label="Complaints" value="—" color="blue" />
      </div>

      {unreadNotes.length > 0 && (
        <div className="mt-8 rounded-xl p-6" style={{ background: '#f9fcff', boxShadow: '8px 8px 20px #d1d1d1, -8px -8px 20px #ffffff' }}>
          <h3 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-4">Recent Notifications</h3>
          <ul className="space-y-2">
            {unreadNotes.slice(0, 5).map((note) => (
              <li
                key={note.id}
                className="flex items-start gap-3 text-base text-gray-700 py-2 border-b border-gray-100 last:border-0"
              >
                <span className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p>{note.message}</p>
                  <p className="text-sm text-gray-400 mt-0.5">
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

function StatCard({ label, value, color = 'blue' }) {
  const accent = {
    blue: 'border-t-blue-600',
    green: 'border-t-green-500',
    amber: 'border-t-amber-500',
    red: 'border-t-red-500',
    purple: 'border-t-purple-500',
  }
  return (
    <div
      className={`rounded-xl border-t-4 ${accent[color]} p-5`}
      style={{ background: '#f9fcff', boxShadow: '8px 8px 20px #d1d1d1, -8px -8px 20px #ffffff' }}
    >
      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-5xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  )
}
