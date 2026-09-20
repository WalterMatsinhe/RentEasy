import { useState, useMemo, useCallback } from 'react'
import RoomCard from '@/components/ui/RoomCard'
import { mockRooms } from '@/utils/mockData'

export default function Rooms() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [minAvailableBeds, setMinAvailableBeds] = useState<number>(0)

  const filtered = useMemo(() => {
    return mockRooms.filter((p) => {
      const searchLower = search.toLowerCase()
      const matchesSearch = 
        p.title.toLowerCase().includes(searchLower) ||
        p.district.toLowerCase().includes(searchLower) ||
        p.roomNumber.toLowerCase().includes(searchLower) ||
        p.block.toLowerCase().includes(searchLower)
        
      const matchesType = selectedType === 'All' || p.type === selectedType
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
      const matchesBeds = p.availableBeds >= minAvailableBeds
      
      return matchesSearch && matchesType && matchesPrice && matchesBeds
    })
  }, [search, selectedType, priceRange, minAvailableBeds])

  const handleReset = useCallback(() => {
    setSearch('')
    setSelectedType('All')
    setPriceRange([0, 5000])
    setMinAvailableBeds(0)
  }, [])

  return (
    <div className="bg-gray-50/50 min-h-screen pb-16">
      <div className="bg-primary py-16 px-4 sm:px-6 mt-14">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Discover Your Room</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Search across our verified hostel properties by room number, block, or specific amenities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Advanced Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 -mt-8 relative z-10 mb-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                  type="text"
                  placeholder="Name, block, or room no..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Room Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm bg-white"
              >
                <option value="All">All Types</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="dormitory">Dormitory</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Min Available Beds</label>
              <select
                value={minAvailableBeds}
                onChange={(e) => setMinAvailableBeds(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm bg-white"
              >
                <option value={0}>Any</option>
                <option value={1}>1+ Beds</option>
                <option value={2}>2+ Beds</option>
                <option value={4}>4+ Beds</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max Rent: KSh {priceRange[1]}</label>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-3 accent-primary"
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900">Available Rooms</h2>
          <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            {filtered.length} {filtered.length === 1 ? 'room' : 'rooms'} found
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((room) => (
              <RoomCard
                key={room.id}
                id={room.id}
                title={room.title}
                address={`${room.district}, ${room.city} - Block ${room.block}`}
                price={room.price}
                capacity={room.capacity}
                bathrooms={room.bathrooms}
                image={room.image}
                availableBeds={room.availableBeds}
                facilities={room.facilities}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No rooms found</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">
              We couldn't find any rooms matching your current filters. Try adjusting your search criteria.
            </p>
            <button 
              onClick={handleReset}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
