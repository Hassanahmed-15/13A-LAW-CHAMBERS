import { PageShell, Reveal, ScalesLogo } from '../SiteChrome'

export default function About() {
  return (
    <PageShell>
      <section id="about" className="page-section first-page-section">
        <div className="container">
          <div className="sec-label">About</div>
          <div className="sec-title-lockup">
            <div className="sec-title-badge" aria-hidden="true"><ScalesLogo /></div>
            <h2 className="sec-title">Independence.<br /><em>Shared standards.</em></h2>
          </div>
          <div className="about-grid">
            <Reveal className="about-text">
              <p>13A Law Chambers is a shared chambers in Islamabad, bringing together advocates of the Supreme Court of Pakistan who choose to practise side by side under a common roof.</p>
              <p>Each member maintains their own clients, their own files, and their own professional standards — supported by a collegiate environment that encourages exchange, scrutiny, and a shared commitment to the rule of law.</p>
              <p>Where a matter benefits from collaboration, members may, with the client's informed consent, work jointly on a brief. Otherwise, every advocate practises in their own right and on their own responsibility.</p>
            </Reveal>
            <Reveal className="about-image-band" aria-label="13A Law Chambers garden" />
          </div>
        </div>
      </section>
    </PageShell>
  )
}
