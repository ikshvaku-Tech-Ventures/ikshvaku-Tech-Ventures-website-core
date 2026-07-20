import { useEffect, useRef } from 'react';
import './Products.css';

export default function Products() {
  const capabilities = [
    {
      num: '01',
      title: 'Agentic AI & Machine Learning',
      desc: 'Autonomous workflows and intelligent algorithms that reason independently.',
      tags: ['Autonomous Agents', 'Predictive Analytics'],
    },
    {
      num: '02',
      title: 'Geospatial Intelligence',
      desc: 'Fusing location data with artificial intelligence to solve complex spatial challenges.',
      tags: ['Spatial Analytics', 'Location Data'],
    },
    {
      num: '03',
      title: 'Custom Software & Integration',
      desc: 'End-to-end design and implementation of bespoke software products and platforms.',
      tags: ['System Integration', 'Web Platforms'],
    },
    {
      num: '04',
      title: 'Cloud & Data Infrastructure',
      desc: 'Infrastructure architecture and cloud computing for sovereign, scalable operations.',
      tags: ['Cloud Architecture', 'Data Analytics'],
    }
  ];

  return (
    <div className="products-container page-transition">

      {/* Slide 1: Intro */}
      <section className="product-slide intro-slide">
        <div className="container">
          <span className="section-label">Products & Capabilities</span>
          <h2 className="slide-title">Engineering what endures.</h2>
          <hr className="divider" />
          <p className="slide-desc">
            We build sovereign digital infrastructure and intelligent systems.
            Scroll to explore our latest products and foundational capabilities.
          </p>
          <div className="scroll-indicator">
            <span className="mouse">
              <span className="wheel"></span>
            </span>
          </div>
        </div>
      </section>

      {/* Slide 2: RezFlow Product Showcase */}
      <section className="product-slide showcase-slide">
        <div className="showcase-layout">
          {/* Left Panel: Product info + Pillar.io preview */}
          <div className="showcase-left">
            <div className="showcase-info">
              <span className="section-label">Latest Product</span>
              <h2>RezFlow</h2>
              <p>Our latest AI product, engineered for the United States. 🇺🇸</p>
              <a href="https://rezflowapp.com/" target="_blank" rel="noopener noreferrer" className="btn btn--outline showcase-cta">
                Explore RezFlow ↗
              </a>
            </div>
            <div className="pillar-preview">
              <span className="pillar-label">Product Collaborator</span>
              <a href="https://pillar.io/findfulfillingwork/mediakit" target="_blank" rel="noopener noreferrer" className="pillar-card">
                <div className="pillar-card-image">
                  <img src="https://athlane-cdn-prod.s3.amazonaws.com/img/default-preview-thumbnail.png" alt="Pillar.io Preview" />
                </div>
                <div className="pillar-card-content">
                  <h4>Pillar.io Media Kit</h4>
                  <p>The all-in-one toolkit for creators. Click to explore.</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Panel: Full-height RezFlow live preview */}
          <div className="showcase-right">
            <iframe
              src="https://rezflowapp.com/"
              title="RezFlow App"
              loading="lazy"
            ></iframe>
            <a href="https://rezflowapp.com/" target="_blank" rel="noopener noreferrer" className="glass-overlay">
              <span className="hover-text">Explore RezFlow ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Slide 3: Capabilities */}
      <section className="product-slide capabilities-slide">
        <div className="container capabilities-container">
          <div className="capabilities-header">
            <span className="section-label">Foundational</span>
            <h2 className="slide-title">Core Capabilities.</h2>
          </div>
          
          <div className="capabilities-list">
            {capabilities.map((cap) => (
              <div key={cap.num} className="capability-row">
                <div className="cap-row-left">
                  <span className="cap-num">{cap.num}</span>
                  <h3>{cap.title}</h3>
                </div>
                <div className="cap-row-right">
                  <p>{cap.desc}</p>
                  <div className="cap-tags">
                    {cap.tags.map(t => <span key={t} className="cap-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
