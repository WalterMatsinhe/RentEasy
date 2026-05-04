import { useState, useMemo, useCallback } from 'react'
import PropertyCard from '@/components/ui/PropertyCard'
import { mockProperties } from '@/utils/mockData'

export default function Properties() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])

  const filtered = useMemo(() => {
    return mockProperties.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.city.toLowerCase().includes(search.toLowerCase())
      const matchesType = selectedType === 'All' || p.type === selectedType
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
      
      return matchesSearch && matchesType && matchesPrice
    })
  }, [search, selectedType, priceRange])

  const handleReset = useCallback(() => {
    setSearch('')
    setSelectedType('All')
    setPriceRange([0, 5000])
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8 mt-14">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2">Find Properties</h1>
        <p className="text-gray-600">Browse available properties</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All</option>
              <option>apartment</option>
              <option>house</option>
              <option>condo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price</label>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleReset}
              className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">Showing {filtered.length} properties</p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              address={`${property.city}, ${property.state}`}
              price={property.price}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              image={property.image}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No properties found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
