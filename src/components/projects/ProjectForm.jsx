import { FUNDING_SOURCES, PROCUREMENT_MODES } from '../../lib/constants'

export function ProjectForm({ defaultValues = {}, onSubmit, onCancel, loading }) {
  function handleSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Section title="Project Information">
        <Field label="Project Name" required>
          <input
            name="projectName"
            defaultValue={defaultValues.projectName}
            required
            placeholder="e.g. Construction of 25-storey Building"
            className={inputClass}
          />
        </Field>

        <Field label="Description" required>
          <textarea
            name="description"
            defaultValue={defaultValues.description}
            required
            rows={3}
            placeholder="Brief description of the project..."
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Implementing Government Agency" required>
            <input
              name="implementingAgency"
              defaultValue={defaultValues.implementingAgency}
              required
              placeholder="e.g. Department of Public Works and Highways"
              className={inputClass}
            />
          </Field>

          <Field label="Contractor" required>
            <input
              name="contractor"
              defaultValue={defaultValues.contractor}
              required
              placeholder="e.g. ABC Builders Corporation"
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Project Location" required>
          <input
            name="location"
            defaultValue={defaultValues.location}
            required
            placeholder="e.g. Metro Manila"
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Procurement & Funding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Mode of Procurement" required>
            <select
              name="procurementMode"
              defaultValue={defaultValues.procurementMode ?? ''}
              required
              className={inputClass}
            >
              <option value="" disabled>Select mode...</option>
              {PROCUREMENT_MODES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </Field>

          <Field label="Funding Source" required>
            <select
              name="fundingSource"
              defaultValue={defaultValues.fundingSource ?? ''}
              required
              className={inputClass}
            >
              <option value="" disabled>Select source...</option>
              {FUNDING_SOURCES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Project Cost (PHP)" required>
          <input
            name="projectCost"
            type="number"
            defaultValue={defaultValues.projectCost}
            required
            min={0}
            step="0.01"
            placeholder="e.g. 25000000"
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Project Timeline">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Target Start Date" required>
            <input
              name="startDate"
              type="date"
              defaultValue={defaultValues.startDate}
              required
              className={inputClass}
            />
          </Field>

          <Field label="Target Completion Date" required>
            <input
              name="completionDate"
              type="date"
              defaultValue={defaultValues.completionDate}
              required
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 text-sm font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-60"
        >
          {loading ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 space-y-4">
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
