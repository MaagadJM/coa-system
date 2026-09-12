import { createContext, useState } from 'react'
import { PROJECT_STATUS } from '../lib/constants'

export const ProjectContext = createContext(null)

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() =>
    loadFromStorage('capin_projects', [])
  )
  const [notifications, setNotifications] = useState(() =>
    loadFromStorage('capin_notifications', [])
  )

  function addProject(data, encodedBy) {
    const newProject = {
      id: crypto.randomUUID(),
      ...data,
      status: PROJECT_STATUS.NOT_STARTED,
      encodedBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updated = [newProject, ...projects]
    setProjects(updated)
    saveToStorage('capin_projects', updated)

    const note = {
      id: crypto.randomUUID(),
      type: 'new_project',
      message: `New project registered: "${newProject.projectName}"`,
      projectId: newProject.id,
      createdAt: new Date().toISOString(),
      readBy: [],
    }
    const updatedNotes = [note, ...notifications]
    setNotifications(updatedNotes)
    saveToStorage('capin_notifications', updatedNotes)

    return newProject
  }

  function updateProject(id, data) {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
    )
    setProjects(updated)
    saveToStorage('capin_projects', updated)
  }

  function getProject(id) {
    return projects.find((p) => p.id === id) ?? null
  }

  function markNotificationsRead(userId) {
    const updated = notifications.map((n) =>
      n.readBy.includes(userId) ? n : { ...n, readBy: [...n.readBy, userId] }
    )
    setNotifications(updated)
    saveToStorage('capin_notifications', updated)
  }

  function unreadCount(userId) {
    return notifications.filter((n) => !n.readBy.includes(userId)).length
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        notifications,
        addProject,
        updateProject,
        getProject,
        markNotificationsRead,
        unreadCount,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
