import { ROLES } from '../lib/constants'

export const MOCK_USERS = [
  {
    id: 1,
    name: 'System Admin',
    email: 'admin@capin.gov',
    password: 'admin123',
    role: ROLES.ADMIN,
    agency: null,
  },
  {
    id: 2,
    name: 'Juan dela Cruz',
    email: 'encoder@dswd.gov',
    password: 'encoder123',
    role: ROLES.AGENCY_ENCODER,
    agency: 'Department of Social Welfare and Development',
  },
  {
    id: 3,
    name: 'Maria Santos',
    email: 'atl@coa.gov',
    password: 'atl123',
    role: ROLES.ATL,
    agency: 'Commission on Audit',
  },
  {
    id: 4,
    name: 'Roberto Reyes',
    email: 'sa@coa.gov',
    password: 'sa123',
    role: ROLES.SA,
    agency: 'Commission on Audit',
  },
  {
    id: 5,
    name: 'Nery Aspili-Juanir',
    email: 'cd@coa.gov',
    password: 'cd123',
    role: ROLES.CD,
    agency: 'Commission on Audit',
  },
]
