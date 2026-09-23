import type { CSSProperties } from "react";

/*
 * Illustrations for the Photonic Chips page, rendered as SVG on the server.
 *
 * Schematic, but physically honest: waveguides meet in directional couplers,
 * each Mach–Zehnder interferometer is coupler → two arms (one with a heater
 * that sets its phase) → coupler, and the interferometers sit in the
 * rectangular mesh used for optical matrix multiplication. The glowing
 * pulses are light travelling left to right. Motion is CSS-only and stops
 * under prefers-reduced-motion (see globals.css).
 */

type Pair = readonly [number, number];
type Column = { x: number; pairs: readonly Pair[] };

/** The height lane `i` bends to inside a coupler, `gap` from its partner. */
function couplerY(lanes: readonly number[], pair: Pair, i: number, gap: number): number {
  const mid = (lanes[pair[0]] + lanes[pair[1]]) / 2;
  return i === pair[0] ? mid - gap / 2 : mid + gap / 2;
}

/** Path segment: straight to x, S-bend to yc, run beside the partner, S-bend back to y. */
function coupler(x: number, y: number, yc: number, bend: number, run: number): string {
  const h = bend / 2;
  const x1 = x + bend;
  const x2 = x1 + run;
  const x3 = x2 + bend;
  return `L${x} ${y} C${x + h} ${y} ${x + h} ${yc} ${x1} ${yc} L${x2} ${yc} C${x2 + h} ${yc} ${x2 + h} ${y} ${x3} ${y}`;
}

/* ── Hero: a field of coupled waveguides carrying three colours ─────────── */

const FIELD_LANES = [110, 210, 310, 410, 510, 610] as const;
const FIELD_COLUMNS: readonly Column[] = [
  { x: 90, pairs: [[0, 1], [2, 3], [4, 5]] },
  { x: 330, pairs: [[1, 2], [3, 4]] },
  { x: 570, pairs: [[0, 1], [2, 3], [4, 5]] },
  { x: 810, pairs: [[1, 2], [3, 4]] },
  { x: 1050, pairs: [[0, 1], [2, 3], [4, 5]] },
  { x: 1290, pairs: [[1, 2], [3, 4]] },
];
/** Several wavelengths can share one chip without interfering. */
const WAVELENGTHS = ["#22d3ee", "#60a5fa", "#a78bfa"] as const;

function fieldPath(i: number): string {
  const y = FIELD_LANES[i];
  let d = `M-40 ${y}`;
  for (const col of FIELD_COLUMNS) {
    const pair = col.pairs.find((p) => p.includes(i));
    if (pair) d += ` ${coupler(col.x, y, couplerY(FIELD_LANES, pair, i, 14), 70, 80)}`;
  }
  return `${d} L1560 ${y}`;
}

export function WaveguideField() {
  const paths = FIELD_LANES.map((_, i) => fieldPath(i));
  return (
    <svg
      className="pc-field"
      viewBox="0 0 1440 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className="pc-guides">
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      {paths.map((d, i) => {
        const style = {
          "--c": WAVELENGTHS[i % WAVELENGTHS.length],
          "--dur": `${7 + ((i * 5) % 4)}s`,
          "--delay": `${-i * 1.7}s`,
        } as CSSProperties;
        return (
          <g key={i} className="pc-pulse" style={style}>
            <path d={d} pathLength={1000} className="pc-pulse-glow" />
            <path d={d} pathLength={1000} className="pc-pulse-core" />
          </g>
        );
      })}
    </svg>
  );
}

/* ── How it works: laser → modulators → interferometer mesh → detectors ── */

const CH = [80, 140, 200, 260] as const;
const MZI_BEND = 30;
const MZI_RUN = 20;
const MZI_ARM = 36;
/** Where an interferometer's arms start, measured from its left edge. */
const ARM_X = 2 * MZI_BEND + MZI_RUN;
/** A rectangular mesh: interferometers on alternating neighbouring pairs. */
const MESH: readonly Column[] = [
  { x: 380, pairs: [[0, 1], [2, 3]] },
  { x: 588, pairs: [[1, 2]] },
  { x: 796, pairs: [[0, 1], [2, 3]] },
];
const DETECTOR_X = 1004;
/** Example inputs x₁…x₄, drawn as how strongly each modulator lets light through. */
const INPUTS = [0.85, 0.35, 0.6, 0.2] as const;

const REGIONS = [
  { label: "SOURCE", from: 12, to: 92, color: "#94a3b8" },
  { label: "ENCODE", from: 256, to: 324, color: "#22d3ee" },
  { label: "COMPUTE", from: 380, to: 992, color: "#a78bfa" },
  { label: "READ OUT", from: 1004, to: 1088, color: "#60a5fa" },
] as const;

