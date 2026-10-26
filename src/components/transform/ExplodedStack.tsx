"use client";

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

const LAYERS = [
  { id: "base", name: "Your site", note: "Untouched. Your HTML, CMS and backend stay exactly as they are.", glyph: "▤" },
  { id: "hero", name: "3D hero scene", note: "A live WebGL scene reacts to the cursor and scroll.", glyph: "◆" },
  { id: "viewer", name: "360° product viewer", note: "Rotate, zoom and recolor your product in place.", glyph: "◎" },
  { id: "scroll", name: "Scroll choreography", note: "Sections move and connect as visitors scroll.", glyph: "↕" },
  { id: "shader", name: "Shader surfaces", note: "Light, glass and fluid effects replace flat gradients.", glyph: "≋" },
  { id: "micro", name: "Micro-interactions", note: "Physics-based hover, press and cursor feedback.", glyph: "✦" },
];

export function ExplodedStack() {
  const [explode, setExplode] = useState(0.7);
  const [active, setActive] = useState<string | null>(null);
  const [rot, setRot] = useState({ x: 58, z: -34 });
  const drag = useRef<{ x: number; y: number; rx: number; rz: number } | null>(null);

  const down = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, y: e.clientY, rx: rot.x, rz: rot.z };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    setRot({
      x: Math.max(20, Math.min(80, d.rx - (e.clientY - d.y) * 0.3)),
      z: d.rz + (e.clientX - d.x) * 0.4,
    });
  };
  const up = () => {
    drag.current = null;
  };

  const current = LAYERS.find((l) => l.id === active);

  return (
    <div className="tf-xs">
      <div
        className="tf-xs-canvas"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        style={{ "--rx": `${rot.x}deg`, "--rz": `${rot.z}deg`, "--ex": explode } as CSSProperties}
      >
        <div className="tf-xs-stage">
          {LAYERS.map((l, i) => (
            <div
              key={l.id}
              className={`tf-xs-pane ${active === l.id ? "is-on" : ""} ${active && active !== l.id ? "is-dim" : ""}`}
              style={{ "--i": i } as CSSProperties}
              onPointerEnter={() => setActive(l.id)}
              onPointerLeave={() => setActive(null)}
            >
              <span className="tf-xs-glyph">{l.glyph}</span>
              <span className="tf-xs-label">{l.name}</span>
              <span className="tf-xs-line" />
              <span className="tf-xs-line short" />
            </div>
          ))}
        </div>
        <span className="tf-xs-hint">Drag to rotate · hover a layer</span>
      </div>

      <div className="tf-xs-side">
        <label className="tf-range">
          <span>Explode</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={explode}
            onChange={(e) => setExplode(Number(e.target.value))}
            aria-label="Explode the layers apart"
          />
        </label>
        <ul className="tf-xs-list">
          {LAYERS.map((l, i) => (
            <li key={l.id}>
              <button
                type="button"
                className={active === l.id ? "is-on" : ""}
                onPointerEnter={() => setActive(l.id)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(l.id)}
                onBlur={() => setActive(null)}
              >
                <b>{String(i + 1).padStart(2, "0")}</b>
                {l.name}
              </button>
            </li>
          ))}
        </ul>
        <p className="tf-xs-note" aria-live="polite">
          {current
            ? current.note
            : "Each layer mounts on top of your site as its own component. Turn any of them off without touching the rest."}
        </p>
      </div>
    </div>
  );
}
