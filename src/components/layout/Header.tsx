import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { cn } from '@/utils/cn'
import { useAuth } from '@/context/AuthContext'
import { PulsatingButton } from '@/components/ui/pulsating-button'
import logo from '@/assets/logo.png'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      'fixed w-full z-40 transition-all duration-300',
      isScrolled
        ? 'py-3 bg-background/80 backdrop-blur-md shadow-xs'
        : 'py-5'
    )}>
      <nav className="w-full flex items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="RentEasy Logo" className="h-10 w-auto object-contain drop-shadow-md" />
          <span style={{ fontFamily: "'Satisfy', cursive", letterSpacing: '0.05em' }} className="text-3xl text-accent drop-shadow-sm transition-colors">RentEasy</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/rooms" className={cn('text-sm font-semibold hover:text-[#E5E642] transition-colors', isScrolled ? 'text-gray-700' : 'text-white/90')}>
            Browse Rooms
          </Link>
          
          <div className="h-5 w-px bg-white/20 hidden sm:block" />
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to={user?.role === 'student' ? "/student/dashboard" : "/admin/dashboard"} className={cn('text-sm font-semibold hover:text-[#E5E642] transition-colors', isScrolled ? 'text-gray-700' : 'text-white/90')}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="px-5 py-2 text-sm font-bold bg-[#264559] text-white rounded-xl hover:bg-[#1a3347] shadow-sm transition-all">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={cn('text-sm font-semibold hover:text-[#E5E642] transition-colors', isScrolled ? 'text-gray-700' : 'text-white/90')}>
                  Sign In
                </Link>
                <Link to="/register">
                  <PulsatingButton className="h-9 px-5 py-2 text-sm !rounded-xl shadow-sm">
                    Register
                  </PulsatingButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
