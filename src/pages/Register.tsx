import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import loginBg from '@/assets/login-bg.jpg'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    university: '',
    contactNumber: '',
  })
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleDemoLogin = () => {
    login('student')
    navigate('/student/dashboard')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For demo purposes, we will default to student login if form is submitted
    login('student', formData.email)
    navigate('/student/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-[2px]"
        style={{ backgroundImage: `url(${loginBg})` }}
      />
      <div className="absolute inset-0 z-0 bg-black/30" />
      
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl relative z-10">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900">Create a Student Account</h2>
          <p className="mt-1 text-xs text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80">Sign in instead</Link>
          </p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
              <input
                id="name" name="name" type="text" required
                className="block w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={formData.name} onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email" name="email" type="email" required
                className="block w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={formData.email} onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password" name="password" type="password" required
                className="block w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={formData.password} onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="university" className="block text-xs font-medium text-gray-700 mb-1">University</label>
              <input
                id="university" name="university" type="text" required
                className="block w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary focus:border-primary"
                value={formData.university} onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="contactNumber" className="block text-xs font-medium text-gray-700 mb-1">Contact Number</label>
            <input
              id="contactNumber" name="contactNumber" type="text" required
              className="block w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={formData.contactNumber} onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full mt-1">Register</Button>
        </form>

        <div className="mt-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
            <div className="relative flex justify-center text-xs"><span className="px-2 bg-white text-gray-500">Demo Access</span></div>
          </div>
          <div className="mt-3">
            <Button variant="secondary" onClick={handleDemoLogin} className="w-full text-sm font-medium">
              Skip & Continue as Student
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
