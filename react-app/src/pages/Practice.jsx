import { PageShell, Reveal, ScalesLogo } from '../SiteChrome'
import { practiceAreas } from '../siteContent'

export default function Practice() {
  return (
    <PageShell>
      <section id="practice" className="page-section first-page-section">
        <div className="container">
          <div className="sec-label">Practice Areas</div>
          <div className="sec-title-lockup">
            <div className="sec-title-badge" aria-hidden="true"><ScalesLogo /></div>
            <h2 className="sec-title">Areas of <em>work.</em></h2>
          </div>
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
    </PageShell>
  )
}
