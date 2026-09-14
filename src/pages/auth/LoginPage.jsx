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
  const [showPassword, setShowPassword] = useState(false)

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
          <p className="text-sm uppercase tracking-widest text-blue-300 mb-1">Republic of the Philippines</p>
          <p className="text-base font-semibold text-white">Commission on Audit</p>
        </div>

        <div>
          <h1 className="text-6xl font-bold leading-tight mb-4">
            One place for<br />COA audit apps.
          </h1>
          <p className="text-blue-200 text-xl leading-relaxed max-w-sm">
            CAP-In helps ensure that government infrastructure spending meets
            public needs — efficiently and transparently.
          </p>
        </div>

        <p className="text-sm text-blue-400">
          Collaborative Audit Platform for Infrastructure &mdash; CAP-In &copy; {new Date().getFullYear()}
        </p>
      </div>

      {/* Right — Login Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 py-12" style={{ background: '#f9fcff' }}>
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile-only branding */}
          <div className="lg:hidden text-center mb-8">
            <p className="text-sm uppercase tracking-widest text-slate-400 mb-1">Republic of the Philippines</p>
            <h1 className="text-3xl font-bold text-blue-900">CAP-In</h1>
            <p className="text-base mt-1 text-slate-500">Commission on Audit</p>
          </div>

          {/* Card */}
          <div className="p-8 rounded-2xl border border-gray-200 shadow-lg" style={{ background: '#f9fcff' }}>
            <h2 className="text-3xl font-bold mb-1 text-slate-800">Sign in</h2>
            <p className="text-base mb-8 text-slate-500">Access your CAP-In account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold uppercase tracking-wide mb-2 text-slate-600">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.gov"
                  className="w-full px-4 py-3 text-base rounded-xl outline-none transition border border-gray-300 bg-[#f9fcff] text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold uppercase tracking-wide mb-2 text-slate-600">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-11 text-base rounded-xl outline-none transition border border-gray-300 bg-[#f9fcff] text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-base text-red-600 rounded-xl px-4 py-3 bg-red-50">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-semibold py-3 rounded-xl text-base disabled:opacity-60 hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(145deg, #1e3a8a, #2563eb)' }}
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
