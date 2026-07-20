import { useScrollReveal } from '../hooks/useAnimations';
import './About.css';

export default function About() {
  const introRef = useScrollReveal({ stagger: 150 });
  const valuesRef = useScrollReveal({ stagger: 200, threshold: 0.1 });

  return (
    <section className="about page-transition">
      <div className="container">
        <div className="about-intro" ref={introRef}>
          <span className="section-label" data-reveal>About</span>
          <h2 data-reveal>A lineage of builders</h2>
          <hr className="divider" data-reveal />
          <p data-reveal>
            Ikshvaku Tech Ventures is a premier technology and applied artificial 
            intelligence firm. Founded by <strong>Manas Ram Bapatla</strong> and 
            <strong> Madhusudhan M Badsheshi</strong>, we engineer high-end software 
            solutions that optimize operations across diverse industries globally.
          </p>
          <p data-reveal>
            Named after the ancient Ikshvaku dynasty — the Suryavansha lineage of 
            Lord Rama — our work is guided by the same principles that sustained 
            that empire across millennia: clarity of purpose, architectural 
            integrity, and an unwavering commitment to what endures.
          </p>
        </div>

        <div className="values" ref={valuesRef}>
          <div className="value" data-reveal>
            <div className="value-number">01</div>
            <h4>Architectural clarity</h4>
            <p>
              End-to-end conceptualization, design, coding, and implementation 
              of bespoke software products and platforms — built with the 
              precision of temple architecture.
            </p>
          </div>

          <div className="value" data-reveal>
            <div className="value-number">02</div>
            <h4>Intelligent systems</h4>
            <p>
              Agentic AI, machine learning, and geospatial intelligence — 
              autonomous workflows and algorithms that reason, adapt, and 
              solve complex spatial and logistical challenges.
            </p>
          </div>

          <div className="value" data-reveal>
            <div className="value-number">03</div>
            <h4>Enduring infrastructure</h4>
            <p>
              Cloud architecture, database management, and continuous lifecycle 
              support — ensuring that what we build today remains sovereign, 
              stable, and scalable for decades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
