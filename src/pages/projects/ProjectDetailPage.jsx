import { useNavigate, useParams } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { ProjectStatusBadge } from '../../components/projects/ProjectStatusBadge'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import { ROLES } from '../../lib/constants'

export function ProjectDetailPage() {
  const { id } = useParams()
  const { getProject } = useProjects()
  const { user } = useAuth()
  const navigate = useNavigate()

  const project = getProject(id)

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Project not found.</p>
        </div>
      </DashboardLayout>
    )
  }

  const canEdit = user.role === ROLES.AGENCY_ENCODER

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="text-base text-blue-700 hover:text-blue-900 mb-2 block"
            >
              &larr; Back
            </button>
            <h2 className="text-3xl font-bold text-gray-800">{project.projectName}</h2>
            <div className="mt-2">
              <ProjectStatusBadge status={project.status} />
            </div>
          </div>
          {canEdit && (
            <button
              onClick={() => navigate(`/projects/${id}/edit`)}
              className="px-4 py-2 text-base font-medium text-gray-600 border border-white/60 bg-white/40 rounded-xl hover:bg-white/60 transition-colors"
            >
              Edit Project
            </button>
          )}
        </div>

        <div className="space-y-5">
          <DetailCard title="Project Information">
            <DetailRow label="Project Name" value={project.projectName} />
            <DetailRow label="Description" value={project.description} />
            <DetailRow label="Project Location" value={project.location} />
            <DetailRow label="Implementing Agency" value={project.implementingAgency} />
            <DetailRow label="Contractor" value={project.contractor} />
          </DetailCard>

          <DetailCard title="Procurement & Funding">
            <DetailRow label="Mode of Procurement" value={project.procurementMode} />
            <DetailRow label="Funding Source" value={project.fundingSource} />
            <DetailRow label="Project Cost" value={formatCurrency(project.projectCost)} />
          </DetailCard>

          <DetailCard title="Project Timeline">
            <DetailRow label="Target Start Date" value={project.startDate} />
            <DetailRow label="Target Completion Date" value={project.completionDate} />
          </DetailCard>

          <DetailCard title="Record Information">
            <DetailRow label="Encoded By" value={project.encodedBy?.name} />
            <DetailRow label="Agency" value={project.encodedBy?.agency} />
            <DetailRow
              label="Date Registered"
              value={new Date(project.createdAt).toLocaleString('en-PH')}
            />
            {project.updatedAt !== project.createdAt && (
              <DetailRow
                label="Last Updated"
                value={new Date(project.updatedAt).toLocaleString('en-PH')}
              />
            )}
          </DetailCard>
        </div>
      </div>
    </DashboardLayout>
  )
}

function DetailCard({ title, children }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white/40">
      <div className="px-5 py-3.5 bg-white/30">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{title}</h3>
      </div>
      <div className="divide-y divide-white/40">{children}</div>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className="flex px-5 py-3.5 gap-4">
      <span className="text-base text-gray-500 w-48 shrink-0">{label}</span>
      <span className="text-base text-gray-800 font-medium">{value ?? '—'}</span>
    </div>
  )
}