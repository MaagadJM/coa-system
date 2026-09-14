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
      <div className="mb-8 rounded-2xl px-8 py-6 text-white" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e3a8a 35%, rgba(200, 150, 10, 0.4) 70%, rgba(204, 31, 31, 0.4) 100%)' }}>
        <p className="text-base text-blue-300 mb-1">{user.agency}</p>
        <h2 className="text-3xl font-bold">{greeting}, {firstName}!</h2>
        <p className="text-base text-blue-200 mt-1">Register and manage your agency's infrastructure projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="My Projects" value={myProjects.length} color="blue" />
        <StatCard label="Ongoing" value={ongoing} color="amber" />
        <StatCard label="Completed" value={completed} color="green" />
      </div>

      <div className="mt-8 rounded-xl p-6" style={{ background: '#f9fcff', boxShadow: '0 2px 8px rgba(30,58,138,0.08)' }}>
        <h3 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-4">Quick Actions</h3>
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
    blue: 'border-t-[#1e3a8a]',
    green: 'border-t-[#cc1f1f]',
    amber: 'border-t-[#c8960a]',
    red: 'border-t-[#cc1f1f]',
    purple: 'border-t-purple-500',
  }
  return (
    <div
      className={`rounded-xl border-t-4 ${accent[color]} p-5`}
      style={{ background: '#f9fcff', boxShadow: '0 2px 8px rgba(30,58,138,0.08)' }}
    >
      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-5xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  )
}

function ActionItem({ label, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left px-4 py-4 rounded-xl bg-[#f9fcff] border border-gray-200 hover:bg-blue-50 transition-colors"
    >
      <p className="text-base font-semibold text-gray-800">{label}</p>
      <p className="text-sm text-gray-400 mt-0.5">{description}</p>
    </button>
  )
}
