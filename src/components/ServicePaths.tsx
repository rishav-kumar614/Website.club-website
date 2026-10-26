"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { RubiksCube } from "./visuals/RubiksCube";

const WORDS = ["RENT", "BUILD", "TRANSFORM"];
const BLURBS = [
  "Pick a ready-made 3D site, brand it, and launch in 48 hours.",
  "A fully original 3D flagship, designed around your brand.",
  "Already have a site? We add 3D without rebuilding it.",
];

export function ServicePaths() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="paths-section" aria-label="Three paths to 3D">
      <div className="wrap paths-grid">
        <div className="paths-copy">
          <span className="service-paths-kicker">✦ THREE PATHS TO 3D</span>
          <h2 className="service-paths-h2">
            <span className="service-title-line">Three Distinct Paths.</span>
            <span className="service-title-line">One Extraordinary Standard.</span>
          </h2>
          <ul className="paths-list">
            {SERVICES.map((s, i) => (
              <li key={s.id} className={`paths-item ${active === i ? "on" : ""}`}>
                <span className="paths-n">{s.n}</span>
                <div className="paths-text">
                  <h3>{s.title}</h3>
                  <p>{BLURBS[i]}</p>
                </div>
                <Link href={s.href} className="paths-cta" aria-label={`${s.title}: ${s.cta}`}>
                  {s.cta} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="paths-cube">
          <RubiksCube words={WORDS} onWord={setActive} />
        </div>
      </div>
    </section>
  );
}
