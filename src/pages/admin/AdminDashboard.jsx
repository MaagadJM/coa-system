import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'

export function AdminDashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}</h2>
        <p className="text-sm text-gray-500 mt-1">System Administrator</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="Total Agencies" value="—" />
        <StatCard label="Total Users" value="—" />
        <StatCard label="Active Projects" value="—" />
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-700 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ActionItem label="Create Agency" description="Register a new government agency" />
          <ActionItem label="Manage Users" description="Assign roles and credentials" />
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

function ActionItem({ label, description }) {
  return (
    <button className="text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </button>
  )
}
