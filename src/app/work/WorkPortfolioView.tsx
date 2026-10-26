"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealText } from "@/components/ui/Reveal";

export interface ProjectDetail {
  id: string;
  name: string;
  category: "hardware" | "spatial" | "data";
  industry: string;
  type: string;
  label: string;
  tagline: string;
  body: string;
  image: string;
  specs: string[];
  metrics: {
    dwellTime: string;
    fps: string;
    payload: string;
  };
  challenge: string;
  solution: string;
}

export const ALL_PROJECTS: ProjectDetail[] = [
  {
    id: "halo",
    name: "Halo",
    category: "hardware",
    industry: "Audio Hardware",
    type: "Custom Build",
    label: "Concept Flagship",
    tagline: "Disassemble the headphones. Hear each driver.",
    body: "A luxury product launch site where the physical headphones are the interface itself. Visitors scroll to explode the ear cups into floating acoustic drivers, hover to isolate individual beryllium diaphragm frequencies, and configure custom anodized finishes in real-time WebGL.",
    image: "/portfolio_halo_3d.jpg",
    specs: ["Scroll Disassembly", "Web Audio API", "Draco Mesh Optimization", "PBR Anodized Shaders"],
    metrics: {
      dwellTime: "+410%",
      fps: "60 FPS Locked",
      payload: "1.1 MB",
    },
    challenge: "High-end audiophiles want to see the internal driver engineering and acoustic chamber physics before pre-ordering a $900 hardware product.",
    solution: "We engineered an exploded scroll choreography with real-time soundwave shader rings, letting users inspect every millimeter of internal hardware without leaving the page.",
  },
  {
    id: "meridian",
    name: "Meridian",
    category: "spatial",
    industry: "Architecture & Real Estate",
    type: "3D Transformation",
    label: "Spatial Experience",
    tagline: "Walkable scale models from flat floor plans.",
    body: "A flat architectural portfolio transformed into an interactive architectural diorama. 2D blueprint schematics lift off the ground plane into volumetric concrete and glass slabs as the visitor travels through room perspectives with dynamic sunlight simulation.",
    image: "/portfolio_meridian_3d.jpg",
    specs: ["BIM to WebGL Pipeline", "Volumetric Glass Slabs", "Dynamic Solar Angle", "Sub-second Paint"],
    metrics: {
      dwellTime: "+290%",
      fps: "60 FPS Locked",
      payload: "1.4 MB",
    },
    challenge: "Traditional 2D architectural PDFs and flat photography fail to communicate the spatial volume, daylighting, and proportion of luxury development projects.",
    solution: "Transformed flat CAD blueprints into a lightweight, navigable 3D pavilion model with layered elevation slices and real-time natural light transitions.",
  },
  {
    id: "strata",
    name: "Strata",
    category: "data",
    industry: "Geospatial & Climate Data",
    type: "Website Club Original",
    label: "Studio Original",
    tagline: "Topographical terrain rendered in depth contours.",
    body: "An exploratory climate GIS visualizer where planetary elevation data is sliced into luminous neon topographic contours. Users can scrub depth levels, hover over elevation peaks, and inspect environmental metrics mapped directly onto spatial geometry.",
    image: "/portfolio_strata_3d.jpg",
    specs: ["GLSL Topo Shaders", "Point Cloud Elevation", "Interactive Depth Slicing", "Zero Main-Thread Lag"],
    metrics: {
      dwellTime: "+360%",
      fps: "60 FPS Locked",
      payload: "1.2 MB",
    },
    challenge: "Complex geospatial datasets overwhelm users when presented as dense numbers and 2D heatmaps.",
    solution: "Created an interactive 3D holographic command-table interface where topography is rendered through WebGL shader contour slices that reveal data intuitively by altitude.",
  },
  {
    id: "assembly",
    name: "Assembly",
    category: "hardware",
    industry: "Luxury Furniture / Retail",
    type: "Custom Build",
    label: "Configurator Concept",
    tagline: "Part-by-part self-assembling modern lounge chair.",
    body: "An ultra-tactile luxury furniture configurator where a mid-century bentwood armchair self-assembles part-by-part in mid-air. Prospective buyers can rotate every brass fastener, swap textured wool upholstery, and inspect real-world ergonomics at 60 FPS.",
    image: "/portfolio_assembly_3d.jpg",
    specs: ["Exploded Parts Engine", "Photoreal Fabric PBR", "Bentwood Grain Shaders", "Mobile Touch Controls"],
    metrics: {
      dwellTime: "+320%",
      fps: "60 FPS Locked",
      payload: "1.3 MB",
    },
    challenge: "Flat e-commerce product photos deliver low buyer confidence for high-ticket designer furniture, leading to high cart abandonment.",
    solution: "A zero-latency 3D assembly configurator that showcases craftsmanship joinery, genuine material textures, and hardware fittings under studio lighting.",
  },
  {
    id: "forma",
    name: "Forma Pavilion",
    category: "spatial",
    industry: "Minimalist Architecture",
    type: "Turnkey 3D Rental",
    label: "Flagship Rental",
    tagline: "Volumetric cantilever monolith under procedural daylight.",
    body: "A clean architectural portfolio flagship featuring an interactive 3D cantilever pavilion. Prospective clients rotate the concrete structure in real-time, toggle sun elevation, and explore spatial layouts without downloading massive files.",
    image: "/portfolio_meridian_3d.jpg",
    specs: ["Procedural Shadow Pass", "Sub-Second FCP", "Draco Mesh Compression", "PBR Concrete Textures"],
    metrics: {
      dwellTime: "+270%",
      fps: "60 FPS Locked",
      payload: "1.1 MB",
    },
    challenge: "Architectural studios need an imposing digital portfolio that commands attention without blowing up page load times or mobile data plans.",
    solution: "Engineered a low-poly brutalist cantilever pavilion that renders in 0.4s and allows smooth orbit inspection on all devices.",
  },
  {
    id: "aethel",
    name: "Aethel Titan",
    category: "hardware",
    industry: "High-End Audio",
    type: "3D Retrofit",
    label: "Spatial Retrofit",
    tagline: "Retrofitting static product pages with real-time 360° inspection.",
    body: "A complete WebGL retrofit of a high-end audio retail store. Replaced flat static product photos with an interactive carbon-fiber and silver headphone showcase featuring volumetric driver caustics and real-time reflection shaders.",
    image: "/transform_after.jpg",
    specs: ["Drop-in WebGL Canvas", "Shopify Buy-Button Bridge", "60 FPS Mobile Shader", "Universal WebGL Fallback"],
    metrics: {
      dwellTime: "+380%",
      fps: "60 FPS Locked",
      payload: "1.2 MB",
    },
    challenge: "The brand already had a thriving Shopify store and high search ranking, but their 2D photography caused low engagement on their $850 flagship headphones.",
    solution: "Installed an edge WebGL spatial layer that mounts onto their live product page in under 10 days, increasing dwell time by 380% with zero downtime.",
  },
];

