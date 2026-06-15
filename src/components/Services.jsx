import React from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import './Services.css';

export default function Services() {
  const introRef = useScrollReveal({ stagger: 150 });
  const listRef = useScrollReveal({ stagger: 150, threshold: 0.05 });

  const services = [
    {
      num: '01',
      title: 'Agentic AI & Machine Learning',
      desc: 'Autonomous workflows and intelligent algorithms that reason independently — from predictive modelling to self-orchestrating decision systems.',
      tags: ['Autonomous Agents', 'Predictive Analytics', 'ML Pipelines'],
    },
    {
      num: '02',
      title: 'Geospatial Intelligence',
      desc: 'Fusing location data with artificial intelligence to solve complex spatial and logistical challenges across global operations.',
      tags: ['Spatial Analytics', 'Location Data', 'Logistics'],
    },
    {
      num: '03',
      title: 'Custom Software & Integration',
      desc: 'End-to-end conceptualization, design, coding, testing, and implementation of bespoke software products, mobile applications, and web platforms.',
      tags: ['System Integration', 'Mobile', 'Web Platforms'],
    },
    {
      num: '04',
      title: 'Cloud & Data Infrastructure',
      desc: 'Infrastructure architecture, database management, data analytics, and cloud computing — built with the latest emerging technologies for sovereign, scalable operations.',
      tags: ['Cloud Architecture', 'Data Analytics', 'Database Systems'],
    },
    {
      num: '05',
      title: 'Lifecycle & Continuity',
      desc: 'Post-launch operations, legacy migration, security patching, and round-the-clock support — ensuring the long-term stability of every system we build.',
      tags: ['Maintenance', 'Security', '24/7 Support'],
    },
  ];

  return (
    <section className="services page-transition">
      <div className="container">
        <div className="services-intro" ref={introRef}>
          <span className="section-label" data-reveal>Services</span>
          <h2 data-reveal>What we build</h2>
          <hr className="divider" data-reveal />
          <p data-reveal>
            Technical consultation and modern digital architecture, 
            from first principles to production.
          </p>
        </div>

        <div className="services-list" ref={listRef}>
          {services.map((s) => (
            <div key={s.num} className="service-item" data-reveal>
              <span className="service-num">{s.num}</span>
              <h3 className="service-title">{s.title}</h3>
              <div>
                <p className="service-desc">{s.desc}</p>
                <div className="service-tags">
                  {s.tags.map((tag) => (
                    <span key={tag} className="service-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
