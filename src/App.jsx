import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import PitchForm from './components/PitchForm';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [logoCompleted, setLogoCompleted] = useState(activeTab !== 'home');
  
  const [hasVisited, setHasVisited] = useState(() => {
    return sessionStorage.getItem('ikshvaku_visited') === 'true';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const navigate = (tab) => {
    setActiveTab(tab);
    setLogoCompleted(tab !== 'home' || hasVisited);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoComplete = useCallback(() => {
    setLogoCompleted(true);
    sessionStorage.setItem('ikshvaku_visited', 'true');
    setHasVisited(true);
  }, []);

  const renderPage = () => {
    switch (activeTab) {
      case 'about': return <About onNavigate={navigate} />;
      case 'products': return <Products onNavigate={navigate} />;
      case 'pitch': return <PitchForm />;
      default: return <Hero onNavigate={navigate} onLogoComplete={handleLogoComplete} skipAnimation={hasVisited} />;
    }
  };

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={navigate} showNavButtons={logoCompleted} />

      <main key={activeTab} style={{ paddingTop: '80px' }}>
        {renderPage()}
      </main>

      {logoCompleted && (
        <footer className="footer">
          <div className="container">
            <div className="footer-inner">
              <div className="footer-brand">
                <h3>Ikshvaku</h3>
                <p>
                  Technology and applied artificial intelligence.
                  Engineering what endures.
                </p>
              </div>

              <div className="footer-links-group">
                <div className="footer-col">
                  <h4>Navigate</h4>
                  <ul className="footer-links">
                    <li><button onClick={() => navigate('about')}>About</button></li>
                    <li><button onClick={() => navigate('products')}>Ventures</button></li>
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
                <a
                  href="https://www.linkedin.com/company/133447831/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link social-link--linkedin"
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/ikshvakutechventures?stkn=YmhqcmFhZHJwZHVs&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link social-link--instagram"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

export default App;
