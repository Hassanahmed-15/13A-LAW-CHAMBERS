import { useEffect, useState } from 'react'
import { Link, useLocation, useParams, Navigate } from 'react-router-dom'
import { memberBySlug, memberProfilePath, members } from './members'
import { ScalesLogo } from './SiteChrome'

const SITE_ORIGIN = 'https://www.13alawchambers.com'
const OFFICE_ADDRESS = 'House No. 13-A, Street 37, Sector F-8/1, Islamabad, Pakistan'

function setMeta(name, content, attr = 'name') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function getContact(member, prefix) {
  return member.sidebar
    .flatMap(card => card.body || [])
    .find(item => item.type === 'a' && item.href?.startsWith(prefix))
}

function plainText(text) {
  return text.replace(/\s+/g, ' ').trim()
}

function buildDescription(member) {
  return plainText(`${member.name}, ${member.role} at 13A Law Chambers in Islamabad. ${member.summary}`)
}

function ProfileStructuredData({ member, canonicalUrl }) {
  const email = getContact(member, 'mailto:')?.href.replace('mailto:', '')
  const sameAs = member.sidebar
    .flatMap(card => card.body || [])
    .filter(item => item.type === 'a' && item.external)
    .map(item => item.href)

  const data = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${canonicalUrl}#profile`,
    name: member.name,
    url: canonicalUrl,
    image: `${SITE_ORIGIN}${member.photo}`,
    description: buildDescription(member),
    areaServed: ['Islamabad', 'Pakistan'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'House No. 13-A, Street 37, Sector F-8/1',
      addressLocality: 'Islamabad',
      addressCountry: 'PK',
    },
    member: {
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role,
      image: `${SITE_ORIGIN}${member.photo}`,
      url: canonicalUrl,
      email,
      sameAs,
      knowsAbout: member.tags,
      worksFor: {
        '@type': 'LegalService',
        name: '13A Law Chambers',
        url: SITE_ORIGIN,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

function ProfileSection({ section }) {
  return (
    <div className="prof-section">
      <div className="section-label">{section.label}</div>
      <h3>{section.h}</h3>
      {section.paragraphs?.map((para, i) => <p key={i}>{para}</p>)}
      {section.timeline && (
        <ol className="timeline">
          {section.timeline.map((item, i) => (
            <li key={`${item.year}-${i}`}>
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-role">{item.role}</div>
              <div className="timeline-org">{item.org}</div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

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
  const linkedIn = member.sidebar
    .flatMap(card => card.body || [])
    .find(item => item.type === 'a' && item.href && item.href.includes('linkedin.com'))

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
                ? <a key={j} className="prof-link" href={it.href} target="_blank" rel="noopener noreferrer">{it.text}</a>
                : <a key={j} className="prof-link" href={it.href}>{it.text}</a>
            }
            return null
          })}
        </div>
      ))}
      {linkedIn && (
        <div className="sidebar-card">
          <h4>Full Profile</h4>
          <a className="prof-link prof-link--cta" href={linkedIn.href} target="_blank" rel="noopener noreferrer">
            View on LinkedIn →
          </a>
        </div>
      )}
      <div className="sidebar-card">
        <h4>All Members</h4>
        {others.map(o => (
          <Link key={o.slug} to={memberProfilePath(o)} className="prof-link">{o.name}</Link>
        ))}
      </div>
    </aside>
  )
}

export default function Profile() {
  const { slug } = useParams()
  const location = useLocation()
  const member = memberBySlug[slug]
  const [scrolled, setScrolled] = useState(false)
  const canonicalUrl = member ? `${SITE_ORIGIN}${memberProfilePath(member)}` : SITE_ORIGIN

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!member) return

    const title = `${member.name} | ${member.role} | 13A Law Chambers`
    const description = buildDescription(member)

    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', 'profile', 'property')
    setMeta('og:url', canonicalUrl, 'property')
    setMeta('og:image', `${SITE_ORIGIN}${member.photo}`, 'property')
    setMeta('twitter:card', 'summary_large_image')
    setCanonical(canonicalUrl)
  }, [member, canonicalUrl])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!member) return <Navigate to="/" replace />
  if (location.pathname !== memberProfilePath(member)) return <Navigate to={memberProfilePath(member)} replace />

  return (
    <>
      <ProfileStructuredData member={member} canonicalUrl={canonicalUrl} />
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="brand">
            <ScalesLogo size={26} className="brand-logo" />
            <div className="brand-text">
              13A Law Chambers
              <span>Advocates &amp; Legal Consultants · Islamabad</span>
            </div>
          </Link>
          <Link to="/members" className="nav-back">← All Members</Link>
        </div>
      </nav>

      <section className="prof-hero">
        <ScalesWatermark />
        <div className="prof-hero-inner">
          <figure className="prof-photo">
            {member.photo && (
              <img
                src={member.photo}
                alt={`${member.name} ${member.role} headshot`}
              />
            )}
          </figure>
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
          <div className="prof-section">
            <div className="section-label">Profile</div>
            <h3>Overview</h3>
            {(member.profileIntro || member.summary)
              .split(/\n\n+/)
              .map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <div className="prof-section">
            <div className="section-label">Practice Areas</div>
            <h3>Areas of Work</h3>
            <div className="prof-tags prof-tags--section">
              {member.tags.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
          </div>
          {member.sections?.map(section => (
            <ProfileSection key={`${section.label}-${section.h}`} section={section} />
          ))}
          <div className="prof-section">
            <div className="section-label">Office</div>
            <h3>Location</h3>
            <p>{member.name} is associated with 13A Law Chambers, located at {OFFICE_ADDRESS}.</p>
          </div>
        </main>
        <Sidebar member={member} />
      </div>
    </>
  )
}
