import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';
import './PitchForm.css';

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
    if (!form.name || !form.email || !form.message) {
      alert('Please complete all required fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "58a48f41-9f70-4145-ba77-addcd1429179",
          subject: `New Inquiry from ${form.name} - ${form.company || 'Individual'}`,
          from_name: form.name,
          email: form.email,
          Organization: form.company || 'N/A',
          Area_of_Interest: form.service,
          message: form.message,
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="pitch page-transition">
        <div className="container">
          <div className="success-view animate-in">
            <span className="section-label">Received</span>
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
        <div className="pitch-intro" ref={introRef}>
          <span className="section-label" data-reveal>Contact</span>
          <h2 data-reveal>Start a conversation</h2>
          <hr className="divider" data-reveal />
          <p data-reveal>
            Whether you need an AI strategy, a bespoke platform, or 
            infrastructure that scales — tell us what you're building. 
            Even if it is just an idea, let's talk. We have the expertise 
            to take a vision from conception to production.
          </p>
        </div>

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
    </section>
  );
}
