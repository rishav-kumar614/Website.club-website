"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealText } from "@/components/ui/Reveal";

interface MetricData {
  fcp: string;
  fcpLabel: string;
  fcpStatus: string;
  fcpFill: string;
  fps: string;
  fpsLabel: string;
  fpsStatus: string;
  fpsFill: string;
  weight: string;
  weightLabel: string;
  weightStatus: string;
  weightFill: string;
  score: string;
  scoreLabel: string;
  scoreStatus: string;
  scoreFill: string;
}

interface WaterfallStage {
  label: string;
  duration: string;
  start: string;
  width: string;
  tag: string;
  isPrimary?: boolean;
}

const MODES: Record<"optimized" | "legacy", {
  title: string;
  subtitle: string;
  statusBadge: string;
  metrics: MetricData;
  waterfall: WaterfallStage[];
  summaryNote: string;
}> = {
  optimized: {
    title: "Website Club Dual-Threaded Pipeline",
    subtitle: "Real HTML paints in 0.4s. Heavy WebGL shaders stream asynchronously in Web Workers.",
    statusBadge: "✓ 99.9% Core Web Vitals Pass",
    metrics: {
      fcp: "0.4s",
      fcpLabel: "First Contentful Paint",
      fcpStatus: "⚡ Sub-second paint",
      fcpFill: "is-green-fill",
      fps: "60 FPS",
      fpsLabel: "Framerate Stability",
      fpsStatus: "Locked · 0 dropped frames",
      fpsFill: "is-green-fill",
      weight: "1.2 MB",
      weightLabel: "Draco Asset Payload",
      weightStatus: "92% geometry reduction",
      weightFill: "is-blue-fill",
      score: "99 / 100",
      scoreLabel: "Mobile Lighthouse",
      scoreStatus: "Top 1% Web Vitals",
      scoreFill: "is-green-fill",
    },
    waterfall: [
      { label: "HTML & Core Copy", duration: "120ms", start: "0%", width: "18%", tag: "Instant Readable Paint", isPrimary: true },
      { label: "CSS & WebP Imagery", duration: "160ms", start: "14%", width: "24%", tag: "Layout Locked" },
      { label: "Web Worker Draco Decoders", duration: "240ms", start: "34%", width: "32%", tag: "Off-Main-Thread", isPrimary: true },
      { label: "WebGL Shaders & 3D Stage", duration: "280ms", start: "62%", width: "38%", tag: "Silent GPU Hydration" },
    ],
    summaryNote: "Users read headlines and engage with CTAs instantly while 3D geometry hydrates quietly in the background without causing layout shifts.",
  },
  legacy: {
    title: "Traditional Single-Threaded 3D Agency Stack",
    subtitle: "Monolithic bundle blocks the main thread. Visitors wait behind a blank loading spinner.",
    statusBadge: "⚠️ Severe Conversion Penalty",
    metrics: {
      fcp: "4.8s",
      fcpLabel: "First Contentful Paint",
      fcpStatus: "⚠️ 62% bounce risk",
      fcpFill: "is-red-fill",
      fps: "18-24 FPS",
      fpsLabel: "Framerate Stability",
      fpsStatus: "Thermal throttling & stutter",
      fpsFill: "is-amber-fill",
      weight: "28.4 MB",
      weightLabel: "Raw GLTF Bundle Payload",
      weightStatus: "Heavy uncompressed textures",
      weightFill: "is-red-fill",
      score: "31 / 100",
      scoreLabel: "Mobile Lighthouse",
      scoreStatus: "Failing Core Web Vitals",
      scoreFill: "is-red-fill",
    },
    waterfall: [
      { label: "Blocking Splash Loader", duration: "2400ms", start: "0%", width: "65%", tag: "User Staring at Spinner" },
      { label: "Uncompressed 3D Asset Download", duration: "1800ms", start: "40%", width: "45%", tag: "Network Bottleneck" },
      { label: "Main Thread JS Parsing", duration: "1200ms", start: "70%", width: "30%", tag: "Browser UI Frozen" },
      { label: "Late Page Content Paint", duration: "600ms", start: "88%", width: "12%", tag: "High Abandonment" },
    ],
    summaryNote: "Uncompressed GLTF meshes and unmanaged shader loops freeze the browser UI thread, leading to dropped frames, battery drain, and lost customers.",
  },
};

interface TechnicalPillar {
  num: string;
  category: "engine" | "network";
  tag: string;
  title: string;
  desc: string;
  pill: string;
  metric: string;
  image: string;
  imageAlt: string;
}

