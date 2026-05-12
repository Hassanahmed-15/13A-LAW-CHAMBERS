import { useState } from 'react'
import { PageShell, Reveal } from '../SiteChrome'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
    e.target.reset()
  }

  return (
    <PageShell>
      <section id="contact" className="page-section first-page-section">
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
                <p>Monday - Friday&nbsp;·&nbsp;9:00 am - 6:00 pm</p>
              </div>
            </Reveal>
            <Reveal as="form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="text" placeholder="Your name" required />
                <input type="email" placeholder="Email address" required />
              </div>
              <input type="text" placeholder="Subject" />
              <textarea placeholder="Your message" required />
              <button type="submit">{sent ? 'Message Sent - Thank You' : 'Send Message'}</button>
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
