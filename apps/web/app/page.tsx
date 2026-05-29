"use client";

import { useEffect, useRef, useState } from "react";
import ParticleField from "./components/ParticleField";

export default function Home() {
  const navRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  useEffect(() => {
    // ── Staggered scroll reveals ──
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("visible"); observer.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll<HTMLElement>(".fade-up").forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
      observer.observe(el);
    });

    // ── Count-up stats ──
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const target = parseInt(el.dataset.count || "0", 10);
        const suffix = el.dataset.suffix || "";
        const dur = 1400;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => countObserver.observe(el));

    // ── Card spotlight follow ──
    const onCardMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(".career-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onCardMove);

    // ── Scroll: nav background ──
    const onScroll = () => {
      if (navRef.current) {
        navRef.current.style.background =
          window.scrollY > 50 ? "rgba(10,22,40,0.95)" : "rgba(10,22,40,0.85)";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      countObserver.disconnect();
      document.removeEventListener("pointermove", onCardMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* NAV */}
      <nav ref={navRef} id="navbar">
        <a href="#" className="nav-logo"><img src="/logo.png" alt="ARK" height={80} /></a>
        <div className="nav-links">
          <div className="nav-dropdown-wrap">
            <span className="nav-dropdown-trigger">
              Products
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <div className="nav-dropdown">
              <a href="/software" className="nav-dropdown-item">
                <span>ARK Studio</span>
                <span className="nav-badge-soon">Soon</span>
              </a>
              <a href="/robotics" className="nav-dropdown-item">
                <span>Robotics</span>
                <span className="nav-badge-live">Live</span>
              </a>
              <a href="/quantum" className="nav-dropdown-item">
                <span>Quantum Computers</span>
                <span className="nav-badge-soon">Soon</span>
              </a>
              <a href="/data-centers" className="nav-dropdown-item">
                <span>Data Centers</span>
                <span className="nav-badge-soon">Soon</span>
              </a>
              <a href="/health" className="nav-dropdown-item">
                <span>Health</span>
                <span className="nav-badge-soon">Soon</span>
              </a>
              <a href="/housing" className="nav-dropdown-item">
                <span>Housing</span>
                <span className="nav-badge-soon">Soon</span>
              </a>
            </div>
          </div>
          <a href="#about">About</a>
          <a href="/careers">Careers</a>
          <a href="/merch">Merch</a>
          <a href="/invest">Invest</a>
          <a href="#contact" className="nav-cta">Get in Touch</a>
        </div>
        <button
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => document.getElementById("navbar")?.classList.toggle("open")}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <ParticleField />
        <div className="hero-orb orb-1" aria-hidden="true" />
        <div className="hero-orb orb-2" aria-hidden="true" />
        <div className="hero-orb orb-3" aria-hidden="true" />
        <div className="hero-content fade-up">
          <span className="hero-pill"><span className="pulse-dot" />Building the infrastructure of tomorrow</span>
          <h1>Intelligence.<br /><span className="gradient-text">Engineered.</span></h1>
          <p>Ark Industries operates at the intersection of artificial intelligence, advanced robotics, and real estate development.</p>
          <div className="hero-buttons">
            <a href="#products" className="btn-primary">
              Explore Our Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#contact" className="btn-secondary">Contact Us</a>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products">
        <div className="container">
          <div className="fade-up">
            <div className="section-label">Our Products</div>
            <div className="section-title">Built to Perform.</div>
            <p className="section-sub">Every product at Ark Industries is designed from the ground up to solve real problems at scale.</p>
          </div>

          <div className="product-row fade-up">
            <div className="product-visual">
              <div className="product-visual-inner">
                <div className="app-mockup">
                  <h4>Ask Ark</h4>
                  <div className="app-mockup-input">Type your question…</div>
                  <div className="app-mockup-btn">Ask</div>
                </div>
              </div>
            </div>
            <div className="product-info">
              <h3>Ask Ark — AI Assistant</h3>
              <p>A conversational AI app built natively for iOS. Fast, contextual answers powered by our proprietary language model.</p>
              <ul className="product-features">
                <li>Built on proprietary Ark AI models</li>
                <li>Available on iOS, Android coming soon</li>
              </ul>
            </div>
          </div>

          <div className="product-row reverse fade-up" style={{ marginTop: "5rem" }}>
            <div className="product-visual">
              <div className="product-visual-inner">
                <svg viewBox="0 0 300 220" width="260" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="115" y="90" width="70" height="45" rx="6" fill="#334155" stroke="#475569" strokeWidth="1.5" />
                  <rect x="125" y="80" width="50" height="15" rx="4" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="0.5" />
                  <circle cx="150" cy="140" r="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
                  <circle cx="150" cy="140" r="3" fill="#3b82f6" fillOpacity="0.6" />
                  <line x1="120" y1="95" x2="60" y2="60" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
                  <line x1="180" y1="95" x2="240" y2="60" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
                  <line x1="120" y1="130" x2="60" y2="165" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
                  <line x1="180" y1="130" x2="240" y2="165" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
                  <ellipse cx="55" cy="55" rx="28" ry="6" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 55 55" to="360 55 55" dur="1.5s" repeatCount="indefinite" /></ellipse>
                  <ellipse cx="245" cy="55" rx="28" ry="6" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 245 55" to="360 245 55" dur="1.2s" repeatCount="indefinite" /></ellipse>
                  <ellipse cx="55" cy="170" rx="28" ry="6" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 55 170" to="360 55 170" dur="1.3s" repeatCount="indefinite" /></ellipse>
                  <ellipse cx="245" cy="170" rx="28" ry="6" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5"><animateTransform attributeName="transform" type="rotate" from="0 245 170" to="360 245 170" dur="1.4s" repeatCount="indefinite" /></ellipse>
                  <circle cx="55" cy="55" r="6" fill="#334155" stroke="#475569" strokeWidth="1" />
                  <circle cx="245" cy="55" r="6" fill="#334155" stroke="#475569" strokeWidth="1" />
                  <circle cx="55" cy="170" r="6" fill="#334155" stroke="#475569" strokeWidth="1" />
                  <circle cx="245" cy="170" r="6" fill="#334155" stroke="#475569" strokeWidth="1" />
                  <line x1="125" y1="135" x2="115" y2="155" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                  <line x1="175" y1="135" x2="185" y2="155" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
                  <line x1="108" y1="155" x2="122" y2="155" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="178" y1="155" x2="192" y2="155" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="product-info">
              <h3>Autonomous Drone Platform</h3>
              <p>Multi-rotor autonomous platform for industrial inspection, mapping, and logistics — powered by onboard Ark AI.</p>
              <ul className="product-features">
                <li>AI-powered autonomous navigation</li>
                <li>Real-time 3D mapping</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container about-container">
          <div className="about-text fade-up">
            <div className="section-label">About</div>
            <div className="section-title">Shaping What&apos;s Next.</div>
            <p>The future belongs to those who build it. We combine deep expertise across AI, robotics, and real estate development to create integrated solutions that are smarter, more efficient, and built to last.</p>
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section id="careers" className="careers-section">
        <div className="container">
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-label">Join the Team</div>
            <div className="section-title">Build What&apos;s Next With Us.</div>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              We&apos;re assembling a team of builders obsessed with bringing transformative technology to life.
            </p>
            <a href="/careers" className="btn-primary" style={{ marginTop: "2rem", display: "inline-flex" }}>
              View All Openings
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="cta-section" id="contact">
        <div className="cta-content fade-up">
          <div className="section-label">Get Started</div>
          <h2>Let&apos;s Build the Future Together.</h2>
          <p>AI products, robotics partnerships, real estate ventures — let&apos;s talk.</p>

          {status === "success" ? (
            <div className="contact-success">
              <div className="contact-success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out. We&apos;ll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {status === "error" && (
                <div className="contact-error">{errorMsg}</div>
              )}
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" type="text" placeholder="Your name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" type="email" placeholder="your@email.com" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>
              <div className="contact-field">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" placeholder="Tell us about your project or inquiry…" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              </div>
              <button type="submit" className="btn-primary contact-submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : (<>Send Message <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></>)}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-left">
            <img src="/logo.png" alt="ARK" height={100} />
            <span className="footer-copy">&copy; 2026 Ark Industries. All rights reserved.</span>
          </div>
          <div className="footer-links">
            <a href="/robotics">Robotics</a>
            <a href="/quantum">Quantum</a>
            <a href="/data-centers">Data Centers</a>
            <a href="/health">Health</a>
            <a href="/housing">Housing</a>
            <a href="/careers">Careers</a>
            <a href="/invest">Invest</a>
            <a href="#about">About</a>
            <a href="mailto:anthonyachkarian@gmail.com">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
