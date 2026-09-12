import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { ProjectForm } from '../../components/projects/ProjectForm'
import { useProjects } from '../../hooks/useProjects'
import { ROUTES } from '../../lib/constants'

export function ProjectEditPage() {
  const { id } = useParams()
  const { getProject, updateProject } = useProjects()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

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

  function handleSubmit(data) {
    setLoading(true)
    updateProject(id, data)
    navigate(`/projects/${id}`)
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Project</h2>
          <p className="text-sm text-gray-500 mt-1">{project.projectName}</p>
        </div>

        <div
          className="rounded-3xl p-8"
          style={{ background: '#f0f0f0', boxShadow: '20px 20px 60px #d1d1d1, -20px -20px 60px #ffffff' }}
        >
          <ProjectForm
            defaultValues={project}
            onSubmit={handleSubmit}
            onCancel={() => navigate(ROUTES.PROJECTS)}
            loading={loading}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
