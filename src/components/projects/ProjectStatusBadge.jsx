import { PROJECT_STATUS_COLORS, PROJECT_STATUS_LABELS } from '../../lib/constants'

export function ProjectStatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${PROJECT_STATUS_COLORS[status]}`}>
      {PROJECT_STATUS_LABELS[status] ?? status}
    </span>
  )
}
