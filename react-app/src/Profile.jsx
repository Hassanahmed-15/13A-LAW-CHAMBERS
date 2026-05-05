import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { memberBySlug, members } from './members'

const ScalesWatermark = () => (
  <svg className="prof-hero-wm" viewBox="0 0 220 280" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
    <line x1="110" y1="20" x2="110" y2="230" strokeWidth="1.4" />
    <circle cx="110" cy="20" r="4" fill="currentColor" strokeWidth="0" />
    <line x1="68"  y1="250" x2="152" y2="250" strokeWidth="2" />
    <line x1="28"  y1="75"  x2="192" y2="75"  strokeWidth="1.4" />
    <line x1="28"  y1="75"  x2="28"  y2="105" strokeWidth="1" strokeDasharray="3 4" />
    <path d="M 4 105 Q 28 145 52 105" strokeWidth="1.4" />
    <line x1="4"   y1="105" x2="52"  y2="105" strokeWidth="1.4" />
    <line x1="192" y1="75"  x2="192" y2="105" strokeWidth="1" strokeDasharray="3 4" />
    <path d="M 168 105 Q 192 145 216 105" strokeWidth="1.4" />
    <line x1="168" y1="105" x2="216" y2="105" strokeWidth="1.4" />
  </svg>
)

function Sidebar({ member }) {
  const others = members.filter(x => x.slug !== member.slug)
  return (
    <aside className="prof-sidebar">
      {member.sidebar.map((card, i) => (
        <div className="sidebar-card" key={i}>
          <h4>{card.h}</h4>
          {card.body.map((it, j) => {
            if (it.type === 'p')        return <p key={j}>{it.text}</p>
            if (it.type === 'p-muted')  return <p key={j} className="muted">{it.text}</p>
            if (it.type === 'a') {
              return it.external
                ? <a key={j} href={it.href} target="_blank" rel="noopener noreferrer">{it.text}</a>
                : <a key={j} href={it.href}>{it.text}</a>
            }
            return null
          })}
        </div>
      ))}
      <div className="sidebar-card">
        <h4>Chambers</h4>
        <p>House No. 13-A, Street 37<br />Sector F-8/1, Islamabad</p>
        <Link to="/#contact" style={{ marginTop: 12, fontSize: 13, color: 'var(--gold)' }}>Make an Enquiry →</Link>
      </div>
      <div className="sidebar-card">
        <h4>All Members</h4>
        {others.map(o => (
          <Link key={o.slug} to={`/profile/${o.slug}`}>{o.name}</Link>
        ))}
      </div>
    </aside>
  )
}

export default function Profile() {
  const { slug } = useParams()
  const member = memberBySlug[slug]
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!member) return <Navigate to="/" replace />

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="brand">
            13A Law Chambers
            <span>Advocates · Islamabad</span>
          </Link>
          <Link to="/#members" className="nav-back">← All Members</Link>
        </div>
      </nav>

      <section className="prof-hero">
        <ScalesWatermark />
        <div className="prof-hero-inner">
          <div
            className="prof-photo"
            style={member.photo ? { backgroundImage: `url(${member.photo})` } : undefined}
          />
          <div>
            <div className="prof-label">Member of Chambers</div>
            <h1 className="prof-name">{member.name}</h1>
            <div className="prof-role">{member.role}</div>
            <p className="prof-summary">{member.summary}</p>
            <div className="prof-tags">
              {member.tags.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      </section>

      <div className="prof-content">
        <main>
          {member.sections.map((s, i) => (
            <div className="prof-section" key={i}>
              <div className="section-label">{s.label}</div>
              <h3>{s.h}</h3>
              {s.paragraphs && s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
              {s.timeline && (
                <ul className="timeline">
                  {s.timeline.map((t, j) => (
                    <li key={j}>
                      <div className="timeline-year">{t.year}</div>
                      <div className="timeline-role">{t.role}</div>
                      <div className="timeline-org">{t.org}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </main>
        <Sidebar member={member} />
      </div>

      <footer className="prof-footer">
        <div className="foot-inner">
          <div className="foot-brand">13A Law Chambers</div>
          <div className="foot-links">
            <Link to="/#about">About</Link>
            <Link to="/#members">Members</Link>
            <Link to="/#practice">Practice</Link>
            <Link to="/#contact">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
