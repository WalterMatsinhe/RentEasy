import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { mockRooms, mockApplications } from '@/utils/mockData'
import { useAuth } from '@/context/AuthContext'
import { Student } from '@/types'
import Button from '@/components/ui/Button'

export default function StudentApply() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const roomId = searchParams.get('roomId')
  
  const room = mockRooms.find(r => r.id === roomId)
  const student = user as Student
  
  // Form State
  const [formData, setFormData] = useState({
    studentNumber: '',
    fullName: '',
    phoneNumber: '',
    course: '',
    yearOfStudy: '',
    gender: '',
    additionalInfo: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Pre-fill student data
  useEffect(() => {
    if (student) {
      setFormData(prev => ({
        ...prev,
        studentNumber: student.studentId || '',
        fullName: student.name || '',
        phoneNumber: student.contactNumber || ''
      }))
    }
  }, [student])

  if (!room) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Room Not Found</h2>
        <Button onClick={() => navigate('/student/rooms')}>Go Back to Rooms</Button>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.studentNumber) newErrors.studentNumber = 'Student number is required'
    if (!formData.fullName) newErrors.fullName = 'Full name is required'
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required'
    if (!formData.course) newErrors.course = 'Course is required'
    if (!formData.yearOfStudy) newErrors.yearOfStudy = 'Year of study is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return
    
    setIsSubmitting(true)
    
    // Simulate API call and saving
    setTimeout(() => {
      // Mock saving logic
      mockApplications.unshift({
        id: `app-${Date.now()}`,
        studentId: student?.id || 'unknown',
        roomId: room.id,
        status: 'pending',
        appliedAt: new Date().toISOString(),
        ...formData
      })
      
      setIsSubmitting(false)
      navigate('/student/applications')
    }, 1500)
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/student/rooms')}
          className="text-primary font-medium hover:underline flex items-center gap-2 mb-4"
        >
          &larr; Back to Rooms
        </button>
        <h1 className="font-serif text-3xl font-bold text-gray-900">Accommodation Application</h1>
        <p className="text-gray-600 mt-1">Please fill out all required details to secure your room.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Room Summary Sticky sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-32">
            <img src={room.image} alt={room.title} className="w-full h-40 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{room.title}</h3>
              <p className="text-gray-500 mb-6">{room.district}, {room.city}</p>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-500">Room</span>
                  <span className="font-semibold text-gray-900">{room.roomNumber} (Block {room.block})</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-500">Type</span>
                  <span className="font-semibold text-gray-900 capitalize">{room.type}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-500">Monthly Rent</span>
                  <span className="font-semibold text-primary text-lg">KSh {room.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Student Details</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student Number *</label>
                  <input
                    type="text"
                    name="studentNumber"
                    value={formData.studentNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.studentNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.studentNumber && <p className="text-red-500 text-xs mt-1">{errors.studentNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.gender ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course of Study *</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="e.g. Computer Engineering"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.course ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study *</label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.yearOfStudy ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">PhD</option>
                  </select>
                  {errors.yearOfStudy && <p className="text-red-500 text-xs mt-1">{errors.yearOfStudy}</p>}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information (Optional)</label>
                <textarea
                  name="additionalInfo"
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Any medical conditions, room preferences, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Submit Area */}
              <div className="pt-6">
                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm border border-blue-100 mb-6">
                  <strong>Important:</strong> Submission of this form constitutes a formal application. If approved, you will be required to process the first rent payment to secure your allocation.
                </div>

                <Button 
                  type="submit" 
                  className="w-full flex justify-center py-4 text-lg shadow-lg hover:-translate-y-0.5" 
                  disabled={isSubmitting || room.availabilityStatus !== 'available'}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
