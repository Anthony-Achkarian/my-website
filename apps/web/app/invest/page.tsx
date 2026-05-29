"use client";

import { useState, useEffect } from "react";

const ArkLogo = () => (
  <img src="/logo.png" alt="ARK" />
);

const INVESTOR_TYPES = [
  "Angel Investor",
  "Venture Capital / Fund",
  "Family Office",
  "Strategic / Corporate",
  "Accredited Individual",
  "Other",
];

const AMOUNT_RANGES = [
  "Prefer not to say",
  "Under $25k",
  "$25k – $100k",
  "$100k – $500k",
  "$500k – $2M",
  "$2M+",
];

const highlights = [
  {
    title: "A Multi-Vertical Portfolio",
    desc: "One company, six frontiers — AI software, robotics, quantum computing, data centers, health, and housing. Capital deployed at ARK is exposure to a diversified base of deep-tech bets, not a single product.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: "Shipping, Not Speculating",
    desc: "Robotics is already live and in the field. Our roadmap turns each \"coming soon\" division into revenue. You're backing a team that builds and deploys real products in the physical world.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: "Aligned for the Long Run",
    desc: "We raise patient capital from partners who share a decade-long view. Investors get direct access to the founding team, transparent reporting, and a seat alongside builders — not bureaucrats.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
];

const stats = [
  { value: "6", label: "Technology Verticals" },
  { value: "1", label: "Division Live Today" },
  { value: "2030", label: "Full Portfolio Target" },
  { value: "100%", label: "Founder-Led" },
];

export default function InvestPage() {
  const [form, setForm] = useState({ name: "", email: "", investorType: INVESTOR_TYPES[0], amount: AMOUNT_RANGES[0], message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    if (window.location.hash === "#inquire") {
      setTimeout(() => document.getElementById("inquire")?.scrollIntoView({ behavior: "smooth" }), 300);
    }
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/invest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", investorType: INVESTOR_TYPES[0], amount: AMOUNT_RANGES[0], message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection.");
      setStatus("error");
    }
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
          <a href="/invest" className="active">Invest</a>
          <a href="/#contact" className="nav-cta">Get in Touch</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="careers-hero">
        <div className="careers-hero-grid" />
        <div className="careers-hero-glow" />
        <div className="careers-hero-content fade-up">
          <div className="hero-badge">Now Raising</div>
          <h1>Invest in<br /><span className="gradient-text">the Future.</span></h1>
          <p>
            Ark Industries is building across the frontiers that will define the next century — AI, robotics, quantum, data infrastructure, health, and housing. We&apos;re opening the door to a select group of partners who want to build it with us.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#inquire" className="btn-primary">
              Request Investor Info
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#opportunity" className="btn-secondary">The Opportunity</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "4rem 2rem 0" }}>
        <div className="container">
          <div className="invest-stats fade-up">
            {stats.map((s) => (
              <div key={s.label} className="invest-stat">
                <div className="invest-stat-num gradient-text">{s.value}</div>
                <div className="invest-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPPORTUNITY */}
      <section id="opportunity" style={{ padding: "6rem 2rem" }}>
        <div className="container">
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-label">The Opportunity</div>
            <div className="section-title">Why Back ARK.</div>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              We&apos;re not building one product — we&apos;re building the company that builds them. Here&apos;s what makes ARK a different kind of bet.
            </p>
          </div>
          <div className="invest-highlights fade-up">
            {highlights.map((h) => (
              <div key={h.title} className="invest-highlight-card">
                <div className="invest-highlight-icon">{h.icon}</div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section id="inquire" style={{ padding: "7rem 2rem", background: "var(--navy-light)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div className="careers-apply-grid">
            <div className="careers-apply-info fade-up">
              <div className="section-label">Get Started</div>
              <h2 className="section-title">Request Investor Information.</h2>
              <p style={{ color: "var(--gray-400)", lineHeight: 1.75, marginBottom: "2rem" }}>
                Tell us a bit about yourself and we&apos;ll be in touch with our investor materials and next steps. Every inquiry is reviewed personally by the founding team.
              </p>
              <div className="careers-perks">
                {["Direct access to the founding team", "Transparent reporting & updates", "Exposure across six deep-tech verticals", "Patient, long-horizon capital"].map((p) => (
                  <div key={p} className="careers-perk">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
              <p className="invest-disclaimer">
                This page is an expression-of-interest request only and is not an offer to sell or a solicitation of an offer to buy any security. Any investment would be made solely through formal offering documents and is open only to qualified investors where permitted by law.
              </p>
            </div>

            <div className="careers-form-wrap fade-up">
              {status === "success" ? (
                <div className="careers-success">
                  <div className="contact-success-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3>Inquiry Received!</h3>
                  <p>Thanks for your interest in Ark Industries. The founding team will review your inquiry and reach out with investor materials and next steps.</p>
                </div>
              ) : (
                <form className="careers-form" onSubmit={handleSubmit}>
                  <h3 className="careers-form-title">Investor Inquiry</h3>
                  {status === "error" && <div className="contact-error">{errorMsg}</div>}

                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label htmlFor="i-name">Full Name *</label>
                      <input id="i-name" type="text" placeholder="Jane Smith" required
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="i-email">Email *</label>
                      <input id="i-email" type="email" placeholder="jane@example.com" required
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>

                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label htmlFor="i-type">Investor Type *</label>
                      <select id="i-type" required value={form.investorType}
                        onChange={(e) => setForm({ ...form, investorType: e.target.value })}
                        className="careers-select">
                        {INVESTOR_TYPES.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div className="contact-field">
                      <label htmlFor="i-amount">Intended Amount</label>
                      <select id="i-amount" value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        className="careers-select">
                        {AMOUNT_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="i-message">Message *</label>
                    <textarea id="i-message" placeholder="Tell us about your background, what draws you to ARK, and what you're looking for in this investment…" required
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>

                  <button type="submit" className="btn-primary contact-submit" disabled={status === "loading"}>
                    {status === "loading" ? "Submitting…" : (
                      <>Submit Inquiry <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                    )}
                  </button>
                  <p style={{ fontSize: "0.75rem", color: "var(--gray-600)", textAlign: "center", margin: 0 }}>
                    Please don&apos;t send bank, card, or other sensitive financial details through this form.
                  </p>
                </form>
              )}
            </div>
          </div>
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
            <a href="/careers">Careers</a><a href="/invest">Invest</a><a href="/#contact">Contact</a>
          </div>
        </div>
      </footer>

      <style>{`
        .careers-hero {
          position: relative; min-height: 80vh;
          display: flex; align-items: center;
          padding: 10rem 6vw 6rem; overflow: hidden;
        }
        .careers-hero-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at 30% 50%, black 20%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at 30% 50%, black 20%, transparent 70%);
          pointer-events: none;
        }
        .careers-hero-glow {
          position: absolute; top: 10%; left: -10%;
          width: 60%; height: 80%;
          background: radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .careers-hero-content { position: relative; z-index: 2; max-width: 680px; }
        .careers-hero-content h1 {
          font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 800;
          letter-spacing: -0.035em; line-height: 1.05; margin: 1.5rem 0 1.5rem;
        }
        .careers-hero-content p {
          font-size: 1.15rem; color: var(--gray-400); line-height: 1.72;
          max-width: 560px; margin-bottom: 2.5rem;
        }
        .invest-stats {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;
          border: 1px solid rgba(255,255,255,0.07); border-radius: 18px;
          background: var(--navy-light); padding: 2.5rem 2rem;
        }
        .invest-stat { text-align: center; }
        .invest-stat-num { font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1; }
        .invest-stat-label { font-size: 0.8rem; color: var(--gray-400); margin-top: 0.65rem; font-weight: 500; letter-spacing: 0.02em; }
        .invest-highlights { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .invest-highlight-card {
          background: var(--navy-light); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px; padding: 2.25rem 2rem;
          transition: all 0.3s;
        }
        .invest-highlight-card:hover { transform: translateY(-4px); border-color: rgba(59,130,246,0.2); box-shadow: 0 20px 50px rgba(0,0,0,0.25); }
        .invest-highlight-icon {
          width: 48px; height: 48px; border-radius: 13px;
          background: rgba(59,130,246,0.1); color: var(--accent-light);
          display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;
        }
        .invest-highlight-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.7rem; letter-spacing: -0.01em; }
        .invest-highlight-card p { font-size: 0.9rem; color: var(--gray-400); line-height: 1.65; }
        .invest-disclaimer { margin-top: 2rem; font-size: 0.72rem; color: var(--gray-600); line-height: 1.6; }
        .careers-apply-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 5rem; align-items: start; }
        .careers-perks { display: flex; flex-direction: column; gap: 0.85rem; }
        .careers-perk { display: flex; align-items: center; gap: 0.75rem; font-size: 0.9rem; color: var(--gray-300); font-weight: 500; }
        .careers-form-wrap {
          background: var(--navy); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 2.5rem;
        }
        .careers-form-title { font-size: 1.3rem; font-weight: 700; margin-bottom: 1.75rem; letter-spacing: -0.01em; }
        .careers-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .careers-select {
          width: 100%; padding: 0.8rem 1rem; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
          color: white; font-size: 0.9rem; outline: none;
          transition: border-color 0.2s; cursor: pointer;
          -webkit-appearance: none;
        }
        .careers-select:focus { border-color: var(--accent); background: rgba(59,130,246,0.05); }
        .careers-select option { background: #111d33; color: white; }
        .careers-success {
          text-align: center; padding: 3rem 2rem;
          background: rgba(59,130,246,0.06); border: 1px solid rgba(59,130,246,0.2);
          border-radius: 16px;
        }
        .careers-success h3 { font-size: 1.4rem; font-weight: 700; margin: 1rem 0 0.5rem; }
        .careers-success p { color: var(--gray-400); font-size: 0.95rem; line-height: 1.6; }
        .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .fade-up.visible { opacity: 1; transform: none; }
        @media (max-width: 1100px) { .invest-highlights { grid-template-columns: 1fr; } .invest-stats { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 900px) {
          .careers-apply-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
        @media (max-width: 640px) {
          .careers-hero { padding: 8rem 1.5rem 4rem; }
          .careers-form-wrap { padding: 1.75rem; }
          .invest-stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </main>
  );
}
