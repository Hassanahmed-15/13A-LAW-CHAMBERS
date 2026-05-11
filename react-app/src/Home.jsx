import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { members } from './members'

// ── 3. Practice areas updated (no White-Collar, no Family & Immigration, add International Law)
const practiceAreas = [
  { num: '01', name: 'Civil & Commercial',    desc: 'Contractual disputes, property and rent matters, recovery suits, banking and corporate litigation before the civil and commercial courts.' },
  { num: '02', name: 'Constitutional',        desc: 'Writ petitions, judicial review, fundamental rights and public-interest litigation in the High Courts and Supreme Court of Pakistan.' },
  { num: '03', name: 'Criminal',              desc: 'Trial, bail and appellate work across the criminal jurisdiction, including economic offences, accountability and high-profile prosecutions.' },
  { num: '04', name: 'Regulatory & Telecoms', desc: 'Telecommunications, media, competition, public procurement and energy regulation before sectoral regulators and tribunals.' },
  { num: '05', name: 'Arbitration & ADR',     desc: 'Domestic and international arbitration, mediation and enforcement of awards, including FIDIC and commercial disputes.' },
  { num: '06', name: 'International Law',     desc: 'Cross-border disputes, treaty obligations, international trade, bilateral investment treaties and representation before international forums.' },
]

// ── 4. Scales of Justice logo component (used in nav + hero)
export function ScalesLogo({ size = 32, className = '' }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 80 100"
      fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Staff */}
      <line x1="40" y1="6" x2="40" y2="86" strokeWidth="2.5" />
      {/* Top orb */}
      <circle cx="40" cy="6" r="4" fill="currentColor" strokeWidth="0" />
      {/* Beam */}
      <line x1="10" y1="28" x2="70" y2="28" strokeWidth="2" />
      {/* Left chain */}
      <line x1="10" y1="28" x2="10" y2="48" strokeWidth="1.2" strokeDasharray="3 3" />
      {/* Left pan */}
      <path d="M 0 48 Q 10 64 20 48" strokeWidth="2" />
      <line x1="0" y1="48" x2="20" y2="48" strokeWidth="2" />
      {/* Right chain */}
      <line x1="70" y1="28" x2="70" y2="48" strokeWidth="1.2" strokeDasharray="3 3" />
      {/* Right pan */}
      <path d="M 60 48 Q 70 64 80 48" strokeWidth="2" />
      <line x1="60" y1="48" x2="80" y2="48" strokeWidth="2" />
      {/* Base */}
      <line x1="24" y1="86" x2="56" y2="86" strokeWidth="3" />
      <line x1="28" y1="92" x2="52" y2="92" strokeWidth="2" />
    </svg>
  )
}

// ── 6. Islamabad skyline SVG watermark (Faisal Mosque + Pakistan Monument arches + Margalla Hills)
function IslamabadSkyline({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 260"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      {/* ── Margalla Hills silhouette (background) ── */}
      <path d="M0 180 Q80 80 160 120 Q220 70 300 110 Q360 60 420 100 Q480 55 540 95 Q600 50 660 90 Q720 65 800 105 Q860 75 930 110 Q970 90 1000 100 L1000 260 L0 260 Z"
        strokeWidth="0" fill="currentColor" opacity="0.25" />

      {/* ── Faisal Mosque (left of centre) ── */}
      {/* Main tent roof */}
      <path d="M320 185 L355 100 L390 185" strokeWidth="1.8" />
      {/* Inner lines on roof */}
      <line x1="355" y1="100" x2="355" y2="185" strokeWidth="1" opacity=".6" />
      <line x1="338" y1="150" x2="372" y2="150" strokeWidth=".8" opacity=".5" />
      {/* Four minarets */}
      <line x1="305" y1="185" x2="305" y2="130" strokeWidth="1.4" />
      <line x1="315" y1="185" x2="315" y2="135" strokeWidth="1.2" />
      <line x1="395" y1="185" x2="395" y2="135" strokeWidth="1.2" />
      <line x1="405" y1="185" x2="405" y2="130" strokeWidth="1.4" />
      {/* Minaret tips */}
      <path d="M302 130 Q305 122 308 130" strokeWidth="1.2" />
      <path d="M312 135 Q315 128 318 135" strokeWidth="1" />
      <path d="M392 135 Q395 128 398 135" strokeWidth="1" />
      <path d="M402 130 Q405 122 408 130" strokeWidth="1.2" />
      {/* Courtyard base */}
      <rect x="310" y="183" width="90" height="4" strokeWidth="1" />

      {/* ── Pakistan Monument arches (centre) ── */}
      {/* Main large arch */}
      <path d="M470 185 L470 140 Q500 100 530 140 L530 185" strokeWidth="2" />
      {/* Inner detail */}
      <path d="M480 185 L480 148 Q500 118 520 148 L520 185" strokeWidth="1" opacity=".6" />
      {/* Left petal arch */}
      <path d="M450 185 L450 155 Q465 130 480 155 L480 185" strokeWidth="1.6" />
      {/* Right petal arch */}
      <path d="M520 185 L520 155 Q535 130 550 155 L550 185" strokeWidth="1.6" />
      {/* Crescent on top */}
      <path d="M494 100 A10 10 0 0 1 506 100" strokeWidth="1.4" />
      {/* Walkway */}
      <line x1="440" y1="185" x2="560" y2="185" strokeWidth="1.2" />

      {/* ── General buildings right side ── */}
      <rect x="600" y="155" width="22" height="30" strokeWidth="1.2" />
      <rect x="628" y="145" width="18" height="40" strokeWidth="1.2" />
      <rect x="652" y="160" width="14" height="25" strokeWidth="1" />
      <rect x="672" y="148" width="20" height="37" strokeWidth="1.2" />
      <rect x="698" y="158" width="16" height="27" strokeWidth="1" />
      {/* Windows */}
      <line x1="609" y1="162" x2="609" y2="182" strokeWidth=".6" opacity=".5" />
      <line x1="614" y1="162" x2="614" y2="182" strokeWidth=".6" opacity=".5" />
      <line x1="636" y1="152" x2="636" y2="182" strokeWidth=".6" opacity=".5" />
      <line x1="641" y1="152" x2="641" y2="182" strokeWidth=".6" opacity=".5" />

      {/* ── General buildings left side ── */}
      <rect x="200" y="158" width="20" height="27" strokeWidth="1.2" />
      <rect x="226" y="150" width="16" height="35" strokeWidth="1.2" />
      <rect x="248" y="162" width="18" height="23" strokeWidth="1" />
      <line x1="208" y1="164" x2="208" y2="182" strokeWidth=".6" opacity=".5" />
      <line x1="213" y1="164" x2="213" y2="182" strokeWidth=".6" opacity=".5" />

      {/* ── Ground line ── */}
      <line x1="0" y1="185" x2="1000" y2="185" strokeWidth="1.2" />
    </svg>
  )
}

