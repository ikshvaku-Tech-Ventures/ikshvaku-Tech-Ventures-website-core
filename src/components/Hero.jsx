import { useState, useEffect, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const SLOKA_LINE = 'कायेन वाचा मनसेन्द्रियैर्वा । बुद्ध्यात्मना वा प्रकृतिस्वभावात् । करोमि यद्यत्सकलं परस्मै । नारायणयेति समर्पयामि ॥';

const ARROW_DURATION = 5;
const ARROW_DELAY = 0.3;
const ARROW_START = -10;
const ARROW_END = 110;
const TEXT_LEFT = 3;
const TEXT_RIGHT = 97;

const RAM_STRING = "राम ".repeat(100);

export default function Hero({ onNavigate, onLogoComplete }) {
  const [phase, setPhase] = useState('arrow'); // 'arrow' → 'logo' → 'content'

  const slokaChars = useMemo(() => {
    const chars = SLOKA_LINE.split('');
    const totalChars = chars.length;
    const arrowRange = ARROW_END - ARROW_START;
    const timeToReachTextLeft = ((TEXT_LEFT - ARROW_START) / arrowRange) * ARROW_DURATION;
    const timeToReachTextRight = ((TEXT_RIGHT - ARROW_START) / arrowRange) * ARROW_DURATION;
    const textDuration = timeToReachTextRight - timeToReachTextLeft;

    return chars.map((char, i) => {
      const charDelay = ARROW_DELAY + timeToReachTextLeft + (i / (totalChars - 1)) * textDuration;
      return (
        <span
          key={i}
          className="trail-char"
          style={{ animationDelay: `${charDelay.toFixed(3)}s` }}
        >
          {char}
        </span>
      );
    });
  }, []);

  useEffect(() => {
    // Arrow finishes → show logo
    const logoTimer = setTimeout(() => setPhase('logo'), (ARROW_DELAY + ARROW_DURATION + 0.5) * 1000);
    // Logo holds → show content
    const contentTimer = setTimeout(() => {
      setPhase('content');
      if (onLogoComplete) {
        onLogoComplete();
      }
    }, (ARROW_DELAY + ARROW_DURATION + 3.0) * 1000);
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(contentTimer);
    };
  }, [onLogoComplete]);

  return (
    <section className="hero">
      {phase !== 'content' && (
        <div className="ram-borders" aria-hidden="true">
          <div className="ram-border-top">{RAM_STRING}</div>
          <div className="ram-border-bottom">{RAM_STRING}</div>
        </div>
      )}

      {/* === Arrow + Sloka Trail === */}
      {phase === 'arrow' && (
        <>
          <div className="arrow-container" aria-hidden="true">
            <svg className="flying-arrow" viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,4 18,12 0,20 6,12" fill="#c5a55a" opacity="0.5"/>
              <line x1="6" y1="12" x2="165" y2="12" stroke="#c5a55a" strokeWidth="2.5"/>
              <polygon points="160,2 200,12 160,22 168,12" fill="#c5a55a"/>
            </svg>
          </div>

          <div className="sloka-trail" aria-hidden="true">
            {slokaChars}
          </div>
        </>
      )}

      {/* === Logo — fades in after arrow, then fades out === */}
      {phase === 'logo' && (
        <div className="hero-logo-reveal">
          <img src="/logo.png" alt="Ikshvaku Tech Ventures" className="hero-logo" />
        </div>
      )}

      {/* === Main Content === */}
      {phase === 'content' && (
        <div className="container hero-content hero-content--visible">
          <div className="hero-line hero-line--1">
            <h1 className="hero-title">
              Building what <em>endures</em>
            </h1>
          </div>

          <div className="hero-line hero-line--2">
            <hr className="divider divider--center" />
          </div>

          <div className="hero-line hero-line--3">
            <p className="hero-subtitle">
              We architect intelligent systems rooted in clarity and purpose — 
              Agentic AI, Geospatial intelligence, and sovereign digital 
              infrastructure for the organizations shaping tomorrow.
            </p>
          </div>

          <div className="hero-line hero-line--4">
            <div className="hero-actions">
              <button onClick={() => onNavigate('services')} className="btn btn--filled">
                Our work <ArrowRight size={14} />
              </button>
              <button onClick={() => onNavigate('about')} className="btn">
                About us
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
