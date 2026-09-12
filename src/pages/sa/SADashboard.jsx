import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'

export function SADashboard() {
  const { user } = useAuth()
  const firstName = user.name.split(' ')[0]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <DashboardLayout>
      <div className="mb-8 rounded-2xl bg-linear-to-br from-blue-900 to-blue-700 px-8 py-6 text-white">
        <p className="text-sm text-blue-300 mb-1">Supervising Auditor</p>
        <h2 className="text-2xl font-bold">{greeting}, {firstName}!</h2>
        <p className="text-sm text-blue-200 mt-1">Review and approve audit team actions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="Pending Approval" value="—" color="amber" />
        <StatCard label="Approved" value="—" color="green" />
        <StatCard label="Returned to ATL" value="—" color="blue" />
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Audit Actions for Review</h3>
        <p className="text-sm text-gray-400">No actions pending your review.</p>
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
