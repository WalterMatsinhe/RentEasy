import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { mockRooms } from '@/utils/mockData'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery'

export default function RoomDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  
  const room = mockRooms.find(r => r.id === id)
  
  const [activeImage, setActiveImage] = useState(room?.image || '')

  useEffect(() => {
    if (room) setActiveImage(room.image)
  }, [room])

  if (!room) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Room Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">The room you are looking for does not exist or may have been removed from the platform.</p>
        <Button onClick={() => navigate('/rooms')}>Browse Available Rooms</Button>
      </div>
    )
  }

  const handleApplyClick = () => {
    if (isAuthenticated && user?.role === 'student') {
      navigate(`/student/apply?roomId=${room.id}`)
    } else {
      // Need to login first
      navigate('/login')
    }
  }

  const allImages = room.images || [room.image]

  return (
    <div className="pb-20 bg-gray-50/30">
      {/* Hero Header */}
      <div className="relative h-[60vh] bg-gray-900">
        <img 
          src={activeImage} 
          alt={room.title} 
          className="w-full h-full object-cover opacity-60 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  room.availabilityStatus === 'available' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {room.availabilityStatus === 'available' ? 'Available to Apply' : 'Currently Full'}
                </span>
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                  {room.type}
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">{room.title}</h1>
              <p className="text-xl text-white/80 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {room.district}, {room.city}
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-6">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center min-w-[200px]">
                <p className="text-white/80 text-sm mb-1 uppercase tracking-wider font-semibold">Monthly Rent</p>
                <p className="text-4xl font-bold text-accent">KSh {room.price}</p>
              </div>

              {/* Thumbnails removed from here */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <section>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">Room Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-gray-500 text-sm mb-1">Block</p>
                  <p className="text-2xl font-bold text-gray-900">{room.block}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-gray-500 text-sm mb-1">Room No</p>
                  <p className="text-2xl font-bold text-gray-900">{room.roomNumber}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-gray-500 text-sm mb-1">Capacity</p>
                  <p className="text-2xl font-bold text-gray-900">{room.capacity}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-gray-500 text-sm mb-1">Bathrooms</p>
                  <p className="text-2xl font-bold text-gray-900">{room.bathrooms}</p>
                </div>
              </div>
            </section>

            {/* Description / Story (Mocked) */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">About this room</h2>
              <div className="prose text-gray-600 leading-relaxed max-w-none">
                <p>
                  This premium {room.type} room located in block {room.block} offers an exceptional living experience for students. Designed with academic success and comfort in mind, the space features ample natural light and modern furnishings.
                </p>
                <p className="mt-4">
                  The property is conveniently situated in {room.district}, {room.city}, providing easy access to local amenities, public transportation, and nearby university campuses.
                </p>
              </div>
            </section>

            {/* Facilities */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Included Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="font-medium">{facility}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Photo Gallery - 3D Circular */}
            {allImages.length > 1 && (
              <section>
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Photo Gallery</h2>
                <p className="text-sm text-gray-500 mb-6">Scroll the page to rotate the gallery and explore all room views</p>
                <div
                  className="w-full rounded-2xl overflow-hidden"
                  style={{ height: '480px' }}
                >
                  <CircularGallery
                    radius={320}
                    autoRotateSpeed={3000}
                    items={allImages.map((img, idx) => ({
                      common: `View ${idx + 1} — ${room.title}`,
                      binomial: `Block ${room.block} · Room ${room.roomNumber}`,
                      photo: {
                        url: img,
                        text: `Room view ${idx + 1} of ${room.title}`,
                        by: 'Africa Nazarene University'
                      }
                    } as GalleryItem))}
                  />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar / Action Area */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-32">
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">Availability</h3>
              
              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">Total Capacity</span>
                    <span>{room.capacity} beds</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">Occupied</span>
                    <span>{room.occupiedBeds} beds</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-primary">
                    <span>Available</span>
                    <span>{room.availableBeds} beds</span>
                  </div>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      room.availableBeds === 0 ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(room.occupiedBeds / room.capacity) * 100}%` }}
                  />
                </div>
                
                <p className="text-xs text-center text-gray-500">
                  {room.availableBeds > 0 
                    ? `Hurry! Only ${room.availableBeds} bed(s) remaining for the upcoming semester.`
                    : 'This room is currently fully occupied.'}
                </p>
              </div>

              <Button 
                size="lg" 
                variant="primary"
                className="w-full mb-4 shadow-lg hover:-translate-y-0.5"
                onClick={handleApplyClick}
                disabled={room.availabilityStatus !== 'available'}
              >
                {room.availabilityStatus === 'available' ? 'Apply For This Room' : 'Join Waitlist'}
              </Button>
              
              {!isAuthenticated && room.availabilityStatus === 'available' && (
                <p className="text-sm text-center text-gray-500 mt-4">
                  You will be asked to <Link to="/login" className="text-primary hover:underline font-medium">sign in</Link> first.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
