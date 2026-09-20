import { createContext, useContext, ReactNode } from 'react'
import { User, Student, Administrator } from '@/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (role: 'student' | 'hostel_admin', email?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_STUDENT: Student = {
  id: 'stu_1',
  name: 'Demo Student',
  email: 'student@example.com',
  role: 'student',
  studentId: '2026101',
  university: 'Adana University',
  contactNumber: '+90 555 123 4567',
}

const MOCK_ADMIN: Administrator = {
  id: 'adm_1',
  name: 'Demo Admin',
  email: 'admin@hostels.com',
  role: 'hostel_admin',
  department: 'Seyhan Premium Dormitory Management',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>('renteasy_user', null)

  const login = (role: 'student' | 'hostel_admin') => {
    // For demo purposes, we automatically log in the mock user based on the selected role
    if (role === 'student') {
      setUser(MOCK_STUDENT)
    } else {
      setUser(MOCK_ADMIN)
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
