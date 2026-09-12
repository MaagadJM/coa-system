import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'

export function SADashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}</h2>
        <p className="text-sm text-gray-500 mt-1">Supervising Auditor</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="Pending Approval" value="—" />
        <StatCard label="Approved" value="—" />
        <StatCard label="Returned to ATL" value="—" />
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-700 mb-2">Audit Actions for Review</h3>
        <p className="text-sm text-gray-400">No actions pending your review.</p>
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