const TECHNICAL_PILLARS: TechnicalPillar[] = [
  {
    num: "01",
    category: "engine",
    tag: "THREADING & EXECUTION",
    title: "Off-Main-Thread Web Workers",
    desc: "Decouples 3D parsing into background workers, keeping the UI thread 100% idle for smooth 120Hz scrolling.",
    pill: "Zero Thread Blocking",
    metric: "120Hz UI Thread",
    image: "/perf_worker_3d.jpg",
    imageAlt: "Dual-threaded parallel computing processor render",
  },
  {
    num: "02",
    category: "engine",
    tag: "ALGORITHMIC COMPRESSION",
    title: "Draco Mesh & KTX2 Textures",
    desc: "Shrinks raw 3D geometry payloads by 92%, streaming lightweight textures directly into GPU memory.",
    pill: "92% Bandwidth Saved",
    metric: "92% Mesh Reduction",
    image: "/perf_draco_3d.jpg",
    imageAlt: "Polygonal mesh compression into smooth crystal 3D render",
  },
  {
    num: "03",
    category: "engine",
    tag: "MOBILE INTELLIGENCE",
    title: "Adaptive GPU Tiering",
    desc: "Benchmarks device GPU in real-time, dynamically tuning shader samples for cool, lag-free mobile rendering.",
    pill: "Dynamic LOD Scaling",
    metric: "Locked 60 FPS Mobile",
    image: "/perf_mobile_3d.jpg",
    imageAlt: "Titanium mobile phone displaying 60 FPS WebGL world render",
  },
  {
    num: "04",
    category: "network",
    tag: "INFRASTRUCTURE",
    title: "Global Edge CDN & HTTP/3",
    desc: "Replicates 3D models across 300+ Cloudflare edge POPs with 0-RTT multiplexing for sub-second roundtrips.",
    pill: "300+ Edge POPs",
    metric: "< 18ms Latency",
    image: "/perf_edge_3d.jpg",
    imageAlt: "Global edge CDN infrastructure globe render",
  },
  {
    num: "05",
    category: "network",
    tag: "SEO & ACCESSIBILITY",
    title: "100% Real HTML & Crawlability",
    desc: "All copy, metadata, and buttons live in semantic HTML5 markup. Googlebot indexes all content seamlessly.",
    pill: "100% Googlebot Readable",
    metric: "Zero Canvas Trap",
    image: "/perf_seo_3d.jpg",
    imageAlt: "Layered HTML5 code prism with SEO structured data render",
  },
  {
    num: "06",
    category: "network",
    tag: "STABILITY & MEMORY",
    title: "Automated WebGL Garbage Collection",
    desc: "Rigorous buffer disposal and texture unbinding during scene changes eliminate memory leaks and crashes.",
    pill: "Zero Memory Leaks",
    metric: "Zero Memory Leak",
    image: "/perf_memory_3d.jpg",
    imageAlt: "Automated WebGL memory cleanup and recycling reactor render",
  },
];

