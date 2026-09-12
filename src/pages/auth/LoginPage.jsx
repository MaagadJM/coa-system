import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ROLE_HOME } from '../../lib/constants'

export function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) {
    navigate(ROLE_HOME[user.role], { replace: true })
    return null
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = login(email.trim(), password)

    if (!result.success) {
      setError(result.message)
      setLoading(false)
      return
    }

    navigate(ROLE_HOME[result.user.role], { replace: true })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Hero */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-blue-900 text-white px-16 py-12">
        <div>
          <p className="text-xs uppercase tracking-widest text-blue-300 mb-1">Republic of the Philippines</p>
          <p className="text-sm font-semibold text-white">Commission on Audit</p>
        </div>

        <div>
          <h1 className="text-5xl font-bold leading-tight mb-4">
            One place for<br />COA audit apps.
          </h1>
          <p className="text-blue-200 text-base leading-relaxed max-w-sm">
            CAP-In helps ensure that government infrastructure spending meets
            public needs — efficiently and transparently.
          </p>
        </div>

        <p className="text-xs text-blue-400">
          Collaborative Audit Platform for Infrastructure &mdash; CAP-In &copy; {new Date().getFullYear()}
        </p>
      </div>

      {/* Right — Neumorphic Login Form */}
      <div
        className="flex flex-col justify-center w-full lg:w-1/2 px-8 py-12"
        style={{ background: '#e0e0e0' }}
      >
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile-only branding */}
          <div className="lg:hidden text-center mb-8">
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#94a3b8' }}>Republic of the Philippines</p>
            <h1 className="text-2xl font-bold" style={{ color: '#1e3a8a' }}>CAP-In</h1>
            <p className="text-sm mt-1" style={{ color: '#64748b' }}>Commission on Audit</p>
          </div>

          {/* Card */}
          <div
            className="p-8 rounded-3xl"
            style={{
              background: '#e0e0e0',
              boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
            }}
          >
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#1e293b' }}>Sign in</h2>
            <p className="text-sm mb-8" style={{ color: '#64748b' }}>Access your CAP-In account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#475569' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.gov"
                  className="w-full px-4 py-3 text-sm rounded-xl outline-none transition"
                  style={{
                    background: '#e0e0e0',
                    boxShadow: 'inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff',
                    border: 'none',
                    color: '#1e293b',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#475569' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 text-sm rounded-xl outline-none transition"
                  style={{
                    background: '#e0e0e0',
                    boxShadow: 'inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff',
                    border: 'none',
                    color: '#1e293b',
                  }}
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 rounded-xl px-4 py-3" style={{ background: '#fee2e2' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="neu-btn-primary w-full text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-60"
                style={{
                  background: 'linear-gradient(145deg, #1e3a8a, #2563eb)',
                  boxShadow: '6px 6px 16px #bebebe, -6px -6px 16px #ffffff',
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
