"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealText } from "./ui/Reveal";

export function Performance() {
  return (
    <section id="performance" className="section perf-section" aria-labelledby="perf-title">
      <div id="about" style={{ position: "absolute", top: "-80px" }} />
      <div className="wrap">
        {/* Header */}
        <div className="perf-header">
          <div className="perf-header-main">
            <span className="perf-eyebrow">
              <span className="perf-eyebrow-dot" />
              ENGINEERING &amp; PERFORMANCE ARCHITECTURE
            </span>
            <RevealText
              id="perf-title"
              text="3D and speed aren't a trade-off."
              className="h2 perf-headline"
            />
          </div>
          <Reveal delay={120}>
            <p className="perf-lead">
              Heavy 3D traditionally kills conversion. We engineered a dual-threaded rendering architecture
              that paints real HTML in 0.4s while WebGL shaders stream seamlessly in off-thread Web Workers.
            </p>
          </Reveal>
        </div>

        {/* Streamlined Homepage Benchmark Telemetry Console */}
        <Reveal delay={180} className="perf-console">
          {/* Console Top Toolbar */}
          <div className="perf-console-toolbar">
            <div className="perf-toolbar-left">
              <span className="perf-console-status">
                <span className="perf-status-pulse is-green" />
                ✓ 99.9% Core Web Vitals Pass Rate
              </span>
              <span className="perf-console-modelabel">Live Benchmark Telemetry</span>
            </div>

            <div className="perf-waterfall-badge">
              <span>99 / 100 Mobile Lighthouse</span>
            </div>
          </div>

          {/* Console Body: Left Metrics + Right Waterfall */}
          <div className="perf-console-body">
            {/* Left Metrics Column */}
            <div className="perf-metrics-col">
              <div className="perf-metric-card">
                <div className="perf-metric-header">
                  <span className="perf-metric-label">First Contentful Paint</span>
                  <span className="perf-metric-status">⚡ Sub-second</span>
                </div>
                <div className="perf-metric-value">0.4s</div>
                <div className="perf-metric-bar-bg">
                  <div className="perf-metric-bar-fill is-green-fill" style={{ width: "95%" }} />
                </div>
              </div>

              <div className="perf-metric-card">
                <div className="perf-metric-header">
                  <span className="perf-metric-label">Framerate Stability</span>
                  <span className="perf-metric-status">Locked 60 FPS</span>
                </div>
                <div className="perf-metric-value">60 FPS</div>
                <div className="perf-metric-bar-bg">
                  <div className="perf-metric-bar-fill is-green-fill" style={{ width: "100%" }} />
                </div>
              </div>

              <div className="perf-metric-card">
                <div className="perf-metric-header">
                  <span className="perf-metric-label">Draco Asset Payload</span>
                  <span className="perf-metric-status">92% Reduced</span>
                </div>
                <div className="perf-metric-value">1.2 MB</div>
                <div className="perf-metric-bar-bg">
                  <div className="perf-metric-bar-fill is-blue-fill" style={{ width: "88%" }} />
                </div>
              </div>

              <div className="perf-metric-card">
                <div className="perf-metric-header">
                  <span className="perf-metric-label">Total Blocking Time</span>
                  <span className="perf-metric-status">Off-Main-Thread</span>
                </div>
                <div className="perf-metric-value">0 ms</div>
                <div className="perf-metric-bar-bg">
                  <div className="perf-metric-bar-fill is-green-fill" style={{ width: "100%" }} />
                </div>
              </div>
            </div>

            {/* Right Waterfall Column */}
            <div className="perf-waterfall-col">
              <div className="perf-waterfall-header">
                <div>
                  <h3 className="perf-waterfall-title">Dual-Threaded Pipeline (First 1,000ms)</h3>
                  <p className="perf-waterfall-sub">
                    HTML paints instantly while heavy WebGL geometry hydrates quietly in Web Workers.
                  </p>
                </div>
              </div>

              <div className="perf-waterfall-tracks">
                <div className="perf-waterfall-scale">
                  <span>0ms</span>
                  <span>250ms</span>
                  <span>500ms</span>
                  <span>750ms</span>
                  <span>1000ms</span>
                </div>

                <div className="perf-tracks-list">
                  <div className="perf-track-row">
                    <div className="perf-track-info">
                      <span className="perf-track-dot" />
                      <div className="perf-track-meta">
                        <span className="perf-track-name">HTML &amp; Core Copy</span>
                        <span className="perf-track-duration">120ms</span>
                      </div>
                    </div>
                    <div className="perf-track-bar-container">
                      <div className="perf-track-bar is-accent" style={{ left: "0%", width: "18%" }}>
                        <span className="perf-track-tag">Instant Readable Paint</span>
                      </div>
                    </div>
                  </div>

                  <div className="perf-track-row">
                    <div className="perf-track-info">
                      <span className="perf-track-dot" />
                      <div className="perf-track-meta">
                        <span className="perf-track-name">Draco Web Workers</span>
                        <span className="perf-track-duration">240ms</span>
                      </div>
                    </div>
                    <div className="perf-track-bar-container">
                      <div className="perf-track-bar is-accent" style={{ left: "34%", width: "32%" }}>
                        <span className="perf-track-tag">Off-Main-Thread</span>
                      </div>
                    </div>
                  </div>

                  <div className="perf-track-row">
                    <div className="perf-track-info">
                      <span className="perf-track-dot" />
                      <div className="perf-track-meta">
                        <span className="perf-track-name">WebGL Shaders Stage</span>
                        <span className="perf-track-duration">280ms</span>
                      </div>
                    </div>
                    <div className="perf-track-bar-container">
                      <div className="perf-track-bar is-accent" style={{ left: "62%", width: "38%" }}>
                        <span className="perf-track-tag">Silent GPU Hydration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="perf-waterfall-action-strip">
                <div className="perf-footer-note" style={{ margin: 0, flex: 1 }}>
                  <span>✓ <strong>Zero Thread Blocking:</strong> Guaranteed 60 FPS scrolling even on mobile.</span>
                </div>
                <Link href="/performance" className="btn btn-primary btn-sm">
                  <span>Inspect Full Architecture &amp; 6 Pillars</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3 Top Pillar Highlights (Styled Bento Grid) */}
        <div className="perf-bento-grid" style={{ marginTop: "clamp(32px, 4vw, 56px)" }}>
          <div className="perf-bento-card">
            <div className="perf-card-visual">
              <Image
                src="/perf_worker_3d.jpg"
                alt="Dual-threaded parallel computing processor render"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="perf-card-img"
              />
              <div className="perf-card-visual-scrim" />
              <div className="perf-card-visual-top">
                <span className="perf-bento-num">01</span>
                <span className="perf-card-metric-badge">120Hz UI Thread</span>
              </div>
            </div>
            <div className="perf-card-body">
              <span className="perf-bento-tag">THREADING &amp; EXECUTION</span>
              <h3 className="perf-bento-title">Off-Main-Thread Web Workers</h3>
              <p className="perf-bento-desc">
                Decouples 3D parsing into background workers, keeping the UI thread 100% idle for smooth 120Hz scrolling.
              </p>
              <div className="perf-bento-footer">
                <span className="perf-bento-pill">
                  <span className="perf-bento-pill-dot" />
                  Zero Thread Blocking
                </span>
                <span className="perf-card-arrow">→</span>
              </div>
            </div>
          </div>

          <div className="perf-bento-card">
            <div className="perf-card-visual">
              <Image
                src="/perf_draco_3d.jpg"
                alt="Polygonal mesh compression into smooth crystal 3D render"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="perf-card-img"
              />
              <div className="perf-card-visual-scrim" />
              <div className="perf-card-visual-top">
                <span className="perf-bento-num">02</span>
                <span className="perf-card-metric-badge">92% Mesh Reduction</span>
              </div>
            </div>
            <div className="perf-card-body">
              <span className="perf-bento-tag">ALGORITHMIC COMPRESSION</span>
              <h3 className="perf-bento-title">Draco Mesh &amp; KTX2 Textures</h3>
              <p className="perf-bento-desc">
                Shrinks raw 3D geometry payloads by 92%, streaming lightweight textures directly into GPU memory.
              </p>
              <div className="perf-bento-footer">
                <span className="perf-bento-pill">
                  <span className="perf-bento-pill-dot" />
                  92% Bandwidth Saved
                </span>
                <span className="perf-card-arrow">→</span>
              </div>
            </div>
          </div>

          <div className="perf-bento-card">
            <div className="perf-card-visual">
              <Image
                src="/perf_mobile_3d.jpg"
                alt="Titanium mobile phone displaying 60 FPS WebGL world render"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="perf-card-img"
              />
              <div className="perf-card-visual-scrim" />
              <div className="perf-card-visual-top">
                <span className="perf-bento-num">03</span>
                <span className="perf-card-metric-badge">Locked 60 FPS Mobile</span>
              </div>
            </div>
            <div className="perf-card-body">
              <span className="perf-bento-tag">MOBILE INTELLIGENCE</span>
              <h3 className="perf-bento-title">Adaptive GPU Tiering</h3>
              <p className="perf-bento-desc">
                Benchmarks device GPU in real-time, dynamically tuning shader samples for cool, lag-free mobile rendering.
              </p>
              <div className="perf-bento-footer">
                <span className="perf-bento-pill">
                  <span className="perf-bento-pill-dot" />
                  Dynamic LOD Scaling
                </span>
                <span className="perf-card-arrow">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* View All Performance Deep Dive Banner */}
        <Reveal delay={200} className="perf-banner" style={{ marginTop: "clamp(32px, 4vw, 56px)" }}>
          <div className="perf-banner-left">
            <span className="perf-banner-badge">✦ ARCHITECTURE BENCHMARK DEEP-DIVE</span>
            <h4 className="perf-banner-title">Want to see our full Core Web Vitals audit &amp; CDN topology?</h4>
            <p className="perf-banner-subtitle">
              Inspect our automated WebGL garbage collector, 300+ Edge POP cache hierarchy, and legacy 3D comparison.
            </p>
          </div>
          <div className="perf-banner-right">
            <Link href="/performance" className="btn btn-primary">
              <span>View Full Performance Deep-Dive</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
