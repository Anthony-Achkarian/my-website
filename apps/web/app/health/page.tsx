"use client";

import { useState, useEffect } from "react";

const ArkLogo = () => (
  <svg viewBox="0 0 315 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 36, width: "auto" }}>
    <line x1="5" y1="13" x2="200" y2="7" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M 195,7 L 243,3 L 283,83 L 229,30 Z" fill="white" />
    <text x="5" y="70" fontFamily="'Barlow Condensed', 'Arial Black', sans-serif" fontWeight="800" fontSize="64" fill="white" fontStyle="italic">ARK</text>
  </svg>
);

export default function HealthPage() {
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
    window.location.href = `mailto:anthonyachkarian@gmail.com?subject=Notify Me: ARK Health&body=Please add me to the early access list for ARK Industries Health division.%0A%0AEmail: ${email}`;
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
        <div className="cs-hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1920&q=80')" }} />
        <div className="cs-hero-overlay" />
        <div className="cs-hero-content fade-up">
          <div className="hero-badge">Coming Soon — ARK Health</div>
          <h1>Human Health.<br /><span className="gradient-text">Optimized.</span></h1>
          <p>Your body generates thousands of data points every second. ARK Health is building the AI systems to read them, understand them, and act on them — helping people live longer, healthier, and with more precision than ever before.</p>
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
            <div className="section-title">Intelligence for Your Body.</div>
            <p className="section-sub" style={{ margin: "0 auto" }}>We believe preventive health will replace reactive medicine. ARK is building the infrastructure that makes continuous, proactive health intelligence available to everyone — not just the elite.</p>
          </div>
          <div className="cs-pillars fade-up">
            <div className="cs-pillar">
              <div className="cs-pillar-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h3>Predictive Diagnostics</h3>
              <p>AI models trained on millions of biomarkers to detect disease earlier than any existing test. ARK Health AI monitors continuous biometric streams to flag anomalies before symptoms appear.</p>
            </div>
            <div className="cs-pillar">
              <div className="cs-pillar-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              </div>
              <h3>Longevity Intelligence</h3>
              <p>Personalized health protocols generated by AI — covering sleep, nutrition, movement, and recovery — grounded in your unique biology, not population averages.</p>
            </div>
            <div className="cs-pillar">
              <div className="cs-pillar-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              </div>
              <h3>Clinical-Grade Wearables</h3>
              <p>Purpose-built sensors and devices for continuous, passive health monitoring — designed for clinical precision, consumer comfort, and seamless integration with the ARK Health platform.</p>
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
            Healthcare providers, research institutions, and wellness platforms can apply for integration partnerships and pilot programs ahead of our public launch.
          </p>
          <a href="mailto:anthonyachkarian@gmail.com?subject=Notify Me: ARK Health%20%E2%80%94%20Partnership%20Inquiry" className="btn-primary" style={{ display: "inline-flex" }}>
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
