import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';
import './PitchForm.css';

// Web3Forms access keys. Submissions are sent to all keys in this array.
const WEB3FORMS_ACCESS_KEYS = [
  "58a48f41-9f70-4145-ba77-addcd1429179", // Manas Ram
  "84856dd3-1407-46fd-83ca-0c19f340bad0", // Madhusudhan (madhusudhan@ikshvakutechventures.com)
].filter(Boolean);

export default function PitchForm() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', website: '', service: 'Agentic AI', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const introRef = useScrollReveal({ stagger: 150 });
  const formRef = useScrollReveal({ stagger: 100, threshold: 0.05 });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submissions = WEB3FORMS_ACCESS_KEYS.map((key) =>
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: key,
            subject: `New Inquiry from ${form.name} (${form.company || 'Individual'})`,
            from_name: 'Ikshvaku Website',
            name: form.name,
            email: form.email,
            company: form.company || 'Not provided',
            website: form.website || 'Not provided',
            service: form.service,
            message: form.message,
          }),
        }).then((res) => {
          if (!res.ok) throw new Error(`Submission failed for key: ${key.slice(0, 8)}...`);
          return res.json();
        })
      );

      const results = await Promise.all(submissions);
      const allSuccessful = results.every((data) => data.success);

      if (allSuccessful) {
        setSubmitted(true);
      } else {
        alert('There was an issue submitting your inquiry to one or more recipients. Please try again.');
      }
    } catch {
      alert('Unable to send inquiry. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="pitch page-transition">
        <div className="container">
          <div className="success-view">
            <span className="section-label">Inquiry Received</span>
            <h3>We will be in touch</h3>
            <hr className="divider" />
            <p>
              Thank you for reaching out to Ikshvaku Tech Ventures.
              Our team reviews all inquiries and will respond within five business days.
            </p>
            <button
              className="btn"
              onClick={() => {
                setSubmitted(false);
                setForm({ name: '', email: '', company: '', website: '', service: 'Agentic AI', message: '' });
              }}
            >
              Send another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pitch page-transition">
      <div className="container">
        <div className="pitch-layout">
          {/* Left Column: Intro & Direct Channels */}
          <div className="pitch-intro" ref={introRef}>
            <span className="section-label" data-reveal>Direct Engagement</span>
            <h1 className="pitch-hero-title" data-reveal>
              Start a <em>conversation.</em>
            </h1>
            <hr className="divider" data-reveal />
            <p data-reveal>
              Whether you need an AI strategy, a bespoke platform, or
              infrastructure that scales, let's talk about what you're building.
              We have the expertise to take a vision from conception to production.
            </p>

            {/* Direct Social Channels */}
            <div className="pitch-channels-block" data-reveal>
              <span className="channels-label">Direct Channels</span>
              <div className="channels-list">
                <a
                  href="https://www.linkedin.com/company/133447831/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-card channel-card--linkedin"
                  aria-label="Connect on LinkedIn"
                >
                  <div className="channel-icon-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div className="channel-text">
                    <span className="channel-name">LinkedIn</span>
                    <span className="channel-meta">Professional Updates</span>
                  </div>
                  <ArrowUpRight size={14} className="channel-arrow" />
                </a>

                <a
                  href="https://www.instagram.com/ikshvakutechventures?stkn=YmhqcmFhZHJwZHVs&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-card channel-card--instagram"
                  aria-label="Follow on Instagram"
                >
                  <div className="channel-icon-wrap">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div className="channel-text">
                    <span className="channel-name">Instagram</span>
                    <span className="channel-meta">Behind the Scenes</span>
                  </div>
                  <ArrowUpRight size={14} className="channel-arrow" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiries Form */}
          <div className="pitch-form-wrap" ref={formRef}>
            <form className="pitch-form" onSubmit={handleSubmit}>
              <div className="form-row" data-reveal>
                <div className="form-field">
                  <label className="form-label" htmlFor="name">Name *</label>
                  <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required className="form-input" />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required className="form-input" />
                </div>
              </div>

              <div className="form-row" data-reveal>
                <div className="form-field">
                  <label className="form-label" htmlFor="company">Organization</label>
                  <input type="text" id="company" name="company" value={form.company} onChange={handleChange} placeholder="Company name" className="form-input" />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="service">Area of interest</label>
                  <select id="service" name="service" value={form.service} onChange={handleChange} className="form-select">
                    <option>Agentic AI</option>
                    <option>Geospatial Intelligence</option>
                    <option>Custom Software</option>
                    <option>Cloud Infrastructure</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="form-field" data-reveal>
                <label className="form-label" htmlFor="message">Message *</label>
                <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project or challenge" required className="form-textarea" />
              </div>

              <div className="submit-row" data-reveal>
                <button type="submit" className="btn btn--filled" disabled={loading}>
                  {loading ? 'Sending…' : 'Send'} <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
