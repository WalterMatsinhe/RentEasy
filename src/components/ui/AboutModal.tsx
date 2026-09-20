import Button from '@/components/ui/Button'
import { Link } from 'react-router-dom'

interface AboutModalProps {
  onClose: () => void
}

export default function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blur Background */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-white/80 transition-colors z-20"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="bg-primary text-white px-8 py-6 rounded-t-2xl">
          <h2 className="font-serif text-3xl font-bold">About RentEasy - Adana</h2>
        </div>

        {/* Modal Body */}
        <div className="px-8 py-8 space-y-8">
          <p className="text-gray-700 text-lg leading-relaxed">
            RentEasy - Adana is a comprehensive platform designed to solve the real-world challenges in student housing. We bridge the gap between students seeking quality rooms and hostel administrators managing their hostels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="font-semibold text-lg text-primary mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                For Students
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Search verified rooms easily</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Compare pricing & locations</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Submit applications online</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h4 className="font-semibold text-lg text-primary mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                For Administrators
              </h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Automate room allocations</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Maintain digital student records</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Manage maintenance efficiently</li>
              </ul>
            </div>
          </div>

          <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
            <h4 className="font-semibold text-gray-900 mb-2">Our Vision</h4>
            <p className="text-gray-700">
              A unified digital ecosystem where room listings, applications, payments, and allocations are handled seamlessly online.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 bg-gray-50 rounded-b-2xl border-t border-gray-200 flex justify-end gap-4">
          <Button variant="ghost" onClick={onClose} className="px-6">
            Close
          </Button>
          <Link to="/register">
            <Button variant="primary" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
