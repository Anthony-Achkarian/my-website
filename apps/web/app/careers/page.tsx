"use client";

import { useState, useEffect } from "react";

const ArkLogo = () => (
  <svg viewBox="0 0 315 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 36, width: "auto" }}>
    <line x1="5" y1="13" x2="200" y2="7" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M 195,7 L 243,3 L 283,83 L 229,30 Z" fill="white" />
    <text x="5" y="70" fontFamily="'Barlow Condensed', 'Arial Black', sans-serif" fontWeight="800" fontSize="64" fill="white" fontStyle="italic">ARK</text>
  </svg>
);

const ROLES = ["Robotics Engineer", "AI/ML Engineer", "Full Stack Developer", "Other"];

const openings = [
  {
    title: "Robotics Engineer",
    dept: "Robotics",
    type: "Full-time",
    location: "Remote / On-site",
    desc: "Design and build next-generation autonomous systems. You'll work on hardware-software integration, motion planning, sensor fusion, and real-world deployment of ARK's robotic platforms — from drones to humanoids.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 2v4"/><circle cx="12" cy="12" r="2"/><path d="M2 12h4M18 12h4"/>
      </svg>
    ),
    skills: ["ROS2", "C++", "Python", "Computer Vision", "Embedded Systems"],
  },
  {
    title: "AI/ML Engineer",
    dept: "AI / ML",
    type: "Full-time",
    location: "Remote",
    desc: "Develop and optimize the intelligence layer powering ARK's products — from onboard drone AI to large-scale inference infrastructure and our proprietary language models for the Ask Ark platform.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M16 14a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8"/><line x1="12" y1="8" x2="12" y2="14"/>
      </svg>
    ),
    skills: ["PyTorch", "Transformers", "CUDA", "MLOps", "Reinforcement Learning"],
  },
  {
    title: "Full Stack Developer",
    dept: "Engineering",
    type: "Full-time",
    location: "Remote",
    desc: "Build the software platforms, dashboards, and APIs that bring ARK's hardware and AI products to life. You'll own end-to-end features across web, mobile, and embedded systems — shipping fast and building for scale.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    skills: ["TypeScript", "React / Next.js", "Node.js", "PostgreSQL", "AWS"],
  },
];

