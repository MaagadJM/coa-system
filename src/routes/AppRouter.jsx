import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ROLE_HOME, ROLES, ROUTES } from '../lib/constants'
import { AdminDashboard } from '../pages/admin/AdminDashboard'
import { AgencyDashboard } from '../pages/agency/AgencyDashboard'
import { ProjectEditPage } from '../pages/agency/ProjectEditPage'
import { ProjectRegisterPage } from '../pages/agency/ProjectRegisterPage'
import { ATLDashboard } from '../pages/atl/ATLDashboard'
import { LoginPage } from '../pages/auth/LoginPage'
import { CDDashboard } from '../pages/cd/CDDashboard'
import { ProjectDetailPage } from '../pages/projects/ProjectDetailPage'
import { ProjectListPage } from '../pages/projects/ProjectListPage'
import { SADashboard } from '../pages/sa/SADashboard'
import { ProtectedRoute } from './ProtectedRoute'

const ALL_AUTHENTICATED = [ROLES.ADMIN, ROLES.AGENCY_ENCODER, ROLES.ATL, ROLES.SA, ROLES.CD]

function RootRedirect() {
  const { user } = useAuth()
  if (user) return <Navigate to={ROLE_HOME[user.role]} replace />
  return <Navigate to={ROUTES.LOGIN} replace />
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      <Route
        path={ROUTES.ADMIN}
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.AGENCY}
        element={
          <ProtectedRoute allowedRoles={[ROLES.AGENCY_ENCODER]}>
            <AgencyDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.ATL}
        element={
          <ProtectedRoute allowedRoles={[ROLES.ATL]}>
            <ATLDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.SA}
        element={
          <ProtectedRoute allowedRoles={[ROLES.SA]}>
            <SADashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.CD}
        element={
          <ProtectedRoute allowedRoles={[ROLES.CD]}>
            <CDDashboard />
          </ProtectedRoute>
        }
      />

      {/* Project routes — accessible to all authenticated roles */}
      <Route
        path={ROUTES.PROJECTS}
        element={
          <ProtectedRoute allowedRoles={ALL_AUTHENTICATED}>
            <ProjectListPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PROJECT_NEW}
        element={
          <ProtectedRoute allowedRoles={[ROLES.AGENCY_ENCODER]}>
            <ProjectRegisterPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PROJECT_DETAIL}
        element={
          <ProtectedRoute allowedRoles={ALL_AUTHENTICATED}>
            <ProjectDetailPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PROJECT_EDIT}
        element={
          <ProtectedRoute allowedRoles={[ROLES.AGENCY_ENCODER]}>
            <ProjectEditPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
