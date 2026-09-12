import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { ProjectStatusBadge } from '../../components/projects/ProjectStatusBadge'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import { ROLES, ROUTES } from '../../lib/constants'

export function ProjectListPage() {
  const { projects } = useProjects()
  const { user } = useAuth()
  const navigate = useNavigate()

  const canRegister = user.role === ROLES.AGENCY_ENCODER

  const visibleProjects =
    user.role === ROLES.AGENCY_ENCODER
      ? projects.filter((p) => p.encodedBy?.agency === user.agency)
      : projects

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Infrastructure Projects</h2>
          <p className="text-sm text-gray-500 mt-1">
            {visibleProjects.length} project{visibleProjects.length !== 1 ? 's' : ''} found
          </p>
        </div>
        {canRegister && (
          <button
            onClick={() => navigate(ROUTES.PROJECT_NEW)}
            className="px-4 py-2.5 bg-blue-800 text-white text-sm font-medium rounded-lg hover:bg-blue-900 transition-colors"
          >
            + Register Project
          </button>
        )}
      </div>

      {visibleProjects.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-400 text-sm">No projects registered yet.</p>
          {canRegister && (
            <button
              onClick={() => navigate(ROUTES.PROJECT_NEW)}
              className="mt-4 px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-lg hover:bg-blue-900 transition-colors"
            >
              Register First Project
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Project</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Agency</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cost</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Completion</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibleProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-800 leading-snug">{project.projectName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{project.location}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{project.implementingAgency}</td>
                  <td className="px-5 py-4 text-gray-700 font-medium">{formatCurrency(project.projectCost)}</td>
                  <td className="px-5 py-4 text-gray-500">{project.completionDate}</td>
                  <td className="px-5 py-4">
                    <ProjectStatusBadge status={project.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="text-blue-700 hover:text-blue-900 text-xs font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  )
}
