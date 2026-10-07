import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Cpu,
  Layers,
  Activity,
  Zap,
  Radio,
  FileCheck
} from 'lucide-react';
import './Products.css';

/* ─────────────────────────────────────────────────────────────
   IKSHVAKU VENTURES ARCHITECTURE
   Three distinct avenues of innovation:
   01. Proprietary Labs       → Elder Concierge (ECS) [Teaser]
   02. Client Services        → Rayton [Teaser]
   03. Collaborative Ventures → RezFlow [Live in USA]
   ───────────────────────────────────────────────────────────── */

const BRANCHES = [
  {
    id: 'labs',
    num: '01',
    line: 'Proprietary Labs',
    project: 'Elder Concierge',
    tag: 'Internal Incubation',
    status: 'In Stealth',
    progress: 40,
    progressLabel: 'Incubation Progress',
    badge: 'Ambient Voice AI',
    summary: 'Voice first ambient care and mobility dispatch for senior independence in native dialects.'
  },
  {
    id: 'services',
    num: '02',
    line: 'Client Services',
    project: 'Rayton',
    tag: 'Deep Tech Semiconductor',
    status: 'In Active Build',
    progress: 80,
    progressLabel: 'Development Progress',
    badge: 'Engineered Exfoliation',
    summary: 'Patented proton beam wafer exfoliation cutting AI chip power consumption by up to 70%.'
  },
  {
    id: 'ventures',
    num: '03',
    line: 'Joint Ventures',
    project: 'RezFlow',
    tag: 'Co Founded Business',
    status: 'Live in USA 🇺🇸',
    progress: 100,
    progressLabel: 'Live Deployment',
    badge: 'Real Time ATS AI',
    summary: 'Intelligent resume optimization and ATS parsing co founded with Find Fulfilling Work.'
  }
];