function channelPath(i: number): string {
  const y = CH[i];
  const split = i < 2 ? 110 : 230; // after the first 50/50 splitter
  let d = `M92 170 L104 170 C129 170 129 ${split} 154 ${split} L176 ${split} C201 ${split} 201 ${y} 226 ${y}`;
  for (const col of MESH) {
    const pair = col.pairs.find((p) => p.includes(i));
    if (!pair) continue;
    const yc = couplerY(CH, pair, i, 10);
    d += ` ${coupler(col.x, y, yc, MZI_BEND, MZI_RUN)}`;
    d += ` ${coupler(col.x + ARM_X + MZI_ARM, y, yc, MZI_BEND, MZI_RUN)}`;
  }
  return `${d} L${DETECTOR_X} ${y}`;
}

export function PhotonicSchematic() {
  const paths = CH.map((_, i) => channelPath(i));
  return (
    <svg
      className="pc-schematic"
      viewBox="0 0 1100 300"
      role="img"
      aria-labelledby="pc-schematic-title pc-schematic-desc"
    >
      <title id="pc-schematic-title">How a photonic chip multiplies a vector by a matrix</title>
      <desc id="pc-schematic-desc">
        A laser is split into four channels. Modulators encode the inputs x1 to x4. A mesh of
        Mach–Zehnder interferometers, each tuned by a heater, mixes the channels. Photodetectors
        read out the results y1 to y4.
      </desc>
      <defs>
        <linearGradient id="pc-laser" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
        <filter id="pc-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {REGIONS.map((r) => (
        <g key={r.label} className="pc-lbl">
          <text className="pc-region-text" x={(r.from + r.to) / 2} y="20" textAnchor="middle" fill={r.color}>
            {r.label}
          </text>
          <line x1={r.from} x2={r.to} y1="34" y2="34" stroke={r.color} strokeOpacity="0.45" strokeWidth="1.5" />
        </g>
      ))}

      <g className="pc-wg">
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      {/* Laser */}
      <rect x="12" y="146" width="80" height="48" rx="10" fill="#22d3ee" opacity="0.4" filter="url(#pc-soft)" />
      <rect x="12" y="146" width="80" height="48" rx="10" fill="url(#pc-laser)" />
      <text className="pc-lbl pc-laser-text" x="52" y="174.5" textAnchor="middle">
        LASER
      </text>

      {/* Modulators write each input onto its channel */}
      {CH.map((y, i) => (
        <g key={y}>
          <rect
            x="262"
            y={y - 11}
            width="56"
            height="22"
            rx="5"
            fill="#22d3ee"
            fillOpacity={INPUTS[i] * 0.6}
            stroke="#22d3ee"
            strokeOpacity="0.75"
          />
          <text className="pc-lbl pc-var-text" x="290" y={y + 4.5} textAnchor="middle">
            x<tspan dy="3">{i + 1}</tspan>
          </text>
        </g>
      ))}

      {/* Heaters set each interferometer's phase: these are the weights */}
      {MESH.flatMap((col) =>
        col.pairs.map((pair) => (
          <rect
            key={`${col.x}-${pair[0]}`}
            x={col.x + ARM_X + 6}
            y={CH[pair[0]] - 5}
            width={MZI_ARM - 12}
            height="10"
            rx="2"
            fill="#f59e0b"
            fillOpacity="0.9"
          />
        ))
      )}

      {/* Light in flight */}
      {paths.map((d, i) => {
        const style = { animationDelay: `${-i * 1.25}s` };
        return (
          <g key={i}>
            <path d={d} pathLength={1000} className="pc-sp pc-sp-glow" style={style} />
            <path d={d} pathLength={1000} className="pc-sp pc-sp-core" style={style} />
          </g>
        );
      })}

      {/* Photodetectors turn light back into electrical signals */}
      {CH.map((y, i) => (
        <g key={y}>
          <rect x={DETECTOR_X} y={y - 13} width="24" height="26" rx="5" fill="#0b2239" stroke="#60a5fa" strokeOpacity="0.85" />
          <rect
            x={DETECTOR_X + 4}
            y={y - 9}
            width="5"
            height="18"
            rx="2"
            fill="#60a5fa"
            className="pc-det"
            style={{ animationDelay: `${-i * 0.55}s` }}
          />
          <line
            x1={DETECTOR_X + 24}
            x2="1062"
            y1={y}
            y2={y}
            stroke="#94a3b8"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />
          <text className="pc-lbl pc-var-text" x="1078" y={y + 4.5} textAnchor="middle">
            y<tspan dy="3">{i + 1}</tspan>
          </text>
        </g>
      ))}
    </svg>
  );
}
