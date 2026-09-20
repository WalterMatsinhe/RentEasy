import { createContext, useContext, useState, ReactNode } from 'react'
import { Application } from '@/types'
import { mockApplications } from '@/utils/mockData'

interface ApplicationContextType {
  applications: Application[]
  updateApplicationStatus: (id: string, status: Application['status']) => void
  addApplication: (app: Omit<Application, 'id' | 'status' | 'appliedAt'>) => void
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useState<Application[]>(mockApplications)

  const updateApplicationStatus = (id: string, status: Application['status']) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status } : app
    ))
  }

  const addApplication = (appData: Omit<Application, 'id' | 'status' | 'appliedAt'>) => {
    const newApp: Application = {
      ...appData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      appliedAt: new Date().toISOString()
    }
    setApplications(prev => [...prev, newApp])
  }

  return (
    <ApplicationContext.Provider value={{ applications, updateApplicationStatus, addApplication }}>
      {children}
    </ApplicationContext.Provider>
  )
}

export const useApplications = () => {
  const context = useContext(ApplicationContext)
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationProvider')
  }
  return context
}
