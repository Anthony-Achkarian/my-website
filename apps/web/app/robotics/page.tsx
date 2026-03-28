"use client";

import { useState, useEffect, useRef } from "react";
import { products } from "../../lib/products";

const drone = products.find((p) => p.id === "ark-tactical-x1")!;

export default function RoboticsPage() {
  const [loading, setLoading] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: drone.id }),
      });
      const { url, error } = await res.json();
      if (url) window.location.href = url;
      else console.error(error);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const price = drone.price ?? 0;

  return (
    <main className="robotics-page">

      {/* ── Hero ── */}
      <section className="robotics-hero" ref={heroRef}>
        <div className="robotics-hero-grid" />
        <div className="robotics-hero-glow" />

        <div className="robotics-hero-content fade-up">
          <div className="hero-badge">ARK Robotics Division</div>
          <h1>
            Intelligence<br />
            <span className="gradient-text">Airborne.</span>
          </h1>
          <p>
            Next-generation autonomous aerial systems, engineered for precision.
            The ARK Tactical X1 redefines what's possible in the sky.
          </p>
          <div className="robotics-hero-actions">
            <button className="btn-primary" onClick={handleBuy} disabled={loading}>
              {loading ? "Redirecting..." : (
                <>
                  Order Now — ${(price / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
            <a href="#specs" className="btn-secondary">View Specs</a>
          </div>
        </div>

        {/* Drone visual */}
        <div className="robotics-hero-visual fade-up">
          <div className="drone-frame">
            <img
              src={drone.image}
              alt={drone.name}
              className="drone-img"
              onError={(e) => { (e.target as HTMLImageElement).src = "/logo.png"; }}
            />
            <div className="drone-overlay" />
            {drone.badge && <span className="drone-badge">{drone.badge}</span>}

            {/* Stat pills */}
            <div className="drone-stat-pill pill-top-left">
              <span className="pill-label">Flight Time</span>
              <span className="pill-value">45 min</span>
            </div>
            <div className="drone-stat-pill pill-top-right">
              <span className="pill-label">Range</span>
              <span className="pill-value">10 km</span>
            </div>
            <div className="drone-stat-pill pill-bottom-left">
              <span className="pill-label">Video</span>
              <span className="pill-value">Encrypted 4K</span>
            </div>
            <div className="drone-stat-pill pill-bottom-right">
              <span className="pill-label">Deploy</span>
              <span className="pill-value">&lt; 60 sec</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product feature strip ── */}
      <section className="robotics-features fade-up">
        <div className="container">
          <div className="features-strip">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 6l5 5 5-5 5 5 5-5" /><path d="M1 18l5-5 5 5 5-5 5 5" />
                </svg>
              </div>
              <div>
                <div className="feature-title">AI-Powered Tracking</div>
                <div className="feature-sub">Real-time object detection & lock</div>
              </div>
            </div>
            <div className="feature-divider" />
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
                </svg>
              </div>
              <div>
                <div className="feature-title">Encrypted 4K Feed</div>
                <div className="feature-sub">Military-grade video encryption</div>
              </div>
            </div>
            <div className="feature-divider" />
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                </svg>
              </div>
              <div>
                <div className="feature-title">Rapid Deploy</div>
                <div className="feature-sub">Airborne in under 60 seconds</div>
              </div>
            </div>
            <div className="feature-divider" />
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <div className="feature-title">Night Vision</div>
                <div className="feature-sub">Thermal + low-light optics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Detail ── */}
      <section className="robotics-detail" id="specs">
        <div className="container">
          <div className="detail-grid">

            {/* Left: image */}
            <div className="detail-image-wrap fade-up">
              <div className="detail-image-frame">
                <img
                  src={drone.image}
                  alt={drone.name}
                  onError={(e) => { (e.target as HTMLImageElement).src = "/logo.png"; }}
                />
                <div className="detail-image-overlay" />
              </div>
            </div>

            {/* Right: info */}
            <div className="detail-info fade-up">
              <div className="section-label">ARK Tactical X1</div>
              <h2 className="detail-title">Mission-Ready<br />Intelligence.</h2>
              <p className="detail-desc">{drone.description}</p>

              {/* Specs grid */}
              {drone.specs && (
                <div className="specs-grid" id="specs">
                  {drone.specs.map((s) => (
                    <div key={s.label} className="spec-item">
                      <span className="spec-label">{s.label}</span>
                      <span className="spec-value">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price + CTA */}
              <div className="detail-purchase">
                <div className="detail-price-block">
                  <span className="detail-price">${(price / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  <span className="detail-price-note">Includes onboard AI module &amp; carry case</span>
                </div>
                <button
                  className="btn-primary detail-buy-btn"
                  onClick={handleBuy}
                  disabled={loading}
                >
                  {loading ? "Redirecting..." : (
                    <>
                      Order Now
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="robotics-usecases">
        <div className="container">
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div className="section-label">Applications</div>
            <div className="section-title">Built for the Field.</div>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              The ARK Tactical X1 is deployed across the most demanding operational environments.
            </p>
          </div>
          <div className="usecases-grid fade-up">
            <div className="usecase-card">
              <div className="usecase-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <h3>Search &amp; Rescue</h3>
              <p>Thermal imaging and AI-assisted detection to locate individuals in remote or disaster-affected areas.</p>
            </div>
            <div className="usecase-card">
              <div className="usecase-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Security &amp; Surveillance</h3>
              <p>Perimeter monitoring with encrypted video streams and autonomous patrol routing.</p>
            </div>
            <div className="usecase-card">
              <div className="usecase-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3>Infrastructure Inspection</h3>
              <p>High-resolution aerial inspection of critical infrastructure — bridges, pipelines, and power grids.</p>
            </div>
            <div className="usecase-card">
              <div className="usecase-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
                </svg>
              </div>
              <h3>First Responder Support</h3>
              <p>Real-time situational awareness for firefighting, law enforcement, and emergency services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="robotics-cta">
        <div className="robotics-cta-inner fade-up">
          <div className="section-label">Get Yours</div>
          <h2>Ready to Deploy<br /><span className="gradient-text">the X1?</span></h2>
          <p>Order today and receive full onboarding support, technical documentation, and access to the ARK control platform.</p>
          <button className="btn-primary robotics-cta-btn" onClick={handleBuy} disabled={loading}>
            {loading ? "Redirecting..." : (
              <>
                Order the ARK Tactical X1 — $1,299
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </div>
      </section>

      <style>{`
        /* ── Page Base ── */
        .robotics-page {
          background: var(--navy);
          padding-top: 80px;
          min-height: 100vh;
        }

        /* ── Fade-up animation ── */
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: none;
        }

        /* ── Hero ── */
        .robotics-hero {
          position: relative;
          min-height: 92vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 3rem;
          padding: 6rem 6vw 4rem;
          overflow: hidden;
        }
        .robotics-hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
          pointer-events: none;
        }
        .robotics-hero-glow {
          position: absolute;
          top: 10%; right: 0;
          width: 60%; height: 80%;
          background: radial-gradient(ellipse at 60% 40%, rgba(59,130,246,0.1) 0%, transparent 65%);
          pointer-events: none;
        }
        .robotics-hero-content {
          position: relative;
          z-index: 2;
        }
        .robotics-hero-content h1 {
          font-size: clamp(3rem, 5.5vw, 5.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 1.5rem 0;
        }
        .robotics-hero-content p {
          font-size: 1.15rem;
          color: var(--gray-400);
          line-height: 1.7;
          max-width: 480px;
          margin-bottom: 2.5rem;
        }
        .robotics-hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* ── Drone visual ── */
        .robotics-hero-visual {
          position: relative;
          z-index: 2;
        }
        .drone-frame {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(59,130,246,0.18);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
          aspect-ratio: 4/3;
        }
        .drone-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .drone-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 40%,
            rgba(10,22,40,0.7) 100%
          );
        }
        .drone-badge {
          position: absolute;
          top: 1.25rem; right: 1.25rem;
          background: var(--accent);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.35rem 0.85rem;
          border-radius: 100px;
        }

        /* Stat pills overlaid on drone image */
        .drone-stat-pill {
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: rgba(10,22,40,0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(59,130,246,0.25);
          border-radius: 12px;
          padding: 0.55rem 0.9rem;
        }
        .pill-top-left    { top: 1.25rem; left: 1.25rem; }
        .pill-top-right   { top: 1.25rem; right: 1.25rem; display: none; }
        .pill-bottom-left { bottom: 1.25rem; left: 1.25rem; }
        .pill-bottom-right{ bottom: 1.25rem; right: 1.25rem; }
        .pill-label { font-size: 0.65rem; color: var(--gray-500); font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; }
        .pill-value { font-size: 0.85rem; color: var(--white); font-weight: 700; }

        /* ── Feature strip ── */
        .robotics-features {
          padding: 0;
          background: var(--navy-light);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .features-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2.5rem 0;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 180px;
        }
        .feature-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(59,130,246,0.12);
          color: var(--accent-light);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .feature-title { font-size: 0.9rem; font-weight: 600; margin-bottom: 2px; }
        .feature-sub { font-size: 0.78rem; color: var(--gray-500); }
        .feature-divider {
          width: 1px; height: 48px;
          background: rgba(255,255,255,0.07);
          flex-shrink: 0;
        }

        /* ── Detail Section ── */
        .robotics-detail {
          padding: 7rem 2rem;
        }
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .detail-image-frame {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          aspect-ratio: 4/3;
          box-shadow: 0 40px 100px rgba(0,0,0,0.4);
        }
        .detail-image-frame img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .detail-image-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 60%);
        }
        .detail-title {
          font-size: clamp(2rem, 3.5vw, 3.25rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin: 1rem 0 1.25rem;
        }
        .detail-desc {
          color: var(--gray-400);
          line-height: 1.75;
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        /* Specs grid */
        .specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }
        .spec-item {
          background: var(--navy-light);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 0.9rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: border-color 0.2s;
        }
        .spec-item:hover { border-color: rgba(59,130,246,0.25); }
        .spec-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--gray-500);
          font-weight: 600;
        }
        .spec-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--white);
        }

        /* Purchase block */
        .detail-purchase {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .detail-price-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .detail-price {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--white), var(--gray-300));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .detail-price-note {
          font-size: 0.78rem;
          color: var(--gray-500);
        }
        .detail-buy-btn {
          padding: 1rem 2.5rem;
          font-size: 1rem;
        }

        /* ── Use Cases ── */
        .robotics-usecases {
          padding: 7rem 2rem;
          background: var(--navy-light);
        }
        .usecases-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .usecase-card {
          background: var(--navy);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px;
          padding: 2rem 1.75rem;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .usecase-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .usecase-card:hover {
          transform: translateY(-5px);
          border-color: rgba(59,130,246,0.2);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .usecase-card:hover::before { opacity: 1; }
        .usecase-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          background: rgba(59,130,246,0.1);
          color: var(--accent-light);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
        }
        .usecase-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }
        .usecase-card p {
          font-size: 0.9rem;
          color: var(--gray-400);
          line-height: 1.65;
        }

        /* ── CTA ── */
        .robotics-cta {
          padding: 8rem 2rem;
          background: linear-gradient(180deg, var(--navy) 0%, var(--navy-light) 100%);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .robotics-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.07) 0%, transparent 65%);
          pointer-events: none;
        }
        .robotics-cta-inner {
          position: relative;
          max-width: 620px;
          margin: 0 auto;
        }
        .robotics-cta-inner h2 {
          font-size: clamp(2.25rem, 4vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin: 1rem 0 1.25rem;
        }
        .robotics-cta-inner p {
          color: var(--gray-400);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }
        .robotics-cta-btn {
          padding: 1.1rem 2.75rem;
          font-size: 1.05rem;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .robotics-hero {
            grid-template-columns: 1fr;
            min-height: auto;
            padding: 5rem 2rem 3rem;
            text-align: center;
          }
          .robotics-hero-content p { margin: 0 auto 2rem; }
          .robotics-hero-actions { justify-content: center; }
          .robotics-hero-glow { display: none; }
          .detail-grid { grid-template-columns: 1fr; gap: 3rem; }
          .usecases-grid { grid-template-columns: 1fr 1fr; }
          .feature-divider { display: none; }
          .features-strip { justify-content: flex-start; gap: 1.5rem; }
        }
        @media (max-width: 640px) {
          .usecases-grid { grid-template-columns: 1fr; }
          .specs-grid { grid-template-columns: 1fr 1fr; }
          .detail-purchase { flex-direction: column; align-items: flex-start; }
          .detail-buy-btn { width: 100%; justify-content: center; }
          .pill-bottom-right { display: none; }
        }
      `}</style>
    </main>
  );
}
