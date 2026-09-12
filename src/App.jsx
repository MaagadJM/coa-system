import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProjectProvider } from './context/ProjectContext'
import { AppRouter } from './routes/AppRouter'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <AppRouter />
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
