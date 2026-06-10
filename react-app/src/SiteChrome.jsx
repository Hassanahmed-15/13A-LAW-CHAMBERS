import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export function ScalesLogo({ size = 32, className = '' }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 80 100"
      fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="40" y1="6" x2="40" y2="86" strokeWidth="2.5" />
      <circle cx="40" cy="6" r="4" fill="currentColor" strokeWidth="0" />
      <line x1="10" y1="28" x2="70" y2="28" strokeWidth="2" />
      <line x1="10" y1="28" x2="10" y2="48" strokeWidth="1.2" strokeDasharray="3 3" />
      <path d="M 0 48 Q 10 64 20 48" strokeWidth="2" />
      <line x1="0" y1="48" x2="20" y2="48" strokeWidth="2" />
      <line x1="70" y1="28" x2="70" y2="48" strokeWidth="1.2" strokeDasharray="3 3" />
      <path d="M 60 48 Q 70 64 80 48" strokeWidth="2" />
      <line x1="60" y1="48" x2="80" y2="48" strokeWidth="2" />
      <line x1="24" y1="86" x2="56" y2="86" strokeWidth="3" />
      <line x1="28" y1="92" x2="52" y2="92" strokeWidth="2" />
    </svg>
  )
}

export function Reveal({ children, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeNav = () => setNavOpen(false)

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="brand" onClick={closeNav}>
          <div className="brand-mark" aria-hidden="true">
            <ScalesLogo size={22} className="brand-logo" />
          </div>
          <div className="brand-text">
            13A Law Chambers
            <span>Advocates &amp; Legal Consultants · Islamabad</span>
          </div>
        </Link>
        <button className="nav-toggle" aria-label="Menu" onClick={() => setNavOpen(o => !o)}>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="0" y1="2" x2="22" y2="2" />
            <line x1="0" y1="8" x2="22" y2="8" />
            <line x1="0" y1="14" x2="22" y2="14" />
          </svg>
        </button>
        <div className={`nav-links${navOpen ? ' open' : ''}`}>
          <NavLink to="/" onClick={closeNav}>Home</NavLink>
          <NavLink to="/about" onClick={closeNav}>About</NavLink>
          <NavLink to="/members" onClick={closeNav}>Members</NavLink>
          <NavLink to="/practice" onClick={closeNav}>Practice</NavLink>
          <NavLink to="/contact" onClick={closeNav}>Contact</NavLink>
        </div>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        <div>
          <div className="foot-brand-row">
            <ScalesLogo size={26} className="foot-logo" />
            <div>
              <div className="foot-brand">13A Law Chambers</div>
              <div className="foot-tagline">Advocates &amp; Legal Consultants&nbsp;·&nbsp;Islamabad</div>
            </div>
          </div>
          <p className="foot-note">A shared chambers arrangement. Each lawyer practises independently. We are not a partnership or law firm, and no lawyer here is liable for the work or conduct of any other. Nothing on this website shall be construed as indicating the existence of a partnership, joint venture or any other form of professional association between the occupants of these chambers.</p>
        </div>
        <div className="foot-col">
          <h5>Navigate</h5>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/members">Members</Link>
          <Link to="/practice">Practice</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/notice">Notice</Link>
        </div>
        <div className="foot-col">
          <h5>Chambers</h5>
          <span>House No. 13-A, Street 37</span>
          <span>Sector F-8/1, Islamabad</span>
          <span>Pakistan</span>
          <a href="mailto:info@13alawchambers.com" style={{ marginTop: 8 }}>info@13alawchambers.com</a>
          <div className="foot-socials">
            <a href="https://www.facebook.com/share/1LgpgL9duP/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/13alawchambers" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5.5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://share.google/u2qBONgThShi5T9Pe" target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 10.2v3.9h5.45c-.24 1.4-1.66 4.12-5.45 4.12-3.28 0-5.96-2.72-5.96-6.07S8.72 6.07 12 6.07c1.87 0 3.12.8 3.84 1.48l2.62-2.52C16.78 3.47 14.6 2.6 12 2.6 6.83 2.6 2.64 6.79 2.64 12S6.83 21.4 12 21.4c5.46 0 9.08-3.84 9.08-9.25 0-.62-.07-1.1-.15-1.57H12Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 13A Law Chambers. All rights reserved.</span>
        <span>Islamabad · Pakistan</span>
      </div>
    </footer>
  )
}

export function PageShell({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Nav />
      <main className="route-fade">
        {children}
      </main>
    </>
  )
}
