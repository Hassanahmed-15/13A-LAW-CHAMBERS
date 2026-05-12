import { PageShell, Reveal } from '../SiteChrome'

export default function Notice() {
  return (
    <PageShell>
      <section id="notice" className="page-section first-page-section">
        <div className="container">
          <div className="sec-label">Important Notice</div>
          <h2 className="sec-title">Independent <em>practice.</em></h2>
          <Reveal className="notice-box notice-box--bottom">
            <p>13A Law Chambers is a shared chambers arrangement. Each lawyer practises independently and maintains their own client relationships and professional responsibilities. We are not a partnership or law firm, and no lawyer here is liable for the work or conduct of any other.</p>
            <p>Where appropriate and with the informed consent of the client, one or more advocates may be engaged or may collaborate on a particular matter. Any such engagement is matter-specific and does not create a partnership, joint venture, or any continuing professional association.</p>
            <p>Nothing on this website shall be construed as indicating the existence of a partnership, joint venture, or any other form of professional association between the occupants of these chambers.</p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
