import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'

export function SADashboard() {
  const { user } = useAuth()
  const firstName = user.name.split(' ')[0]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <DashboardLayout>
      <div className="mb-8 rounded-2xl px-8 py-6 text-white" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e3a8a 35%, rgba(200, 150, 10, 0.4) 70%, rgba(204, 31, 31, 0.4) 100%)' }}>
        <p className="text-base text-blue-300 mb-1">Supervising Auditor</p>
        <h2 className="text-3xl font-bold">{greeting}, {firstName}!</h2>
        <p className="text-base text-blue-200 mt-1">Review and approve audit team actions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="Pending Approval" value="—" color="amber" />
        <StatCard label="Approved" value="—" color="green" />
        <StatCard label="Returned to ATL" value="—" color="blue" />
      </div>

      <div className="mt-8 rounded-xl p-6" style={{ background: '#f9fcff', boxShadow: '8px 8px 20px #d1d1d1, -8px -8px 20px #ffffff' }}>
        <h3 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3">Audit Actions for Review</h3>
        <p className="text-base text-gray-400">No actions pending your review.</p>
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
    <div
      className={`rounded-xl border-t-4 ${accent[color]} p-5`}
      style={{ background: '#f9fcff', boxShadow: '8px 8px 20px #d1d1d1, -8px -8px 20px #ffffff' }}
    >
      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-5xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  )
}
