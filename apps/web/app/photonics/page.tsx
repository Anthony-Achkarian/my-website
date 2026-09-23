import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import RevealOnScroll from "../components/RevealOnScroll";
import { PhotonicSchematic, WaveguideField } from "./diagrams";

const DESCRIPTION =
  "ARK Photonics is our long-term research into chips that compute with light instead of electricity, for faster, far more energy-efficient AI.";

export const metadata: Metadata = {
  title: "Photonic Chips",
  description: DESCRIPTION,
  alternates: { canonical: "/photonics" },
  openGraph: {
    type: "website",
    siteName: "Ark Industries",
    title: "Photonic Chips — Ark Industries",
    description: DESCRIPTION,
    url: "/photonics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photonic Chips — Ark Industries",
    description: DESCRIPTION,
  },
};

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const WHY_LIGHT = [
  {
    title: "Many channels, one path",
    body: "Different colors of light share a single waveguide without interfering. Each wavelength is its own channel, so one path can carry dozens of data streams at once.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M2 7.5c1.7-2.7 3.3-2.7 5 0s3.3 2.7 5 0 3.3-2.7 5 0 3.3 2.7 5 0" />
        <path d="M2 12c1.7-2.7 3.3-2.7 5 0s3.3 2.7 5 0 3.3-2.7 5 0 3.3 2.7 5 0" opacity="0.7" />
        <path d="M2 16.5c1.7-2.7 3.3-2.7 5 0s3.3 2.7 5 0 3.3-2.7 5 0 3.3 2.7 5 0" opacity="0.45" />
      </svg>
    ),
  },
  {
    title: "Less energy per bit",
    body: "A copper wire spends energy charging and discharging on every bit, and longer wires cost more. Light in a waveguide doesn't, which is why AI data centers are moving their links from copper to optics.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />
      </svg>
    ),
  },
  {
    title: "Math in flight",
    body: "A mesh of interferometers multiplies a vector by a matrix as light passes through it. The multiply finishes in the time light takes to cross the chip, a fraction of a nanosecond.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" opacity="0.55" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    key: "encode",
    title: "Encode",
    body: "A laser is split into channels. Modulators write each input number onto the light in its channel.",
  },
  {
    key: "compute",
    title: "Compute",
    body: "A mesh of Mach–Zehnder interferometers mixes the channels. Tiny heaters set each one's phase, and those phases are the network's weights. The light that comes out is the matrix product.",
  },
  {
    key: "read",
    title: "Read out",
    body: "Photodetectors turn the light back into electrical signals. Electronics apply the nonlinear steps and memory, then feed the next layer.",
  },
];

const PROBLEMS = [
  {
    title: "Heat crosstalk",
    body: "Most phase shifters are tiny heaters. Heat from one leaks into its neighbors and nudges their settings, so dense meshes drift.",
  },
  {
    title: "Fabrication variation",
    body: "Nanometer-scale differences in waveguide width shift every interferometer slightly, so each chip has to be measured and calibrated.",
  },
  {
    title: "Loss and noise",
    body: "Every component loses a little light. Losses compound through a deep mesh and limit how precise the analog answer can be.",
  },
  {
    title: "The electronic boundary",
    body: "Light is great at linear math, but activation functions and memory still live in electronics, and converting between the two costs energy and time.",
  },
];

const PHASES = [
  {
    title: "Physics and simulation",
    body: "Model waveguides, interferometers, and full meshes from first principles, then simulate photonic neural-network layers against electronic baselines.",
  },
  {
    title: "First silicon",
    body: "Design test chips, fabricate them on shared multi-project wafer runs at silicon-photonics foundries, and measure loss, crosstalk, and calibration.",
  },
  {
    title: "Photonic accelerator",
    body: "Pair a photonic matrix engine with electronic control to run real AI inference, and measure speed and energy per operation against today's chips.",
  },
];

