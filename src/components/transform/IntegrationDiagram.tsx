"use client";

import { useState } from "react";

const NODES = [
  { id: "visitor", x: 70, label: "Visitor", sub: "Any device", text: "Gets the fast HTML first. 3D loads in after, and low-power devices keep a static fallback." },
  { id: "layer", x: 270, label: "3D layer", sub: "Our component", text: "A lazy-loaded component or edge script that mounts on a single element of your page." },
  { id: "site", x: 470, label: "Your site", sub: "HTML · CMS", text: "Your pages, URLs, meta tags and schema. Nothing in here is rebuilt." },
  { id: "back", x: 670, label: "Backend", sub: "Checkout · data", text: "Orders, accounts and APIs talk to your site exactly as before." },
];

export function IntegrationDiagram() {
  const [on, setOn] = useState(true);
  const [sel, setSel] = useState("layer");
  const node = NODES.find((n) => n.id === sel)!;

  return (
    <div className="tf-diag">
      <div className="tf-diag-top">
        <button type="button" className="tf-switch" role="switch" aria-checked={on} onClick={() => setOn(!on)}>
          <span className="tf-switch-track">
            <span className="tf-switch-thumb" />
          </span>
          3D layer {on ? "on" : "off"}
        </button>
        <span className="tf-diag-status">{on ? "Visitors get the spatial experience" : "Your original site, unchanged"}</span>
      </div>

      <svg viewBox="0 0 740 280" role="img" aria-label="Diagram: visitor, 3D layer, your site, backend" className="tf-diag-svg">
        <defs>
          <marker id="tf-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0L10 5L0 10z" fill="currentColor" />
          </marker>
        </defs>
        <path d="M120 150H220" className={`tf-flow ${on ? "" : "is-off"}`} markerEnd="url(#tf-arrow)" />
        <path d="M320 150H420" className={`tf-flow ${on ? "" : "is-off"}`} markerEnd="url(#tf-arrow)" />
        <path d="M520 150H620" className="tf-flow" markerEnd="url(#tf-arrow)" />
        <path d="M70 116C70 40 470 40 470 116" className={`tf-flow bypass ${on ? "is-off" : ""}`} markerEnd="url(#tf-arrow)" />
        <text x="270" y="62" textAnchor="middle" className={`tf-diag-cap ${on ? "is-off" : ""}`}>
          direct to your site
        </text>

        {NODES.map((n) => (
          <g
            key={n.id}
            transform={`translate(${n.x - 50} 118)`}
            className={`tf-node ${sel === n.id ? "is-sel" : ""} ${n.id === "layer" && !on ? "is-dim" : ""} ${n.id === "layer" ? "is-3d" : ""}`}
            tabIndex={0}
            role="button"
            aria-label={`${n.label}: ${n.sub}`}
            onPointerEnter={() => setSel(n.id)}
            onFocus={() => setSel(n.id)}
            onClick={() => setSel(n.id)}
          >
            <rect width="100" height="64" rx="16" />
            <text x="50" y="28" textAnchor="middle" className="tf-node-t">
              {n.label}
            </text>
            <text x="50" y="47" textAnchor="middle" className="tf-node-s">
              {n.sub}
            </text>
          </g>
        ))}

        <path d="M420 226H620" className="tf-bracket" />
        <text x="520" y="252" textAnchor="middle" className="tf-diag-cap strong">
          Never rebuilt
        </text>
      </svg>

      <p className="tf-diag-detail" aria-live="polite">
        <b>{node.label}.</b> {node.text}
      </p>
    </div>
  );
}
