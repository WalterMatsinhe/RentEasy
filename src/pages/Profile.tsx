import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import { Student, Administrator } from '@/types'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) return null

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const isStudent = user.role === 'student'
  const studentData = user as Student
  const adminData = user as Administrator

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-primary px-8 py-12 text-white">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white/30 backdrop-blur-sm">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">{user.name}</h1>
              <p className="text-primary-foreground/80 capitalize bg-white/10 inline-block px-3 py-1 rounded-full text-sm">
                {user.role.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="px-8 py-8">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-2xl font-bold text-gray-900 font-serif">Account Details</h2>
            <Button variant="secondary" onClick={handleLogout} className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                <div className="text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">{user.email}</div>
              </div>

              {isStudent ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Student ID</label>
                    <div className="text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">{studentData.studentId}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">University</label>
                    <div className="text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">{studentData.university}</div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                  <div className="text-gray-900 font-medium bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">{adminData.department || 'Management'}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
