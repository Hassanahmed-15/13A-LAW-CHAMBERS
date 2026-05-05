import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { members } from './members'

const practiceAreas = [
  { num: '01', name: 'Civil & Commercial',       desc: 'Contractual disputes, property and rent matters, recovery suits, banking and corporate litigation before the civil and commercial courts.' },
  { num: '02', name: 'Constitutional',           desc: 'Writ petitions, judicial review, fundamental rights and public-interest litigation in the High Courts and Supreme Court of Pakistan.' },
  { num: '03', name: 'Criminal & White-Collar',  desc: 'Trial, bail and appellate work across the criminal jurisdiction, including economic offences, accountability and high-profile prosecutions.' },
  { num: '04', name: 'Regulatory & Telecoms',    desc: 'Telecommunications, media, competition, public procurement and energy regulation before sectoral regulators and tribunals.' },
  { num: '05', name: 'Arbitration & ADR',        desc: 'Domestic and international arbitration, mediation and enforcement of awards, including FIDIC and commercial disputes.' },
  { num: '06', name: 'Family & Immigration',     desc: 'Matrimonial, custody, maintenance and inheritance matters, alongside immigration and citizenship advice and representation.' },
]

function Reveal({ children, as: Tag = 'div', className = '', ...rest }) {
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

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // When arriving at "/#section", scroll to that section
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  const closeNav = () => setNavOpen(false)
  const handleSubmit = e => { e.preventDefault(); setSent(true); e.target.reset() }

  return (
    <>
      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="brand">
            13A Law Chambers
            <span>Advocates · Islamabad</span>
          </Link>
          <button className="nav-toggle" aria-label="Menu" onClick={() => setNavOpen(o => !o)}>
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="0" y1="2" x2="22" y2="2" />
              <line x1="0" y1="8" x2="22" y2="8" />
              <line x1="0" y1="14" x2="22" y2="14" />
            </svg>
          </button>
          <div className={`nav-links${navOpen ? ' open' : ''}`}>
            <a href="#about" onClick={closeNav}>About</a>
            <a href="#members" onClick={closeNav}>Members</a>
            <a href="#practice" onClick={closeNav}>Practice</a>
            <a href="#contact" className="nav-cta" onClick={closeNav}>Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-label">Established Chambers&ensp;·&ensp;Islamabad</div>
        <h1 className="hero-title">13A<br /><em>Law Chambers</em></h1>
        <div className="hero-divider" />
        <p className="hero-sub">A shared chambers of independent advocates, committed to rigorous counsel and principled advocacy across the courts of Pakistan.</p>
        <div className="hero-meta">
          <div className="hero-meta-item"><strong>Jurisdiction</strong><span>Supreme Court of Pakistan</span></div>
          <div className="hero-meta-item"><strong>Location</strong><span>F-8/1, Islamabad</span></div>
          <div className="hero-meta-item"><strong>Est.</strong><span>13A, Street 37</span></div>
        </div>
        <div className="hero-scroll">Scroll</div>
      </header>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="sec-label">About</div>
          <h2 className="sec-title">Independence.<br /><em>Shared standards.</em></h2>
          <div className="about-grid">
            <Reveal className="about-text">
              <p>13A Law Chambers is a shared chambers in Islamabad, bringing together advocates of the Supreme Court of Pakistan who choose to practise side by side under a common roof.</p>
              <p>Each member maintains their own clients, their own files, and their own professional standards — supported by a collegiate environment that encourages exchange, scrutiny, and a shared commitment to the rule of law.</p>
              <p>Where a matter benefits from collaboration, members may, with the client's informed consent, work jointly on a brief. Otherwise, every advocate practises in their own right and on their own responsibility.</p>
            </Reveal>
            <Reveal className="notice-box">
              <h4>Important Notice</h4>
              <p>13A Law Chambers is a shared chambers arrangement. Each lawyer practises independently and maintains their own client relationships and professional responsibilities. We are not a partnership or law firm, and no lawyer here is liable for the work or conduct of any other.</p>
              <p>Where appropriate and with the informed consent of the client, one or more advocates may be engaged or may collaborate on a particular matter. Any such engagement is matter-specific and does not create a partnership, joint venture, or any continuing professional association.</p>
              <p>Nothing on this website shall be construed as indicating the existence of a partnership, joint venture, or any other form of professional association between the occupants of these chambers.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMAGE BAND — Library */}
      <Reveal className="imgband imgband--library" aria-hidden="true">
        <div className="imgband-caption">
          "The law is reason, free from passion."
          <small>— Aristotle</small>
        </div>
      </Reveal>

      {/* MEMBERS */}
      <section id="members">
        <svg className="sec-wm" viewBox="0 0 220 280" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
          <line x1="110" y1="20" x2="110" y2="230" strokeWidth="1.4" />
          <circle cx="110" cy="20" r="4" fill="currentColor" strokeWidth="0" />
          <line x1="68"  y1="250" x2="152" y2="250" strokeWidth="2" />
          <line x1="82"  y1="250" x2="138" y2="250" strokeWidth="3" />
          <line x1="28"  y1="75"  x2="192" y2="75"  strokeWidth="1.4" />
          <line x1="28"  y1="75"  x2="28"  y2="105" strokeWidth="1" strokeDasharray="3 4" />
          <path d="M 4 105 Q 28 145 52 105" strokeWidth="1.4" />
          <line x1="4"   y1="105" x2="52"  y2="105" strokeWidth="1.4" />
          <line x1="192" y1="75"  x2="192" y2="105" strokeWidth="1" strokeDasharray="3 4" />
          <path d="M 168 105 Q 192 145 216 105" strokeWidth="1.4" />
          <line x1="168" y1="105" x2="216" y2="105" strokeWidth="1.4" />
          <circle cx="110" cy="20" r="10" fill="none" strokeWidth="1" opacity=".5" />
          <circle cx="110" cy="20" r="18" fill="none" strokeWidth=".7" opacity=".3" />
        </svg>
        <div className="container">
          <div className="sec-label">Members of Chambers</div>
          <h2 className="sec-title">Members.</h2>
          <p className="sec-lede">Each member practises independently. Select a name to view their full profile and experience.</p>
          <div className="member-list">
            {members.map(m => (
              <Reveal key={m.slug} as={Link} to={`/profile/${m.slug}`} className="member-row">
                <div
                  className="member-avatar"
                  style={m.avatar ? { backgroundImage: `url(${m.avatar})` } : undefined}
                />
                <div className="member-info">
                  <div className="member-name">{m.name}</div>
                  <div className="member-role">{m.cardRole}</div>
                </div>
                <div className="member-arrow">→</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICE */}
      <section id="practice">
        <div className="container">
          <div className="sec-label">Practice Areas</div>
          <h2 className="sec-title">Areas of <em>work.</em></h2>
          <p className="sec-lede">Members accept instructions across a broad range of contentious and advisory matters before the District Courts, High Courts, Supreme Court, special tribunals and regulatory bodies of Pakistan.</p>
          <Reveal className="practice-grid">
            {practiceAreas.map(p => (
              <div className="practice-item" key={p.num}>
                <div className="practice-num">{p.num}</div>
                <div className="practice-name">{p.name}</div>
                <p className="practice-desc">{p.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* IMAGE BAND — Monument */}
      <Reveal className="imgband imgband--monument" aria-hidden="true">
        <div className="imgband-caption">
          Practising at the heart of the capital.
          <small>Islamabad&nbsp;·&nbsp;Pakistan</small>
        </div>
      </Reveal>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="sec-label">Contact</div>
          <h2 className="sec-title">Get <em>in touch.</em></h2>
          <div className="contact-grid">
            <Reveal className="contact-items">
              <div className="contact-item">
                <strong>Chambers</strong>
                <p>House No. 13-A, Street No. 37<br />Sector F-8/1, Islamabad, Pakistan</p>
              </div>
              <div className="contact-item">
                <strong>General Enquiries</strong>
                <a href="mailto:info@13A-LawChambers.com">info@13A-LawChambers.com</a>
              </div>
              <div className="contact-item">
                <strong>Telephone</strong>
                <p>+92 334 7788442</p>
              </div>
              <div className="contact-item">
                <strong>Office Hours</strong>
                <p>Monday – Friday&nbsp;·&nbsp;9:00 am – 6:00 pm</p>
              </div>
            </Reveal>
            <Reveal as="form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="text"  placeholder="Your name"     required />
                <input type="email" placeholder="Email address" required />
              </div>
              <input type="text" placeholder="Subject" />
              <textarea placeholder="Your message" required />
              <button type="submit">{sent ? 'Message Sent — Thank You' : 'Send Message'}</button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-grid">
          <div>
            <div className="foot-brand">13A Law Chambers</div>
            <div className="foot-tagline">Advocates&nbsp;·&nbsp;Islamabad</div>
            <p className="foot-note">A shared chambers arrangement. Each lawyer practises independently. We are not a partnership or law firm, and no lawyer here is liable for the work or conduct of any other. Nothing on this website shall be construed as indicating the existence of a partnership, joint venture or any other form of professional association between the occupants of these chambers.</p>
          </div>
          <div className="foot-col">
            <h5>Navigate</h5>
            <a href="#about">About</a>
            <a href="#members">Members</a>
            <a href="#practice">Practice</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="foot-col">
            <h5>Chambers</h5>
            <span>House No. 13-A, Street 37</span>
            <span>Sector F-8/1, Islamabad</span>
            <span>Pakistan</span>
            <a href="mailto:info@13A-LawChambers.com" style={{ marginTop: 8 }}>info@13A-LawChambers.com</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 13A Law Chambers. All rights reserved.</span>
          <span>Islamabad · Pakistan</span>
        </div>
      </footer>
    </>
  )
}
