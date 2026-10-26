"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealText } from "./ui/Reveal";
import { ModelViewerModal } from "./visuals/ModelViewerModal";

export type TemplateCategory = "all" | "landing" | "hero" | "component" | "shader";

export interface TemplateItem {
  id: string;
  name: string;
  category: "landing" | "hero" | "component" | "shader";
  categoryLabel: string;
  industry: string;
  tagline: string;
  description: string;
  image: string;
  modelId?: "orbit" | "maison" | "forma";
  badge: string;
  fps: string;
  tech: string[];
  specs: string[];
  liveUrl?: string;
  promptSnippet: string;
  featured?: boolean;
}

export const TEMPLATES_DATA: TemplateItem[] = [
  {
    id: "cylinder-reels",
    name: "Cylinder Reels Arena",
    category: "hero",
    categoryLabel: "Hero Section",
    industry: "Frontier Tech & Creative Portfolio",
    tagline: "Synchronized 3D Cylinder Reel Arena with Inertial Scroll & Kinetic Typography",
    description:
      "A volumetric cylindrical carousel that pins the viewport, rotating high-definition video tiles in a 3D cylindrical arena. Synchronized with inertial mouse dragging, magnetic snapping, and audio-reactive micro-pulses.",
    image: "/custom_bespoke_3d.jpg",
    badge: "🔥 Trending · 60 FPS",
    fps: "60 FPS Locked",
    tech: ["Three.js", "Cylindrical Projection", "GSAP ScrollTrigger", "Sub-1MB Asset"],
    specs: ["Inertial 3D Cylinder Arena", "Auto-Centering Snap Engine", "Audio-Reactive Glare Layer", "Zero Jitter on 120Hz Displays"],
    liveUrl: "reels.websiteclub.com",
    promptSnippet:
      "Build a cylindrical 3D video reel hero in Three.js and GSAP. Position 8 mesh tiles along a cylinder radius of 4.2 units, facing inward. Implement magnetic scroll pinning, dragging inertia with damping: 0.08, and dynamic chromatic aberration on velocity.",
    featured: true,
  },
  {
    id: "orbit-hardware",
    name: "Orbit Tech Flagship",
    category: "landing",
    categoryLabel: "3D Landing Page",
    industry: "Audio Hardware & Robotics",
    tagline: "Interactive Exploded 3D Device Architecture with Real-time Telemetry HUD",
    description:
      "Crafted for physical hardware products, wearable tech, and acoustics. Features scroll-driven exploded component disassembly, 360° orbital rotation, titanium material customizer, and CAD wireframe toggle.",
    image: "/rental_orbit_preview.jpg",
    modelId: "orbit",
    badge: "Interactive 3D Specimen",
    fps: "60 FPS WebGL 2.0",
    tech: ["Three.js", "Draco Compression", "PBR Titanium Shaders", "Exploded CAD Rig"],
    specs: ["Exploded View Scroll Controller", "Live 360° Gyro & Mouse Orbit", "Shopify/Stripe Pre-order Sync", "Telemetry Spec Hotspots"],
    liveUrl: "orbit.websiteclub.com",
    promptSnippet:
      "Design an exploded 3D hardware flagship page in Three.js. Load a Draco-compressed titanium headphone model, map sub-meshes into an exploded state array along the Z-axis, attach interactive hotspot pins with hover HUD telemetry, and lock rendering to 60 FPS.",
    featured: true,
  },
  {
    id: "maison-hospitality",
    name: "Maison Culinary Flagship",
    category: "landing",
    categoryLabel: "3D Landing Page",
    industry: "Luxury Restaurant & Hospitality",
    tagline: "Sensory Crystalline Decanter with Volumetric Refraction & Ambient Shaders",
    description:
      "Engineered for Michelin-star restaurants, luxury cocktail lounges, and boutique wineries. Features real-time optical glass transmission, effervescent fluid caustics, and an instant table reservation drawer.",
    image: "/rental_maison_preview.jpg",
    modelId: "maison",
    badge: "Interactive 3D Specimen",
    fps: "60 FPS Shaders",
    tech: ["Transmission WebGL", "Caustics Shader", "Sub-1s Global Edge Load", "Reservation Engine"],
    specs: ["Crystalline Glass Decanter 3D", "Day / Night Ambient Lighting", "Smooth Sommelier Audio Ambient", "Mobile-Optimized Low-Power Mesh"],
    liveUrl: "maison.websiteclub.com",
    promptSnippet:
      "Create a luxury hospitality landing page with an interactive physical glass decanter in Three.js using MeshPhysicalMaterial with transmission: 0.98, roughness: 0.04, and ior: 1.52. Provide an instant slide-in reservation terminal.",
    featured: true,
  },
  {
    id: "forma-spatial",
    name: "Forma Modernist Pavilion",
    category: "landing",
    categoryLabel: "3D Landing Page",
    industry: "Architecture & Luxury Real Estate",
    tagline: "Volumetric Modernist Villa with Daylight Simulation & Blueprint CAD Lift",
    description:
      "Designed for architectural studios and high-end property estates. Features volumetric daylight simulations, dynamic CAD wireframe blueprint toggles, and interactive axonometric floor slab elevation.",
    image: "/rental_forma_preview.jpg",
    modelId: "forma",
    badge: "Interactive 3D Specimen",
    fps: "60 FPS Spatial",
    tech: ["Axonometric 3D", "Solar Angle Shaders", "Blueprint CAD Overlay", "Volumetric Glass"],
    specs: ["Cantilevered Concrete Architecture", "Dynamic Sunlight / Twilight Slider", "Axonometric Floor Lift Choreography", "Ultra-HD Surface PBR Textures"],
    liveUrl: "forma.websiteclub.com",
    promptSnippet:
      "Construct a modernist architectural 3D site in Three.js. Render a cantilevered concrete pavilion with directional sun angle animation, wireframe blueprint toggle, and scroll-bound camera elevation from ground level to aerial axonometric view.",
    featured: true,
  },
  {
    id: "halo-acoustics",
    name: "Halo Acoustic Disassembly",
    category: "component",
    categoryLabel: "Interactive Component",
    industry: "Wearables & Sound Engineering",
    tagline: "Scroll-Bound Acoustic Driver Disassembly with Real-Time Web Audio Visualizer",
    description:
      "A high-impact interactive component where users scroll to explode earcups into floating acoustic drivers, hover to isolate beryllium diaphragm frequencies, and listen to procedural soundwave frequencies.",
    image: "/portfolio_halo_3d.jpg",
    badge: "Web Audio + 3D",
    fps: "60 FPS Locked",
    tech: ["Web Audio API", "FFT Frequency Analyzer", "PBR Anodized Aluminum", "Scroll Choreography"],
    specs: ["Beryllium Driver Frequency Isolation", "Audio Frequency Canvas Waveform", "Zero Layout Shift", "Tactile Micro-haptics"],
    liveUrl: "halo.websiteclub.com",
    promptSnippet:
      "Implement a scroll-bound acoustic driver disassembly component. Connect Three.js mesh pieces to a normalized scroll timeline (0 to 1), trigger harmonic audio frequencies via Web Audio API when hovering individual drivers, and animate a frequency waveform canvas.",
  },
  {
    id: "strata-kinetic",
    name: "Strata Flow Field Shaders",
    category: "shader",
    categoryLabel: "WebGL Shaders",
    industry: "Fintech, AI & Infrastructure",
    tagline: "GPU Particle Simulation with Interactive Simplex Noise & Telemetry Distortion",
    description:
      "Over 45,000 instanced particles simulated entirely on the GPU. Reacts to cursor velocity, scroll acceleration, and interactive data bursts. Featherlight 14KB shader payload.",
    image: "/portfolio_strata_3d.jpg",
    badge: "GPU Compute Shader",
    fps: "120 FPS Capable",
    tech: ["Raw GLSL Shaders", "GPU Instanced Mesh", "Simplex Noise 3D", "14 KB Payload"],
    specs: ["45,000 Real-Time Particles", "Zero CPU Overhead", "Cursor Repel & Magnetic Field", "Responsive Fallback for Battery Saver"],
    liveUrl: "strata.websiteclub.com",
    promptSnippet:
      "Write a custom GLSL vertex shader simulating a 3D simplex noise vector field. Pass cursor coordinates and time uniforms to deform a grid of 45,000 instanced points with smooth color interpolation from warm cream to electric cobalt blue.",
  },
  {
    id: "rubik-tactile",
    name: "Rubik Tactile Cube",
    category: "component",
    categoryLabel: "Interactive Component",
    industry: "Creative Dev & Studio Toy",
    tagline: "Inertial 3D Kinetic Cube with Multi-Axis Mouse Tilt & Tactile Sound FX",
    description:
      "A playful yet ultra-refined 3D interaction specimen. Visitors grab, rotate, and interact with tactile quartz faces, accompanied by synthetic mechanical click sounds generated with Web Audio API.",
    image: "/portfolio_assembly_3d.jpg",
    badge: "Tactile Toy",
    fps: "60 FPS Physics",
    tech: ["Three.js", "Inertial Momentum", "Web Audio Clicks", "PBR Frosted Quartz"],
    specs: ["Multi-Axis Quaternion Rotation", "Synthesized Mechanical Audio Clicks", "Dynamic Ambient Drop Shadow", "Smooth Return Spring Animation"],
    liveUrl: "cube.websiteclub.com",
    promptSnippet:
      "Create a tactile 3D Rubik's cube component in Three.js with frosted quartz materials. Implement pointer drag with quaternion rotation, spring physics return on release, and procedural audio click transients on boundary crossing.",
  },
  {
    id: "meridian-diorama",
    name: "Meridian Blueprint Diorama",
    category: "hero",
    categoryLabel: "Hero Section",
    industry: "Spatial Estates & Development",
    tagline: "2D Blueprint Schematics Lifting Volumetrically into 3D Glass & Concrete Slabs",
    description:
      "A transition hero where flat 2D architectural blueprint line-art physically lifts off the canvas plane into a volumetric, walkable scale model as the visitor initiates their scroll journey.",
    image: "/portfolio_meridian_3d.jpg",
    badge: "Spatial Hero",
    fps: "60 FPS Locked",
    tech: ["SVG to WebGL Extrusion", "Volumetric Glass", "Depth Buffer Shaders", "Sub-1s Paint"],
    specs: ["2D CAD to 3D Extrusion", "Volumetric Room Perspective Travel", "Dynamic Sun Angle Raycaster", "Touch Gestures Supported"],
    liveUrl: "meridian.websiteclub.com",
    promptSnippet:
      "Build a hero section where a 2D architectural floor plan animates into a 3D diorama. Extrude floor paths upward along Y-axis based on scroll position, apply frosted glass shaders to upper balconies, and transition background from light cream to deep twilight.",
  },
];

