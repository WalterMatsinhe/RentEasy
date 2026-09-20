import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import RoomCard from '@/components/ui/RoomCard'
import AboutModal from '@/components/ui/AboutModal'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { PulsatingButton } from '@/components/ui/pulsating-button'
import { mockRooms } from '@/utils/mockData'
import RentEasyHero from '@/assets/images/RentEasyHero.png'

export default function Home() {
  const [showModal, setShowModal] = useState(false)

  // Display only top 6 featured rooms
  const featuredRooms = mockRooms.slice(0, 6)

  return (
    <div className="pb-16 bg-gray-50/50">
      {/* Hero Section */}
      <section
        className="relative h-[560px] bg-cover bg-center sm:h-[500px]"
        style={{ backgroundImage: `url(${RentEasyHero})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-8 pt-24 sm:px-6 sm:py-0">
          <h1 className="mb-4 max-w-3xl font-serif text-4xl font-bold leading-tight text-white sm:mb-6 sm:text-5xl md:text-6xl">
            Find Your Perfect Hostel Room in Adana
          </h1>

          <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/90 sm:mb-10 sm:text-xl">
            Connect with verified student hostels and manage applications effortlessly in one place.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/register">
              <PulsatingButton>
                Get Started
              </PulsatingButton>
            </Link>
            <LiquidButton
              onClick={() => setShowModal(true)}
              size="xl"
              variant="default"
              className="font-bold text-white text-base tracking-wide"
            >
              Learn More
            </LiquidButton>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 -mt-12 sm:-mt-16 mb-20">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:p-8">
          <div className="grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-4">
            {[
              { value: '500+', label: 'Verified Rooms' },
              { value: '1.2K+', label: 'Happy Students' },
              { value: '98%', label: 'Successful Allocations' },
              { value: '4.9★', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label} className="group text-center">
                <div className="mb-2 text-3xl font-bold text-primary transition-transform duration-300 group-hover:scale-105 sm:mb-3 sm:text-4xl md:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-3">
              Featured <span className="text-primary">Rooms</span>
            </h2>
            <p className="text-gray-600 text-lg">Explore our handpicked selections across Adana</p>
          </div>
          <Link to="/rooms">
            <Button variant="ghost" className="group">
              View All <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              title={room.title}
              address={`${room.district}, ${room.city}`}
              price={room.price}
              capacity={room.capacity}
              bathrooms={room.bathrooms}
              image={room.image}
            />
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-primary rounded-3xl text-white py-20 px-8 text-center relative overflow-hidden shadow-2xl">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Join thousands of students and hostel administrators using RentEasy - Adana today.
            </p>
            <Link to="/register" className="inline-block">
              <PulsatingButton className="px-10">
                Create Free Account
              </PulsatingButton>
            </Link>
          </div>
        </div>
      </section>

      {/* About Modal */}
      {showModal && <AboutModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
