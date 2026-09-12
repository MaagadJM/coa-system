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
        <div className="bg-white rounded-xl border border-gray-200 flex flex-col items-center justify-center py-24 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium text-sm">No projects registered yet</p>
          <p className="text-gray-400 text-xs mt-1">Projects will appear here once registered.</p>
          {canRegister && (
            <button
              onClick={() => navigate(ROUTES.PROJECT_NEW)}
              className="mt-5 px-5 py-2.5 bg-blue-900 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors"
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
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Project</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Agency</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Cost</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Completion</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibleProjects.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800 leading-snug">{project.projectName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{project.location}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{project.implementingAgency}</td>
                  <td className="px-6 py-4 text-gray-800 font-medium">{formatCurrency(project.projectCost)}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{project.completionDate}</td>
                  <td className="px-6 py-4">
                    <ProjectStatusBadge status={project.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-blue-700 hover:text-blue-900 text-xs font-semibold">View →</span>
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
