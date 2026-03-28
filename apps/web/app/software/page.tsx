"use client";

import { useState, useEffect } from "react";

const ArkLogo = () => (
  <svg viewBox="0 0 315 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 36, width: "auto" }}>
    <line x1="5" y1="13" x2="200" y2="7" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M 195,7 L 243,3 L 283,83 L 229,30 Z" fill="white" />
    <text x="5" y="70" fontFamily="'Barlow Condensed', 'Arial Black', sans-serif" fontWeight="800" fontSize="64" fill="white" fontStyle="italic">ARK</text>
  </svg>
);

export default function SoftwarePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:anthonyachkarian@gmail.com?subject=ARK Studio Waitlist&body=Please add me to the waitlist for ARK Studio.%0A%0AEmail: ${email}`;
    setSubmitted(true);
  };

  const features = [
    {
      label: "AI Design Generation",
      headline: "Describe it. Studio builds it.",
      body: "Skip the sketch pad. Type what you want to engineer — a robot arm, a drone chassis, a custom enclosure — and ARK Studio's AI generates a fully parametric 3D model in seconds. Refine with natural language or precision CAD tools.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
          <path d="M16 14a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8"/>
          <line x1="12" y1="8" x2="12" y2="14"/>
        </svg>
      ),
    },
    {
      label: "Robotics Sim Engine",
      headline: "Drop it into the real world. Virtually.",
      body: "ARK Studio's physics engine simulates your robot or product in a photorealistic environment — joints, actuators, sensors, gravity, friction, aerodynamic drag, thermal load. Watch it move, fail, and survive before a single part is manufactured. This is what NVIDIA Isaac Sim does for enterprise labs. We built it for your Mac.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
        </svg>
      ),
    },
    {
      label: "Full CAD Suite",
      headline: "Pro-grade tools. Zero legacy bloat.",
      body: "Parametric modeling, multi-part assemblies, technical drawings, constraint solving, and export to STEP, STL, DXF — everything Fusion 360 does, rebuilt with a UI that feels like it was designed this decade.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
      ),
    },
    {
      label: "Apple Silicon Native",
      headline: "Built for the Mac you already carry.",
      body: "ARK Studio is engineered from the ground up for Apple Silicon — GPU-accelerated viewports, real-time simulation previews, and 8+ hours of battery life on an M-series MacBook. No external GPU. No workstation required.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="14" rx="2"/>
          <path d="M8 20h8M12 18v2"/>
          <path d="M9 10l2 2 4-4"/>
        </svg>
      ),
    },
  ];

  return (
    <main style={{ background: "var(--navy)", minHeight: "100vh" }}>
      {/* NAV */}
      <nav className="sub-nav">
        <a href="/" className="sub-nav-logo"><ArkLogo /></a>
        <div className="sub-nav-links">
          <a href="/">Home</a>
          <a href="/robotics">Robotics</a>
          <a href="/quantum">Quantum</a>
          <a href="/data-centers">Data Centers</a>
          <a href="/health">Health</a>
          <a href="/housing">Housing</a>
          <a href="/software" className="active">ARK Studio</a>
          <a href="/careers">Careers</a>
          <a href="/#contact" className="nav-cta">Get in Touch</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="studio-hero">
        <div className="studio-hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80')" }} />
        <div className="studio-hero-overlay" />
        <div className="studio-hero-content fade-up">
          <div className="studio-eyebrow">
            <span className="studio-badge-soon">Coming Soon</span>
            <span className="studio-product-name">ARK Studio</span>
          </div>
          <p className="studio-positioning">Fusion 360 &times; ChatGPT &times; NVIDIA Isaac &mdash; one Mac app.</p>
          <h1>Design it. Simulate it.<br /><span className="gradient-text">Ship it.</span></h1>
          <p className="studio-hero-sub">
            Describe what you want to build in plain English. ARK Studio generates the full 3D model, then drops it into a photorealistic robotics physics engine — forces, joints, sensors, aerodynamics, real-world behavior. The future of engineering software, running on your MacBook.
          </p>
          <div className="studio-hero-actions">
            <button className="btn-mac-disabled" disabled>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Download for Mac
              <span className="btn-soon-pill">Soon</span>
            </button>
            {!submitted ? (
              <form className="studio-notify-inline" onSubmit={handleNotify}>
                <input type="email" placeholder="your@email.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} required className="studio-email-input" />
                <button type="submit" className="btn-primary">
                  Join Waitlist
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </form>
            ) : (
              <div className="cs-submitted">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                You&apos;re on the waitlist.
              </div>
            )}
          </div>
          <p className="studio-hero-meta">macOS 14+ &middot; Apple Silicon &middot; Free during beta</p>
        </div>
      </section>

      {/* FEATURE TABS */}
      <section style={{ padding: "7rem 2rem", background: "var(--navy-light)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-label">What It Does</div>
            <div className="section-title">One app. Every stage of engineering.</div>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Stop stitching together Fusion 360, NVIDIA Isaac, and ChatGPT. ARK Studio is the first tool that does all three — and they talk to each other.
            </p>
          </div>
          <div className="studio-features fade-up">
            <div className="studio-feature-tabs">
              {features.map((f, i) => (
                <button key={i} className={`studio-tab${activeFeature === i ? " active" : ""}`} onClick={() => setActiveFeature(i)}>
                  <span className="studio-tab-icon">{f.icon}</span>
                  <span className="studio-tab-label">{f.label}</span>
                </button>
              ))}
            </div>
            <div className="studio-feature-panel">
              <div className="studio-feature-panel-content">
                <h3>{features[activeFeature].headline}</h3>
                <p>{features[activeFeature].body}</p>
              </div>
              <div className="studio-feature-visual">
                <div className="studio-mock-window">
                  <div className="studio-mock-bar">
                    <span className="mock-dot red" /><span className="mock-dot yellow" /><span className="mock-dot green" />
                    <span className="mock-title">ARK Studio</span>
                  </div>
                  <div className="studio-mock-body">
                    {activeFeature === 0 && (
                      <div className="mock-ai-gen">
                        <div className="mock-prompt-box">
                          <span className="mock-prompt-label">Describe your design</span>
                          <div className="mock-prompt-text">&ldquo;A 6-DOF robotic arm, aluminum, 500mm reach, for precision assembly tasks&rdquo;</div>
                        </div>
                        <div className="mock-generating">
                          <div className="mock-gen-dot" /><div className="mock-gen-dot" /><div className="mock-gen-dot" />
                          <span>Generating parametric 3D model…</span>
                        </div>
                      </div>
                    )}
                    {activeFeature === 1 && (
                      <div className="mock-sim">
                        <div className="mock-sim-row">
                          <span className="mock-sim-badge joint">Joint torques</span>
                          <span className="mock-sim-badge sensor">IMU &amp; force sensors</span>
                          <span className="mock-sim-badge physics">Gravity + friction</span>
                        </div>
                        <svg viewBox="0 0 220 110" width="200">
                          <rect x="10" y="10" width="200" height="90" rx="6" fill="#060d1a" stroke="#1e3a5f" strokeWidth="1"/>
                          <circle cx="110" cy="55" r="28" fill="none" stroke="#1e3a5f" strokeWidth="8"/>
                          <circle cx="110" cy="55" r="28" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="40 140" strokeLinecap="round"/>
                          <line x1="110" y1="27" x2="110" y2="10" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3"/>
                          <line x1="138" y1="55" x2="220" y2="55" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="3 3"/>
                          <circle cx="110" cy="55" r="4" fill="#3b82f6"/>
                          <text x="145" y="30" fill="#64748b" fontSize="7" fontFamily="monospace">τ = 12.4 N·m</text>
                          <text x="145" y="42" fill="#64748b" fontSize="7" fontFamily="monospace">ω = 0.8 rad/s</text>
                          <text x="145" y="54" fill="#22c55e" fontSize="7" fontFamily="monospace">✓ Within limits</text>
                          <text x="110" y="100" textAnchor="middle" fill="#475569" fontSize="7" fontFamily="monospace">Physics sim · 240 Hz · real-time</text>
                        </svg>
                      </div>
                    )}
                    {activeFeature === 2 && (
                      <div className="mock-cad">
                        <svg viewBox="0 0 200 130" width="180">
                          <rect x="10" y="10" width="80" height="110" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                          <text x="20" y="28" fill="#64748b" fontSize="7" fontFamily="monospace">▾ Assembly</text>
                          <text x="28" y="42" fill="#94a3b8" fontSize="7" fontFamily="monospace">Base</text>
                          <text x="28" y="54" fill="#94a3b8" fontSize="7" fontFamily="monospace">Links (6)</text>
                          <text x="28" y="66" fill="#3b82f6" fontSize="7" fontFamily="monospace">Joints (6) ●</text>
                          <text x="28" y="78" fill="#94a3b8" fontSize="7" fontFamily="monospace">End effector</text>
                          <rect x="100" y="10" width="90" height="110" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1"/>
                          <line x1="115" y1="65" x2="175" y2="65" stroke="#1e3a5f" strokeWidth="12" strokeLinecap="round"/>
                          <line x1="145" y1="35" x2="145" y2="95" stroke="#1e3a5f" strokeWidth="12" strokeLinecap="round"/>
                          <line x1="115" y1="65" x2="175" y2="65" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
                          <line x1="145" y1="35" x2="145" y2="95" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="145" cy="65" r="10" fill="none" stroke="#3b82f6" strokeWidth="1.5"/>
                        </svg>
                      </div>
                    )}
                    {activeFeature === 3 && (
                      <div className="mock-mac">
                        <div className="mock-perf-row">
                          <span className="mock-perf-label">Viewport</span>
                          <div className="mock-perf-bar"><div className="mock-perf-fill" style={{width:"95%", background:"#3b82f6"}} /></div>
                          <span className="mock-perf-val">120 fps</span>
                        </div>
                        <div className="mock-perf-row">
                          <span className="mock-perf-label">Sim Hz</span>
                          <div className="mock-perf-bar"><div className="mock-perf-fill" style={{width:"80%", background:"#8b5cf6"}} /></div>
                          <span className="mock-perf-val">240 Hz</span>
                        </div>
                        <div className="mock-perf-row">
                          <span className="mock-perf-label">Battery</span>
                          <div className="mock-perf-bar"><div className="mock-perf-fill" style={{width:"85%", background:"#22c55e"}} /></div>
                          <span className="mock-perf-val">8h+</span>
                        </div>
                        <div className="mock-chip-badge">Apple M-series &middot; Metal GPU &middot; Neural Engine</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECS STRIP */}
      <section style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div className="studio-specs-grid fade-up">
            <div className="studio-spec">
              <div className="studio-spec-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              </div>
              <div className="studio-spec-text">
                <div className="studio-spec-val">AI-Generated</div>
                <div className="studio-spec-label">3D models from text</div>
              </div>
            </div>
            <div className="studio-spec">
              <div className="studio-spec-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <div className="studio-spec-text">
                <div className="studio-spec-val">240 Hz Physics</div>
                <div className="studio-spec-label">Joints, sensors, forces</div>
              </div>
            </div>
            <div className="studio-spec">
              <div className="studio-spec-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <div className="studio-spec-text">
                <div className="studio-spec-val">STEP · STL · DXF</div>
                <div className="studio-spec-label">Production-ready exports</div>
              </div>
            </div>
            <div className="studio-spec">
              <div className="studio-spec-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 20h8M12 18v2"/></svg>
              </div>
              <div className="studio-spec-text">
                <div className="studio-spec-val">macOS Native</div>
                <div className="studio-spec-label">Apple Silicon · Metal GPU</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: "8rem 2rem", textAlign: "center" }}>
        <div className="fade-up" style={{ maxWidth: 660, margin: "0 auto" }}>
          <div className="section-label">Early Access</div>
          <h2 className="section-title">The future of engineering<br />runs on your MacBook.</h2>
          <p style={{ color: "var(--gray-400)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            ARK Studio is in active development. Robotics engineers, hardware startups, and R&amp;D teams can join the waitlist now to shape the product and get early access before launch.
          </p>
          {!submitted ? (
            <form className="cs-notify-form" onSubmit={handleNotify}>
              <input type="email" placeholder="Enter your email for early access" value={email}
                onChange={(e) => setEmail(e.target.value)} required className="cs-email-input" />
              <button type="submit" className="btn-primary">
                Request Early Access
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </form>
          ) : (
            <div className="cs-submitted" style={{ justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
              You&apos;re on the waitlist. We&apos;ll be in touch soon.
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-left">
            <ArkLogo />
            <span className="footer-copy">&copy; 2026 Ark Industries. All rights reserved.</span>
          </div>
          <div className="footer-links">
            <a href="/">Home</a><a href="/robotics">Robotics</a><a href="/quantum">Quantum</a>
            <a href="/data-centers">Data Centers</a><a href="/health">Health</a><a href="/housing">Housing</a>
            <a href="/software">ARK Studio</a><a href="/careers">Careers</a><a href="/#contact">Contact</a>
          </div>
        </div>
      </footer>

      <style>{`
        .studio-hero {
          position: relative; min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 10rem 2rem 6rem; text-align: center; overflow: hidden;
        }
        .studio-hero-bg {
          position: absolute; inset: 0; background-size: cover; background-position: center;
          filter: brightness(0.18) saturate(0.7);
        }
        .studio-hero-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.14) 0%, transparent 60%),
            linear-gradient(to bottom, transparent 40%, var(--navy) 100%);
        }
        .studio-hero-content { position: relative; z-index: 2; max-width: 840px; }
        .studio-eyebrow { display: inline-flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .studio-badge-soon {
          padding: 0.3rem 0.85rem; border-radius: 100px;
          background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3);
          color: #93c5fd; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          animation: pulse-glow 2.5s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
        }
        .studio-product-name {
          font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.45);
          letter-spacing: 0.12em; text-transform: uppercase;
        }
        .studio-positioning {
          font-size: 0.88rem; color: rgba(255,255,255,0.35); letter-spacing: 0.04em;
          margin: 0 0 1.25rem; font-style: italic;
        }
        .studio-hero-content h1 {
          font-size: clamp(3.2rem, 7.5vw, 6.5rem); font-weight: 800;
          letter-spacing: -0.04em; line-height: 1.02; margin: 0 0 1.5rem;
        }
        .studio-hero-sub {
          font-size: 1.15rem; color: var(--gray-400); line-height: 1.72;
          max-width: 660px; margin: 0 auto 2.5rem;
        }
        .studio-hero-actions {
          display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; align-items: center;
          margin-bottom: 1.5rem;
        }
        .btn-mac-disabled {
          display: inline-flex; align-items: center; gap: 0.6rem;
          padding: 0.85rem 1.5rem; border-radius: 10px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.35); font-size: 0.95rem; font-weight: 600; cursor: not-allowed;
        }
        .btn-soon-pill {
          padding: 0.15rem 0.5rem; border-radius: 100px; font-size: 0.65rem;
          font-weight: 700; background: rgba(59,130,246,0.2); color: #93c5fd;
          letter-spacing: 0.05em; text-transform: uppercase;
        }
        .studio-notify-inline { display: flex; gap: 0.6rem; align-items: center; flex-wrap: wrap; }
        .studio-email-input {
          padding: 0.85rem 1.2rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06); color: white; font-size: 0.9rem;
          width: 230px; outline: none; transition: border-color 0.2s;
        }
        .studio-email-input::placeholder { color: var(--gray-500); }
        .studio-email-input:focus { border-color: var(--accent); background: rgba(59,130,246,0.08); }
        .studio-hero-meta { font-size: 0.78rem; color: var(--gray-500); letter-spacing: 0.04em; }
        .studio-features { display: grid; grid-template-columns: 260px 1fr; gap: 2.5rem; align-items: start; }
        .studio-feature-tabs { display: flex; flex-direction: column; gap: 0.5rem; }
        .studio-tab {
          display: flex; align-items: center; gap: 1rem; padding: 1rem 1.25rem;
          border-radius: 12px; border: 1px solid transparent; background: transparent;
          color: var(--gray-400); text-align: left; cursor: pointer; transition: all 0.2s; width: 100%;
        }
        .studio-tab:hover { background: rgba(255,255,255,0.04); color: white; }
        .studio-tab.active { background: rgba(59,130,246,0.08); border-color: rgba(59,130,246,0.2); color: white; }
        .studio-tab-icon { flex-shrink: 0; color: var(--accent-light); }
        .studio-tab-label { font-size: 0.9rem; font-weight: 600; }
        .studio-feature-panel {
          background: var(--navy); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; overflow: hidden;
        }
        .studio-feature-panel-content { padding: 2rem 2rem 0; }
        .studio-feature-panel-content h3 { font-size: 1.4rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
        .studio-feature-panel-content p { font-size: 0.95rem; color: var(--gray-400); line-height: 1.72; }
        .studio-feature-visual { padding: 1.5rem 2rem 2rem; display: flex; justify-content: center; }
        .studio-mock-window { width: 100%; background: #0a0f1a; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); overflow: hidden; }
        .studio-mock-bar { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1rem; background: #111827; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mock-dot { width: 10px; height: 10px; border-radius: 50%; }
        .mock-dot.red { background: #ef4444; } .mock-dot.yellow { background: #f59e0b; } .mock-dot.green { background: #22c55e; }
        .mock-title { margin-left: 0.5rem; font-size: 0.72rem; color: var(--gray-500); font-weight: 600; letter-spacing: 0.06em; }
        .studio-mock-body { padding: 1.5rem; min-height: 170px; display: flex; align-items: center; justify-content: center; }
        .mock-ai-gen { width: 100%; display: flex; flex-direction: column; gap: 1rem; }
        .mock-prompt-box { background: rgba(59,130,246,0.06); border: 1px solid rgba(59,130,246,0.15); border-radius: 10px; padding: 1rem 1.25rem; }
        .mock-prompt-label { font-size: 0.68rem; color: #60a5fa; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; display: block; margin-bottom: 0.4rem; }
        .mock-prompt-text { font-size: 0.85rem; color: rgba(255,255,255,0.75); line-height: 1.5; font-style: italic; }
        .mock-generating { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--gray-500); }
        .mock-gen-dot { width: 6px; height: 6px; border-radius: 50%; background: #3b82f6; animation: gen-bounce 1.2s infinite; }
        .mock-gen-dot:nth-child(2) { animation-delay: 0.2s; } .mock-gen-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes gen-bounce { 0%,80%,100%{transform:translateY(0);opacity:0.4} 40%{transform:translateY(-5px);opacity:1} }
        .mock-sim { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; width: 100%; }
        .mock-sim-row { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; }
        .mock-sim-badge { padding: 0.2rem 0.6rem; border-radius: 100px; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.05em; }
        .mock-sim-badge.joint { background: rgba(59,130,246,0.15); color: #93c5fd; border: 1px solid rgba(59,130,246,0.25); }
        .mock-sim-badge.sensor { background: rgba(139,92,246,0.15); color: #c4b5fd; border: 1px solid rgba(139,92,246,0.25); }
        .mock-sim-badge.physics { background: rgba(34,197,94,0.1); color: #86efac; border: 1px solid rgba(34,197,94,0.2); }
        .mock-mac { width: 100%; display: flex; flex-direction: column; gap: 0.75rem; }
        .mock-perf-row { display: flex; align-items: center; gap: 0.75rem; }
        .mock-perf-label { font-size: 0.75rem; color: var(--gray-500); width: 54px; flex-shrink: 0; }
        .mock-perf-bar { flex: 1; height: 6px; background: rgba(255,255,255,0.06); border-radius: 100px; overflow: hidden; }
        .mock-perf-fill { height: 100%; border-radius: 100px; }
        .mock-perf-val { font-size: 0.75rem; color: rgba(255,255,255,0.6); width: 64px; text-align: right; flex-shrink: 0; }
        .mock-chip-badge { margin-top: 0.5rem; display: inline-flex; padding: 0.3rem 0.75rem; border-radius: 100px; background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.25); color: #c4b5fd; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.05em; align-self: flex-start; }
        .studio-specs-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem; }
        .studio-spec { display: flex; align-items: center; gap: 1rem; }
        .studio-spec-icon { width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0; background: rgba(59,130,246,0.1); color: var(--accent-light); display: flex; align-items: center; justify-content: center; }
        .studio-spec-val { font-size: 0.95rem; font-weight: 700; color: white; }
        .studio-spec-label { font-size: 0.78rem; color: var(--gray-500); margin-top: 0.15rem; }
        .cs-notify-form { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
        .cs-email-input { padding: 0.85rem 1.25rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.06); color: white; font-size: 0.95rem; min-width: 280px; outline: none; transition: border-color 0.2s; }
        .cs-email-input::placeholder { color: var(--gray-500); }
        .cs-email-input:focus { border-color: var(--accent); background: rgba(59,130,246,0.08); }
        .cs-submitted { display: inline-flex; align-items: center; gap: 0.65rem; padding: 0.85rem 1.75rem; border-radius: 10px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25); color: #4ade80; font-weight: 600; font-size: 0.95rem; }
        .mock-cad svg { display: block; }
        @media (max-width: 900px) {
          .studio-features { grid-template-columns: 1fr; }
          .studio-feature-tabs { flex-direction: row; flex-wrap: wrap; }
          .studio-specs-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 640px) {
          .studio-hero { padding: 8rem 1.5rem 4rem; }
          .studio-specs-grid { grid-template-columns: 1fr; }
          .studio-notify-inline { flex-direction: column; width: 100%; }
          .studio-email-input { width: 100%; }
        }
        .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .fade-up.visible { opacity: 1; transform: none; }
      `}</style>
    </main>
  );
}
