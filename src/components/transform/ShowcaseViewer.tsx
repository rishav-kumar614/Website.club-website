"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { use3DCapability, useInView } from "@/lib/hooks";
import type { Finish, Shape, View } from "./ShowcaseScene";
import { PINS } from "./showcase-pins";

const ShowcaseScene = dynamic(() => import("./ShowcaseScene"), { ssr: false });

const PRODUCTS: { id: Shape; label: string; name: string; price: number; blurb: string; specs: string[] }[] = [
  {
    id: "phones",
    label: "Headphones",
    name: "Aethel One",
    price: 349,
    blurb: "Over-ear studio headphones with adaptive noise cancelling.",
    specs: ["40h battery", "Hi-Res", "ANC"],
  },
  {
    id: "speaker",
    label: "Speaker",
    name: "Aethel Pulse",
    price: 249,
    blurb: "A room-filling 360° speaker with a touch-ring top.",
    specs: ["360° sound", "20h battery", "IP67"],
  },
  {
    id: "watch",
    label: "Watch",
    name: "Aethel Chrono",
    price: 429,
    blurb: "A sapphire-glass smartwatch with a quick-swap strap.",
    specs: ["7-day battery", "Sapphire", "GPS"],
  },
];

const FINISHES: { id: Finish; label: string }[] = [
  { id: "matte", label: "Matte" },
  { id: "satin", label: "Satin" },
  { id: "chrome", label: "Chrome" },
];

const COLORS = [
  { n: "Cobalt", c: "#3A64F0" },
  { n: "Ember", c: "#ff5a1f" },
  { n: "Onyx", c: "#1b1c24" },
  { n: "Sand", c: "#e3dccd" },
  { n: "Jade", c: "#2fbf71" },
];

const VIEWS = [
  { n: "Front", az: 0, pol: Math.PI / 2.15 },
  { n: "Side", az: Math.PI / 2, pol: Math.PI / 2.15 },
  { n: "Top", az: 0, pol: 0.45 },
];

export function ShowcaseViewer() {
  const cap = use3DCapability();
  const [ref, visible] = useInView<HTMLDivElement>({ once: false, margin: "120px" });
  const [pi, setPi] = useState(0);
  const [finish, setFinish] = useState<Finish>("satin");
  const [ci, setCi] = useState(0);
  const [spin, setSpin] = useState(true);
  const [view, setView] = useState<View>({ az: 0, pol: Math.PI / 2.15, key: 0 });
  const [cart, setCart] = useState(0);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const pinsEl = useRef<HTMLDivElement>(null);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const p = PRODUCTS[pi];
  const color = COLORS[ci];

  const go = (i: number) => {
    setView((v) => ({ az: VIEWS[i].az, pol: VIEWS[i].pol, key: v.key + 1 }));
    setSpin(false);
  };
  const add = () => {
    setCart((n) => n + 1);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="tf-viewer" style={{ "--pc": color.c } as React.CSSProperties}>
      <div ref={ref} className="tf-viewer-stage">
        <div className="tf-viewer-bg" aria-hidden="true" />
        {cap.enabled ? (
          <ShowcaseScene
            shape={p.id}
            finish={finish}
            color={color.c}
            spin={spin}
            view={view}
            pins={pinsEl}
            lite={cap.lite}
            active={visible}
          />
        ) : (
          <p className="tf-viewer-fallback">3D preview is turned off on this device.</p>
        )}

        <div ref={pinsEl} className="tf-pins" aria-hidden="true">
          {PINS[p.id].map((pin) => (
            <div key={pin.label} className="tf-pin">
              <i />
              <span>{pin.label}</span>
            </div>
          ))}
        </div>

        <span className="tf-viewer-live">
          <i aria-hidden="true" /> Live 3D demo · drag to rotate
        </span>
        <span className="tf-viewer-name" aria-hidden="true">
          {p.name}
        </span>

        <div className="tf-viewer-views" role="group" aria-label="Camera view">
          {VIEWS.map((v, i) => (
            <button key={v.n} type="button" onClick={() => go(i)}>
              {v.n}
            </button>
          ))}
          <button type="button" aria-pressed={spin} className={spin ? "is-on" : ""} onClick={() => setSpin(!spin)}>
            <span aria-hidden="true">↻</span> Auto
          </button>
        </div>
      </div>

      <div className="tf-viewer-panel">
        <div className="tf-seg tf-seg-tabs" role="tablist" aria-label="Product">
          {PRODUCTS.map((x, i) => (
            <button key={x.id} type="button" role="tab" aria-selected={pi === i} aria-pressed={pi === i} onClick={() => setPi(i)}>
              {x.label}
            </button>
          ))}
        </div>

        <div className="tf-prod" key={p.id}>
          <div className="tf-prod-top">
            <h3>{p.name}</h3>
            <span className="tf-prod-price">${p.price}</span>
          </div>
          <div className="tf-prod-rate">
            Sample product · demo data
          </div>
          <p>{p.blurb}</p>
          <ul className="tf-prod-specs">
            {p.specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <fieldset>
          <legend>Finish</legend>
          <div className="tf-seg">
            {FINISHES.map((f) => (
              <button key={f.id} type="button" aria-pressed={finish === f.id} onClick={() => setFinish(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>
            Color <b>{color.n}</b>
          </legend>
          <div className="tf-swatches">
            {COLORS.map((c, i) => (
              <button
                key={c.n}
                type="button"
                aria-label={c.n}
                aria-pressed={ci === i}
                style={{ background: c.c }}
                onClick={() => setCi(i)}
              />
            ))}
          </div>
        </fieldset>

        <button type="button" className={`tf-buy ${added ? "is-added" : ""}`} onClick={add}>
          <span className="a">Add to cart (demo) · ${p.price}</span>
          <span className="b">✓ Added</span>
          {cart > 0 && <em key={cart}>{cart}</em>}
        </button>
        <p className="tf-viewer-note">Demo with sample products and prices. This is the kind of viewer we add to a real product page.</p>
      </div>
    </div>
  );
}
