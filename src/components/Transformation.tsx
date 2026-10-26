"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useInView } from "@/lib/hooks";
import { Reveal, RevealText, MotionStaggerContainer, MotionStaggerItem, motion } from "./ui/Reveal";

export function Transformation() {
  const [pos, setPos] = useState(50);
  const [demoRef, seen] = useInView<HTMLDivElement>({ margin: "0px 0px -25% 0px" });
  const touched = useRef(false);

  // Discoverability sweep on first view
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
    const start = setTimeout(() => (raf = requestAnimationFrame(tick)), 500);
    return () => {
      clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, [seen]);

  return (
    <section id="transform" className="section transform-section" aria-labelledby="transform-title">
      <div className="wrap">
        {/* Section Header */}
        <div className="transform-header">
          <div className="transform-header-left">
            <span className="transform-kicker">✦ 3D WEB RETROFIT &amp; SPATIAL UPGRADE</span>
            <RevealText
              id="transform-title"
              text="Already have a website? Elevate it into the 3rd dimension."
              className="h2 transform-h2"
            />
          </div>
          <Reveal delay={120} className="transform-header-right">
            <p className="lead">
              Zero stack migration. Keep your existing backend, CMS, SEO equity, and custom domain. We upgrade your
              current digital footprint with immersive Three.js WebGL scenes, rotatable 3D product models, and spatial
              motion design.
            </p>
            <div className="transform-badge-pills">
              <span className="transform-pill">✓ No Tech Stack Rebuild</span>
              <span className="transform-pill">✓ Preserves SEO Equity</span>
              <span className="transform-pill">✓ Universal GPU Fallbacks</span>
            </div>
          </Reveal>
        </div>

        {/* Interactive Before / After Comparison Showcase */}
        <Reveal>
          <div className="transform-slider-container">
            {/* Ambient Backlight */}
            <div className="transform-ambient-glow" aria-hidden="true" />

            {/* Browser Viewport Frame */}
            <div className="transform-browser-frame">
              {/* Browser Header Bar */}
              <div className="transform-browser-topbar">
                <div className="transform-window-dots" aria-hidden="true">
                  <span className="dot dot-close" />
                  <span className="dot dot-min" />
                  <span className="dot dot-max" />
                </div>
                <div className="transform-url-chip">
                  <svg className="url-lock" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M4.5 7V5.5C4.5 3.567 6.067 2 8 2C9.933 2 11.5 3.567 11.5 5.5V7M3 7H13V14H3V7Z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>aethel.audio · Interactive Upgrade Demo</span>
                </div>
                <div className="transform-fps-indicator">
                  <span className="fps-dot" />
                  <span>Interactive Slider</span>
                </div>
              </div>

              {/* Split Interactive Viewport */}
              <div
                ref={demoRef}
                className="ba-viewport"
                style={{ "--pos": `${pos}%` } as CSSProperties}
              >
                {/* Before Layer (Underneath / Left Reveal) */}
                <div className="ba-layer ba-layer-before" aria-hidden="true">
                  <Image
                    src="/transform_before.jpg"
                    alt="Standard flat 2D website interface"
                    fill
                    className="ba-img"
                    priority
                  />
                  <div className="ba-layer-watermark watermark-before">
                    <span className="watermark-badge">BEFORE</span>
                    <span className="watermark-sub">Flat 2D UI · Static PNG Photos · Generic Scroll</span>
                  </div>
                </div>

                {/* After Layer (Clipped / Right Reveal) */}
                <div className="ba-layer ba-layer-after" aria-hidden="true">
                  <Image
                    src="/transform_after.jpg"
                    alt="Upgraded 3D spatial WebGL experience with volumetric lighting"
                    fill
                    className="ba-img"
                    priority
                  />
                  <div className="ba-layer-watermark watermark-after">
                    <span className="watermark-badge">AFTER UPGRADE</span>
                    <span className="watermark-sub">Spatial WebGL · 360° Inspection · Volumetric Shaders · 60 FPS</span>
                  </div>
                </div>

                {/* Slider Handle Divider Line */}
                <div className="ba-divider" aria-hidden="true">
                  <div className="ba-handle">
                    <svg className="ba-handle-arrows" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M8 7L3 12L8 17M16 7L21 12L16 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Accessible Range Input Control */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={pos}
                  onPointerDown={() => {
                    touched.current = true;
                  }}
                  onChange={(e) => {
                    touched.current = true;
                    setPos(Number(e.target.value));
                  }}
                  className="ba-slider-input"
                  aria-label="Compare flat 2D website with upgraded 3D spatial experience"
                  aria-valuetext={`${Math.round(pos)}% standard 2D, ${100 - Math.round(pos)}% 3D spatial WebGL`}
                />
              </div>

              {/* Slider Bottom Hint Bar */}
              <div className="ba-bottom-hint">
                <span className="hint-pill">◄ Drag slider to compare flat 2D vs. 3D WebGL ►</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Streamlined Architecture Console Linking to /transform */}
        <Reveal delay={120} className="transform-architecture-preview">
          <div className="arch-preview-card">
            <div className="arch-preview-glow" aria-hidden="true" />
            <div className="arch-preview-content">
              {/* Header with Title + Description + Live Bridge Compatibility Box */}
              <div className="arch-preview-header">
                <div className="arch-preview-hgroup">
                  <div className="arch-pill-tag">
                    <span className="pill-dot-pulse" />
                    <span>MODULAR RETROFIT ENGINE</span>
                  </div>
                  <h3 className="arch-preview-title">
                    6 Layers of Spatial Craft.<br />
                    <span className="arch-title-gradient">Zero Stack Migration.</span>
                  </h3>
                  <p className="arch-preview-desc">
                    We don&apos;t rebuild your backend or disrupt your live business. We engineer a high-performance WebGL layer directly into your existing Shopify, Next.js, or WordPress storefront — delivering 60 FPS spatial interactions without sacrificing SEO or checkout flow.
                  </p>
                </div>

                <div className="arch-compat-card">
                  <div className="compat-header-bar">
                    <span className="compat-label">
                      <svg viewBox="0 0 16 16" fill="none" width="13" height="13" stroke="currentColor">
                        <path d="M2 4L8 1L14 4V12L8 15L2 12V4Z" strokeWidth="1.4" strokeLinejoin="round" />
                      </svg>
                      DROP-IN COMPATIBILITY
                    </span>
                    <span className="compat-live-status">
                      <span className="pill-dot-pulse" style={{ background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                      LIVE BRIDGE
                    </span>
                  </div>
                  <div className="compat-chips-row">
                    <span className="compat-chip">
                      <span className="compat-chip-dot green" />
                      Shopify Plus
                    </span>
                    <span className="compat-chip">
                      <span className="compat-chip-dot cyan" />
                      Next.js
                    </span>
                    <span className="compat-chip">
                      <span className="compat-chip-dot blue" />
                      WordPress
                    </span>
                    <span className="compat-chip">
                      <span className="compat-chip-dot purple" />
                      Webflow
                    </span>
                    <span className="compat-chip">
                      <span className="compat-chip-dot amber" />
                      Headless API
                    </span>
                  </div>
                  <div className="compat-subtext">
                    <svg viewBox="0 0 16 16" fill="none" width="12" height="12" stroke="currentColor">
                      <circle cx="8" cy="8" r="6" strokeWidth="1.2" />
                      <path d="M8 5V8.5L10 10.5" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <span>Zero downtime • Existing cart, blog &amp; SEO untouched</span>
                  </div>
                </div>
              </div>

              {/* 6 Modular Layer Bento Cards with Rich Telemetry Widgets */}
              <MotionStaggerContainer className="arch-layers-grid" stagger={0.07}>
                {/* 01 GLSL Shader Physics */}
                <MotionStaggerItem>
                  <motion.div
                    className="arch-layer-chip"
                    whileHover={{ y: -5, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                  >
                    <div className="arch-layer-top">
                      <div className="arch-layer-icon-wrap">
                        <div className="arch-layer-icon">
                          <svg viewBox="0 0 20 20" fill="none" width="18" height="18" stroke="currentColor">
                            <circle cx="10" cy="10" r="7" strokeWidth="1.5" strokeDasharray="3 3" />
                            <path d="M10 4V16M4 10H16" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="arch-layer-pill-tag">60 FPS SHADER</span>
                      </div>
                      <span className="arch-layer-num">01</span>
                    </div>
                    <div className="arch-layer-info">
                      <strong>GLSL Shader Physics</strong>
                      <span>Volumetric caustics, optical refraction &amp; custom raymarched surfaces</span>
                    </div>
                    <div className="arch-layer-widget">
                      <div className="widget-wave-bar">
                        <span className="wave-bar" />
                        <span className="wave-bar" />
                        <span className="wave-bar" />
                        <span className="wave-bar" />
                        <span className="wave-bar" />
                        <span className="wave-bar" />
                      </div>
                      <span>GLSL 3.0 Raymarching</span>
                    </div>
                  </motion.div>
                </MotionStaggerItem>

                {/* 02 Kinetic GSAP Scroll */}
                <MotionStaggerItem>
                  <motion.div
                    className="arch-layer-chip"
                    whileHover={{ y: -5, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                  >
                    <div className="arch-layer-top">
                      <div className="arch-layer-icon-wrap">
                        <div className="arch-layer-icon">
                          <svg viewBox="0 0 20 20" fill="none" width="18" height="18" stroke="currentColor">
                            <path d="M4 14L8 10L12 14L16 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="16" cy="6" r="2" fill="currentColor" />
                          </svg>
                        </div>
                        <span className="arch-layer-pill-tag">FRAME-ACCURATE</span>
                      </div>
                      <span className="arch-layer-num">02</span>
                    </div>
                    <div className="arch-layer-info">
                      <strong>Kinetic GSAP Scroll</strong>
                      <span>Frame-accurate camera choreography synchronized with scroll physics</span>
                    </div>
                    <div className="arch-layer-widget">
                      <div className="widget-timeline-bar">
                        <div className="timeline-scrub-track">
                          <span className="timeline-scrub-head" />
                        </div>
                        <span style={{ fontSize: '10px' }}>0.0s ➔ 1.8s</span>
                      </div>
                      <span>ScrollTrigger Pin</span>
                    </div>
                  </motion.div>
                </MotionStaggerItem>

                {/* 03 360° Rotatable WebGL */}
                <MotionStaggerItem>
                  <motion.div
                    className="arch-layer-chip"
                    whileHover={{ y: -5, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                  >
                    <div className="arch-layer-top">
                      <div className="arch-layer-icon-wrap">
                        <div className="arch-layer-icon">
                          <svg viewBox="0 0 20 20" fill="none" width="18" height="18" stroke="currentColor">
                            <path d="M10 2L17 6V14L10 18L3 14V6L10 2Z" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M10 2V18M3 6L17 14M17 6L3 14" strokeWidth="1" strokeOpacity="0.4" />
                          </svg>
                        </div>
                        <span className="arch-layer-pill-tag">DRACO 1.2MB</span>
                      </div>
                      <span className="arch-layer-num">03</span>
                    </div>
                    <div className="arch-layer-info">
                      <strong>360° Rotatable WebGL</strong>
                      <span>Ultra-smooth Draco-compressed CAD/glTF models with HDR lighting</span>
                    </div>
                    <div className="arch-layer-widget">
                      <span style={{ color: '#38bdf8' }}>360° • X:42° Y:18°</span>
                      <span>HDR Environment</span>
                    </div>
                  </motion.div>
                </MotionStaggerItem>

                {/* 04 Zero-CMS Rebuild */}
                <MotionStaggerItem>
                  <motion.div
                    className="arch-layer-chip"
                    whileHover={{ y: -5, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                  >
                    <div className="arch-layer-top">
                      <div className="arch-layer-icon-wrap">
                        <div className="arch-layer-icon">
                          <svg viewBox="0 0 20 20" fill="none" width="18" height="18" stroke="currentColor">
                            <rect x="4" y="4" width="12" height="12" rx="3" strokeWidth="1.5" />
                            <path d="M4 9H16M9 4V16" strokeWidth="1.2" strokeOpacity="0.5" />
                          </svg>
                        </div>
                        <span className="arch-layer-pill-tag">ZERO REBUILD</span>
                      </div>
                      <span className="arch-layer-num">04</span>
                    </div>
                    <div className="arch-layer-info">
                      <strong>Zero-CMS Rebuild</strong>
                      <span>100% preserves Shopify checkout, inventory, blog &amp; current SEO rankings</span>
                    </div>
                    <div className="arch-layer-widget">
                      <span className="widget-bridge-pill">
                        <span className="compat-chip-dot green" />
                        Live Bridge Hook
                      </span>
                      <span>0 Redirects</span>
                    </div>
                  </motion.div>
                </MotionStaggerItem>

                {/* 05 Spatial Audio Engine */}
                <MotionStaggerItem>
                  <motion.div
                    className="arch-layer-chip"
                    whileHover={{ y: -5, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                  >
                    <div className="arch-layer-top">
                      <div className="arch-layer-icon-wrap">
                        <div className="arch-layer-icon">
                          <svg viewBox="0 0 20 20" fill="none" width="18" height="18" stroke="currentColor">
                            <path d="M3 8V12H6L10 16V4L6 8H3Z" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M13 7C14.5 8.5 14.5 11.5 13 13M15.5 5C18 7.5 18 12.5 15.5 15" strokeWidth="1.3" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="arch-layer-pill-tag">3D BINAURAL</span>
                      </div>
                      <span className="arch-layer-num">05</span>
                    </div>
                    <div className="arch-layer-info">
                      <strong>Spatial Audio Engine</strong>
                      <span>Positional WebAudio frequency cues &amp; tactile micro-interactions</span>
                    </div>
                    <div className="arch-layer-widget">
                      <div className="widget-wave-bar">
                        <span className="wave-bar" style={{ animationDelay: '0.4s' }} />
                        <span className="wave-bar" style={{ animationDelay: '0.1s' }} />
                        <span className="wave-bar" style={{ animationDelay: '0.3s' }} />
                        <span className="wave-bar" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <span>WebAudio 48kHz</span>
                    </div>
                  </motion.div>
                </MotionStaggerItem>

                {/* 06 Universal GPU Fallbacks */}
                <MotionStaggerItem>
                  <motion.div
                    className="arch-layer-chip"
                    whileHover={{ y: -5, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                  >
                    <div className="arch-layer-top">
                      <div className="arch-layer-icon-wrap">
                        <div className="arch-layer-icon">
                          <svg viewBox="0 0 20 20" fill="none" width="18" height="18" stroke="currentColor">
                            <path d="M10 2L16 5V10C16 14.5 10 18 10 18C10 18 4 14.5 4 10V5L10 2Z" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M8 10L10 12L13 8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="arch-layer-pill-tag">DUAL ENGINE</span>
                      </div>
                      <span className="arch-layer-num">06</span>
                    </div>
                    <div className="arch-layer-info">
                      <strong>Universal GPU Fallbacks</strong>
                      <span>Dual-threaded offscreen canvas with instant 60 FPS CSS 3D fallback</span>
                    </div>
                    <div className="arch-layer-widget">
                      <span>WebGL 2.0 ⇄ CSS3D</span>
                      <span style={{ color: '#10b981', fontWeight: 600 }}>100% Pass Rate</span>
                    </div>
                  </motion.div>
                </MotionStaggerItem>
              </MotionStaggerContainer>

              {/* Action Strip with High-Trust Badges */}
              <div className="arch-preview-footer">
                <div className="arch-trust-strip">
                  <div className="arch-trust-item">
                    <span className="arch-trust-dot" />
                    <span>10-Day Delivery Sprint</span>
                  </div>
                  <div className="arch-trust-item">
                    <span className="arch-trust-dot" />
                    <span>Lighthouse 95+ Guarantee</span>
                  </div>
                  <div className="arch-trust-item">
                    <span className="arch-trust-dot" />
                    <span>100% SEO Retained</span>
                  </div>
                </div>

                <motion.a
                  href="/transform"
                  className="arch-explore-btn"
                  whileHover={{ scale: 1.03, y: -2, transition: { type: "spring", stiffness: 420, damping: 20 } }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Explore Full 3D Retrofit Architecture &amp; Case Study</span>
                  <span className="arch-btn-arrow">
                    <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                      <path
                        d="M3.5 12.5L12.5 3.5M12.5 3.5H6.5M12.5 3.5V9.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom Complimentary Concept Callout */}
        <Reveal delay={250} className="transform-callout-banner">
          <div className="callout-left">
            <div className="callout-sparkle-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="sparkle-icon">
                <path
                  d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="callout-copy">
              <h4 className="callout-title">Curious what your website looks like in 3D?</h4>
              <p className="callout-sub">
                Send us your live URL. Our creative team will audit your brand and send you a complimentary 3D spatial
                concept preview within 48 hours.
              </p>
            </div>
          </div>
          <div className="callout-actions">
            <a href="#contact" className="callout-cta-primary">
              <span>Request Free 3D Concept</span>
              <svg viewBox="0 0 16 16" fill="none" className="cta-arrow" aria-hidden="true">
                <path
                  d="M3.5 12.5L12.5 3.5M12.5 3.5H6.5M12.5 3.5V9.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
