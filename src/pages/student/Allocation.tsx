import { mockAllocations, mockRooms } from '@/utils/mockData'
import { Link } from 'react-router-dom'

export default function StudentAllocation() {
  const allocation = mockAllocations[0]
  const room = allocation ? mockRooms.find(r => r.id === allocation.roomId) : null
  const occupancyPct = room ? Math.round((room.occupiedBeds / room.capacity) * 100) : 0

  if (!allocation || !room) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Allocation</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-20 h-20 bg-[#264559]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-[#264559]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Allocation</h3>
          <p className="text-gray-500 max-w-md mx-auto text-sm mb-6">You currently do not have an active room allocation. Apply for a room to get started.</p>
          <Link to="/student/rooms" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#264559] text-white font-semibold rounded-xl hover:bg-[#1a3347] transition-colors text-sm">
            Browse Rooms →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Allocation</h1>
        <p className="text-gray-500 mt-1 text-sm">Your current room assignment and contract details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Info */}
        <div className="lg:col-span-2 space-y-5">

          {/* Room Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative bg-gradient-to-br from-[#264559] to-[#1a3347] p-6 text-white">
              <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/5 rounded-full" />
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{room.title}</h2>
                  <p className="text-white/60 text-sm mt-1">{room.district}, {room.city}</p>
                </div>
                <span className="px-3 py-1.5 bg-[#E5E642] text-[#264559] font-bold rounded-xl text-xs uppercase tracking-wide">
                  Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 border-b border-gray-100">
              {[
                { label: 'Room No.', value: room.roomNumber },
                { label: 'Block', value: room.block },
                { label: 'Type', value: room.type },
                { label: 'Monthly Rent', value: `KSh ${room.price}` },
              ].map(item => (
                <div key={item.label} className="p-5 text-center">
                  <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">{item.label}</p>
                  <p className="font-bold text-gray-900 text-lg capitalize">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Contract Period</h3>
              <div className="flex gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#264559]/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#264559]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Start Date</p>
                    <p className="font-semibold text-gray-900 text-sm">{new Date(allocation.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#E5E642]/20 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#8a8a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">End Date</p>
                    <p className="font-semibold text-gray-900 text-sm">{new Date(allocation.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Facilities Included</h3>
            <div className="flex flex-wrap gap-2">
              {room.facilities.map((facility, idx) => (
                <span key={idx} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${idx % 2 === 0 ? 'bg-[#264559] text-white' : 'bg-[#E5E642]/20 text-[#264559]'}`}>
                  {facility}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Room Image */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <img src={room.image} alt={room.title} className="w-full h-44 object-cover" />
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Room Occupancy</h3>
              <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                <span>{room.occupiedBeds} Occupied</span>
                <span>{room.capacity} Capacity</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-[#264559] to-[#2d5a73] transition-all duration-700"
                  style={{ width: `${occupancyPct}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-right">{occupancyPct}% full</p>

              <div className="mt-4 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                {room.occupiedBeds > 1
                  ? `${room.occupiedBeds - 1} other student(s) sharing this room.`
                  : 'You are currently the only student in this room.'}
              </div>
            </div>
          </div>

          {/* Bed Info */}
          {allocation.bedNumber && (
            <div className="bg-gradient-to-br from-[#264559] to-[#1a3347] rounded-2xl p-5 text-white">
              <p className="text-white/60 text-xs mb-1 uppercase tracking-wide">Your Bed</p>
              <p className="text-5xl font-bold text-[#E5E642]">#{allocation.bedNumber}</p>
              <p className="text-white/50 text-xs mt-2">Assigned Bed Number</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
