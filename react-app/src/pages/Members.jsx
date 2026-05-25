import { Link } from 'react-router-dom'
import { members } from '../members'
import { PageShell, Reveal, ScalesLogo } from '../SiteChrome'

export default function Members() {
  return (
    <PageShell>
      <section id="members" className="page-section first-page-section">
        <svg className="sec-wm" viewBox="0 0 220 280" fill="none" stroke="currentColor" strokeLinecap="round" aria-hidden="true">
          <line x1="110" y1="20" x2="110" y2="230" strokeWidth="1.4" />
          <circle cx="110" cy="20" r="4" fill="currentColor" strokeWidth="0" />
          <line x1="68" y1="250" x2="152" y2="250" strokeWidth="2" />
          <line x1="82" y1="250" x2="138" y2="250" strokeWidth="3" />
          <line x1="28" y1="75" x2="192" y2="75" strokeWidth="1.4" />
          <line x1="28" y1="75" x2="28" y2="105" strokeWidth="1" strokeDasharray="3 4" />
          <path d="M 4 105 Q 28 145 52 105" strokeWidth="1.4" />
          <line x1="4" y1="105" x2="52" y2="105" strokeWidth="1.4" />
          <line x1="192" y1="75" x2="192" y2="105" strokeWidth="1" strokeDasharray="3 4" />
          <path d="M 168 105 Q 192 145 216 105" strokeWidth="1.4" />
          <line x1="168" y1="105" x2="216" y2="105" strokeWidth="1.4" />
        </svg>
        <div className="container">
          <div className="sec-label">Members of Chambers</div>
          <div className="sec-title-lockup">
            <div className="sec-title-badge" aria-hidden="true"><ScalesLogo /></div>
            <h2 className="sec-title">Members.</h2>
          </div>
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
    </PageShell>
  )
}
