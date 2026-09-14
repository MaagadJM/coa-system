import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link
            to={ROUTES.PROJECTS}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Infrastructure Projects
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-500">Register New Project</span>
        </nav>

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Register New Project</h2>
          <p className="text-base text-gray-500 mt-1">
            Encode project details as soon as the contract award has been made.
          </p>
        </div>

        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={() => navigate(ROUTES.PROJECTS)}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  )
}