export function TemplatesLibrary() {
  const [activeTab, setActiveTab] = useState<TemplateCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModelId, setActiveModelId] = useState<"orbit" | "maison" | "forma" | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTemplates = useMemo(() => {
    return TEMPLATES_DATA.filter((item) => {
      const matchesTab = activeTab === "all" || item.category === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.industry.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.tech.some((t) => t.toLowerCase().includes(q));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const copyPrompt = (template: TemplateItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(template.promptSnippet);
    setCopiedId(template.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2400);
  };

  return (
    <section id="templates" className="section templates-library-section">
      <div className="wrap">
        {/* Header Block (Scrolltide / Motion.sites style) */}
        <div className="sec-head templates-header">
          <Reveal>
            <div className="templates-eyebrow-row">
              <span className="templates-live-pill">
                <span className="pulse-dot" />
                CURATED LIBRARY · 24+ HIGH-END ASSETS
              </span>
              <span className="templates-kicker">CINEMATIC 3D TEMPLATES & COMPONENTS</span>
            </div>
          </Reveal>

          <div className="templates-title-grid">
            <RevealText
              as="h2"
              className="templates-main-heading"
              text="Ready-to-deploy 3D templates that don't look like AI slop."
            />
            <Reveal delay={0.15}>
              <p className="templates-lead-text">
                Explore our curated library of interactive 3D landing pages, scroll-driven hero sections, and WebGL components.
                Inspect the 3D model, copy the AI engineering prompt, or deploy directly with zero upfront build costs.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="templates-controls-bar">
          <div className="templates-tabs">
            <button
              type="button"
              className={`templates-tab-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Assets ({TEMPLATES_DATA.length})
            </button>
            <button
              type="button"
              className={`templates-tab-btn ${activeTab === "landing" ? "active" : ""}`}
              onClick={() => setActiveTab("landing")}
            >
              3D Landing Pages (3)
            </button>
            <button
              type="button"
              className={`templates-tab-btn ${activeTab === "hero" ? "active" : ""}`}
              onClick={() => setActiveTab("hero")}
            >
              Hero Sections (2)
            </button>
            <button
              type="button"
              className={`templates-tab-btn ${activeTab === "component" ? "active" : ""}`}
              onClick={() => setActiveTab("component")}
            >
              Components (2)
            </button>
            <button
              type="button"
              className={`templates-tab-btn ${activeTab === "shader" ? "active" : ""}`}
              onClick={() => setActiveTab("shader")}
            >
              Shaders (1)
            </button>
          </div>

          <div className="templates-search-wrapper">
            <svg
              className="templates-search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by tech, style, or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="templates-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="templates-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Templates Bento Grid */}
        <div className="templates-grid">
          {filteredTemplates.map((template, idx) => (
            <Reveal key={template.id} delay={0.06 * (idx % 4)}>
              <article
                className={`template-card ${template.featured ? "template-card-featured" : ""}`}
                onClick={() => setPreviewTemplate(template)}
              >
                {/* Visual Preview Frame */}
                <div className="template-card-media">
                  <div className="template-media-frame">
                    <Image
                      src={template.image}
                      alt={template.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="template-card-img"
                    />
                    <div className="template-media-overlay" />
                  </div>

                  {/* Badges Overlay */}
                  <div className="template-badge-row">
                    <span className="template-badge-category">{template.categoryLabel}</span>
                    <span className="template-badge-live">{template.badge}</span>
                  </div>

                  {/* Hover Quick Action Buttons */}
                  <div className="template-hover-actions">
                    {template.modelId ? (
                      <button
                        type="button"
                        className="template-hover-btn template-hover-btn-3d"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModelId(template.modelId!);
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                          <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                        Inspect 3D Model
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="template-hover-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTemplate(template);
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polygon points="10 8 16 12 10 16 10 8" />
                        </svg>
                        View Interactive Spec
                      </button>
                    )}

                    <button
                      type="button"
                      className={`template-hover-btn template-copy-prompt-btn ${copiedId === template.id ? "copied" : ""}`}
                      onClick={(e) => copyPrompt(template, e)}
                    >
                      {copiedId === template.id ? (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Prompt Copied!
                        </>
                      ) : (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                          Copy AI Prompt
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Card Body Info */}
                <div className="template-card-content">
                  <div className="template-card-header">
                    <span className="template-industry-tag">{template.industry}</span>
                    <span className="template-fps-tag">{template.fps}</span>
                  </div>

                  <h3 className="template-card-title">{template.name}</h3>
                  <p className="template-card-tagline">{template.tagline}</p>

                  {/* Tech stack pills */}
                  <div className="template-tech-pills">
                    {template.tech.map((t) => (
                      <span key={t} className="template-tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Footer Actions */}
                  <div className="template-card-footer">
                    <button
                      type="button"
                      className="template-preview-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewTemplate(template);
                      }}
                    >
                      Explore Spec & Flow
                      <span className="template-arrow">→</span>
                    </button>

                    <Link
                      href={template.category === "landing" ? `/rent#${template.id.split("-")[0]}` : "/contact"}
                      className="template-deploy-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {template.category === "landing" ? "Rent Flagship" : "Deploy Component"}
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          {/* Scrolltide Style "The Studio" Callout Bento Card */}
          <Reveal delay={0.2}>
            <div className="template-card template-studio-card">
              <div className="template-studio-inner">
                <span className="template-studio-kicker">WEBSITE CLUB · PRIVATE BESPOKE STUDIO</span>
                <h3 className="template-studio-title">Want a one-of-a-kind 3D experience built exclusively for your brand?</h3>
                <p className="template-studio-desc">
                  Client flagship work engineered by our core studio — custom WebGL geometry, physics simulation, and brand storytelling that is never published to the public library.
                </p>
                <div className="template-studio-actions">
                  <Link href="/contact" className="template-studio-cta">
                    Start a Custom Studio Build →
                  </Link>
                  <Link href="/custom" className="template-studio-secondary">
                    View Bespoke Pipeline
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom Banner Stats */}
        <Reveal delay={0.25}>
          <div className="templates-bottom-banner">
            <div className="templates-stat-col">
              <span className="templates-stat-num">0%</span>
              <span className="templates-stat-label">Upfront Build Fee (on Rental)</span>
            </div>
            <div className="templates-stat-col">
              <span className="templates-stat-num">60 FPS</span>
              <span className="templates-stat-label">Locked WebGL & Mobile Shaders</span>
            </div>
            <div className="templates-stat-col">
              <span className="templates-stat-num">&lt; 1.2s</span>
              <span className="templates-stat-label">Edge Load & Zero Layout Shift</span>
            </div>
            <div className="templates-stat-col">
              <span className="templates-stat-num">100%</span>
              <span className="templates-stat-label">Custom Domain & Brand Integration</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* 3D Model Viewer Modal */}
      {activeModelId && (
        <ModelViewerModal
          modelId={activeModelId}
          onClose={() => setActiveModelId(null)}
        />
      )}

      {/* Quick Spec & AI Prompt Lightbox Modal */}
      {previewTemplate && (
        <div className="template-spec-modal-backdrop" onClick={() => setPreviewTemplate(null)}>
          <div className="template-spec-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="template-modal-close"
              onClick={() => setPreviewTemplate(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="template-modal-grid">
              {/* Media Left */}
              <div className="template-modal-media">
                <Image
                  src={previewTemplate.image}
                  alt={previewTemplate.name}
                  fill
                  className="template-modal-img"
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
                <div className="template-modal-media-badge">
                  <span>{previewTemplate.fps}</span>
                  <span>{previewTemplate.badge}</span>
                </div>
              </div>

              {/* Info Right */}
              <div className="template-modal-info">
                <div className="template-modal-kicker-row">
                  <span className="template-modal-kicker">{previewTemplate.categoryLabel.toUpperCase()}</span>
                  <span className="template-modal-industry">{previewTemplate.industry}</span>
                </div>

                <h2 className="template-modal-title">{previewTemplate.name}</h2>
                <p className="template-modal-tagline">{previewTemplate.tagline}</p>
                <p className="template-modal-body">{previewTemplate.description}</p>

                {/* Specs List */}
                <div className="template-modal-specs-block">
                  <h4 className="template-modal-specs-head">ARCHITECTURE & CAPABILITIES</h4>
                  <ul className="template-modal-specs-list">
                    {previewTemplate.specs.map((s) => (
                      <li key={s} className="template-modal-spec-item">
                        <span className="spec-bullet">✦</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Prompt Snippet (Scrolltide feature) */}
                <div className="template-modal-prompt-block">
                  <div className="template-modal-prompt-header">
                    <span className="prompt-label">AI PROMPT & TECHNICAL SPEC</span>
                    <button
                      type="button"
                      className="prompt-copy-btn"
                      onClick={() => copyPrompt(previewTemplate)}
                    >
                      {copiedId === previewTemplate.id ? "✓ Copied to Clipboard" : "Copy AI Prompt"}
                    </button>
                  </div>
                  <pre className="template-modal-prompt-code">{previewTemplate.promptSnippet}</pre>
                </div>

                {/* Modal Action CTA */}
                <div className="template-modal-actions">
                  {previewTemplate.modelId ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        const mid = previewTemplate.modelId!;
                        setPreviewTemplate(null);
                        setActiveModelId(mid);
                      }}
                    >
                      Launch Live 3D Orbit Viewer →
                    </button>
                  ) : (
                    <Link
                      href="/contact"
                      className="btn btn-primary"
                      onClick={() => setPreviewTemplate(null)}
                    >
                      Inquire / Deploy This Template →
                    </Link>
                  )}

                  {previewTemplate.category === "landing" && (
                    <Link
                      href={`/rent#${previewTemplate.id.split("-")[0]}`}
                      className="btn btn-secondary"
                      onClick={() => setPreviewTemplate(null)}
                    >
                      View Monthly Rental Terms
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
