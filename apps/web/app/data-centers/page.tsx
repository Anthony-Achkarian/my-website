"use client";

import { useState, useEffect } from "react";

const ArkLogo = () => (
  <svg viewBox="0 0 315 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 36, width: "auto" }}>
    <line x1="5" y1="13" x2="200" y2="7" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M 195,7 L 243,3 L 283,83 L 229,30 Z" fill="white" />
    <text x="5" y="70" fontFamily="'Barlow Condensed', 'Arial Black', sans-serif" fontWeight="800" fontSize="64" fill="white" fontStyle="italic">ARK</text>
  </svg>
);

export default function DataCentersPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
    window.location.href = `mailto:anthonyachkarian@gmail.com?subject=Notify Me: ARK Data Centers&body=Please add me to the early access list for ARK Industries Data Center division.%0A%0AEmail: ${email}`;
    setSubmitted(true);
  };

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
          <a href="/careers">Careers</a>
          <a href="/#contact" className="nav-cta">Get in Touch</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="cs-hero">
        <div className="cs-hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="cs-hero-overlay" />
        <div className="cs-hero-content fade-up">
          <div className="hero-badge">Coming Soon — ARK Infrastructure</div>
          <h1>Data Centers.<br /><span className="gradient-text">Reimagined.</span></h1>
          <p>The AI era demands a new kind of infrastructure. ARK Industries is building next-generation data centers purpose-engineered for AI workloads — combining extreme compute density, sustainable cooling, and modular deployment at any scale.</p>
          {!submitted ? (
            <form className="cs-notify-form" onSubmit={handleNotify}>
              <input type="email" placeholder="Enter your email for early access" value={email}
                onChange={(e) => setEmail(e.target.value)} required className="cs-email-input" />
              <button type="submit" className="btn-primary">
                Get Notified
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </form>
          ) : (
            <div className="cs-submitted">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
              You&apos;re on the list. We&apos;ll be in touch.
            </div>
          )}
        </div>
      </section>

      {/* VISION */}
      <section style={{ padding: "7rem 2rem", background: "var(--navy-light)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-label">The Vision</div>
            <div className="section-title">Infrastructure for the AI Era.</div>
            <p className="section-sub" style={{ margin: "0 auto" }}>We're not renovating old facilities — we're building from first principles. Every ARK data center is designed around the demands of tomorrow's AI, not yesterday's workloads.</p>
          </div>
          <div className="cs-pillars fade-up">
            <div className="cs-pillar">
              <div className="cs-pillar-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
              </div>
              <h3>AI-Optimized Infrastructure</h3>
              <p>Every rack, every cable, every cooling loop engineered specifically for AI workloads. ARK data centers deliver maximum GPU density with industry-leading power utilization efficiency (PUE).</p>
            </div>
            <div className="cs-pillar">
              <div className="cs-pillar-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12L4 7M12 12l8-5M20 7v10l-8 5M4 7v10l8 5M4 7l8-5 8 5"/></svg>
              </div>
              <h3>Modular & Scalable</h3>
              <p>Purpose-built modular units that deploy in weeks, not years. From edge inference nodes to hyperscale campuses, ARK infrastructure scales with your compute demands.</p>
            </div>
            <div className="cs-pillar">
              <div className="cs-pillar-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M12 22V12m0 0H9m3 0h3"/></svg>
              </div>
              <h3>Sustainable by Design</h3>
              <p>Liquid cooling, renewable energy integration, and waste heat recovery built into every facility. ARK data centers are designed to meet the most demanding ESG targets without compromising performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "7rem 2rem", textAlign: "center" }}>
        <div className="fade-up" style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="section-label">Early Access</div>
          <h2 className="section-title">Be First in Line.</h2>
          <p style={{ color: "var(--gray-400)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
            Enterprise, cloud, and government partners can inquire about co-location, build-to-suit, and managed compute offerings. Capacity is limited — reach out early.
          </p>
          <a href="mailto:anthonyachkarian@gmail.com?subject=Notify Me: ARK Data Centers%20%E2%80%94%20Partnership%20Inquiry" className="btn-primary" style={{ display: "inline-flex" }}>
            Contact for Partnership
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
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
            <a href="/careers">Careers</a><a href="/#contact">Contact</a>
          </div>
        </div>
      </footer>

      <style>{`
        .cs-hero {
          position: relative; min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 10rem 2rem 6rem; text-align: center; overflow: hidden;
        }
        .cs-hero-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          filter: brightness(0.22) saturate(0.8);
        }
        .cs-hero-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 65%),
            linear-gradient(to bottom, transparent 50%, var(--navy) 100%);
        }
        .cs-hero-content { position: relative; z-index: 2; max-width: 780px; }
        .cs-hero-content h1 {
          font-size: clamp(3rem, 7vw, 6rem); font-weight: 800;
          letter-spacing: -0.035em; line-height: 1.05; margin: 1.5rem 0 1.5rem;
        }
        .cs-hero-content p {
          font-size: 1.15rem; color: var(--gray-400); line-height: 1.72;
          max-width: 620px; margin: 0 auto 2.5rem;
        }
        .cs-notify-form {
          display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;
        }
        .cs-email-input {
          padding: 0.85rem 1.25rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06); color: white; font-size: 0.95rem;
          min-width: 280px; outline: none; transition: border-color 0.2s;
        }
        .cs-email-input::placeholder { color: var(--gray-500); }
        .cs-email-input:focus { border-color: var(--accent); background: rgba(59,130,246,0.08); }
        .cs-submitted {
          display: inline-flex; align-items: center; gap: 0.65rem;
          padding: 0.85rem 1.75rem; border-radius: 10px;
          background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25);
          color: #4ade80; font-weight: 600; font-size: 0.95rem;
        }
        .cs-pillars { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .cs-pillar {
          background: var(--navy); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px; padding: 2rem 1.75rem;
          transition: all 0.3s;
        }
        .cs-pillar:hover { transform: translateY(-4px); border-color: rgba(59,130,246,0.2); box-shadow: 0 20px 50px rgba(0,0,0,0.25); }
        .cs-pillar-icon {
          width: 50px; height: 50px; border-radius: 14px;
          background: rgba(59,130,246,0.1); color: var(--accent-light);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
        }
        .cs-pillar h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; letter-spacing: -0.01em; }
        .cs-pillar p { font-size: 0.9rem; color: var(--gray-400); line-height: 1.65; }
        @media (max-width: 900px) { .cs-pillars { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .cs-hero { padding: 8rem 1.5rem 4rem; } }
        .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .fade-up.visible { opacity: 1; transform: none; }
`}</style>
    </main>
  );
}
