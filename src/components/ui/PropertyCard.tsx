import { Link } from 'react-router-dom'

interface PropertyCardProps {
  id: string
  title: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  image: string
}

export default function PropertyCard({
  id,
  title,
  address,
  price,
  bedrooms,
  bathrooms,
  image,
}: PropertyCardProps) {
  return (
    <Link to={`/properties/${id}`}>
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
          <p className="text-2xl font-bold text-primary">${price}/mo</p>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>🛏️ {bedrooms} bd</span>
          <span>🚿 {bathrooms} ba</span>
        </div>
      </div>
    </Link>
  )
}
