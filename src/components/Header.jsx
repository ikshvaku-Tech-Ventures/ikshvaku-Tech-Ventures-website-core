import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

export default function Header({ activeTab, setActiveTab }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nav = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <button onClick={() => nav('home')} className="logo-link">
          <img src="/logo.png" alt="Ikshvaku" className="logo-icon" />
          <span className="logo-text">Ikshvaku</span>
        </button>

        <nav>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {[
              ['home', 'Home'],
              ['about', 'About'],
              ['services', 'Services'],
              ['pitch', 'Contact'],
            ].map(([id, label]) => (
              <li key={id} className="nav-item">
                <button
                  className={activeTab === id ? 'active' : ''}
                  onClick={() => nav(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