export default function CareersPage() {
  const [form, setForm] = useState({ name: "", email: "", role: ROLES[0], linkedin: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    // Pre-fill role from hash
    const hash = window.location.hash;
    if (hash === "#apply") {
      setTimeout(() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" }), 300);
    }
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", role: ROLES[0], linkedin: "", message: "" });
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
          <a href="/careers" className="active">Careers</a>
          <a href="/#contact" className="nav-cta">Get in Touch</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="careers-hero">
        <div className="careers-hero-grid" />
        <div className="careers-hero-glow" />
        <div className="careers-hero-content fade-up">
          <div className="hero-badge">We&apos;re Hiring</div>
          <h1>Join Ark<br /><span className="gradient-text">Industries.</span></h1>
          <p>
            We&apos;re building the most ambitious technology company of the next decade — across AI, robotics, quantum computing, health, and housing. We want people who don&apos;t just want a job, but want to shape what comes next.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#openings" className="btn-primary">
              View Openings
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#apply" className="btn-secondary">Apply Now</a>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "6rem 2rem", background: "var(--navy-light)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-label">Why ARK</div>
            <div className="section-title">Work That Matters.</div>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              We don&apos;t do incremental. Every person at ARK works on problems that will define how humans live, work, and thrive for the next century.
            </p>
          </div>
          <div className="careers-values-grid fade-up">
            {[
              { icon: "🚀", title: "Consequential Work", desc: "You won't be optimizing button colors. You'll be building robots, training AI models, and engineering systems that operate in the real world." },
              { icon: "🧠", title: "Autonomy & Ownership", desc: "We hire people we trust, then trust them completely. You own your work from idea to deployment — with full support from the team." },
              { icon: "⚡", title: "Move Fast", desc: "We ship. We iterate. We don't spend six months in planning cycles. If you have an idea, you can build it and put it in front of users in days." },
              { icon: "🌍", title: "Real Impact", desc: "From drones in disaster zones to AI-designed homes, ARK's work touches the physical world. You'll see your work in action, not just in dashboards." },
            ].map((v) => (
              <div key={v.title} className="careers-value-card">
                <div className="careers-value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section id="openings" style={{ padding: "7rem 2rem" }}>
        <div className="container">
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div className="section-label">Open Positions</div>
            <div className="section-title">Current Openings.</div>
          </div>
          <div className="careers-roles-list fade-up">
            {openings.map((role) => (
              <div key={role.title} className="careers-role-card">
                <div className="careers-role-left">
                  <div className="careers-role-icon">{role.icon}</div>
                  <div>
                    <div className="careers-role-meta">
                      <span className="career-dept">{role.dept}</span>
                      <span className="career-type">{role.type}</span>
                      <span className="career-type" style={{ color: "var(--gray-500)" }}>· {role.location}</span>
                    </div>
                    <h3 className="careers-role-title">{role.title}</h3>
                    <p className="careers-role-desc">{role.desc}</p>
                    <div className="careers-skill-tags">
                      {role.skills.map((s) => (
                        <span key={s} className="skill-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <a href="#apply" onClick={() => setForm(f => ({ ...f, role: role.title }))} className="btn-primary careers-role-apply">
                  Apply Now →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" style={{ padding: "7rem 2rem", background: "var(--navy-light)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div className="careers-apply-grid">
            <div className="careers-apply-info fade-up">
              <div className="section-label">Apply</div>
              <h2 className="section-title">Ready to Build?</h2>
              <p style={{ color: "var(--gray-400)", lineHeight: 1.75, marginBottom: "2rem" }}>
                Tell us about yourself. We review every application personally — no automated screening, no keyword filters. If you&apos;re exceptional, we want to talk.
              </p>
              <div className="careers-perks">
                {["Competitive salary + equity", "Fully remote options available", "Work on real-world AI & robotics", "Health & wellness benefits", "Annual offsite retreats"].map((p) => (
                  <div key={p} className="careers-perk">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="careers-form-wrap fade-up">
              {status === "success" ? (
                <div className="careers-success">
                  <div className="contact-success-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3>Application Received!</h3>
                  <p>Thanks for applying to ARK Industries. We review every application personally and will be in touch if there&apos;s a match.</p>
                </div>
              ) : (
                <form className="careers-form" onSubmit={handleSubmit}>
                  <h3 className="careers-form-title">Submit Your Application</h3>
                  {status === "error" && <div className="contact-error">{errorMsg}</div>}

                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label htmlFor="c-name">Full Name *</label>
                      <input id="c-name" type="text" placeholder="Jane Smith" required
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="c-email">Email *</label>
                      <input id="c-email" type="email" placeholder="jane@example.com" required
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="c-role">Role Applying For *</label>
                    <select id="c-role" required value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="careers-select">
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="c-linkedin">LinkedIn or Portfolio URL</label>
                    <input id="c-linkedin" type="url" placeholder="https://linkedin.com/in/yourname"
                      value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="c-message">Cover Letter / Message *</label>
                    <textarea id="c-message" placeholder="Tell us why you want to build at ARK, what you've shipped, and what gets you excited about the future…" required
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>

                  <button type="submit" className="btn-primary contact-submit" disabled={status === "loading"}>
                    {status === "loading" ? "Submitting…" : (
                      <>Submit Application <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></>
                    )}
                  </button>
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
            <a href="/careers">Careers</a><a href="/#contact">Contact</a>
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
        .careers-values-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;
        }
        .careers-value-card {
          background: var(--navy); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px; padding: 2rem 1.75rem;
          transition: all 0.3s;
        }
        .careers-value-card:hover { transform: translateY(-4px); border-color: rgba(59,130,246,0.2); box-shadow: 0 20px 50px rgba(0,0,0,0.25); }
        .careers-value-icon { font-size: 2rem; margin-bottom: 1rem; }
        .careers-value-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.6rem; }
        .careers-value-card p { font-size: 0.875rem; color: var(--gray-400); line-height: 1.65; }
        .careers-roles-list { display: flex; flex-direction: column; gap: 1.25rem; }
        .careers-role-card {
          background: var(--navy-light); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px; padding: 2rem 2.25rem;
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 2rem; transition: all 0.3s;
        }
        .careers-role-card:hover { border-color: rgba(59,130,246,0.2); box-shadow: 0 12px 40px rgba(0,0,0,0.2); }
        .careers-role-left { display: flex; gap: 1.5rem; align-items: flex-start; flex: 1; }
        .careers-role-icon {
          width: 48px; height: 48px; border-radius: 13px; flex-shrink: 0;
          background: rgba(59,130,246,0.1); color: var(--accent-light);
          display: flex; align-items: center; justify-content: center;
        }
        .careers-role-meta { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
        .careers-role-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; letter-spacing: -0.01em; }
        .careers-role-desc { font-size: 0.9rem; color: var(--gray-400); line-height: 1.65; margin-bottom: 1rem; max-width: 580px; }
        .careers-skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .skill-tag {
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.04em;
          padding: 0.3rem 0.75rem; border-radius: 100px;
          background: rgba(59,130,246,0.1); color: var(--accent-light);
          border: 1px solid rgba(59,130,246,0.18);
        }
        .careers-role-apply { flex-shrink: 0; white-space: nowrap; font-size: 0.9rem; padding: 0.75rem 1.75rem; }
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
        @media (max-width: 1100px) { .careers-values-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 900px) {
          .careers-apply-grid { grid-template-columns: 1fr; gap: 3rem; }
          .careers-role-card { flex-direction: column; }
          .careers-role-apply { width: 100%; justify-content: center; }
        }
        @media (max-width: 640px) {
          .careers-values-grid { grid-template-columns: 1fr; }
          .careers-hero { padding: 8rem 1.5rem 4rem; }
          .careers-form-wrap { padding: 1.75rem; }
        }
      `}</style>
    </main>
  );
}
