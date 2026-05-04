import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { cn } from '@/utils/cn'
import RentEasyLogo from '@/assets/images/rentEasyLogo.png'
import RentEasyLogoTwo from '@/assets/images/RentEasyLogoTwo.png'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

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
          <img src={isScrolled ? RentEasyLogoTwo : RentEasyLogo} alt="RentEasy" className="h-14 w-14 mb-2" style={{ filter: 'drop-shadow(0 0 15px rgba(196, 149, 106, 0.8)) drop-shadow(0 0 25px rgba(196, 149, 106, 0.6))' }} />
          <span style={{ fontFamily: "'Satisfy', cursive", letterSpacing: '0.05em', textShadow: '0 0 15px rgba(196, 149, 106, 0.9), 0 0 30px rgba(196, 149, 106, 0.7), 0 0 45px rgba(196, 149, 106, 0.5)' }} className="text-4xl text-primary">RentEasy</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/properties" className={cn('hover:text-primary transition-colors', isScrolled ? 'text-black' : 'text-white')}>
            Properties
          </Link>
          <button className="btn-primary text-sm">Sign In</button>
        </div>
      </nav>
    </header>
  )
}
