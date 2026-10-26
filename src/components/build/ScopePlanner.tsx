"use client";

import Link from "next/link";
import { useState } from "react";

const TYPES = [
  { id: "landing", n: "Landing page", d: "One immersive page", w: 2, c: 1 },
  { id: "site", n: "Multi-page site", d: "Home plus 3–5 pages", w: 3, c: 2 },
  { id: "config", n: "Product configurator", d: "Live 3D customizer", w: 4, c: 3 },
  { id: "world", n: "Full immersive world", d: "Story-driven experience", w: 5, c: 4 },
];

const ADDONS = [
  { id: "glsl", n: "Custom GLSL shaders", w: 0.5, c: 1 },
  { id: "model", n: "Product 3D modeling", w: 1, c: 1 },
  { id: "scroll", n: "Scroll choreography", w: 0.5, c: 0 },
  { id: "audio", n: "Audio-reactive visuals", w: 0.5, c: 1 },
  { id: "cms", n: "CMS integration", w: 0.5, c: 0 },
];

/** Rough scope guide: pick a type and add-ons, see the time and complexity. */
export function ScopePlanner() {
  const [type, setType] = useState("site");
  const [adds, setAdds] = useState<string[]>(["scroll"]);

  const t = TYPES.find((x) => x.id === type)!;
  const picked = ADDONS.filter((a) => adds.includes(a.id));
  const min = t.w + picked.reduce((s, a) => s + a.w, 0);
  const complexity = Math.min(6, t.c + picked.reduce((s, a) => s + a.c, 0));
  const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
  const level = complexity <= 2 ? "Light" : complexity <= 4 ? "Standard" : "Advanced";

  const toggle = (id: string) => setAdds((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  return (
    <div className="bd-plan">
      <div className="bd-plan-form">
        <fieldset>
          <legend>What are we building?</legend>
          <div className="bd-plan-types">
            {TYPES.map((o) => (
              <button
                key={o.id}
                type="button"
                aria-pressed={type === o.id}
                className={type === o.id ? "is-on" : ""}
                onClick={() => setType(o.id)}
              >
                <b>{o.n}</b>
                <span>{o.d}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Add-ons</legend>
          <div className="bd-plan-adds">
            {ADDONS.map((a) => (
              <button
                key={a.id}
                type="button"
                aria-pressed={adds.includes(a.id)}
                className={adds.includes(a.id) ? "is-on" : ""}
                onClick={() => toggle(a.id)}
              >
                <span className="box" aria-hidden="true">
                  ✓
                </span>
                {a.n}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="bd-plan-out" aria-live="polite">
        <span className="bd-plan-k">Rough timeline</span>
        <div className="bd-plan-big">
          {fmt(min)}–{fmt(min + 1)}
          <small>weeks</small>
        </div>

        <div className="bd-plan-meter">
          <span>Complexity</span>
          <span className="pips" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => (
              <i key={i} className={i < complexity ? "on" : ""} style={{ transitionDelay: `${i * 40}ms` }} />
            ))}
          </span>
          <b>{level}</b>
        </div>

        <ul className="bd-plan-list">
          <li>
            <span>{t.n}</span>
            <em>{t.w} wks</em>
          </li>
          {picked.map((a) => (
            <li key={a.id}>
              <span>{a.n}</span>
              <em>+{fmt(a.w)}</em>
            </li>
          ))}
        </ul>

        <Link href="/contact" className="btn btn-primary btn-block">
          Get a fixed quote →
        </Link>
        <p className="bd-plan-note">A guide only. You get exact scope, timeline and price in your quote.</p>
      </aside>
    </div>
  );
}
