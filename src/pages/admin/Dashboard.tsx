import { useRooms } from '@/context/RoomContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { rooms } = useRooms()

  const totalRooms = rooms.length
  const occupiedBeds = rooms.reduce((acc, room) => acc + room.occupiedBeds, 0)
  const totalBeds = rooms.reduce((acc, room) => acc + room.capacity, 0)
  const availableBeds = totalBeds - occupiedBeds
  const occupancyPercentage = totalBeds === 0 ? 0 : Math.round((occupiedBeds / totalBeds) * 100)

  const stats = {
    totalStudents: 1254,
    totalRooms,
    availableBeds,
    occupiedBeds,
    pendingApplications: 28,
    approvedApplications: 312,
    rejectedApplications: 15,
  }

  const quickLinks = [
    { label: 'Manage Rooms', to: '/admin/rooms', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5', color: 'from-[#264559] to-[#1a3347]', textDark: false },
    { label: 'Applications', to: '/admin/applications', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'from-[#E5E642] to-[#c8c93a]', textDark: true },
    { label: 'Allocations', to: '/admin/allocations', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: 'from-[#2d5a73] to-[#264559]', textDark: false },
    { label: 'Reports', to: '/admin/reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14', color: 'from-[#E5E642] to-[#b5b630]', textDark: true },
  ]

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Hero Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* Students */}
        <div className="relative bg-gradient-to-br from-primary to-[#1a3347] text-white rounded-2xl p-6 shadow-lg overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -right-2 -bottom-6 w-16 h-16 bg-white/10 rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/70 text-sm font-medium">Total Students</p>
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold">{stats.totalStudents.toLocaleString()}</p>
            <div className="mt-3 flex items-center gap-1.5 text-emerald-300 text-xs font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              12% from last month
            </div>
          </div>
        </div>

        {/* Total Rooms */}
        <div className="relative bg-gradient-to-br from-[#2d5a73] to-[#1a3347] text-white rounded-2xl p-6 shadow-lg overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -right-2 -bottom-6 w-16 h-16 bg-white/10 rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-white/70 text-sm font-medium">Total Rooms</p>
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold">{stats.totalRooms}</p>
            <div className="mt-3 text-white/60 text-xs">{availableBeds} beds available</div>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="relative bg-gradient-to-br from-[#E5E642] to-[#b5b630] text-[#264559] rounded-2xl p-6 shadow-lg overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-black/5 rounded-full" />
          <div className="absolute -right-2 -bottom-6 w-16 h-16 bg-black/5 rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#264559]/70 text-sm font-medium">Occupancy Rate</p>
              <div className="w-9 h-9 bg-black/10 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-[#264559]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold">{occupancyPercentage}%</p>
            <div className="mt-3">
              <div className="w-full bg-black/20 rounded-full h-1.5">
                <div className="bg-[#264559] h-1.5 rounded-full transition-all duration-700" style={{ width: `${occupancyPercentage}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bed Status */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-sm font-medium">Bed Status</p>
            <div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.occupiedBeds}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                <p className="text-xs text-gray-500">Occupied</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">{stats.availableBeds}</p>
              <div className="flex items-center gap-1 mt-1 justify-end">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                <p className="text-xs text-gray-500">Available</p>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-red-400 to-red-500 h-2 rounded-full" style={{ width: `${occupancyPercentage}%` }} />
          </div>
        </div>
      </div>

      {/* Applications + Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

        {/* Applications Summary */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Applications Summary</h2>
            <Link to="/admin/applications" className="text-xs text-primary hover:underline font-medium">View All →</Link>
          </div>
          <div className="grid grid-cols-3 gap-4">

            {/* Pending */}
            <div className="bg-[#264559]/5 rounded-xl p-4 border border-[#264559]/10">
              <div className="w-10 h-10 bg-[#264559]/10 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#264559]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingApplications}</p>
              <p className="text-xs text-[#264559] font-medium mt-1">Pending</p>
              <div className="mt-2 w-full bg-[#264559]/10 rounded-full h-1">
                <div className="bg-[#264559] h-1 rounded-full" style={{ width: '40%' }} />
              </div>
            </div>

            {/* Approved */}
            <div className="bg-[#E5E642]/10 rounded-xl p-4 border border-[#E5E642]/30">
              <div className="w-10 h-10 bg-[#E5E642]/20 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#8a8a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.approvedApplications}</p>
              <p className="text-xs text-[#8a8a00] font-medium mt-1">Approved</p>
              <div className="mt-2 w-full bg-[#E5E642]/20 rounded-full h-1">
                <div className="bg-[#E5E642] h-1 rounded-full" style={{ width: '88%' }} />
              </div>
            </div>

            {/* Rejected */}
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.rejectedApplications}</p>
              <p className="text-xs text-red-600 font-medium mt-1">Rejected</p>
              <div className="mt-2 w-full bg-red-200 rounded-full h-1">
                <div className="bg-red-500 h-1 rounded-full" style={{ width: '14%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Quick Actions</h2>
          <div className="space-y-3">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center shrink-0`}>
                  <svg className="w-4.5 h-4.5 text-white w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </div>

      {/* Room Status Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Room Status Overview</h2>
          <Link to="/admin/rooms" className="text-xs text-primary hover:underline font-medium">Manage Rooms →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="text-left pb-3 font-medium">Room</th>
                <th className="text-left pb-3 font-medium">Type</th>
                <th className="text-left pb-3 font-medium">Capacity</th>
                <th className="text-left pb-3 font-medium">Occupancy</th>
                <th className="text-left pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rooms.slice(0, 5).map((room) => {
                const pct = room.capacity === 0 ? 0 : Math.round((room.occupiedBeds / room.capacity) * 100)
                const statusLabel = room.availabilityStatus.replace('_', ' ')
                const statusColor =
                  room.availabilityStatus === 'available' ? 'bg-emerald-100 text-emerald-700' :
                  room.availabilityStatus === 'full' ? 'bg-red-100 text-red-600' :
                  'bg-amber-100 text-amber-700'
                return (
                  <tr key={room.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 font-semibold text-gray-800">{room.title}</td>
                    <td className="py-3 text-gray-500">{room.type}</td>
                    <td className="py-3 text-gray-500">{room.capacity} beds</td>
                    <td className="py-3 w-36">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${pct >= 100 ? 'bg-red-500' : pct >= 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                        {statusLabel}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {rooms.length === 0 && (
            <p className="text-center text-gray-400 py-8 text-sm">No rooms found. Add rooms to get started.</p>
          )}
        </div>
      </div>

    </div>
  )
}
