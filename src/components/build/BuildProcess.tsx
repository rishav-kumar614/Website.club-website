"use client";

import { useState, type CSSProperties } from "react";

const PHASES = [
  {
    n: "Discover",
    from: 1,
    to: 1,
    lead: "Brand, product and audience workshop",
    items: ["Goals and success metrics", "Reference and motion direction", "Technical audit of your stack", "Fixed scope and timeline"],
  },
  {
    n: "Design",
    from: 1,
    to: 2,
    lead: "Concept, storyboards and 3D look-dev",
    items: ["Art direction and storyboards", "Camera and scroll choreography", "Hero asset concepts", "Clickable motion prototype"],
  },
  {
    n: "Build",
    from: 2,
    to: 3,
    lead: "Engineering, shaders and assets",
    items: ["Custom WebGL and GLSL", "Asset modeling and compression", "CMS and backend integration", "Private preview link every week"],
  },
  {
    n: "Launch",
    from: 4,
    to: 4,
    lead: "Profiling, QA and go-live",
    items: ["60 FPS profiling on real devices", "Fallbacks for low-power GPUs", "Accessibility and SEO checks", "Deploy, handover and source code"],
  },
];

export function BuildProcess() {
  const [open, setOpen] = useState(0);
  const p = PHASES[open];

  return (
    <div className="bd-proc">
      <div className="bd-weeks" role="tablist" aria-label="Build phases">
        <div className="bd-weeks-head" aria-hidden="true">
          {[1, 2, 3, 4].map((w) => (
            <span key={w}>Week {w}</span>
          ))}
        </div>
        {PHASES.map((ph, i) => (
          <button
            key={ph.n}
            type="button"
            role="tab"
            aria-selected={open === i}
            className={`bd-week-row ${open === i ? "is-on" : ""}`}
            onClick={() => setOpen(i)}
            style={{ "--from": ph.from, "--to": ph.to } as CSSProperties}
          >
            <span className="name">
              <b>{String(i + 1).padStart(2, "0")}</b>
              {ph.n}
            </span>
            <span className="track" aria-hidden="true">
              <span className="bar" />
            </span>
          </button>
        ))}
      </div>

      <div className="bd-proc-detail" key={open}>
        <span className="bd-stage-day">
          {p.from === p.to ? `Week ${p.from}` : `Weeks ${p.from}–${p.to}`}
        </span>
        <h3>{p.n}</h3>
        <p>{p.lead}</p>
        <ul>
          {p.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
