"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

const FLAGS = [
  { id: "maison", name: "Maison", image: "/rental_maison_preview.jpg", sample: "Your Restaurant" },
  { id: "forma", name: "Forma", image: "/rental_forma_preview.jpg", sample: "Your Studio" },
  { id: "orbit", name: "Orbit", image: "/rental_orbit_preview.jpg", sample: "Your Product" },
];

const COLORS = [
  { n: "Original", c: "" },
  { n: "Cobalt", c: "#2563eb" },
  { n: "Ember", c: "#ff5a1f" },
  { n: "Jade", c: "#16a34a" },
  { n: "Violet", c: "#7c3aed" },
];

/** Illustrative preview of how a flagship takes on a brand's name and color. */
export function RentBrandPreview() {
  const [fi, setFi] = useState(0);
  const [ci, setCi] = useState(0);
  const [name, setName] = useState("");
  const f = FLAGS[fi];
  const color = COLORS[ci];
  const brand = name.trim() || f.sample;
  const slug = brand.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yourbrand";

  return (
    <div className="rx-brand">
      <div className="rx-brand-controls">
        <div className="rx-seg" role="tablist" aria-label="Flagship">
          {FLAGS.map((x, i) => (
            <button key={x.id} type="button" role="tab" aria-selected={fi === i} onClick={() => setFi(i)}>
              {x.name}
            </button>
          ))}
        </div>

        <label className="rx-field">
          <span>Your brand name</span>
          <input
            type="text"
            value={name}
            maxLength={24}
            placeholder={f.sample}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <fieldset className="rx-field">
          <legend>
            Brand color <b>{color.n}</b>
          </legend>
          <div className="rx-swatches">
            {COLORS.map((c, i) => (
              <button
                key={c.n}
                type="button"
                aria-label={c.n}
                aria-pressed={ci === i}
                className={c.c ? "" : "orig"}
                style={c.c ? { background: c.c } : undefined}
                onClick={() => setCi(i)}
              />
            ))}
          </div>
        </fieldset>

        <p className="rx-note">Illustrative: we apply your logo, colors, type and copy within 24 hours.</p>
      </div>

      <div className="rx-brand-view" style={{ "--bc": color.c || "transparent" } as CSSProperties}>
        <div className="rx-browser">
          <span className="dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="url">{slug}.com</span>
        </div>
        <div className="rx-shot">
          <Image key={f.id} src={f.image} alt={`${f.name} flagship with your branding applied`} width={1100} height={620} className="rx-shot-img" />
          <div className="rx-tint" aria-hidden="true" />
          <span className="rx-brandtag">{brand}</span>
        </div>
      </div>
    </div>
  );
}