export default function PhotonicsPage() {
  return (
    <>
      <SiteNav />
      <RevealOnScroll />

      <main>
        {/* ── Hero ── */}
        <section className="hero pc-hero">
          <div className="hero-orb orb-1" aria-hidden="true" />
          <div className="hero-orb orb-2" aria-hidden="true" />
          <WaveguideField />
          <div className="pc-hero-veil" aria-hidden="true" />
          <div className="hero-content fade-up">
            <span className="hero-pill">
              <span className="pc-dot" aria-hidden="true" />
              Long-term research · ARK Photonics
            </span>
            <h1>
              Computing with
              <br />
              <span className="gradient-text">light.</span>
            </h1>
            <p>
              Today&apos;s chips push electrons through copper. We&apos;re researching chips that
              compute with photons instead, guiding light through silicon to make AI faster and far
              more energy-efficient.
            </p>
            <div className="hero-buttons">
              <a href="#how" className="btn-primary">
                How it works
                <ArrowDown />
              </a>
              <Link href="/#contact" className="btn-secondary">
                Collaborate with us
              </Link>
            </div>
          </div>
        </section>

        {/* ── Why light ── */}
        <section aria-labelledby="why-title">
          <div className="container">
            <header className="pc-head fade-up">
              <div className="section-label">Why light</div>
              <h2 id="why-title" className="section-title">The bottleneck is moving data.</h2>
              <p className="section-sub">
                As AI models grow, moving data across a chip and between chips often costs more
                energy than the math itself. Light carries information differently.
              </p>
            </header>
            <div className="pc-grid-3 fade-up">
              {WHY_LIGHT.map((item) => (
                <article key={item.title} className="pc-card">
                  <div className="pc-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how" className="pc-alt" aria-labelledby="how-title">
          <div className="container">
            <header className="pc-head fade-up">
              <div className="section-label">How it works</div>
              <h2 id="how-title" className="section-title">A neural-network layer, built from light.</h2>
              <p className="section-sub">
                Most of the work in AI is matrix multiplication. A photonic chip does it with
                interference instead of transistors.
              </p>
            </header>
            <figure className="pc-figure fade-up">
              <PhotonicSchematic />
            </figure>
            <ol className="pc-steps fade-up">
              {STEPS.map((step, i) => (
                <li key={step.key} className={`pc-step pc-step--${step.key}`}>
                  <span className="pc-num">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Data centers + quantum ── */}
        <section aria-labelledby="frontiers-title">
          <div className="container">
            <header className="pc-head fade-up">
              <div className="section-label">One platform, two frontiers</div>
              <h2 id="frontiers-title" className="section-title">Where data centers and quantum meet.</h2>
              <p className="section-sub">
                Photonic Chips brings our data center and quantum computing work under one roof,
                because light is where both are heading.
              </p>
            </header>
            <div className="pc-grid-2 fade-up">
              <article className="pc-card pc-frontier">
                <span className="pc-chip">Data centers</span>
                <h3>Light already moves the data.</h3>
                <p>
                  AI clusters are limited as much by moving data as by computing it, so the industry
                  is moving optics right up against the chips. Nvidia says its co-packaged optics
                  make network switches about 3.5× more power-efficient. Photonic computing asks the
                  next question: what if the math stayed in light too?
                </p>
              </article>
              <article className="pc-card pc-frontier">
                <span className="pc-chip pc-chip--violet">Quantum</span>
                <h3>Photons make natural qubits.</h3>
                <p>
                  Photons barely interact with their surroundings, which makes them one of the most
                  robust carriers of quantum information. The same parts (waveguides, beam
                  splitters, phase shifters, and detectors) are the building blocks of photonic
                  quantum computers, one of the leading approaches in the field.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ── Open problems ── */}
        <section className="pc-alt" aria-labelledby="problems-title">
          <div className="container">
            <header className="pc-head fade-up">
              <div className="section-label">Open problems</div>
              <h2 id="problems-title" className="section-title">Why it isn&apos;t solved yet.</h2>
              <p className="section-sub">
                Photonic computing has been demonstrated in labs. Beating electronics at scale means
                solving these.
              </p>
            </header>
            <div className="pc-problems fade-up">
              {PROBLEMS.map((item, i) => (
                <article key={item.title} className="pc-problem">
                  <span className="pc-num">0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Roadmap ── */}
        <section aria-labelledby="path-title">
          <div className="container">
            <header className="pc-head fade-up">
              <div className="section-label">Roadmap</div>
              <h2 id="path-title" className="section-title">The research path.</h2>
              <p className="section-sub">
                A long-term program, built in stages that each produce something we can measure.
              </p>
            </header>
            <ol className="pc-roadmap fade-up">
              {PHASES.map((phase, i) => (
                <li key={phase.title} className="pc-phase">
                  <span className="pc-phase-tag">Phase 0{i + 1}</span>
                  <h3>{phase.title}</h3>
                  <p>{phase.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Collaborate ── */}
        <section className="pc-cta" aria-labelledby="cta-title">
          <div className="pc-cta-inner fade-up">
            <div className="section-label">Collaborate</div>
            <h2 id="cta-title" className="section-title">Build it with us.</h2>
            <p>
              ARK Photonics is a long-term research program. If you work in integrated photonics,
              optical computing, or quantum optics, or want to, we&apos;d like to hear from you.
            </p>
            <div className="hero-buttons">
              <Link href="/#contact" className="btn-primary">
                Get in touch
                <ArrowRight />
              </Link>
              <Link href="/careers" className="btn-secondary">
                View careers
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <style>{CSS}</style>
    </>
  );
}

const CSS = `
  /* ── Hero ── */
  .pc-hero { min-height: min(88vh, 860px); }
  .pc-hero::after { display: none; }
  .pc-hero-veil {
    position: absolute; inset: 0; z-index: 1; pointer-events: none;
    background:
      radial-gradient(ellipse 48% 46% at 50% 50%, rgba(7, 15, 28, 0.92) 0%, rgba(7, 15, 28, 0.62) 55%, rgba(7, 15, 28, 0) 100%),
      linear-gradient(to bottom, rgba(7, 15, 28, 0.6) 0%, rgba(7, 15, 28, 0) 24%, rgba(7, 15, 28, 0) 70%, var(--surface-0) 100%);
  }
  .pc-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--accent-cyan);
    box-shadow: 0 0 10px 2px rgba(34, 211, 238, 0.6);
  }
  .pc-field { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
  .pc-guides path { fill: none; stroke: rgba(148, 163, 184, 0.16); stroke-width: 1.5; }
  .pc-pulse path {
    fill: none; stroke: var(--c); stroke-linecap: round;
    stroke-dasharray: 22 478;
    animation: pcFlow var(--dur) linear var(--delay) infinite;
  }
  .pc-pulse-glow { stroke-width: 8; opacity: 0.22; }
  .pc-pulse-core { stroke-width: 2.2; }
  @keyframes pcFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -1000; } }

  /* ── Sections ── */
  .pc-alt {
    background: var(--surface-1);
    border-top: 1px solid var(--border-subtle);
    border-bottom: 1px solid var(--border-subtle);
  }
  .pc-head { max-width: 660px; margin-bottom: clamp(2.5rem, 5vw, 3.5rem); }
  .pc-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
  .pc-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem; }

  .pc-card {
    background: var(--surface-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-lg);
    padding: 1.85rem 1.7rem;
    box-shadow: var(--shadow-card);
    transition: border-color 0.25s, transform 0.3s var(--ease), box-shadow 0.3s;
  }
  .pc-card:hover { border-color: var(--border-accent); transform: translateY(-3px); box-shadow: var(--shadow-card-hover); }
  .pc-card h3, .pc-step h3, .pc-problem h3, .pc-phase h3 {
    font-size: var(--fs-h3); font-weight: 650; letter-spacing: -0.01em; margin-bottom: 0.55rem;
  }
  .pc-card p, .pc-step p, .pc-problem p, .pc-phase p { font-size: var(--fs-sm); color: var(--gray-400); line-height: 1.65; }
  .pc-icon {
    width: 46px; height: 46px; border-radius: var(--r-md);
    display: grid; place-items: center; margin-bottom: 1.25rem;
    color: var(--accent-cyan);
    background: rgba(34, 211, 238, 0.08);
    border: 1px solid rgba(34, 211, 238, 0.18);
  }
  .pc-num {
    display: block; margin-bottom: 0.7rem;
    font-size: var(--fs-xs); font-weight: 700; letter-spacing: 0.12em;
    font-variant-numeric: tabular-nums; color: var(--accent-light);
  }

  /* ── How it works ── */
  .pc-figure {
    margin: 0 0 clamp(1.5rem, 3vw, 2rem);
    padding: clamp(1rem, 2.5vw, 1.75rem);
    background: var(--surface-0);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-xl);
  }
  .pc-schematic { display: block; width: 100%; height: auto; }
  .pc-schematic .pc-wg path { fill: none; stroke: rgba(148, 163, 184, 0.32); stroke-width: 2.5; }
  .pc-schematic .pc-region-text { font-size: 14px; font-weight: 600; letter-spacing: 0.14em; }
  .pc-schematic .pc-laser-text { fill: #0a1628; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; }
  .pc-schematic .pc-var-text { fill: #e2e8f0; font-size: 14px; font-weight: 600; }
  .pc-schematic .pc-var-text tspan { font-size: 10px; }
  .pc-schematic .pc-sp {
    fill: none; stroke: #22d3ee; stroke-linecap: round;
    stroke-dasharray: 16 484;
    animation: pcFlow 5s linear infinite;
  }
  .pc-schematic .pc-sp-glow { stroke-width: 10; opacity: 0.25; }
  .pc-schematic .pc-sp-core { stroke-width: 3; }
  .pc-det { animation: pcDetect 1.6s ease-in-out infinite; }
  @keyframes pcDetect { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }

  .pc-steps { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
  .pc-step {
    padding: 1.5rem 1.5rem 1.6rem;
    background: var(--surface-card);
    border: 1px solid var(--border-subtle);
    border-top: 2px solid var(--step);
    border-radius: var(--r-lg);
  }
  .pc-step .pc-num { color: var(--step); }
  .pc-step--encode { --step: var(--accent-cyan); }
  .pc-step--compute { --step: var(--accent-violet); }
  .pc-step--read { --step: var(--accent-light); }

  /* ── Data centers + quantum ── */
  .pc-frontier { padding: 2.1rem 2rem; }
  .pc-frontier h3 { font-size: 1.35rem; }
  .pc-frontier p { font-size: var(--fs-body); line-height: 1.7; }
  .pc-chip {
    display: inline-block; margin-bottom: 1.1rem;
    padding: 0.3rem 0.7rem; border-radius: var(--r-pill);
    font-size: var(--fs-xs); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--accent-cyan);
    background: rgba(34, 211, 238, 0.08);
    border: 1px solid rgba(34, 211, 238, 0.22);
  }
  .pc-chip--violet { color: var(--accent-violet); background: rgba(167, 139, 250, 0.08); border-color: rgba(167, 139, 250, 0.24); }

  /* ── Open problems: one panel, four cells ── */
  .pc-problems {
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
    background: var(--surface-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--r-xl);
    overflow: hidden;
  }
  .pc-problem { padding: 1.9rem 1.8rem; border-bottom: 1px solid var(--border-subtle); }
  .pc-problem:nth-child(odd) { border-right: 1px solid var(--border-subtle); }
  .pc-problem:nth-last-child(-n + 2) { border-bottom: none; }

  /* ── Roadmap ── */
  .pc-roadmap { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; }
  .pc-phase { position: relative; padding-top: 2.4rem; }
  .pc-phase::before {
    content: ''; position: absolute; top: 0; left: 0;
    width: 14px; height: 14px; border-radius: 50%;
    background: var(--surface-0);
    border: 2px solid var(--accent-cyan);
    box-shadow: 0 0 12px rgba(34, 211, 238, 0.5);
  }
  .pc-phase::after {
    content: ''; position: absolute; top: 6px; left: 24px; right: -1.5rem; height: 2px;
    background: linear-gradient(90deg, rgba(34, 211, 238, 0.55), rgba(167, 139, 250, 0.2));
  }
  .pc-phase:last-child::after { display: none; }
  .pc-phase-tag {
    display: block; margin-bottom: 0.6rem;
    font-size: var(--fs-xs); font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--accent-cyan);
  }
  .pc-phase p { max-width: 36ch; }

  /* ── Collaborate ── */
  .pc-cta { position: relative; overflow: hidden; text-align: center; }
  .pc-cta::before {
    content: ''; position: absolute; left: 50%; top: 50%;
    width: min(760px, 120%); height: 440px; transform: translate(-50%, -50%);
    background: radial-gradient(ellipse, rgba(34, 211, 238, 0.12), transparent 65%);
    pointer-events: none;
  }
  .pc-cta-inner { position: relative; max-width: 620px; margin: 0 auto; }
  .pc-cta p { color: var(--gray-400); font-size: var(--fs-lead); line-height: 1.6; margin: 0 auto 2.25rem; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .pc-grid-3, .pc-steps { grid-template-columns: 1fr; }
    .pc-roadmap { grid-template-columns: 1fr; gap: 2rem; }
    .pc-phase { padding: 0 0 0 2.4rem; }
    .pc-phase::before { top: 3px; }
    .pc-phase::after {
      top: 24px; left: 6px; right: auto; bottom: -2rem; width: 2px; height: auto;
      background: linear-gradient(180deg, rgba(34, 211, 238, 0.55), rgba(167, 139, 250, 0.2));
    }
    .pc-phase p { max-width: none; }
  }
  @media (max-width: 760px) {
    .pc-schematic .pc-lbl { display: none; }
  }
  @media (max-width: 720px) {
    .pc-grid-2, .pc-problems { grid-template-columns: 1fr; }
    .pc-problem:nth-child(odd) { border-right: none; }
    .pc-problem:nth-last-child(2) { border-bottom: 1px solid var(--border-subtle); }
    .pc-frontier { padding: 1.85rem 1.6rem; }
  }
`;
