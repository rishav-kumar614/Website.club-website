"use client";

import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { OrbitModel } from "./scenes/OrbitModel";
import { MaisonModel } from "./scenes/MaisonModel";
import { FormaModel } from "./scenes/FormaModel";

export interface ModelViewerModalProps {
  modelId: "maison" | "forma" | "orbit" | null;
  onClose: () => void;
}

const MODEL_INFO: Record<
  string,
  {
    title: string;
    kicker: string;
    category: string;
    price: string;
    liveUrl: string;
    description: string;
  }
> = {
  maison: {
    title: "Maison",
    kicker: "RESTAURANT & CULINARY HOSPITALITY",
    category: "Sensory Refraction Specimen",
    price: "$490 / month",
    liveUrl: "maison.websiteclub.com",
    description:
      "Sculpted crystalline glassware decanter featuring real-time transmission shaders, physical caustics, and effervescent micro-bubbles.",
  },
  forma: {
    title: "Forma",
    kicker: "ARCHITECTURE & LUXURY REAL ESTATE",
    category: "Volumetric Modernist Pavilion",
    price: "$590 / month",
    liveUrl: "forma.websiteclub.com",
    description:
      "Cantilevered modernist architectural villa featuring solar lighting simulation, blueprint CAD wireframe toggle, and axonometric floor lift.",
  },
  orbit: {
    title: "Orbit",
    kicker: "HARDWARE & FRONTIER TECH",
    category: "Exploded Spatial Audio Core",
    price: "$690 / month",
    liveUrl: "orbit.websiteclub.com",
    description:
      "Aerospace titanium chassis, acoustic honeycomb grill, neodymium magnetic driver, and logic board with live pulsing telemetry.",
  },
};

