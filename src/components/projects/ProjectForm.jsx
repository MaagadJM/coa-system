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
            className={inputClass} style={neuInputStyle}
          />
        </Field>

        <Field label="Description" required>
          <textarea
            name="description"
            defaultValue={defaultValues.description}
            required
            rows={3}
            placeholder="Brief description of the project..."
            className={inputClass} style={neuInputStyle}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Implementing Government Agency" required>
            <input
              name="implementingAgency"
              defaultValue={defaultValues.implementingAgency}
              required
              placeholder="e.g. Department of Public Works and Highways"
              className={inputClass} style={neuInputStyle}
            />
          </Field>

          <Field label="Contractor" required>
            <input
              name="contractor"
              defaultValue={defaultValues.contractor}
              required
              placeholder="e.g. ABC Builders Corporation"
              className={inputClass} style={neuInputStyle}
            />
          </Field>
        </div>

        <Field label="Project Location" required>
          <input
            name="location"
            defaultValue={defaultValues.location}
            required
            placeholder="e.g. Metro Manila"
            className={inputClass} style={neuInputStyle}
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
              className={inputClass} style={neuInputStyle}
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
              className={inputClass} style={neuInputStyle}
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
            className={inputClass} style={neuInputStyle}
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
              className={inputClass} style={neuInputStyle}
            />
          </Field>

          <Field label="Target Completion Date" required>
            <input
              name="completionDate"
              type="date"
              defaultValue={defaultValues.completionDate}
              required
              className={inputClass} style={neuInputStyle}
            />
          </Field>
        </div>
      </Section>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="neu-btn px-5 py-2.5 text-sm font-medium rounded-xl"
          style={{
            background: '#f0f0f0',
            boxShadow: '5px 5px 12px #d1d1d1, -5px -5px 12px #ffffff',
            color: '#475569',
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="neu-btn-primary px-5 py-2.5 text-sm font-semibold text-white rounded-xl disabled:opacity-60"
          style={{
            background: 'linear-gradient(145deg, #1e3a8a, #2563eb)',
            boxShadow: '5px 5px 12px #d1d1d1, -5px -5px 12px #ffffff',
          }}
        >
          {loading ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  )
}

function Section({ title, children }) {
  return (
    <div
      className="rounded-2xl p-5 space-y-4"
      style={{ background: '#f0f0f0', boxShadow: '8px 8px 20px #d1d1d1, -8px -8px 20px #ffffff' }}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#64748b' }}>{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#475569' }}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  )
}

const neuInputStyle = {
  background: '#f0f0f0',
  boxShadow: 'inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff',
  border: 'none',
  color: '#1e293b',
}

const inputClass = 'w-full px-3.5 py-2.5 text-sm rounded-xl outline-none transition'
