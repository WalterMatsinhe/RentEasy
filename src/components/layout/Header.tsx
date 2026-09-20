import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { cn } from '@/utils/cn'
import { useAuth } from '@/context/AuthContext'
import { PulsatingButton } from '@/components/ui/pulsating-button'
import logo from '@/assets/logo.png'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
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
        ? 'py-3 bg-background/90 backdrop-blur-md shadow-xs'
        : 'bg-primary/25 py-3 backdrop-blur-sm sm:bg-transparent sm:py-5'
    )}>
      <nav className="relative w-full flex items-center justify-between gap-3 px-4 sm:px-6" aria-label="Main navigation">
        <Link to="/" className="flex min-w-0 items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <img src={logo} alt="RentEasy Logo" className="h-10 w-auto object-contain drop-shadow-md" />
          <span style={{ fontFamily: "'Satisfy', cursive", letterSpacing: '0.05em' }} className="truncate text-2xl sm:text-3xl text-accent drop-shadow-sm transition-colors">RentEasy</span>
        </Link>

        <div className="hidden items-center gap-3 sm:flex sm:gap-8">
          <Link to="/rooms" className={cn('text-sm font-semibold hover:text-[#E5E642] transition-colors', isScrolled ? 'text-gray-700' : 'text-white/90')}>
            Browse Rooms
          </Link>
          
          <div className="h-5 w-px bg-white/20 hidden sm:block" />
          
          <div className="flex items-center gap-2 sm:gap-4">
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
                  <PulsatingButton className="h-9 px-3 sm:px-5 py-2 text-xs sm:text-sm !rounded-xl shadow-sm">
                    Register
                  </PulsatingButton>
                </Link>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          className={cn('inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:hidden', isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10')}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="h-0.5 w-5 bg-current" />
            <span className="h-0.5 w-5 bg-current" />
            <span className="h-0.5 w-5 bg-current" />
          </span>
        </button>

        {isMenuOpen && (
          <div className="absolute left-4 right-4 top-full mt-3 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5 sm:hidden">
            <Link to="/rooms" onClick={() => setIsMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Browse Rooms
            </Link>
            {isAuthenticated ? (
              <>
                <Link to={user?.role === 'student' ? "/student/dashboard" : "/admin/dashboard"} onClick={() => setIsMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="mt-1 w-full rounded-xl bg-[#264559] px-4 py-3 text-left text-sm font-bold text-white hover:bg-[#1a3347]">
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-1 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="rounded-xl bg-[#264559] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#1a3347]">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