export function ModelViewerModal({ modelId, onClose }: ModelViewerModalProps) {
  // Orbit Controls
  const [orbitExploded, setOrbitExploded] = useState(false);
  const [orbitWireframe, setOrbitWireframe] = useState(false);
  const [orbitColorway, setOrbitColorway] = useState<"titanium" | "stealth" | "cyber">("titanium");

  // Maison Controls
  const [maisonTheme, setMaisonTheme] = useState<"crystal" | "amber" | "emerald">("crystal");
  const [maisonFluid, setMaisonFluid] = useState(true);

  // Forma Controls
  const [formaTime, setFormaTime] = useState<"sunset" | "night" | "day">("sunset");
  const [formaWireframe, setFormaWireframe] = useState(false);
  const [formaAxonometric, setFormaAxonometric] = useState(false);

  // Global Viewer state
  const [autoRotate, setAutoRotate] = useState(true);

  // Handle ESC key press
  useEffect(() => {
    if (!modelId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [modelId, onClose]);

  if (!modelId) return null;

  const info = MODEL_INFO[modelId] || MODEL_INFO.orbit;

  return (
    <div className="viewer-backdrop" role="dialog" aria-modal="true" aria-labelledby="viewer-title">
      {/* Dark Ambient Backdrop with Blur */}
      <div className="viewer-backdrop-overlay" onClick={onClose} aria-hidden="true" />

      {/* Main Glassmorphic Studio Window */}
      <div className="viewer-window">
        {/* Top Navigation & Telemetry Bar */}
        <div className="viewer-topbar">
          <div className="viewer-top-left">
            <div className="viewer-fps-indicator">
              <span className="viewer-live-dot" />
              <span>LIVE WEBGL 2.0 · 60 FPS</span>
            </div>
            <div className="viewer-model-kicker">
              <span>{info.kicker}</span>
            </div>
            <h2 id="viewer-title" className="viewer-model-title">
              {info.title} <span className="viewer-sub-title">// {info.category}</span>
            </h2>
          </div>

          <div className="viewer-top-actions">
            {/* Auto Rotate Toggle */}
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`viewer-action-pill ${autoRotate ? "is-active" : ""}`}
              aria-label="Toggle 360 Auto-Rotation"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>{autoRotate ? "Auto-Orbit ON" : "Auto-Orbit OFF"}</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="viewer-close-btn"
              aria-label="Close 3D Interactive Model Viewer"
            >
              <span>✕ ESC</span>
            </button>
          </div>
        </div>

        {/* 3D WebGL Canvas Viewport */}
        <div className="viewer-canvas-stage">
          <Canvas
            shadows
            camera={{ position: [0, 0, 4.6], fov: 42 }}
            className="viewer-r3f-canvas"
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow />
            <directionalLight position={[-5, -4, -4]} intensity={0.8} color="#38bdf8" />
            <pointLight position={[0, 0, 3.5]} intensity={1.2} />

            <Suspense fallback={null}>
              {modelId === "orbit" && (
                <OrbitModel
                  exploded={orbitExploded}
                  wireframe={orbitWireframe}
                  colorway={orbitColorway}
                />
              )}
              {modelId === "maison" && (
                <MaisonModel
                  theme={maisonTheme}
                  fluidActive={maisonFluid}
                />
              )}
              {modelId === "forma" && (
                <FormaModel
                  timeOfDay={formaTime}
                  wireframe={formaWireframe}
                  axonometric={formaAxonometric}
                />
              )}

              <ContactShadows
                position={[0, -1.8, 0]}
                opacity={0.65}
                scale={10}
                blur={2.4}
                far={4}
              />
              <Environment resolution={256} frames={1}>
                <Lightformer form="rect" intensity={6} position={[-5, 4, 4]} scale={[8, 4, 1]} />
                <Lightformer form="rect" intensity={4} color="#38bdf8" position={[5, -2, 3]} scale={[6, 4, 1]} />
                <Lightformer form="ring" intensity={4} position={[0, 5, -4]} scale={4} />
              </Environment>
            </Suspense>

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              minDistance={2.2}
              maxDistance={8}
              autoRotate={autoRotate}
              autoRotateSpeed={1.2}
              dampingFactor={0.06}
            />
          </Canvas>

          {/* Left HUD Telemetry Box */}
          <div className="viewer-hud-left" aria-hidden="true">
            <div className="hud-line">
              <span className="hud-label">ENGINE</span>
              <span className="hud-val">Three.js PBR</span>
            </div>
            <div className="hud-line">
              <span className="hud-label">SHADERS</span>
              <span className="hud-val">GLSL Custom</span>
            </div>
            <div className="hud-line">
              <span className="hud-label">DRAWCALLS</span>
              <span className="hud-val">&lt; 28 calls</span>
            </div>
            <div className="hud-line">
              <span className="hud-label">CONTROLS</span>
              <span className="hud-val">Drag 360° · Scroll Zoom</span>
            </div>
          </div>

          {/* Bottom Floating Dynamic Control Bar */}
          <div className="viewer-controls-bar">
            {/* Model-specific controls */}
            {modelId === "orbit" && (
              <div className="model-ctrl-group">
                <button
                  type="button"
                  onClick={() => setOrbitExploded(!orbitExploded)}
                  className={`ctrl-btn ${orbitExploded ? "active-accent" : ""}`}
                >
                  <span className="ctrl-icon">✦</span>
                  <span>{orbitExploded ? "Assemble Components" : "Explode Anatomy"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrbitWireframe(!orbitWireframe)}
                  className={`ctrl-btn ${orbitWireframe ? "active-accent" : ""}`}
                >
                  <span>{orbitWireframe ? "Solid Render" : "CAD Wireframe"}</span>
                </button>

                <div className="ctrl-segmented">
                  {(["titanium", "stealth", "cyber"] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setOrbitColorway(c)}
                      className={`seg-btn ${orbitColorway === c ? "active" : ""}`}
                    >
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {modelId === "maison" && (
              <div className="model-ctrl-group">
                <div className="ctrl-segmented">
                  {(["crystal", "amber", "emerald"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setMaisonTheme(t)}
                      className={`seg-btn ${maisonTheme === t ? "active" : ""}`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setMaisonFluid(!maisonFluid)}
                  className={`ctrl-btn ${maisonFluid ? "active-accent" : ""}`}
                >
                  <span>{maisonFluid ? "Fluid Wave Active" : "Static Crystal"}</span>
                </button>
              </div>
            )}

            {modelId === "forma" && (
              <div className="model-ctrl-group">
                <div className="ctrl-segmented">
                  {(["sunset", "night", "day"] as const).map((tod) => (
                    <button
                      key={tod}
                      type="button"
                      onClick={() => setFormaTime(tod)}
                      className={`seg-btn ${formaTime === tod ? "active" : ""}`}
                    >
                      {tod.charAt(0).toUpperCase() + tod.slice(1)}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setFormaWireframe(!formaWireframe)}
                  className={`ctrl-btn ${formaWireframe ? "active-accent" : ""}`}
                >
                  <span>{formaWireframe ? "Photoreal Solid" : "CAD Blueprint"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormaAxonometric(!formaAxonometric)}
                  className={`ctrl-btn ${formaAxonometric ? "active-accent" : ""}`}
                >
                  <span>{formaAxonometric ? "Close Slabs" : "Axonometric Lift"}</span>
                </button>
              </div>
            )}

            {/* Direct Commercial CTA */}
            <div className="viewer-cta-divider" />
            <a
              href="#contact"
              onClick={onClose}
              className="viewer-primary-cta"
            >
              <span>Rent {info.title} ({info.price})</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 12.5L12.5 3.5M12.5 3.5H6.5M12.5 3.5V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
