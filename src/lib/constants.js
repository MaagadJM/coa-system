export const ROLES = {
  ADMIN: 'admin',
  AGENCY_ENCODER: 'agency_encoder',
  ATL: 'atl',
  SA: 'sa',
  CD: 'cd',
}

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'System Administrator',
  [ROLES.AGENCY_ENCODER]: 'Agency Encoder',
  [ROLES.ATL]: 'Audit Team Leader',
  [ROLES.SA]: 'Supervising Auditor',
  [ROLES.CD]: 'Cluster Director',
}

export const ROUTES = {
  LOGIN: '/login',
  ADMIN: '/admin',
  AGENCY: '/agency',
  ATL: '/atl',
  SA: '/sa',
  CD: '/cd',
  PROJECTS: '/projects',
  PROJECT_NEW: '/projects/new',
  PROJECT_DETAIL: '/projects/:id',
  PROJECT_EDIT: '/projects/:id/edit',
}

export const ROLE_HOME = {
  [ROLES.ADMIN]: ROUTES.ADMIN,
  [ROLES.AGENCY_ENCODER]: ROUTES.AGENCY,
  [ROLES.ATL]: ROUTES.ATL,
  [ROLES.SA]: ROUTES.SA,
  [ROLES.CD]: ROUTES.CD,
}

export const PROJECT_STATUS = {
  NOT_STARTED: 'not_started',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  DELAYED: 'delayed',
}

export const PROJECT_STATUS_LABELS = {
  [PROJECT_STATUS.NOT_STARTED]: 'Not Yet Started',
  [PROJECT_STATUS.ONGOING]: 'Ongoing',
  [PROJECT_STATUS.COMPLETED]: 'Completed',
  [PROJECT_STATUS.DELAYED]: 'Delayed',
}

export const PROJECT_STATUS_COLORS = {
  [PROJECT_STATUS.NOT_STARTED]: 'bg-gray-100 text-gray-600',
  [PROJECT_STATUS.ONGOING]: 'bg-blue-100 text-blue-700',
  [PROJECT_STATUS.COMPLETED]: 'bg-green-100 text-green-700',
  [PROJECT_STATUS.DELAYED]: 'bg-red-100 text-red-700',
}

export const PROCUREMENT_MODES = [
  'Public Bidding',
  'Negotiated Procurement',
  'Small Value Procurement',
  'Shopping',
  'Direct Contracting',
  'Emergency Cases',
]

export const FUNDING_SOURCES = [
  'General Appropriations Act (GAA)',
  'Special Purpose Fund (SPF)',
  'Locally Funded Project (LFP)',
  'Foreign Assisted Project (FAP)',
  'Internally Generated Fund (IGF)',
  'Trust Fund',
]
