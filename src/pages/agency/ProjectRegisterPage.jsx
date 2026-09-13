import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { ProjectForm } from '../../components/projects/ProjectForm'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import { ROUTES } from '../../lib/constants'

export function ProjectRegisterPage() {
  const { addProject } = useProjects()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  function handleSubmit(data) {
    setLoading(true)
    addProject(data, { id: user.id, name: user.name, agency: user.agency })
    navigate(ROUTES.PROJECTS)
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Register New Project</h2>
          <p className="text-base text-gray-500 mt-1">
            Encode project details as soon as the contract award has been made.
          </p>
        </div>

        <div
          className="rounded-3xl p-8"
          style={{ background: '#f0f0f0', boxShadow: '20px 20px 60px #d1d1d1, -20px -20px 60px #ffffff' }}
        >
          <ProjectForm
            onSubmit={handleSubmit}
            onCancel={() => navigate(ROUTES.PROJECTS)}
            loading={loading}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
