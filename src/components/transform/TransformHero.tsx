"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollTrigger } from "@/lib/gsap";
import { useInView } from "@/lib/hooks";

const STACKS = ["Shopify", "WordPress", "Webflow", "Next.js"];

const Icon = ({ children }: { children: ReactNode }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

// Feature cards floating around the demo; z = parallax depth.
const FLOATS: { pos: string; z: number; t: string; s: string; icon: ReactNode }[] = [
  {
    pos: "l1",
    z: 1.4,
    t: "100% SEO kept",
    s: "URLs, meta and schema untouched",
    icon: (
      <Icon>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </Icon>
    ),
  },
  {
    pos: "l2",
    z: 0.8,
    t: "60 FPS",
    s: "Profiled on real phones",
    icon: (
      <Icon>
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </Icon>
    ),
  },
  {
    pos: "r1",
    z: 1.2,
    t: "360° product viewer",
    s: "Drag to inspect every side",
    icon: (
      <Icon>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v5h-5" />
      </Icon>
    ),
  },
  {
    pos: "r2",
    z: 1.6,
    t: "0 backend changes",
    s: "Your CMS and checkout stay",
    icon: (
      <Icon>
        <path d="M20 6 9 17l-5-5" />
      </Icon>
    ),
  },
];

/** Transform page hero: centered headline, then the before/after demo tilted in 3D that straightens as you scroll. */
export function TransformHero() {
  const section = useRef<HTMLElement>(null);
  const [pos, setPos] = useState(50);
  const [demoRef, seen] = useInView<HTMLDivElement>({ margin: "0px 0px -25% 0px" });
  const touched = useRef(false);

  // Gentle auto-wiggle of the slider so visitors notice it, until they touch it.
  useEffect(() => {
    if (!seen || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = (t - t0) / 2600;
      if (touched.current || k >= 1) return;
      setPos(50 + Math.sin(k * Math.PI * 2) * 32 * (1 - k * 0.3));
      raf = requestAnimationFrame(tick);
    };
    const start = setTimeout(() => (raf = requestAnimationFrame(tick)), 900);
    return () => {
      clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, [seen]);

  // Scroll straightens the tilted demo: --t goes 0 → 1 over the first ~520px.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--t", "1");
      return;
    }
    const trig = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "+=520",
      onUpdate: (self) => el.style.setProperty("--t", self.progress.toFixed(4)),
    });
    return () => trig.kill();
  }, []);

  // Cursor position (-1..1) drives the headline extrusion and the floating cards' parallax.
  const track = (e: PointerEvent<HTMLElement>) => {
    const el = section.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--hx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--hy", (((e.clientY - r.top) / Math.min(r.height, window.innerHeight)) * 2 - 1).toFixed(3));
  };

  let k = 0; // stagger index for the headline words
  const word = (w: string) => (
    <span className="w" style={{ "--k": k++ } as CSSProperties}>
      {w}
    </span>
  );

  return (
    <section
      ref={section}
      className="tf-hero2"
      aria-labelledby="tf-title"
      onPointerMove={track}
      style={{ "--t": 0, "--hx": -0.5, "--hy": -0.6 } as CSSProperties}
    >
      <div className="tf-hero2-bg" aria-hidden="true">
        <div className="tf-hero2-glow" />
        <div className="tf-hero2-floor" />
      </div>

      <div className="wrap tf-hero2-inner">
        <div className="tf-hero2-copy">
          <Link href="/contact" className="tf-pill">
            <span className="new">New</span>
            10-day 3D retrofit sprint
            <span className="arr" aria-hidden="true">
              →
            </span>
          </Link>

          <h1 id="tf-title" className="display tf-hero2-h1" aria-label="Keep your website. Add the third dimension.">
            <span className="line" aria-hidden="true">
              {word("Keep")} {word("your")} {word("website.")}
            </span>
            <span className="line" aria-hidden="true">
              {word("Add")} {word("the")}{" "}
              <span className="w tf-3d-word" style={{ "--k": k++ } as CSSProperties}>
                third dimension
              </span>
              <span className="tf-mini-cube" style={{ "--k": k++ } as CSSProperties}>
                <span className="cube">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </span>
            </span>
          </h1>

          <p className="lead tf-hero2-lead">
            Already have a site that works? We layer interactive 3D onto it: no rebuild, no migration, no lost rankings.
          </p>

          <div className="tf-hero2-cta">
            <Link href="/contact" className="btn btn-primary">
              Transform my site →
            </Link>
            <Link href="/work" className="btn btn-ghost">
              See the work
            </Link>
          </div>
        </div>

        <div className="tf-hs">
          <div className="tf-hs-frame">
            <div className="tf-demo">
              <div className="tf-demo-bar">
                <span className="tf-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="tf-url">yourstore.com · demo</span>
                <span className="tf-demo-hint">
                  <span className="dot" aria-hidden="true" /> Drag to compare
                </span>
              </div>

              <div ref={demoRef} className="ba-viewport tf-viewport" style={{ "--pos": `${pos}%` } as CSSProperties}>
                <div className="ba-layer ba-layer-before" aria-hidden="true">
                  <Image src="/transform_before.jpg" alt="" fill className="ba-img" priority />
                  <div className="ba-layer-watermark watermark-before">
                    <span>BEFORE · FLAT 2D</span>
                  </div>
                </div>
                <div className="ba-layer ba-layer-after" aria-hidden="true">
                  <Image src="/transform_after.jpg" alt="" fill className="ba-img" priority />
                  <div className="ba-layer-watermark watermark-after">
                    <span className="watermark-sparkle">✦</span>
                    <span>AFTER · 3D SPATIAL</span>
                  </div>
                </div>
                <div className="ba-divider-line" aria-hidden="true">
                  <div className="ba-handle-grip">
                    <svg viewBox="0 0 20 20" fill="none" className="grip-arrows" aria-hidden="true">
                      <path
                        d="M6.5 6L2.5 10L6.5 14M13.5 6L17.5 10L13.5 14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.5}
                  value={pos}
                  onChange={(e) => {
                    touched.current = true;
                    setPos(Number(e.target.value));
                  }}
                  className="ba-slider-input"
                  aria-label="Compare the flat 2D website with the upgraded 3D version"
                  aria-valuetext={`${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`}
                />
              </div>
            </div>
          </div>

          {FLOATS.map((f, i) => (
            <div key={f.pos} className={`tf-float ${f.pos}`} style={{ "--z": f.z, "--i": i } as CSSProperties}>
              <span className="ic">{f.icon}</span>
              <span className="tx">
                <b>{f.t}</b>
                <span>{f.s}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="tf-hero2-stack">
          <span>Works with your stack</span>
          <ul>
            {STACKS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
