import { Footer, Nav, ScalesLogo } from './SiteChrome'

export { ScalesLogo } from './SiteChrome'

export default function Home() {
  return (
    <>
      <Nav />
      <main className="route-fade">
        <header className="hero hero--skyline">
          <div className="hero-brand-lockup">
            <div className="hero-logo-badge" aria-hidden="true">
              <ScalesLogo size={116} className="hero-scales" />
            </div>
            <h1 className="hero-title">13A Law Chambers</h1>
          </div>
          <div className="hero-divider" />
          <p className="hero-sub">A shared chambers of independent advocates, committed to rigorous counsel and principled advocacy across the courts of Pakistan.</p>
        </header>
      </main>
      <Footer />
    </>
  )
}
