import { Link } from 'react-router-dom'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import PropertyCard from '@/components/ui/PropertyCard'
import { mockProperties } from '@/utils/mockData'
import BackgroundOneImage from '@/assets/images/BackgroundOne.png'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const featured = mockProperties.slice(0, 6)

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: `url(${BackgroundOneImage})`,
      }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end pb-5 px-4 sm:px-6">
          <h1 className="font-serif text-5xl font-bold text-white mb-4">Find Your Perfect Home</h1>
          <p className="text-xl text-white/80 max-w-2xl mb-8">
            Connect with verified properties and manage rentals effortlessly in one place.
          </p>
          <div className="flex gap-4">
            <Button size="lg">Get Started</Button>
            <button onClick={() => setShowModal(true)} className="px-6 py-3 rounded-lg font-semibold text-white border border-white hover:bg-white hover:text-primary transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '500+', label: 'Properties' },
            { value: '1.2K+', label: 'Happy Users' },
            { value: '98%', label: 'On-time Payments' },
            { value: '4.9★', label: 'Rating' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{value}</div>
              <div className="text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-2">Featured <span className="text-primary">Properties</span></h2>
            <p className="text-gray-600">Explore our handpicked selections</p>
          </div>
          <Link to="/properties">
            <Button variant="ghost">View All →</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property) => (
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
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of property managers using RentEasy.
          </p>
          <Button variant="secondary" size="lg">Create Free Account</Button>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blur Background */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          
          {/* Modal Content */}
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="bg-primary text-white px-8 py-6 rounded-t-2xl">
              <h2 className="font-serif text-3xl font-bold">About RentEasy</h2>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                RentEasy is a comprehensive platform designed to solve the real-world challenges in the rental housing industry. We bridge the gap between tenants seeking quality housing and property owners managing their investments.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 text-primary mb-2">For Tenants:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Search verified properties easily</li>
                    <li>• Compare pricing & locations</li>
                    <li>• Submit maintenance requests</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-primary mb-2">For Landlords:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Automate rent collection</li>
                    <li>• Maintain tenant records</li>
                    <li>• Manage maintenance efficiently</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Our Vision:</h4>
                <p className="text-gray-700 text-sm">
                  A unified digital ecosystem where property listings, applications, payments, and maintenance are handled seamlessly online.
                </p>
              </div>

              <p className="text-gray-600 text-sm">
                <strong>Platform Users:</strong> Tenants, Property Managers & Landlords, Administrators
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200 flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
