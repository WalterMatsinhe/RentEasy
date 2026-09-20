import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { mockApplications, mockNotifications, mockPayments } from '@/utils/mockData'

export default function StudentDashboard() {
  const { user } = useAuth()

  const activeApplication = mockApplications[0]
  const recentNotifications = mockNotifications.slice(0, 3)
  const pendingPayment = mockPayments.find(p => p.status === 'pending')
  const unreadCount = mockNotifications.filter(n => !n.isRead).length

  const quickLinks = [
    { label: 'My Applications', to: '/student/applications', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'Browse Rooms', to: '/student/rooms', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'My Allocation', to: '/student/allocation', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
    { label: 'Payments', to: '/student/payments', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  ]

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Welcome back, <span className="text-[#264559] font-semibold">{user?.name}</span>. Here's what's happening with your housing.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Top 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        {/* Application Status */}
        <div className="relative bg-gradient-to-br from-[#264559] to-[#1a3347] text-white rounded-2xl p-6 shadow-lg overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -right-2 -bottom-6 w-16 h-16 bg-white/10 rounded-full" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/70 text-sm font-medium">Application Status</p>
              <span className="px-2.5 py-1 bg-[#E5E642] text-[#264559] text-xs font-bold rounded-full uppercase tracking-wide">
                {activeApplication?.status || 'None'}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-white/80 text-sm leading-relaxed">
                {activeApplication
                  ? 'Your application has been approved. You are ready to move in!'
                  : 'You have not applied for any rooms yet.'}
              </p>
            </div>
            <Link to="/student/applications" className="mt-4 text-[#E5E642] text-sm font-medium hover:underline inline-flex items-center gap-1">
              View Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        {/* Next Payment */}
        <div className="relative bg-gradient-to-br from-[#E5E642] to-[#b5b630] text-[#264559] rounded-2xl p-6 shadow-lg overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-black/5 rounded-full" />
          <div className="absolute -right-2 -bottom-6 w-16 h-16 bg-black/5 rounded-full" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#264559]/70 text-sm font-medium">Next Payment</p>
              <div className="w-9 h-9 bg-black/10 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-[#264559]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              {pendingPayment ? (
                <>
                  <p className="text-4xl font-bold">KSh {pendingPayment.amount}</p>
                  <p className="text-[#264559]/70 text-sm font-medium mt-1">Due in 3 days</p>
                </>
              ) : (
                <p className="text-[#264559]/60 text-sm">No pending payments.</p>
              )}
            </div>
            <Link to="/student/payments" className="mt-4 text-[#264559] text-sm font-bold hover:underline inline-flex items-center gap-1">
              Manage Payments
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-sm font-medium">Recent Notifications</p>
            {unreadCount > 0 && (
              <span className="w-6 h-6 bg-[#264559] text-[#E5E642] text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex-1 space-y-3">
            {recentNotifications.map(notification => (
              <div key={notification.id} className="flex gap-3 items-start">
                <span className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${notification.isRead ? 'bg-gray-300' : 'bg-[#E5E642]'}`} />
                <p className={`text-sm leading-snug ${notification.isRead ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                  {notification.title}
                </p>
              </div>
            ))}
          </div>
          <Link to="/student/notifications" className="mt-4 text-[#264559] text-sm font-medium hover:underline inline-flex items-center gap-1">
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>

      {/* Quick Links + CTA Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Quick Links</h2>
          <div className="space-y-2">
            {quickLinks.map((link, i) => (
              <Link
                key={link.label}
                to={link.to}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${i % 2 === 0 ? 'bg-[#264559]' : 'bg-[#E5E642]'}`}>
                  <svg className={`w-5 h-5 ${i % 2 === 0 ? 'text-white' : 'text-[#264559]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{link.label}</span>
                <svg className="w-4 h-4 text-gray-300 ml-auto group-hover:text-gray-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="lg:col-span-2 relative bg-gradient-to-br from-[#264559] to-[#1a3347] text-white rounded-2xl p-8 shadow-lg overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute right-20 -bottom-10 w-24 h-24 bg-[#E5E642]/10 rounded-full" />
          <div className="relative z-10">
            <h3 className="font-serif text-2xl font-bold mb-2">Need a new room?</h3>
            <p className="text-white/70 text-sm">Browse our latest listings for the upcoming semester.</p>
          </div>
          <Link
            to="/student/rooms"
            className="relative z-10 shrink-0 px-6 py-3 bg-[#E5E642] text-[#264559] font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md"
          >
            Browse Rooms
          </Link>
        </div>
      </div>

    </div>
  )
}
