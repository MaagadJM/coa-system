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

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}</h2>
        <p className="text-sm text-gray-500 mt-1">{user.agency}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="My Projects" value={myProjects.length} />
        <StatCard label="Ongoing" value={ongoing} />
        <StatCard label="Completed" value={completed} />
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-700 mb-4">Quick Actions</h3>
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

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-blue-900 mt-1">{value}</p>
    </div>
  )
}

function ActionItem({ label, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
    >
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </button>
  )
}