export function WorkPortfolioView() {
  const [activeFilter, setActiveFilter] = useState<"all" | "hardware" | "spatial" | "data">("all");
  const [activeModalProject, setActiveModalProject] = useState<ProjectDetail | null>(null);

  const filteredProjects = activeFilter === "all"
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="work-page-wrap">
      {/* Hero Header */}
      <section className="work-hero-section">
        <div className="wrap">
          <div className="work-hero-badge">
            <span className="badge-pulse" />
            <span>STUDIO ARCHIVE · 2024–2026 WORKS</span>
          </div>

          <RevealText
            id="work-title"
            text="Selected 3D Spatial Experiences"
            className="h1 work-hero-h1"
          />

          <p className="work-hero-lead">
            Every project in our portfolio is engineered with custom WebGL shaders, 60 FPS GSAP camera kinematics, and Draco mesh optimization. We build digital flagships that command attention and drive conversion.
          </p>

          {/* Quick Metrics Bar (Elevated HUD Console) */}
          <div className="work-metrics-bar">
            <div className="work-metric-item">
              <div className="work-metric-top">
                <span className="metric-val">+340%</span>
                <span className="work-metric-tag green">⚡ 4.2x vs 2D</span>
              </div>
              <span className="metric-lbl">Average Dwell Time</span>
              <span className="work-metric-sub">Verified session length increase</span>
            </div>
            <div className="work-metric-sep" />
            <div className="work-metric-item">
              <div className="work-metric-top">
                <span className="metric-val">60 FPS</span>
                <span className="work-metric-tag blue">Locked Rate</span>
              </div>
              <span className="metric-lbl">Hardware Kinematics</span>
              <span className="work-metric-sub">Zero dropped mobile frames</span>
            </div>
            <div className="work-metric-sep" />
            <div className="work-metric-item">
              <div className="work-metric-top">
                <span className="metric-val">&lt; 1.4 MB</span>
                <span className="work-metric-tag purple">92% Smaller</span>
              </div>
              <span className="metric-lbl">Median Draco Payload</span>
              <span className="work-metric-sub">Instant edge CDN delivery</span>
            </div>
            <div className="work-metric-sep" />
            <div className="work-metric-item">
              <div className="work-metric-top">
                <span className="metric-val">0 ms</span>
                <span className="work-metric-tag green">Zero Lag</span>
              </div>
              <span className="metric-lbl">Main-Thread Blocking</span>
              <span className="work-metric-sub">Parallel Web Worker pipeline</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="sw-filter-tabs work-filter-tabs" role="tablist" aria-label="Portfolio category filter">
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
              className={`sw-filter-btn ${activeFilter === "all" ? "is-active" : ""}`}
            >
              All Projects ({ALL_PROJECTS.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === "hardware"}
              onClick={() => setActiveFilter("hardware")}
              className={`sw-filter-btn ${activeFilter === "hardware" ? "is-active" : ""}`}
            >
              Hardware &amp; Retail (3)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === "spatial"}
              onClick={() => setActiveFilter("spatial")}
              className={`sw-filter-btn ${activeFilter === "spatial" ? "is-active" : ""}`}
            >
              Spatial &amp; Architecture (2)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === "data"}
              onClick={() => setActiveFilter("data")}
              className={`sw-filter-btn ${activeFilter === "data" ? "is-active" : ""}`}
            >
              Data &amp; Shaders (1)
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="work-grid-section">
        <div className="wrap">
          <div className="sw-grid work-masonry-grid">
            {filteredProjects.map((project, index) => (
              <Reveal
                as="article"
                key={project.id}
                delay={index * 80}
                className="sw-card work-card-elevated"
              >
                {/* Visual Showcase Stage */}
                <div
                  className="sw-media-stage"
                  onClick={() => setActiveModalProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setActiveModalProject(project)}
                  aria-label={`Inspect ${project.name} case study`}
                >
                  <div className="sw-image-container">
                    <Image
                      src={project.image}
                      alt={`${project.name} — ${project.industry} 3D Experience`}
                      width={960}
                      height={540}
                      className="sw-image"
                      priority={index < 2}
                    />
                    <div className="sw-media-overlay" />
                  </div>

                  {/* Top Badges */}
                  <div className="sw-stage-badges">
                    <span className="sw-badge-label">{project.label}</span>
                    <span className="sw-badge-industry">{project.industry}</span>
                  </div>

                  {/* Hover Action Badge */}
                  <div className="sw-stage-action">
                    <span className="sw-action-pill">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                      Inspect Case Study &amp; Telemetry
                    </span>
                  </div>

                  {/* Bottom Quick Telemetry */}
                  <div className="sw-stage-telemetry">
                    <span className="sw-telemetry-item">
                      <strong>{project.metrics.dwellTime}</strong> Dwell
                    </span>
                    <span className="sw-telemetry-separator">/</span>
                    <span className="sw-telemetry-item">
                      <strong>{project.metrics.fps}</strong>
                    </span>
                    <span className="sw-telemetry-separator">/</span>
                    <span className="sw-telemetry-item">
                      <strong>{project.metrics.payload}</strong> Draco
                    </span>
                  </div>
                </div>

                {/* Text & Specs Content */}
                <div className="sw-card-body">
                  <div className="sw-card-header-row">
                    <div>
                      <span className="sw-index">0{index + 1}</span>
                      <h3 className="sw-project-name">{project.name}</h3>
                    </div>
                    <span className="sw-type-pill">{project.type}</span>
                  </div>

                  <p className="sw-tagline">&ldquo;{project.tagline}&rdquo;</p>
                  <p className="sw-description">{project.body}</p>

                  {/* Specs Tags */}
                  <div className="sw-specs-list" aria-label="Technical disciplines">
                    {project.specs.map((spec) => (
                      <span key={spec} className="sw-spec-tag">
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action */}
                  <div className="sw-card-foot">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="sw-inspect-btn"
                    >
                      <span>View Full Case Study</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                    <Link href="/#contact" className="sw-request-similar">
                      Request similar build →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom Commission Banner */}
          <Reveal delay={200} className="sw-banner work-commission-banner">
            <div className="sw-banner-left">
              <span className="sw-banner-badge">✦ PROPRIETARY 3D SPRINT PIPELINE</span>
              <h4 className="sw-banner-title">Ready to build your next digital flagship?</h4>
              <p className="sw-banner-subtitle">
                Whether you need a ground-up bespoke 3D build, a turnkey rental flagship, or a spatial retrofit of your existing storefront, we deliver within 2 to 4 weeks.
              </p>
            </div>
            <div className="sw-banner-right">
              <Link href="/#contact" className="btn btn-primary">
                <span>Commission Studio Build</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Interactive Case Study Modal */}
      {activeModalProject && (
        <div
          className="sw-modal-backdrop"
          onClick={() => setActiveModalProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="sw-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              className="sw-modal-close"
              onClick={() => setActiveModalProject(null)}
              aria-label="Close project modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Modal Media Preview */}
            <div className="sw-modal-media">
              <Image
                src={activeModalProject.image}
                alt={activeModalProject.name}
                width={1200}
                height={675}
                className="sw-modal-image"
              />
              <div className="sw-modal-media-badge">
                <span>{activeModalProject.type}</span>
                <strong>{activeModalProject.industry}</strong>
              </div>
            </div>

            {/* Modal Body */}
            <div className="sw-modal-body">
              <div className="sw-modal-head">
                <div>
                  <span className="sw-modal-eyebrow">{activeModalProject.label}</span>
                  <h3 id="modal-title" className="sw-modal-title">{activeModalProject.name}</h3>
                </div>
                <div className="sw-modal-stats">
                  <div className="sw-stat-box">
                    <span className="sw-stat-val">{activeModalProject.metrics.dwellTime}</span>
                    <span className="sw-stat-lbl">Dwell Time</span>
                  </div>
                  <div className="sw-stat-box">
                    <span className="sw-stat-val">{activeModalProject.metrics.fps}</span>
                    <span className="sw-stat-lbl">Framerate</span>
                  </div>
                  <div className="sw-stat-box">
                    <span className="sw-stat-val">{activeModalProject.metrics.payload}</span>
                    <span className="sw-stat-lbl">Payload</span>
                  </div>
                </div>
              </div>

              <p className="sw-modal-tagline">&ldquo;{activeModalProject.tagline}&rdquo;</p>
              <p className="sw-modal-desc">{activeModalProject.body}</p>

              {/* Challenge & Solution Grid */}
              <div className="sw-modal-cs-grid">
                <div className="sw-cs-card cs-challenge">
                  <div className="sw-cs-header">
                    <span className="sw-cs-icon">✕</span>
                    <strong>The Engineering Challenge</strong>
                  </div>
                  <p>{activeModalProject.challenge}</p>
                </div>
                <div className="sw-cs-card cs-solution">
                  <div className="sw-cs-header">
                    <span className="sw-cs-icon">✓</span>
                    <strong>The Spatial Solution</strong>
                  </div>
                  <p>{activeModalProject.solution}</p>
                </div>
              </div>

              {/* Technical Specifications Chips */}
              <div className="sw-modal-specs">
                <span className="sw-modal-specs-title">Technical Disciplines &amp; Architecture:</span>
                <div className="sw-specs-list">
                  {activeModalProject.specs.map((spec) => (
                    <span key={spec} className="sw-spec-tag">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="sw-modal-footer">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setActiveModalProject(null)}
                >
                  Close Case Study
                </button>
                <Link
                  href="/#contact"
                  className="btn btn-primary"
                  onClick={() => setActiveModalProject(null)}
                >
                  <span>Inquire About Similar Project</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