export default function Products({ onNavigate }) {
  const [showSpine, setShowSpine] = useState(false);
  const [activeBranch, setActiveBranch] = useState('labs');
  const [hoveredBranch, setHoveredBranch] = useState(null);
  const [simStep, setSimStep] = useState(0);
  const [beamActive, setBeamActive] = useState(false);
  const [layerLift, setLayerLift] = useState(false);
  const [iframeScale, setIframeScale] = useState(0.5);

  const containerRef = useRef(null);
  const iframeContainerRef = useRef(null);
  const labsRef = useRef(null);
  const servicesRef = useRef(null);
  const venturesRef = useRef(null);
  const waferRef = useRef(null);

  // ResizeObserver for true 1440px desktop RezFlow iframe scaling
  useEffect(() => {
    const el = iframeContainerRef.current;
    if (!el) return;
    const updateScale = () => {
      const w = el.clientWidth;
      if (w > 0) setIframeScale(w / 1440);
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ScrollSpy to highlight active branch in spine and tree, and toggle spine visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const heroThreshold = vh * 0.45;
      setShowSpine(scrollY > heroThreshold);

      const labsTop = labsRef.current ? labsRef.current.offsetTop - vh * 0.45 : 0;
      const servicesTop = servicesRef.current ? servicesRef.current.offsetTop - vh * 0.45 : 0;
      const venturesTop = venturesRef.current ? venturesRef.current.offsetTop - vh * 0.45 : 0;

      if (scrollY >= venturesTop) {
        setActiveBranch('ventures');
      } else if (scrollY >= servicesTop) {
        setActiveBranch('services');
      } else if (scrollY >= labsTop) {
        setActiveBranch('labs');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Elder Concierge voice call simulator sequence
  useEffect(() => {
    if (simStep === 1) {
      const t1 = setTimeout(() => setSimStep(2), 2400);
      return () => clearTimeout(t1);
    }
    if (simStep === 2) {
      const t2 = setTimeout(() => setSimStep(3), 3600);
      return () => clearTimeout(t2);
    }
    if (simStep === 3) {
      const t3 = setTimeout(() => setSimStep(4), 2200);
      return () => clearTimeout(t3);
    }
  }, [simStep]);

  // Rayton 3D interactive mouse tilt
  const handleWaferMouseMove = useCallback((e) => {
    const card = waferRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / rect.height) * 20;
    const rotY = (x / rect.width) * 20;
    card.style.setProperty('--wafer-tilt-x', `${rotX}deg`);
    card.style.setProperty('--wafer-tilt-y', `${rotY}deg`);
  }, []);

  const handleWaferMouseLeave = useCallback(() => {
    const card = waferRef.current;
    if (!card) return;
    card.style.setProperty('--wafer-tilt-x', '0deg');
    card.style.setProperty('--wafer-tilt-y', '0deg');
  }, []);

  const scrollToBranch = (id) => {
    const map = { labs: labsRef, services: servicesRef, ventures: venturesRef };
    const target = map[id]?.current;
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleContact = () => {
    if (onNavigate) onNavigate('pitch');
  };

  const triggerBeamExfoliation = () => {
    setBeamActive(true);
    setLayerLift(true);
    setTimeout(() => setBeamActive(false), 2800);
  };

  return (
    <div className="ventures-page" ref={containerRef}>
      {/* ── Fixed Kinetic Architectural Spine Rail ── */}
      <aside className={`spine-rail ${showSpine ? 'is-visible' : ''}`} aria-label="Ventures Navigation Spine">
        <div className="spine-track">
          <div
            className="spine-progress-fill"
            style={{
              height:
                activeBranch === 'labs'
                  ? '20%'
                  : activeBranch === 'services'
                  ? '55%'
                  : '100%'
            }}
          />
        </div>
        <div className="spine-nodes">
          {BRANCHES.map((b) => (
            <button
              key={b.id}
              className={`spine-node-btn ${activeBranch === b.id ? 'is-active' : ''}`}
              onClick={() => scrollToBranch(b.id)}
              aria-label={`Jump to Pillar ${b.num}: ${b.line}`}
            >
              <span className="spine-node-dot" />
              <span className="spine-node-label">{b.num} · {b.line}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* ── Section 0: Master Architecture & Kinetic Innovation Tree ── */}
      <section className="architecture-hero">
        <div className="container">
          <div className="hero-header-block">
            <span className="section-label">Ventures & Innovation Architecture</span>
            <h1 className="architecture-title">
              The living architecture of <em>innovation.</em>
            </h1>
            <hr className="divider divider--center" />
            <p className="architecture-lede">
              We reject rigid boundaries. At Ikshvaku, our engineering branches into three living
              avenues: proprietary incubation in our lab, deep tech systems for visionary partners,
              and direct co founded ventures. Explore the canopy below.
            </p>
          </div>

          {/* ── The Living Kinetic Tree of Innovation ── */}
          <div className="kinetic-tree-stage">
            {/* Ambient SVG Branching Conduit Map */}
            <svg
              className="tree-svg-canvas"
              viewBox="0 0 1000 320"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="treeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c5a55a" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#e2c884" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#c5a55a" stopOpacity="0.85" />
                </linearGradient>

                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Branch 1 Path: Center to Left (Labs) */}
              <path
                id="branchPathLabs"
                className={`tree-branch-path ${hoveredBranch === 'labs' || activeBranch === 'labs' ? 'is-highlighted' : ''}`}
                d="M 500,45 C 500,120 185,110 185,280"
              />
              {/* Branch 2 Path: Center to Middle (Services) */}
              <path
                id="branchPathServices"
                className={`tree-branch-path ${hoveredBranch === 'services' || activeBranch === 'services' ? 'is-highlighted' : ''}`}
                d="M 500,45 C 500,130 500,180 500,280"
              />
              {/* Branch 3 Path: Center to Right (Ventures) */}
              <path
                id="branchPathVentures"
                className={`tree-branch-path ${hoveredBranch === 'ventures' || activeBranch === 'ventures' ? 'is-highlighted' : ''}`}
                d="M 500,45 C 500,120 815,110 815,280"
              />

              {/* Dynamic Animated Photon Energy Pulses */}
              <circle r="4" fill="#c5a55a" filter="url(#goldGlow)" className="tree-photon">
                <animateMotion dur="3.4s" repeatCount="indefinite" path="M 500,45 C 500,120 185,110 185,280" />
              </circle>
              <circle r="4" fill="#c5a55a" filter="url(#goldGlow)" className="tree-photon">
                <animateMotion dur="2.8s" repeatCount="indefinite" path="M 500,45 C 500,130 500,180 500,280" />
              </circle>
              <circle r="4" fill="#c5a55a" filter="url(#goldGlow)" className="tree-photon">
                <animateMotion dur="3.2s" repeatCount="indefinite" path="M 500,45 C 500,120 815,110 815,280" />
              </circle>

              {/* Central Nucleus Node */}
              <g className="tree-root-group" transform="translate(500, 45)">
                <circle r="26" fill="none" stroke="rgba(197, 165, 90, 0.25)" strokeWidth="1" strokeDasharray="3 4" className="root-orbit-spin" />
                <circle r="18" fill="#ffffff" stroke="#c5a55a" strokeWidth="2" filter="url(#goldGlow)" />
                <circle r="6" fill="#c5a55a" />
              </g>
            </svg>

            {/* Central Root Badge */}
            <div className="tree-nexus-pill">
              <span className="nexus-dot" />
              <span>IKSHVAKU ARCHITECTURAL NEXUS</span>
            </div>

            {/* 3 Interactive Kinetic Branch Pods */}
            <div className="tree-canopy-pods">
              {BRANCHES.map((b) => (
                <div
                  key={b.id}
                  className={`tree-pod-card ${activeBranch === b.id ? 'is-active' : ''} ${hoveredBranch === b.id ? 'is-hovered' : ''}`}
                  onClick={() => scrollToBranch(b.id)}
                  onMouseEnter={() => setHoveredBranch(b.id)}
                  onMouseLeave={() => setHoveredBranch(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && scrollToBranch(b.id)}
                >
                  <div className="pod-header">
                    <span className="pod-num">{b.num}</span>
                    <span className="pod-status-chip">{b.status}</span>
                  </div>

                  <h3 className="pod-title">{b.project}</h3>
                  <span className="pod-line-name">{b.line}</span>
                  <p className="pod-summary">{b.summary}</p>

                  {/* Progress indicator in pod card */}
                  {b.progress !== undefined && (
                    <div className="pod-progress-module">
                      <div className="pod-progress-row">
                        <span className="pod-progress-caption">{b.progressLabel}</span>
                        <span className="pod-progress-num">{b.progress}%</span>
                      </div>
                      <div className="pod-progress-bar">
                        <div
                          className={`pod-progress-fill ${b.progress === 100 ? 'pod-progress-fill--complete' : ''}`}
                          style={{ width: `${b.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="pod-footer">
                    <span className="pod-badge">{b.badge}</span>
                    <span className="pod-cta-arrow">
                      Explore Branch <ArrowRight size={13} />
                    </span>
                  </div>

                  {/* Micro-Interaction Ambient Visual in Pod */}
                  <div className="pod-ambient-accent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Branch 01: Proprietary Labs • Elder Concierge ── */}
      <section className="branch-section branch-section--labs" ref={labsRef} id="branch-labs">
        {/* Continuous Branch Trunk Indicator */}
        <div className="branch-trunk-marker">
          <div className="trunk-line" />
          <div className="trunk-badge">
            <Radio size={12} />
            <span>BRANCH 01 // PROPRIETARY LABS</span>
          </div>
        </div>

        <div className="container">
          <div className="branch-grid">
            <div className="branch-copy">
              <div className="branch-eyebrow">
                <span className="branch-pill">01 // Proprietary Labs</span>
                <span className="branch-status-dot">● In Stealth Incubation</span>
              </div>
              <h2 className="branch-heading">
                Voice mobility for the people who <em>raised us.</em>
              </h2>
              <p className="branch-tagline">
                <strong>Elder Concierge (ECS)</strong> · Ambient AI Care and Telephony
              </p>
              <p className="branch-desc">
                Booking a reliable ride or arranging daily assistance shouldn’t force elderly parents
                to struggle with intricate smartphone apps or tiny buttons. We are incubating an ambient,
                voice first concierge in Bengaluru. A senior simply picks up the telephone and speaks
                freely in their mother tongue, and within seconds, trusted mobility is secured, while their
                family is quietly and reliably kept in the loop.
              </p>

              {/* Dignified Architectural Progress Gauge */}
              <div className="dignified-progress-box">
                <div className="progress-box-header">
                  <div>
                    <span className="progress-kicker">Incubation Velocity</span>
                    <h4 className="progress-headline">Core Telephony and Speech AI</h4>
                  </div>
                  <div className="progress-box-val">
                    <span className="progress-pct">40%</span>
                    <span className="progress-status-sub">Completed</span>
                  </div>
                </div>

                <div className="progress-track-outer" aria-label="Elder Concierge Progress: 40%">
                  <div className="progress-track-fill" style={{ width: '40%' }}>
                    <span className="progress-fill-glow" />
                  </div>
                </div>

                <div className="progress-milestones">
                  <div className="milestone-item is-done">
                    <span className="milestone-dot" />
                    <span className="milestone-name">Architecture</span>
                  </div>
                  <div className="milestone-item is-active">
                    <span className="milestone-dot" />
                    <span className="milestone-name">Telephony Core (40%)</span>
                  </div>
                  <div className="milestone-item">
                    <span className="milestone-dot" />
                    <span className="milestone-name">Field Pilots</span>
                  </div>
                  <div className="milestone-item">
                    <span className="milestone-dot" />
                    <span className="milestone-name">Public Launch</span>
                  </div>
                </div>
              </div>

              <div className="branch-highlights">
                <div className="highlight-item">
                  <PhoneCall size={18} className="highlight-icon" />
                  <div>
                    <h4>Sub 2s Conversational Latency</h4>
                    <p>Frugal voice AI engine designed for effortless natural conversation in native dialects.</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <ShieldCheck size={18} className="highlight-icon" />
                  <div>
                    <h4>Human in the Loop Safeguards</h4>
                    <p>Every booking is grounded through verified urban spatial topology and concierge agents.</p>
                  </div>
                </div>
              </div>

              <div className="branch-actions">
                <button className="btn btn--filled" onClick={handleContact}>
                  Inquire About Early Access <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Interactive Voice Telemetry Simulator with Audio Visualizer */}
            <div className="branch-visual">
              <div className="voice-simulator-card">
                <div className="sim-header">
                  <div className="sim-status">
                    <span className="sim-indicator-pulse" />
                    <span>Telephony Voice Bridge • Active Telemetry</span>
                  </div>
                  <span className="sim-locale">Bengaluru / Indic</span>
                </div>

                {/* Animated Voice Orb & Soundwave Frequency Visualizer */}
                <div className="voice-orb-stage">
                  <div className={`voice-frequency-rings ${simStep > 0 && simStep < 4 ? 'is-vibrating' : ''}`}>
                    <span className="freq-bar" /><span className="freq-bar" /><span className="freq-bar" />
                    <span className="freq-bar" /><span className="freq-bar" /><span className="freq-bar" />
                    <span className="freq-bar" /><span className="freq-bar" /><span className="freq-bar" />
                  </div>

                  <div className="sim-ambient-ring">
                    <div className={`sim-wave-ring ${simStep > 0 && simStep < 4 ? 'is-active' : ''}`} />
                    <div className="sim-wave-core">
                      <PhoneCall size={22} className="sim-core-icon" />
                    </div>
                  </div>
                </div>

                {/* Simulated Live Call Dialogue Stream */}
                <div className="sim-dialogue-window" aria-live="polite">
                  {simStep === 0 && (
                    <p className="sim-prompt-text">
                      Press below to preview a live simulated concierge conversation.
                    </p>
                  )}

                  <div className={`sim-bubble sim-bubble--caller ${simStep >= 1 ? 'is-visible' : ''}`}>
                    <span className="sim-speaker">Elderly Parent (Amma)</span>
                    <p className="sim-kannada">“ನಮಸ್ಕಾರ, ನನಗೆ ಮಲ್ಲೇಶ್ವರಂ ದೇವಸ್ಥಾನಕ್ಕೆ ಹೋಗ್ಬೇಕು.”</p>
                    <p className="sim-english">“Namaskara, I would like to visit the temple in Malleshwaram.”</p>
                  </div>

                  <div className={`sim-bubble sim-bubble--ai ${simStep >= 2 ? 'is-visible' : ''}`}>
                    <span className="sim-speaker">Elder Concierge Voice AI</span>
                    <p className="sim-kannada">“ಖಂಡಿತ ಅಮ್ಮಾ. ಎಂಟು ನಿಮಿಷದಲ್ಲಿ ಕಾರು ನಿಮ್ಮ ಮನೆಗೆ ಬರುತ್ತೆ. ನಿಮ್ಮ ಮಗನಿಗೂ ಮಾಹಿತಿ ಕಳುಹಿಸಿದ್ದೇವೆ.”</p>
                    <p className="sim-english">“Of course, Amma. A car will arrive at your doorstep in eight minutes. We’ve notified your son too.”</p>
                  </div>

                  {/* Real-time Telemetry Dispatch Confirmation Tag */}
                  <div className={`sim-telemetry-tag ${simStep >= 3 ? 'is-visible' : ''}`}>
                    <Activity size={13} className="telemetry-tag-icon" />
                    <span>Spatial Topology: Malleshwaram Verified · Turn Latency: 1.68s · WhatsApp Dispatched ✓</span>
                  </div>
                </div>

                <div className="sim-footer">
                  <button
                    className="btn btn--outline sim-trigger-btn"
                    onClick={() => setSimStep(1)}
                    disabled={simStep > 0 && simStep < 4}
                  >
                    {simStep === 0 ? 'Simulate Live Call' : simStep < 4 ? 'Call in Progress…' : 'Replay Simulation'}
                  </button>
                  <span className="sim-meta-note">Internal Lab Prototype • Patent Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Branch 02: Client Services • Rayton ── */}
      <section className="branch-section branch-section--services" ref={servicesRef} id="branch-services">
        {/* Continuous Branch Trunk Indicator */}
        <div className="branch-trunk-marker">
          <div className="trunk-line" />
          <div className="trunk-badge">
            <Zap size={12} />
            <span>BRANCH 02 // CLIENT SERVICES</span>
          </div>
        </div>

        <div className="container">
          <div className="branch-grid branch-grid--reverse">
            <div className="branch-copy">
              <div className="branch-eyebrow">
                <span className="branch-pill">02 // Client Services</span>
                <span className="branch-status-dot branch-status-dot--amber">● In Active Development</span>
              </div>
              <h2 className="branch-heading">
                Kinder chips for an <em>energy hungry world.</em>
              </h2>
              <p className="branch-tagline">
                <strong>Rayton</strong> · Deep Tech Semiconductor Architecture
              </p>
              <p className="branch-desc">
                Artificial intelligence is demanding more electricity than entire nations. Rayton has patented
                a breakthrough proton beam exfoliation technology that reduces semiconductor power consumption
                by up to 70%, producing 10× more usable Gallium Nitride (GaN) and Silicon Carbide (SiC) wafers
                from the exact same crystal, all without requiring existing foundries to retool.
                We are architecting Rayton’s upcoming global web flagship and digital identity.
              </p>

              {/* Dignified Architectural Progress Gauge */}
              <div className="dignified-progress-box">
                <div className="progress-box-header">
                  <div>
                    <span className="progress-kicker">Development Velocity</span>
                    <h4 className="progress-headline">Digital Flagship and 3D Cleanroom</h4>
                  </div>
                  <div className="progress-box-val">
                    <span className="progress-pct">80%</span>
                    <span className="progress-status-sub">Completed</span>
                  </div>
                </div>

                <div className="progress-track-outer" aria-label="Rayton Progress: 80%">
                  <div className="progress-track-fill" style={{ width: '80%' }}>
                    <span className="progress-fill-glow" />
                  </div>
                </div>

                <div className="progress-milestones">
                  <div className="milestone-item is-done">
                    <span className="milestone-dot" />
                    <span className="milestone-name">Physics Model</span>
                  </div>
                  <div className="milestone-item is-done">
                    <span className="milestone-dot" />
                    <span className="milestone-name">Cleanroom 3D</span>
                  </div>
                  <div className="milestone-item is-active">
                    <span className="milestone-dot" />
                    <span className="milestone-name">Flagship Build (80%)</span>
                  </div>
                  <div className="milestone-item">
                    <span className="milestone-dot" />
                    <span className="milestone-name">Global Reveal</span>
                  </div>
                </div>
              </div>

              <div className="wafer-metrics-row">
                <div className="metric-box">
                  <span className="metric-number">70%</span>
                  <span className="metric-label">Lower Power Draw in AI Chips</span>
                </div>
                <div className="metric-box">
                  <span className="metric-number">10×</span>
                  <span className="metric-label">More Wafers per Crystal</span>
                </div>
                <div className="metric-box">
                  <span className="metric-number">0</span>
                  <span className="metric-label">Foundry Retooling Required</span>
                </div>
              </div>

              <div className="branch-actions">
                <button className="btn btn--outline" onClick={handleContact}>
                  Discuss Client Engineering <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Interactive Holographic Silicon Wafer Stage */}
            <div className="branch-visual">
              <div
                className="wafer-stage-card"
                ref={waferRef}
                onMouseMove={handleWaferMouseMove}
                onMouseLeave={handleWaferMouseLeave}
              >
                <div className="wafer-card-header">
                  <span className="wafer-tech-label">// ENGINEERED WAFER EXFOLIATION</span>
                  <span className="wafer-preview-pill">Interactive Cleanroom Model</span>
                </div>

                <div className="wafer-visual-stage">
                  <div className="wafer-disc wafer-disc--substrate">
                    <div className="wafer-die-grid" />
                  </div>
                  <div className={`wafer-disc wafer-disc--exfoliated ${layerLift ? 'is-lifted' : ''}`}>
                    <span className="wafer-layer-tag">2µm Exfoliated Film</span>
                  </div>

                  {/* Proton Beam Laser Line */}
                  <div className={`proton-beam-line ${beamActive ? 'is-firing' : ''}`} />
                </div>

                <div className="wafer-interactive-bar">
                  <button
                    className="wafer-action-trigger"
                    onClick={triggerBeamExfoliation}
                  >
                    <Zap size={14} />
                    <span>{beamActive ? 'Beam Firing…' : layerLift ? 'Exfoliate Wafer Again' : 'Initiate Proton Beam Exfoliation'}</span>
                  </button>
                </div>

                <div className="wafer-card-footer">
                  <div className="wafer-footer-item">
                    <Cpu size={14} />
                    <span>Next Generation GaN / SiC Architecture</span>
                  </div>
                  <div className="wafer-footer-item">
                    <Layers size={14} />
                    <span>Engineered in LA • Built by Ikshvaku</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Branch 03: Collaborative Ventures • RezFlow (LIVE) ── */}
      <section className="branch-section branch-section--ventures" ref={venturesRef} id="branch-ventures">
        {/* Continuous Branch Trunk Indicator */}
        <div className="branch-trunk-marker">
          <div className="trunk-line" />
          <div className="trunk-badge">
            <Sparkles size={12} />
            <span>BRANCH 03 // COLLABORATIVE VENTURES</span>
          </div>
        </div>

        <div className="container">
          <div className="ventures-header-center">
            <div className="branch-eyebrow branch-eyebrow--center">
              <span className="branch-pill">03 // Collaborative Ventures</span>
              <span className="branch-status-dot branch-status-dot--green">● Live in Production • United States 🇺🇸</span>
            </div>
            <h2 className="branch-heading branch-heading--center">
              Helping candidates beat the algorithm <em>in 90 seconds.</em>
            </h2>
            <p className="branch-tagline branch-tagline--center">
              <strong>RezFlow</strong> · AI Resume Optimization Platform
            </p>
            <p className="branch-desc branch-desc--center">
              More than 75% of resumes are discarded by Applicant Tracking Systems before a human recruiter
              ever reads them. Co founded and engineered in direct partnership with{' '}
              <a
                href="https://pillar.io/findfulfillingwork/mediakit"
                target="_blank"
                rel="noopener noreferrer"
                className="partner-link"
              >
                Find Fulfilling Work (Pillar.io)
              </a>
              , RezFlow analyzes job requirements in real time, closes critical keyword gaps, and produces
              human quality tailored resumes in under 90 seconds.
            </p>

            <div className="collaborator-badge">
              <Sparkles size={14} className="sparkle-icon" />
              <span>Built & Scaled Together with Find Fulfilling Work</span>
            </div>
          </div>

          {/* Full-Fidelity Live Desktop Browser Viewport with Radar Scanning */}
          <div className="rezflow-live-showcase">
            <div className="browser-shell">
              <div className="browser-chrome">
                <div className="browser-dots">
                  <span /><span /><span />
                </div>
                <div className="browser-address-bar">
                  <span className="browser-lock">🔒</span>
                  <span className="browser-url">https://rezflowapp.com</span>
                </div>
                <a
                  href="https://rezflowapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="browser-open-ext"
                  aria-label="Open RezFlow in new tab"
                >
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="browser-viewport" ref={iframeContainerRef}>
                {/* Live Laser ATS Scan Beam */}
                <div className="browser-scan-laser" />

                <iframe
                  src="https://rezflowapp.com/"
                  title="RezFlow App Live"
                  loading="lazy"
                  style={{
                    transform: `scale(${iframeScale})`,
                    transformOrigin: '0 0'
                  }}
                  tabIndex={-1}
                />
                <a
                  href="https://rezflowapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="browser-interactive-veil"
                >
                  <span className="veil-cta-btn">
                    Launch RezFlow <ArrowUpRight size={15} />
                  </span>
                </a>
              </div>
            </div>

            <div className="rezflow-cta-bar">
              <a
                href="https://rezflowapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--filled"
              >
                Explore RezFlow Live <ArrowUpRight size={14} />
              </a>
              <div className="rezflow-metric-pill">
                <FileCheck size={14} />
                <span>Active Production Release · United States</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing Call to Action ── */}
      <section className="architecture-epilogue">
        <div className="container">
          <div className="epilogue-box">
            <hr className="divider divider--center" />
            <h2 className="epilogue-title">
              Have an idea ready to <em>take flight?</em>
            </h2>
            <p className="epilogue-desc">
              Whether you are looking to incubate a new venture, commission world class bespoke engineering,
              or co found an enduring business with us, we welcome the dialogue.
            </p>
            <button className="btn btn--filled epilogue-btn" onClick={handleContact}>
              Start a Conversation <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
