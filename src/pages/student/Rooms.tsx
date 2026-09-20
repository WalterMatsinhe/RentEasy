import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockRooms } from '@/utils/mockData'
import RoomCard from '@/components/ui/RoomCard'

const filters = ['all', 'available', 'single', 'double', 'dormitory']

export default function StudentRooms() {
  const [filter, setFilter] = useState('all')

  const filteredRooms = mockRooms.filter(room => {
    if (filter === 'all') return true
    if (filter === 'available') return room.availabilityStatus === 'available'
    return room.type === filter
  })

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Browse Rooms</h1>
          <p className="text-gray-500 mt-1 text-sm">Find your perfect accommodation at Africa Nazarene University</p>
        </div>
        <div className="flex items-center gap-1.5 bg-white rounded-xl p-1.5 shadow-sm border border-gray-200">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                filter === f
                  ? 'bg-[#264559] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-[#264559]/10 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-[#264559]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" /></svg>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{mockRooms.length}</p>
            <p className="text-xs text-gray-500">Total Rooms</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E5E642]/20 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-[#8a8a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{mockRooms.filter(r => r.availabilityStatus === 'available').length}</p>
            <p className="text-xs text-gray-500">Available</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">{filteredRooms.length}</p>
            <p className="text-xs text-gray-500">Showing</p>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      {filteredRooms.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" /></svg>
          </div>
          <p className="text-gray-500 font-medium">No rooms match your filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div key={room.id} className="relative group">
              <RoomCard
                id={room.id}
                title={room.title}
                address={`${room.district}, ${room.city}`}
                price={room.price}
                capacity={room.capacity}
                bathrooms={room.bathrooms}
                image={room.image}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col items-center justify-center p-6 backdrop-blur-sm z-10 pointer-events-none group-hover:pointer-events-auto">
                <p className="text-white text-center mb-4 font-medium text-sm">
                  {room.availabilityStatus === 'available' ? '✓ Beds available!' : '✗ Currently full'}
                </p>
                <Link to={`/student/apply?roomId=${room.id}`}>
                  <button
                    disabled={room.availabilityStatus !== 'available'}
                    className="px-6 py-2.5 bg-[#E5E642] text-[#264559] font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                  >
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