export function PerformanceDeepDive() {
  const [activeMode, setActiveMode] = useState<"optimized" | "legacy">("optimized");
  const [filterCategory, setFilterCategory] = useState<"all" | "engine" | "network">("all");
  const modeData = MODES[activeMode];

  const filteredPillars = TECHNICAL_PILLARS.filter(
    (p) => filterCategory === "all" || p.category === filterCategory
  );

  return (
    <div className="perf-page-wrap">
      {/* Hero Section */}
      <section className="perf-hero-section">
        <div className="wrap">
          <div className="perf-hero-badge">
            <span className="badge-pulse" />
            <span>CORE WEB VITALS &amp; WEBGL BENCHMARKS</span>
          </div>

          <RevealText
            id="perf-page-title"
            text="3D Craft and Sub-Second Speed Are Not a Trade-off."
            className="h1 perf-page-h1"
          />

          <p className="perf-page-lead">
            Traditional 3D sites force users behind a 10-second loading spinner and stutter at 20 FPS on mobile. We re-engineered the entire WebGL delivery pipeline with off-thread Web Workers, Draco mesh compression, and adaptive GPU profiling to guarantee a 0.4s First Contentful Paint.
          </p>

          {/* Vitals Telemetry HUD */}
          <div className="perf-vitals-hud">
            <div className="vitals-hud-card">
              <span className="vitals-val green">0.4s</span>
              <span className="vitals-label">First Contentful Paint (FCP)</span>
              <span className="vitals-sub">⚡ Top 1% Global Web Vitals</span>
            </div>
            <div className="vitals-hud-card">
              <span className="vitals-val green">60 FPS</span>
              <span className="vitals-label">Framerate Stability</span>
              <span className="vitals-sub">Locked 60 Hz / 120 Hz ProMotion</span>
            </div>
            <div className="vitals-hud-card">
              <span className="vitals-val green">0 ms</span>
              <span className="vitals-label">Total Blocking Time (TBT)</span>
              <span className="vitals-sub">Off-main-thread Web Workers</span>
            </div>
            <div className="vitals-hud-card">
              <span className="vitals-val green">0.00</span>
              <span className="vitals-label">Cumulative Layout Shift (CLS)</span>
              <span className="vitals-sub">Zero reflow or visual stutter</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Architecture Console Section */}
      <section className="perf-console-section">
        <div className="wrap">
          <div className="perf-section-header">
            <div>
              <span className="perf-eyebrow">
                <span className="perf-eyebrow-dot" />
                INTERACTIVE WATERFALL INSPECTOR
              </span>
              <h2 className="h2 perf-section-h2">Dual-Threaded Pipeline vs. Legacy 3D Stack</h2>
            </div>
            <p className="perf-section-desc">
              Toggle between our architecture and the standard agency approach to inspect real-world network payloads, main-thread blocking times, and user bounce risks.
            </p>
          </div>

          {/* Console Card */}
          <div className="perf-console">
            {/* Console Toolbar */}
            <div className="perf-console-toolbar">
              <div className="perf-toolbar-left">
                <span className="perf-console-status">
                  <span className={`perf-status-pulse ${activeMode === "optimized" ? "is-green" : "is-amber"}`} />
                  {modeData.statusBadge}
                </span>
                <span className="perf-console-modelabel">Interactive Benchmark Inspector</span>
              </div>

              {/* Mode Switcher */}
              <div className="perf-mode-switcher" role="tablist" aria-label="Architecture Comparison Mode">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMode === "optimized"}
                  onClick={() => setActiveMode("optimized")}
                  className={`perf-mode-btn ${activeMode === "optimized" ? "is-active" : ""}`}
                >
                  <span className="btn-dot" />
                  Website Club Pipeline
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMode === "legacy"}
                  onClick={() => setActiveMode("legacy")}
                  className={`perf-mode-btn ${activeMode === "legacy" ? "is-active" : ""}`}
                >
                  <span className="btn-dot" />
                  Legacy 3D Stack
                </button>
              </div>
            </div>

            {/* Console Body: Left Metrics + Right Waterfall */}
            <div className="perf-console-body">
              {/* Left Column: Diagnostics */}
              <div className="perf-metrics-col">
                <div className="perf-metric-card">
                  <div className="perf-metric-header">
                    <span className="perf-metric-label">{modeData.metrics.fcpLabel}</span>
                    <span className="perf-metric-status">{modeData.metrics.fcpStatus}</span>
                  </div>
                  <div className="perf-metric-value">{modeData.metrics.fcp}</div>
                  <div className="perf-metric-bar-bg">
                    <div
                      className={`perf-metric-bar-fill ${modeData.metrics.fcpFill}`}
                      style={{ width: activeMode === "optimized" ? "95%" : "25%" }}
                    />
                  </div>
                </div>

                <div className="perf-metric-card">
                  <div className="perf-metric-header">
                    <span className="perf-metric-label">{modeData.metrics.fpsLabel}</span>
                    <span className="perf-metric-status">{modeData.metrics.fpsStatus}</span>
                  </div>
                  <div className="perf-metric-value">{modeData.metrics.fps}</div>
                  <div className="perf-metric-bar-bg">
                    <div
                      className={`perf-metric-bar-fill ${modeData.metrics.fpsFill}`}
                      style={{ width: activeMode === "optimized" ? "100%" : "35%" }}
                    />
                  </div>
                </div>

                <div className="perf-metric-card">
                  <div className="perf-metric-header">
                    <span className="perf-metric-label">{modeData.metrics.weightLabel}</span>
                    <span className="perf-metric-status">{modeData.metrics.weightStatus}</span>
                  </div>
                  <div className="perf-metric-value">{modeData.metrics.weight}</div>
                  <div className="perf-metric-bar-bg">
                    <div
                      className={`perf-metric-bar-fill ${modeData.metrics.weightFill}`}
                      style={{ width: activeMode === "optimized" ? "88%" : "20%" }}
                    />
                  </div>
                </div>

                <div className="perf-metric-card">
                  <div className="perf-metric-header">
                    <span className="perf-metric-label">{modeData.metrics.scoreLabel}</span>
                    <span className="perf-metric-status">{modeData.metrics.scoreStatus}</span>
                  </div>
                  <div className="perf-metric-value">{modeData.metrics.score}</div>
                  <div className="perf-metric-bar-bg">
                    <div
                      className={`perf-metric-bar-fill ${modeData.metrics.scoreFill}`}
                      style={{ width: activeMode === "optimized" ? "99%" : "31%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Waterfall */}
              <div className="perf-waterfall-col">
                <div className="perf-waterfall-header">
                  <div>
                    <h3 className="perf-waterfall-title">{modeData.title}</h3>
                    <p className="perf-waterfall-sub">{modeData.subtitle}</p>
                  </div>
                  <span className="perf-waterfall-badge">
                    {activeMode === "optimized" ? "0ms Main Thread Block" : "4.8s UI Frozen"}
                  </span>
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
                    {modeData.waterfall.map((stage, idx) => (
                      <div key={idx} className="perf-track-row">
                        <div className="perf-track-info">
                          <span className={`perf-track-dot ${activeMode === "legacy" ? "is-amber" : ""}`} />
                          <div className="perf-track-meta">
                            <span className="perf-track-name">{stage.label}</span>
                            <span className="perf-track-duration">{stage.duration}</span>
                          </div>
                        </div>
                        <div className="perf-track-bar-container">
                          <div
                            className={`perf-track-bar ${stage.isPrimary ? "is-accent" : ""} ${activeMode === "legacy" ? "is-legacy-bar" : ""}`}
                            style={{ left: stage.start, width: stage.width }}
                          >
                            <span className="perf-track-tag">{stage.tag}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="perf-waterfall-footer">
                  <div className="perf-footer-note">
                    <span className="perf-note-icon">💡</span>
                    <span>
                      <strong>Architectural Impact:</strong> {modeData.summaryNote}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Technical Pillars Bento Grid */}
      <section className="perf-pillars-container">
        <div className="wrap">
          <div className="perf-pillars-header">
            <div>
              <span className="perf-pillars-eyebrow">
                ✦ SIX ARCHITECTURAL PILLARS
              </span>
              <h2 className="perf-pillars-title">Engineered Under the Hood</h2>
              <p className="perf-pillars-desc">
                From background thread isolation to KTX2 GPU textures, every layer is optimized for 60 FPS mobile performance.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="perf-filter-nav" role="tablist" aria-label="Pillars category filter">
              <button
                type="button"
                role="tab"
                aria-selected={filterCategory === "all"}
                onClick={() => setFilterCategory("all")}
                className={`perf-filter-btn ${filterCategory === "all" ? "is-active" : ""}`}
              >
                All Pillars ({TECHNICAL_PILLARS.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={filterCategory === "engine"}
                onClick={() => setFilterCategory("engine")}
                className={`perf-filter-btn ${filterCategory === "engine" ? "is-active" : ""}`}
              >
                Rendering Engine (3)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={filterCategory === "network"}
                onClick={() => setFilterCategory("network")}
                className={`perf-filter-btn ${filterCategory === "network" ? "is-active" : ""}`}
              >
                Network &amp; SEO (3)
              </button>
            </div>
          </div>

          <div className="perf-bento-grid">
            {filteredPillars.map((pillar) => (
              <div key={pillar.num} className="perf-bento-card">
                <div className="perf-card-visual">
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="perf-card-img"
                  />
                  <div className="perf-card-visual-scrim" />
                  <div className="perf-card-visual-top">
                    <span className="perf-bento-num">{pillar.num}</span>
                    <span className="perf-card-metric-badge">{pillar.metric}</span>
                  </div>
                </div>

                <div className="perf-card-body">
                  <span className="perf-bento-tag">{pillar.tag}</span>
                  <h3 className="perf-bento-title">{pillar.title}</h3>
                  <p className="perf-bento-desc">{pillar.desc}</p>
                  <div className="perf-bento-footer">
                    <span className="perf-bento-pill">
                      <span className="perf-bento-pill-dot" />
                      {pillar.pill}
                    </span>
                    <span className="perf-card-arrow">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Audit Consultation Callout */}
          <div className="perf-audit-banner">
            <div className="perf-audit-content">
              <div>
                <span className="perf-audit-badge">✦ FREE PERFORMANCE AUDIT</span>
                <h3 className="perf-audit-title">Worried about 3D hurting your Lighthouse score?</h3>
                <p className="perf-audit-desc">
                  Send us your current website URL. We will run an automated WebGL profiling and Core Web Vitals audit, showing you exactly how we can add 3D while keeping your site blazing fast.
                </p>
              </div>
              <Link href="/#contact" className="btn btn-primary">
                <span>Request Free Performance Audit</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
