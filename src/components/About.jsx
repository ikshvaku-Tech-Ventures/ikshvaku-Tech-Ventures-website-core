import { useScrollReveal } from '../hooks/useAnimations';
import { ArrowRight, Compass, Shield, Cpu } from 'lucide-react';
import './About.css';

export default function About({ onNavigate }) {
  const introRef = useScrollReveal({ stagger: 140 });
  const pillarsRef = useScrollReveal({ stagger: 160, threshold: 0.1 });
  const tenetsRef = useScrollReveal({ stagger: 160, threshold: 0.1 });
  const manifestoRef = useScrollReveal({ stagger: 140 });

  const navigateTo = (tab) => {
    if (onNavigate) onNavigate(tab);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="about-page">
      {/* ── Section 1: Lineage & Foundation ── */}
      <div className="container">
        <div className="about-hero" ref={introRef}>
          <span className="section-label" data-reveal>Heritage & Lineage</span>
          <h1 className="about-hero-title" data-reveal>
            A lineage of <em>builders.</em>
          </h1>
          <hr className="divider" data-reveal />
          <p className="about-lead" data-reveal>
            Ikshvaku Tech Ventures is an applied artificial intelligence and software engineering firm
            founded by <strong>Manas Ram Bapatla</strong> and <strong>Madhusudhan M Badsheshi</strong>.
            We engineer sovereign software platforms that solve complex operational and logistical
            challenges across global industries.
          </p>
          <p className="about-body" data-reveal>
            Named after the ancient Ikshvaku dynasty, the Suryavansha lineage of Lord Rama, our company
            is guided by the principles that sustained that empire across millennia: clarity of purpose,
            architectural integrity, and an unwavering commitment to what endures.
          </p>
        </div>

        {/* ── Section 2: Operating Framework (Three Avenues of Creation) ── */}
        <div className="about-section-block" ref={pillarsRef}>
          <div className="section-header-compact">
            <span className="section-label" data-reveal>Operating Framework</span>
            <h2 className="section-title-md" data-reveal>
              Three avenues of <em>creation.</em>
            </h2>
            <p className="section-caption" data-reveal>
              Rather than confining our work to a single mold, we operate across three distinct avenues of innovation.
            </p>
          </div>

          <div className="operating-grid">
            <div className="operating-card" data-reveal>
              <div className="operating-card-top">
                <span className="operating-num">01</span>
                <span className="operating-tag">Proprietary Labs</span>
              </div>
              <h3 className="operating-heading">Internal Incubation</h3>
              <p className="operating-text">
                In our internal research lab, we dream up and engineer our own platforms from the ground up,
                dedicated to ambient voice intelligence, senior citizen independence, and human dignity.
              </p>
              <div className="operating-highlight">
                <Compass size={14} className="operating-icon" />
                <span>Focus: Elder Concierge & Ambient AI</span>
              </div>
            </div>

            <div className="operating-card" data-reveal>
              <div className="operating-card-top">
                <span className="operating-num">02</span>
                <span className="operating-tag">Client Services</span>
              </div>
              <h3 className="operating-heading">Systems Engineering</h3>
              <p className="operating-text">
                For ambitious founders and enterprise leaders, we architect high performance software,
                deep technology web flagships, and spatial intelligence platforms built with surgical precision.
              </p>
              <div className="operating-highlight">
                <Cpu size={14} className="operating-icon" />
                <span>Focus: Rayton Semiconductor Flagship</span>
              </div>
            </div>

            <div className="operating-card" data-reveal>
              <div className="operating-card-top">
                <span className="operating-num">03</span>
                <span className="operating-tag">Joint Ventures</span>
              </div>
              <h3 className="operating-heading">Co Founded Businesses</h3>
              <p className="operating-text">
                We partner directly with domain leaders, educators, and creators to build, launch,
                and scale enduring commercial businesses as long term equity partners.
              </p>
              <div className="operating-highlight">
                <Shield size={14} className="operating-icon" />
                <span>Focus: RezFlow with Find Fulfilling Work</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 3: Engineering Principles ── */}
        <div className="about-section-block" ref={tenetsRef}>
          <div className="section-header-compact">
            <span className="section-label" data-reveal>Core Tenets</span>
            <h2 className="section-title-md" data-reveal>
              Principles of sovereign <em>engineering.</em>
            </h2>
          </div>

          <div className="tenets-grid">
            <div className="tenet-row" data-reveal>
              <div className="tenet-col-num">01</div>
              <div className="tenet-col-title">
                <h4>Architectural Integrity</h4>
                <span className="tenet-subtext">Precision & Permanence</span>
              </div>
              <div className="tenet-col-desc">
                <p>
                  End to end conceptualization and design executed with classical discipline,
                  emphasizing clear system boundaries, zero superfluous dependencies, and clean modular code.
                </p>
              </div>
            </div>

            <div className="tenet-row" data-reveal>
              <div className="tenet-col-num">02</div>
              <div className="tenet-col-title">
                <h4>Frugal Applied Intelligence</h4>
                <span className="tenet-subtext">Purposeful AI Systems</span>
              </div>
              <div className="tenet-col-desc">
                <p>
                  Autonomous agent workflows, machine learning models, and spatial intelligence algorithms
                  designed for rapid turn latency, practical everyday utility, and reliable human oversight.
                </p>
              </div>
            </div>

            <div className="tenet-row" data-reveal>
              <div className="tenet-col-num">03</div>
              <div className="tenet-col-title">
                <h4>Enduring Infrastructure</h4>
                <span className="tenet-subtext">Sovereign Data Topology</span>
              </div>
              <div className="tenet-col-desc">
                <p>
                  Resilient cloud architectures, high performance database topologies, and sovereign
                  data ownership ensuring platforms remain secure, stable, and scalable for decades.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 4: Sovereign Manifesto Callout ── */}
        <div className="manifesto-card" ref={manifestoRef} data-reveal>
          <div className="manifesto-glow-aura" />
          <span className="manifesto-badge">Sovereignty In Code</span>
          <h3 className="manifesto-quote">
            “The mightiest emperor needs no crown. We build software with the quiet permanence of temple architecture.”
          </h3>
          <p className="manifesto-caption">
            We construct digital foundations meant to outlast passing market cycles, pairing ancient
            architectural discipline with frontier computational intelligence.
          </p>
          <div className="manifesto-actions">
            <button className="btn btn--filled" onClick={() => navigateTo('products')}>
              Explore Our Ventures <ArrowRight size={14} />
            </button>
            <button className="btn" onClick={() => navigateTo('pitch')}>
              Initiate Dialogue
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