function Reveal({ children, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
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
      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          {/* 1. Updated brand: logo + name + subtitle */}
          <Link to="/" className="brand">
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
            <a href="#about"    onClick={closeNav}>About</a>
            <a href="#members"  onClick={closeNav}>Members</a>
            <a href="#practice" onClick={closeNav}>Practice</a>
            <a href="#contact"  className="nav-cta" onClick={closeNav}>Contact</a>
          </div>
        </div>
      </nav>

      {/* ── HERO — Islamabad skyline SVG watermark, no photo background ── */}
      <header className="hero hero--skyline">
        {/* 6. Islamabad skyline as hero background watermark */}
        <IslamabadSkyline className="hero-skyline-wm" />
        <div className="hero-brand-lockup">
          <div className="hero-logo-badge" aria-hidden="true">
            <ScalesLogo size={64} className="hero-scales" />
          </div>
          <h1 className="hero-title">13A Law Chambers</h1>
        </div>
        <div className="hero-divider" />
        <p className="hero-sub">A shared chambers of independent advocates, committed to rigorous counsel and principled advocacy across the courts of Pakistan.</p>
        <div className="hero-meta">
          <div className="hero-meta-item"><strong>Jurisdiction</strong><span>Supreme Court of Pakistan</span></div>
          <div className="hero-meta-item"><strong>Location</strong><span>F-8/1, Islamabad</span></div>
          <div className="hero-meta-item"><strong>Est.</strong><span>13A, Street 37</span></div>
        </div>
        <div className="hero-scroll">Scroll</div>
      </header>

      {/* ── ABOUT ── */}
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
          </div>
        </div>
      </section>

      {/* ── IMAGE BAND — Library ── */}
      <Reveal className="imgband imgband--library" aria-hidden="true">
        <div className="imgband-caption">
          "The law is reason, free from passion."
          <small>— Aristotle</small>
        </div>
      </Reveal>

      {/* ── MEMBERS ── */}
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
                <div className="member-avatar" style={m.avatar ? { backgroundImage: `url(${m.avatar})` } : undefined} />
                <div className="member-info">
                  <div className="member-name">{m.name}</div>
                  <div className="member-role">{m.cardRole}</div>
                </div>
                <div className="member-arrow">Read Profile</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRACTICE ── */}
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

      {/* ── IMAGE BAND — Monument ── */}
      <Reveal className="imgband imgband--monument" aria-hidden="true">
        <div className="imgband-caption">
          Practising at the heart of the capital.
          <small>Islamabad&nbsp;·&nbsp;Pakistan</small>
        </div>
      </Reveal>

      {/* ── CONTACT ── */}
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

      {/* ── IMPORTANT NOTICE (moved near page bottom) ── */}
      <section id="notice">
        <div className="container">
          <div className="sec-label">Important Notice</div>
          <Reveal className="notice-box notice-box--bottom">
            <h4>Important Notice</h4>
            <p>13A Law Chambers is a shared chambers arrangement. Each lawyer practises independently and maintains their own client relationships and professional responsibilities. We are not a partnership or law firm, and no lawyer here is liable for the work or conduct of any other.</p>
            <p>Where appropriate and with the informed consent of the client, one or more advocates may be engaged or may collaborate on a particular matter. Any such engagement is matter-specific and does not create a partnership, joint venture, or any continuing professional association.</p>
            <p>Nothing on this website shall be construed as indicating the existence of a partnership, joint venture, or any other form of professional association between the occupants of these chambers.</p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="foot-grid">
          <div>
            {/* 1. Footer brand with logo */}
            <div className="foot-brand-row">
              <ScalesLogo size={22} className="foot-logo" />
              <div>
                <div className="foot-brand">13A Law Chambers</div>
                <div className="foot-tagline">Advocates &amp; Legal Consultants&nbsp;·&nbsp;Islamabad</div>
              </div>
            </div>
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
