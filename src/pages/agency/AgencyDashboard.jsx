import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import { PROJECT_STATUS, PROJECT_STATUS_LABELS, ROUTES } from '../../lib/constants'

const STATUS_ORDER = [
  PROJECT_STATUS.NOT_STARTED,
  PROJECT_STATUS.ONGOING,
  PROJECT_STATUS.COMPLETED,
  PROJECT_STATUS.DELAYED,
]

export function AgencyDashboard() {
  const { user } = useAuth()
  const { projects } = useProjects()
  const navigate = useNavigate()

  const myProjects = projects.filter((p) => p.encodedBy?.agency === user.agency)

  const firstName = user.name.split(' ')[0]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const grouped = {}
  for (const status of STATUS_ORDER) {
    grouped[status] = myProjects.filter((p) => p.status === status)
  }

  return (
    <DashboardLayout>
      {/* Greeting */}
      <div className="mb-6">
        <p className="text-[10px] md:text-sm font-semibold uppercase tracking-widest text-gray-400 mb-1">{user.agency}</p>
        <h2 className="text-xl md:text-3xl font-bold text-gray-800">{greeting}, {firstName}!</h2>
      </div>

      {/* Main board card — folder style */}
      <div className="relative mt-12">
        {/* Folder tab */}
        <div className="absolute top-px left-0 -translate-y-full flex items-end">
          <div className="h-11 px-6 bg-[rgb(232,235,240)] rounded-t-2xl flex items-center">
            <span className="text-sm font-bold text-gray-700">Project Overview</span>
          </div>
          {/* Inverse-rounded corner connecting tab to card body */}
          <div className="relative w-3 h-3 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-7 h-16 rounded-full shadow-[0_0_0_20px_#e8ebf0]" />
          </div>
        </div>

        {/* Right folder tab */}
        <div className="absolute top-px right-0 -translate-y-full flex items-end flex-row-reverse">
          <div className="h-11 px-4 bg-white/30 rounded-t-2xl flex items-center gap-2">
            <button
              onClick={() => navigate(ROUTES.PROJECT_NEW)}
              className="w-6 h-6 rounded-full bg-white/60 text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="Register Project"
            >
              <PlusIcon />
            </button>
            <button
              onClick={() => navigate(ROUTES.PROJECTS)}
              className="w-6 h-6 rounded-full bg-white/60 text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="View All Projects"
            >
              <ListIcon />
            </button>
          </div>
          {/* Inverse-rounded corner connecting right tab to card body */}
          <div className="relative w-3 h-3 overflow-hidden">
            <div className="absolute bottom-0 right-0 w-7 h-16 rounded-full shadow-[0_0_0_20px_rgba(255,255,255,0.3)]" />
          </div>
        </div>

        {/* Card body */}
        <div
          className="rounded-2xl rounded-tl-none rounded-tr-none pt-6 pb-6 px-6"
          style={{ background: 'linear-gradient(to right, rgb(232,235,240), rgba(255,255,255,0.6) 53%, rgba(255,255,255,0.4) 66%, rgba(255,255,255,0.3))' }}
        >
          {/* Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATUS_ORDER.map((status) => (
              <StatusColumn
                key={status}
                status={status}
                projects={grouped[status]}
                onView={(id) => navigate(`/projects/${id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function StatusColumn({ status, projects, onView }) {
  const dotColor = {
    [PROJECT_STATUS.NOT_STARTED]: 'bg-gray-400',
    [PROJECT_STATUS.ONGOING]: 'bg-blue-400',
    [PROJECT_STATUS.COMPLETED]: 'bg-green-400',
    [PROJECT_STATUS.DELAYED]: 'bg-red-400',
  }

  return (
    <div>
      {/* Column header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className={`w-2 h-2 rounded-full ${dotColor[status]}`} />
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {PROJECT_STATUS_LABELS[status]}
        </span>
        <span className="text-xs font-bold text-gray-500 ml-auto">{projects.length}</span>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {projects.length === 0 && (
          <div className="rounded-xl bg-white/70 border border-dashed border-gray-300 px-4 py-6 text-center">
            <p className="text-sm text-gray-500">No projects</p>
          </div>
        )}
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onView(project.id)}
            className="w-full text-left rounded-xl bg-white/80 hover:bg-white px-4 py-4 transition-colors"
          >
            <p className="text-sm font-semibold text-gray-700 leading-snug">{project.projectName}</p>
            {project.location && (
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <LocationIcon />
                {project.location}
              </p>
            )}
            {project.contractor && (
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                <UserIcon />
                {project.contractor}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---- Icons ---- */

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}
