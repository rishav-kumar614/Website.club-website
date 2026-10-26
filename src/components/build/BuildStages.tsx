"use client";

import dynamic from "next/dynamic";
import { useState, type CSSProperties } from "react";
import { use3DCapability, useInView } from "@/lib/hooks";

const BuildScene = dynamic(() => import("./BuildScene"), { ssr: false });

const STAGES = [
  { n: "Sketch", day: "Week 1", tris: "wireframe", t: "Shape first", d: "We block out the form as a wireframe and agree on proportions, motion and camera before any detail is spent." },
  { n: "Clay", day: "Week 1–2", tris: "24k tris", t: "Light and form", d: "Neutral clay shading shows how light wraps the object, so composition is right before color arrives." },
  { n: "Material", day: "Week 2–3", tris: "PBR · 4K maps", t: "Real materials", d: "Physically based metal, coating and color are tuned against your brand palette and product photography." },
  { n: "Final", day: "Week 3–4", tris: "Glass · shaders", t: "Hero quality", d: "Custom shaders, glass and lighting choreography are locked in, then profiled to hold 60 FPS on phones." },
];

export function BuildStages() {
  const cap = use3DCapability();
  const [ref, visible] = useInView<HTMLDivElement>({ once: false, margin: "120px" });
  const [stage, setStage] = useState(0);
  const cur = STAGES[stage];

  return (
    <div className="bd-stages">
      <div ref={ref} className="bd-stage-view">
        {cap.enabled ? (
          <BuildScene stage={stage} lite={cap.lite} active={visible} />
        ) : (
          <p className="bd-stage-fallback">3D preview is turned off on this device.</p>
        )}
        <span className="bd-stage-badge">{cur.tris}</span>
        <span className="bd-stage-tip">Drag to rotate</span>
      </div>

      <div className="bd-stage-panel">
        <div className="bd-stage-tabs" role="tablist" aria-label="Build stage">
          {STAGES.map((s, i) => (
            <button
              key={s.n}
              type="button"
              role="tab"
              aria-selected={stage === i}
              className={stage === i ? "is-on" : ""}
              onClick={() => setStage(i)}
            >
              <b>{String(i + 1).padStart(2, "0")}</b>
              {s.n}
            </button>
          ))}
        </div>

        <label className="bd-scrub">
          <span>Scrub the build</span>
          <input
            type="range"
            min={0}
            max={STAGES.length - 1}
            step={1}
            value={stage}
            onChange={(e) => setStage(Number(e.target.value))}
            aria-label="Scrub through the build stages"
            style={{ "--fill": `${(stage / (STAGES.length - 1)) * 100}%` } as CSSProperties}
          />
        </label>

        <div className="bd-stage-copy" key={stage}>
          <span className="bd-stage-day">{cur.day}</span>
          <h3>{cur.t}</h3>
          <p>{cur.d}</p>
        </div>
      </div>
    </div>
  );
}
