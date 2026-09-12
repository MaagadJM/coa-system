import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'

export function CDDashboard() {
  const { user } = useAuth()
  const firstName = user.name.split(' ')[0]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <DashboardLayout>
      <div className="mb-8 rounded-2xl bg-linear-to-br from-blue-900 to-blue-700 px-8 py-6 text-white">
        <p className="text-sm text-blue-300 mb-1">Cluster Director</p>
        <h2 className="text-2xl font-bold">{greeting}, {firstName}!</h2>
        <p className="text-sm text-blue-200 mt-1">Monitor all complaints and audit action status across your cluster.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard label="Total Complaints" value="—" color="blue" />
        <StatCard label="Under Review" value="—" color="amber" />
        <StatCard label="Action Taken" value="—" color="green" />
        <StatCard label="Endorsed to FAO" value="—" color="purple" />
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">All Complaints Overview</h3>
        <p className="text-sm text-gray-400">No complaints to display.</p>
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
