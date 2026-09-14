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
            <SelectWrapper>
              <select
                name="procurementMode"
                defaultValue={defaultValues.procurementMode ?? ''}
                required
                className={selectClass}
              >
                <option value="" disabled>Select mode...</option>
                {PROCUREMENT_MODES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </SelectWrapper>
          </Field>

          <Field label="Funding Source" required>
            <SelectWrapper>
              <select
                name="fundingSource"
                defaultValue={defaultValues.fundingSource ?? ''}
                required
                className={selectClass}
              >
                <option value="" disabled>Select source...</option>
                {FUNDING_SOURCES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </SelectWrapper>
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
          className="px-5 py-2.5 text-base font-medium rounded-xl border border-gray-300 bg-[#f9fcff] text-slate-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 text-base font-semibold text-white rounded-xl disabled:opacity-60 hover:opacity-90 transition-opacity"
          style={{ background: 'linear-gradient(145deg, #1e3a8a, #2563eb)' }}
        >
          {loading ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  )
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl p-5 space-y-4 bg-[#f9fcff] border border-gray-200">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold uppercase tracking-wide text-slate-600">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass = 'w-full px-3.5 py-2.5 text-base rounded-xl outline-none transition border border-gray-300 bg-[#f9fcff] text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'

const selectClass = inputClass + ' appearance-none pr-10'

function SelectWrapper({ children }) {
  return (
    <div className="relative">
      {children}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
