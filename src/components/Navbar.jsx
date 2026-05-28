import { useState } from 'react'
import { Link } from 'react-router-dom'
import { navLinks } from '../constants'

const Navbar = () => {
  const [active, setActive] = useState('')

  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-20 flex justify-center px-4 pt-4">
      <div className="relative w-full max-w-5xl">

        <div
          className="relative w-full flex items-center justify-between px-5 py-2.5 rounded-2xl border border-white/10 shadow-[0_4px_40px_rgba(0,0,0,0.5)] overflow-hidden"
          style={{ background: 'rgba(10,10,10,0.5)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
        >
          {/* Fog blobs */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="navbar-fog navbar-fog-1" />
            <div className="navbar-fog navbar-fog-2" />
            <div className="navbar-fog navbar-fog-3" />
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="relative flex items-center gap-2.5 shrink-0 z-10"
            onClick={() => { setActive(''); window.scrollTo(0, 0) }}
          >
            <div className="h-8 px-2.5 rounded-lg bg-white flex items-center justify-center hover:bg-white/85 transition-colors duration-200">
              <span className="font-mono text-black text-[16px]">&lt;</span>
              <span className="font-mono text-black text-[16px] font-bold">A</span>
              <span className="font-mono text-black text-[16px]">&gt;</span>
            </div>
            <p className="hidden sm:block text-white text-[15px] font-semibold tracking-tight">
              AHMED
              <span className="text-white/30 font-light ml-2">| Web Dev</span>
            </p>
          </Link>

          {/* Nav links */}
          <ul className="relative z-10 list-none flex flex-row items-center gap-5 sm:gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setActive(link.title)}
                  className={`text-[13px] sm:text-[14px] font-medium transition-colors duration-200 ${
                    active === link.title ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            onClick={() => setActive('Contact')}
            className="relative z-10 px-3.5 py-1.5 rounded-full bg-white text-black text-[12px] sm:text-[13px] font-semibold hover:bg-white/85 transition-all duration-200 shrink-0"
          >
            Hire Me
          </a>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
