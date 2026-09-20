import { useAuth } from '@/context/AuthContext'
import { Student } from '@/types'
import { Link } from 'react-router-dom'
import studentImg from '@/assets/african-student.jpg'

export default function StudentProfile() {
  const { user } = useAuth()

  if (!user || user.role !== 'student') return null

  const student = user as Student

  const infoItems = [
    { label: 'Email Address', value: user.email, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: 'Student ID', value: student.studentId, icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2' },
    { label: 'Contact Number', value: student.contactNumber || 'Not provided', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
    { label: 'University', value: 'Africa Nazarene University', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' },
  ]

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1 text-sm">Manage your personal information and account details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Profile Card with Image */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Student Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={studentImg}
                alt="Student"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#264559]/80 via-transparent to-transparent" />
            </div>

            {/* Name + University below image */}
            <div className="relative bg-gradient-to-br from-[#264559] to-[#1a3347] px-6 pt-4 pb-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-[#E5E642] rounded-full flex items-center justify-center text-[#264559] text-xl font-bold shadow-md shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold leading-tight">{user.name}</h2>
                  <p className="text-white/70 text-xs">Student</p>
                </div>
              </div>

              {/* University Badge */}
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 mt-2">
                <svg className="w-4 h-4 text-[#E5E642] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span className="text-sm font-semibold text-white">Africa Nazarene University</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100">
              <div className="p-4 text-center">
                <p className="text-xl font-bold text-[#264559]">{student.studentId}</p>
                <p className="text-xs text-gray-500 mt-0.5">Student ID</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-xl font-bold text-[#264559]">2026</p>
                <p className="text-xs text-gray-500 mt-0.5">Enrollment Year</p>
              </div>
            </div>
          </div>


        </div>

        {/* Right: Personal Info */}
        <div className="lg:col-span-2 space-y-5">

          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
              <span className="px-3 py-1 bg-[#E5E642]/20 text-[#264559] text-xs font-semibold rounded-full">Active Student</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 bg-[#264559] rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                    <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* University Banner */}
          <div className="relative bg-gradient-to-br from-[#264559] to-[#1a3347] rounded-2xl p-6 overflow-hidden text-white shadow-lg">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full" />
            <div className="absolute right-16 -bottom-8 w-20 h-20 bg-[#E5E642]/10 rounded-full" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#E5E642] rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#264559]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                  </div>
                  <span className="text-[#E5E642] text-xs font-bold uppercase tracking-widest">Enrolled At</span>
                </div>
                <h3 className="text-2xl font-bold">Africa Nazarene University</h3>
                <p className="text-white/60 text-sm mt-1">Nairobi, Kenya · Est. 1994</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#E5E642]">ANU</p>
                <p className="text-white/50 text-xs mt-1">Student Portal</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
