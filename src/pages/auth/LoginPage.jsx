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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
              Republic of the Philippines
            </p>
            <h1 className="text-2xl font-bold text-blue-900">CAP-In</h1>
            <p className="text-sm text-gray-500 mt-1">
              Collaborative Audit Platform for Infrastructure
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Commission on Audit</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.gov"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-3">Demo Accounts</p>
            <div className="space-y-1 text-xs text-gray-500">
              <div className="flex justify-between"><span>Admin</span><span className="font-mono">admin@capin.gov / admin123</span></div>
              <div className="flex justify-between"><span>Agency Encoder</span><span className="font-mono">encoder@dswd.gov / encoder123</span></div>
              <div className="flex justify-between"><span>ATL</span><span className="font-mono">atl@coa.gov / atl123</span></div>
              <div className="flex justify-between"><span>SA</span><span className="font-mono">sa@coa.gov / sa123</span></div>
              <div className="flex justify-between"><span>CD</span><span className="font-mono">cd@coa.gov / cd123</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
