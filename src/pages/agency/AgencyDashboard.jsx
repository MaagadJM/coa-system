import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import { PROJECT_STATUS, ROUTES } from '../../lib/constants'

export function AgencyDashboard() {
  const { user } = useAuth()
  const { projects } = useProjects()
  const navigate = useNavigate()

  const myProjects = projects.filter((p) => p.encodedBy?.agency === user.agency)
  const ongoing = myProjects.filter((p) => p.status === PROJECT_STATUS.ONGOING).length
  const completed = myProjects.filter((p) => p.status === PROJECT_STATUS.COMPLETED).length

  const firstName = user.name.split(' ')[0]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <DashboardLayout>
      <div className="mb-8 rounded-2xl bg-linear-to-br from-blue-900 to-blue-700 px-8 py-6 text-white">
        <p className="text-sm text-blue-300 mb-1">{user.agency}</p>
        <h2 className="text-2xl font-bold">{greeting}, {firstName}!</h2>
        <p className="text-sm text-blue-200 mt-1">Register and manage your agency's infrastructure projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="My Projects" value={myProjects.length} color="blue" />
        <StatCard label="Ongoing" value={ongoing} color="amber" />
        <StatCard label="Completed" value={completed} color="green" />
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ActionItem
            label="Register Project"
            description="Encode a new infrastructure project"
            onClick={() => navigate(ROUTES.PROJECT_NEW)}
          />
          <ActionItem
            label="View All Projects"
            description="See all registered projects"
            onClick={() => navigate(ROUTES.PROJECTS)}
          />
        </div>
      </div>
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
    <div className={`bg-white rounded-xl border border-gray-200 border-t-4 ${accent[color]} p-5`}>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-4xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  )
}

function ActionItem({ label, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left px-4 py-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
    >
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">{description}</p>
    </button>
  )
}
