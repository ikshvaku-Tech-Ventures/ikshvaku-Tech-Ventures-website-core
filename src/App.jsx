import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import PitchForm from './components/PitchForm';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [logoCompleted, setLogoCompleted] = useState(activeTab !== 'home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const navigate = (tab) => {
    setActiveTab(tab);
    setLogoCompleted(tab !== 'home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoComplete = useCallback(() => {
    setLogoCompleted(true);
  }, []);

  const renderPage = () => {
    switch (activeTab) {
      case 'about': return <About />;
      case 'services': return <Services />;
      case 'pitch': return <PitchForm />;
      default: return <Hero onNavigate={navigate} onLogoComplete={handleLogoComplete} />;
    }
  };

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={navigate} showNavButtons={logoCompleted} />

      <main key={activeTab} style={{ paddingTop: '80px' }}>
        {renderPage()}
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <h3>Ikshvaku</h3>
              <p>
                Technology and applied artificial intelligence —
                engineering what endures.
              </p>
            </div>

            <div className="footer-links-group">
              <div className="footer-col">
                <h4>Navigate</h4>
                <ul className="footer-links">
                  <li><button onClick={() => navigate('about')}>About</button></li>
                  <li><button onClick={() => navigate('services')}>Services</button></li>
                  <li><button onClick={() => navigate('pitch')}>Contact</button></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Legal</h4>
                <ul className="footer-links">
                  <li><a href="#">Privacy</a></li>
                  <li><a href="#">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Ikshvaku Tech Ventures</p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
