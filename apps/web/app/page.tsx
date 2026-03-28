"use client";

import { useEffect, useRef, useState } from "react";

const ArkLogo = ({ height = 36, color = "white" }: { height?: number; color?: string }) => (
  <svg viewBox="0 0 315 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height, width: "auto" }}>
    <line x1="5" y1="13" x2="200" y2="7" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
    <path d="M 195,7 L 243,3 L 283,83 L 229,30 Z" fill={color} />
    <text
      x="5" y="70"
      fontFamily="'Barlow Condensed', 'Arial Black', sans-serif"
      fontWeight="800"
      fontSize="64"
      fill={color}
      fontStyle="italic"
    >ARK</text>
  </svg>
);

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
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (navRef.current) {
        navRef.current.style.background =
          window.scrollY > 50 ? "rgba(10,22,40,0.95)" : "rgba(10,22,40,0.85)";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      {/* NAV */}
      <nav ref={navRef} id="navbar">
        <a href="#" className="nav-logo"><img src="/logo.png" alt="ARK" height={80} /></a>
        <div className="nav-links">
          <a href="#divisions">Divisions</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="/merch">Merch</a>
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
        <div className="hero-grid" />
        <div className="hero-content fade-up">
<div className="hero-badge">Building the Future</div>
          <h1>Intelligence.<br /><span className="gradient-text">Engineered.</span></h1>
          <p>Ark Industries operates at the intersection of artificial intelligence, advanced robotics, and real estate development — shaping the infrastructure of tomorrow.</p>
          <div className="hero-buttons">
            <a href="#divisions" className="btn-primary">
              Explore Our Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#contact" className="btn-secondary">Contact Us</a>
          </div>
        </div>
      </section>

      {/* DIVISIONS */}
      <section id="divisions">
        <div className="container">
          <div className="fade-up">
            <div className="section-label">What We Do</div>
            <div className="section-title">Three Divisions.<br />One Mission.</div>
            <p className="section-sub">We build across domains, combining deep expertise in AI, robotics, and real estate to create integrated, intelligent systems.</p>
          </div>
          <div className="divisions-grid">
            <div className="division-card fade-up">
              <div className="division-icon icon-ai">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" /><path d="M16 14a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8" /><line x1="12" y1="8" x2="12" y2="14" /></svg>
              </div>
              <h3>Artificial Intelligence</h3>
              <p>Our flagship AI platform, Ask Ark, delivers intelligent answers and automation. We develop proprietary models purpose-built for enterprise decision-making and personal productivity.</p>
            </div>
            <div className="division-card fade-up">
              <div className="division-icon icon-robotics">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M12 2v4" /><circle cx="12" cy="12" r="2" /><path d="M2 12h4" /><path d="M18 12h4" /></svg>
              </div>
              <h3>Robotics</h3>
              <p>From autonomous drones to intelligent machines, our robotics division designs, prototypes, and builds next-generation hardware powered by our AI stack.</p>
            </div>
            <div className="division-card fade-up">
              <div className="division-icon icon-realestate">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" /></svg>
              </div>
              <h3>Real Estate</h3>
              <p>Smart development meets intelligent design. We create tech-forward properties and spaces that integrate automation, sustainability, and data-driven management.</p>
            </div>
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
                  <div className="app-mockup-dot">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" /></svg>
                  </div>
                  <h4>Ask Ark</h4>
                  <div className="app-mockup-input">Type your question...</div>
                  <div className="app-mockup-btn">Ask</div>
                  <p style={{ fontSize: "0.65rem", color: "var(--gray-500)", marginTop: "0.75rem", lineHeight: 1.4 }}>Intelligent answers, powered by Ark AI.</p>
                </div>
              </div>
            </div>
            <div className="product-info">
              <h3>Ask Ark — AI Assistant</h3>
              <p>A conversational AI app built natively for iOS. Ask Ark delivers fast, contextual answers using our proprietary language model, designed for professionals and everyday users alike.</p>
              <ul className="product-features">
                <li>Natural language understanding</li>
                <li>Built on proprietary Ark AI models</li>
                <li>Available on iOS with Android coming soon</li>
                <li>Enterprise-ready with data privacy built in</li>
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
              <p>Our multi-rotor autonomous platform is designed for industrial inspection, mapping, and logistics. Powered by onboard Ark AI for real-time navigation and decision-making.</p>
              <ul className="product-features">
                <li>6-rotor heavy-lift configuration</li>
                <li>AI-powered autonomous navigation</li>
                <li>Real-time 3D mapping and inspection</li>
                <li>Modular payload system</li>
              </ul>
            </div>
          </div>

          <div className="stats fade-up">
            <div className="stat"><div className="stat-value">3</div><div className="stat-label">Core Divisions</div></div>
            <div className="stat"><div className="stat-value">AI</div><div className="stat-label">First Approach</div></div>
            <div className="stat"><div className="stat-value">24/7</div><div className="stat-label">Autonomous Ops</div></div>
            <div className="stat"><div className="stat-value">∞</div><div className="stat-label">Possibilities</div></div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-text fade-up">
              <div className="section-label">About Ark</div>
              <div className="section-title">Shaping What&apos;s Next.</div>
              <p>Ark Industries was founded on a simple belief: the future belongs to those who build it. We combine deep expertise across artificial intelligence, robotics engineering, and real estate development to create integrated solutions that push boundaries.</p>
              <p>Our team of engineers, designers, and strategists work across disciplines to deliver products and properties that are smarter, more efficient, and built to last.</p>
            </div>
            <div className="about-values fade-up">
              <div className="value-item"><h4>Innovation</h4><p>Pushing the limits of what technology can achieve.</p></div>
              <div className="value-item"><h4>Precision</h4><p>Every detail matters, from code to concrete.</p></div>
              <div className="value-item"><h4>Integration</h4><p>AI, hardware, and spaces working as one.</p></div>
              <div className="value-item"><h4>Impact</h4><p>Building things that matter for the real world.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="cta-section" id="contact">
        <div className="cta-content fade-up">
          <div className="section-label">Get Started</div>
          <h2>Ready to Build<br />the Future Together?</h2>
          <p>Whether you&apos;re interested in our AI products, robotics partnerships, or real estate ventures — let&apos;s talk.</p>

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
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="contact-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  placeholder="Tell us about your project or inquiry…"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="btn-primary contact-submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  "Sending…"
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
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
            <a href="#divisions">Divisions</a>
            <a href="#products">Products</a>
            <a href="#about">About</a>
            <a href="mailto:anthonyachkarian@gmail.com">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
