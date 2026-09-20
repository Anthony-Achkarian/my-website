"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ParticleField from "./components/ParticleField";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
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

  // Staggered scroll reveals.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll<HTMLElement>(".fade-up").forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SiteNav />

      {/* ── Hero ── */}
      <section className="hero">
        <ParticleField />
        <div className="hero-orb orb-1" aria-hidden="true" />
        <div className="hero-orb orb-2" aria-hidden="true" />
        <div className="hero-orb orb-3" aria-hidden="true" />
        <div className="hero-content fade-up">
          <span className="hero-pill">
            <span className="pulse-dot" />
            Building the infrastructure of tomorrow
          </span>
          <h1>
            Intelligence.
            <br />
            <span className="gradient-text">Engineered.</span>
          </h1>
          <p>
            Ark Industries operates at the intersection of artificial intelligence, advanced
            robotics, and real estate development.
          </p>
          <div className="hero-buttons">
            <a href="#products" className="btn-primary">
              Explore Our Work
              <ArrowRight />
            </a>
            <a href="#contact" className="btn-secondary">Contact Us</a>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="fade-up">
            <div className="section-label">Our Products</div>
            <h2 className="section-title">Built to Perform.</h2>
            <p className="section-sub">
              Every product at Ark Industries is designed from the ground up to solve real problems
              at scale.
            </p>
          </div>

          <div className="product-grid fade-up">
            <article className="product-card">
              <div className="product-visual">
                <div className="product-visual-inner">
                  <div className="app-mockup">
                    <h4>Ark AI</h4>
                    <div className="app-mockup-input">Type your question…</div>
                    <div className="app-mockup-btn">Ask</div>
                  </div>
                </div>
              </div>
              <div className="product-info">
                <h3>Ark AI</h3>
                <p>
                  A conversational AI app built natively for iOS. Fast, contextual answers powered
                  by our proprietary language model.
                </p>
                <ul className="product-features">
                  <li>Built on proprietary Ark AI models</li>
                  <li>Available on iOS, Android coming soon</li>
                </ul>
                <span className="product-note">Available on the App Store</span>
              </div>
            </article>

            <Link href="/robotics" className="product-card">
              <div className="product-visual">
                <div className="product-visual-inner">
                  <svg viewBox="0 0 300 220" width="190" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="115" y="90" width="70" height="45" rx="6" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.7" />
                    <rect x="125" y="80" width="50" height="15" rx="4" fill="#3b82f6" fillOpacity="0.35" stroke="#60a5fa" strokeWidth="0.75" />
                    <circle cx="150" cy="140" r="6" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.25" />
                    <circle cx="150" cy="140" r="3" fill="#60a5fa" fillOpacity="0.8" />
                    <line x1="120" y1="95" x2="60" y2="60" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                    <line x1="180" y1="95" x2="240" y2="60" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                    <line x1="120" y1="130" x2="60" y2="165" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                    <line x1="180" y1="130" x2="240" y2="165" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                    <ellipse cx="55" cy="55" rx="28" ry="6" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.65"><animateTransform attributeName="transform" type="rotate" from="0 55 55" to="360 55 55" dur="1.5s" repeatCount="indefinite" /></ellipse>
                    <ellipse cx="245" cy="55" rx="28" ry="6" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.65"><animateTransform attributeName="transform" type="rotate" from="0 245 55" to="360 245 55" dur="1.2s" repeatCount="indefinite" /></ellipse>
                    <ellipse cx="55" cy="170" rx="28" ry="6" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.65"><animateTransform attributeName="transform" type="rotate" from="0 55 170" to="360 55 170" dur="1.3s" repeatCount="indefinite" /></ellipse>
                    <ellipse cx="245" cy="170" rx="28" ry="6" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.65"><animateTransform attributeName="transform" type="rotate" from="0 245 170" to="360 245 170" dur="1.4s" repeatCount="indefinite" /></ellipse>
                    <circle cx="55" cy="55" r="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                    <circle cx="245" cy="55" r="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                    <circle cx="55" cy="170" r="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                    <circle cx="245" cy="170" r="6" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                    <line x1="125" y1="135" x2="115" y2="155" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                    <line x1="175" y1="135" x2="185" y2="155" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                    <line x1="108" y1="155" x2="122" y2="155" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="178" y1="155" x2="192" y2="155" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="product-info">
                <h3>Autonomous Drone Platform</h3>
                <p>
                  Multi-rotor autonomous platform for industrial inspection, mapping, and logistics
                  — powered by onboard Ark AI.
                </p>
                <ul className="product-features">
                  <li>AI-powered autonomous navigation</li>
                  <li>Real-time 3D mapping</li>
                </ul>
                <span className="product-more">
                  Explore Robotics
                  <ArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="cta-section" id="contact">
        <div className="cta-content fade-up">
          <h2>Let&apos;s Build the Future Together.</h2>
          <p>AI products, robotics partnerships, real estate ventures — let&apos;s talk.</p>

          {status === "success" ? (
            <div className="contact-success">
              <div className="contact-success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out. We&apos;ll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {status === "error" && <div className="contact-error">{errorMsg}</div>}
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
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
                    autoComplete="email"
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
              <button type="submit" className="btn-primary contact-submit" disabled={status === "loading"}>
                {status === "loading" ? (
                  "Sending…"
                ) : (
                  <>
                    Send Message
                    <ArrowRight />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
