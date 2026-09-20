import { Link } from 'react-router-dom'

interface RoomCardProps {
  id: string
  title: string
  address: string
  price: number
  capacity: number
  bathrooms: number
  image: string
  availableBeds?: number
  facilities?: string[]
}

export default function RoomCard({
  id,
  title,
  address,
  price,
  capacity,
  bathrooms,
  image,
  availableBeds,
  facilities
}: RoomCardProps) {
  return (
    <Link to={`/rooms/${id}`}>
      <div className="card overflow-hidden hover:shadow-xl cursor-pointer">
        <div className="w-full h-48 bg-gray-200 overflow-hidden rounded-lg mb-4">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
              No Image
            </div>
          )}
        </div>
        
        <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{address}</p>
        
        <div className="mb-4 pb-4 border-b border-gray-200">
          <p className="text-2xl font-bold text-primary">KSh {price}/mo</p>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>🛏️ {capacity} {capacity === 1 ? 'bed' : 'beds'}</span>
          <span>🚿 {bathrooms} {bathrooms === 1 ? 'ba' : 'ba'}</span>
        </div>
        
        {(availableBeds !== undefined || (facilities && facilities.length > 0)) && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {availableBeds !== undefined && (
              <div className="mb-3">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                  availableBeds > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {availableBeds > 0 ? `${availableBeds} bed(s) available` : 'Full'}
                </span>
              </div>
            )}
            
            {facilities && facilities.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {facilities.slice(0, 3).map((f, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[11px] font-medium border border-gray-200">
                    {f}
                  </span>
                ))}
                {facilities.length > 3 && (
                  <span className="px-2 py-0.5 bg-gray-50 text-gray-400 rounded text-[11px] font-medium border border-gray-100">
                    +{facilities.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
