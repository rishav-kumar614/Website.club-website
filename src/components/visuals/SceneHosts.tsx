"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { use3DCapability, useInView } from "@/lib/hooks";
import { Tilt } from "./Tilt";

// Heavy scenes are separate chunks, fetched only after idle + capability checks.
const Robot = dynamic(() => import("@/app/contact/Robot").then((m) => m.Robot), { ssr: false });
const CubeScene = dynamic(() => import("./scenes/CubeScene"), { ssr: false });
const FinalScene = dynamic(() => import("./scenes/FinalScene"), { ssr: false });
const ButterflyScene = dynamic(() => import("./scenes/ButterflyScene"), { ssr: false });
import { CubeFallback } from "./CubeFallback";

/**
 * Hero visual: the contact-page robot. Clicking it opens the assistant on /contact.
 * Its eyes follow the cursor via --ex/--ey on the host element.
 */
export function HeroVisual() {
  const host = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      host.current?.style.setProperty("--ex", String((e.clientX / innerWidth - 0.5) * 16));
      host.current?.style.setProperty("--ey", String((e.clientY / innerHeight - 0.5) * 10));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="hero-visual">
      <Link ref={host} href="/contact" className="canvas-wrap on" style={{ transform: "translateY(8%) scale(1.2)" }} aria-label="Talk to the Website Club assistant">
        <Robot host={host as RefObject<HTMLDivElement | null>} state="idle" started dance />
      </Link>
    </div>
  );
}

/**
 * Cube visual for the Custom Bespoke page.
 */
export function CubeVisual() {
  const cap = use3DCapability();
  const [ref, visible] = useInView<HTMLDivElement>({ once: false, margin: "80px" });
  const [ready, setReady] = useState(false);

  return (
    <div ref={ref} className="hero-visual">
      <div className={`hero-fallback ${ready ? "off" : ""}`}>
        <Tilt max={8}>
          <CubeFallback />
        </Tilt>
      </div>
      {cap.enabled && (
        <div className={`canvas-wrap ${ready ? "on" : ""}`}>
          <CubeScene lite={cap.lite} active={visible} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}

export function FinalObject() {
  const cap = use3DCapability();
  const [ref, visible] = useInView<HTMLDivElement>({ once: false, margin: "200px" });
  const [seen, setSeen] = useState(false);
  if (visible && !seen) setSeen(true);

  return (
    <div ref={ref} className="final-object" aria-hidden="true">
      {/* Visual CSS-based portal wireframe fallback */}
      <div className={`final-fallback ${cap.enabled && seen ? "fade-out" : ""}`}>
        <div className="final-fallback-frame f-1" />
        <div className="final-fallback-frame f-2" />
        <div className="final-fallback-frame f-3" />
        <div className="final-fallback-frame f-4" />
      </div>

      {cap.enabled && seen && (
        <div className="canvas-wrap on">
          <FinalScene lite={cap.lite} active={visible} />
        </div>
      )}
    </div>
  );
}

export function ButterflyVisual() {
  const cap = use3DCapability();
  const [ref, visible] = useInView<HTMLDivElement>({ once: false, margin: "100px" });

  return (
    <div ref={ref} className="butterfly-visual-stage" aria-hidden="true">
      {cap.enabled && (
        <div className="canvas-wrap on">
          <ButterflyScene lite={cap.lite} active={visible} />
        </div>
      )}
    </div>
  );
}

