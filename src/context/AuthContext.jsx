import { createContext, useState } from 'react'
import { MOCK_USERS } from '../mocks/users'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('capin_user')
    return stored ? JSON.parse(stored) : null
  })

  function login(email, password) {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!found) {
      return { success: false, message: 'Invalid email or password.' }
    }

    const { password: _pw, ...safeUser } = found
    setUser(safeUser)
    localStorage.setItem('capin_user', JSON.stringify(safeUser))
    return { success: true, user: safeUser }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('capin_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
