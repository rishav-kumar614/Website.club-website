"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealText } from "./ui/Reveal";

interface ProjectDetail {
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

const FEATURED_PROJECTS: ProjectDetail[] = [
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
];

export function SelectedWork() {
  const [activeModalProject, setActiveModalProject] = useState<ProjectDetail | null>(null);

  return (
    <section id="work" className="section sw-section" aria-labelledby="work-title">
      <div className="wrap">
        {/* Section Header */}
        <div className="sw-header">
          <div className="sw-header-left">
            <span className="sw-eyebrow">
              <span className="sw-eyebrow-dot" />
              STUDIO PORTFOLIO &amp; PROOF
            </span>
            <RevealText id="work-title" text="Featured 3D Experiences" className="h2 sw-h2" />
          </div>

          <div className="sw-header-right">
            <Reveal delay={120}>
              <p className="sw-lead">
                Original 3D spatial flagships, custom WebGL hardware launches, and interactive concept experiences
                engineered to push the boundaries of modern digital craft.
              </p>
            </Reveal>

            {/* Link to Dedicated Work Archive */}
            <div className="sw-top-view-all">
              <Link href="/work" className="sw-explore-all-link">
                <span>View All 6+ Case Studies</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* 2 Featured Project Showcase Cards */}
        <div className="sw-grid">
          {FEATURED_PROJECTS.map((project, index) => (
            <Reveal
              as="article"
              key={project.id}
              delay={index * 100}
              className="sw-card"
            >
              {/* Visual Showcase Stage */}
              <div
                className="sw-media-stage"
                onClick={() => setActiveModalProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setActiveModalProject(project)}
                aria-label={`Inspect ${project.name} experience`}
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
                    Inspect Case Details
                  </span>
                </div>

                {/* Bottom Quick Telemetry */}
                <div className="sw-stage-telemetry">
                  <span className="sw-telemetry-item">
                    <strong>{project.metrics.dwellTime}</strong> Dwell Time
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
                    <span>View Case Study</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                  <a href="#contact" className="sw-request-similar">
                    Request similar build →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View All Projects Action Banner */}
        <Reveal delay={180} className="sw-view-all-banner">
          <div className="sw-view-all-content">
            <div>
              <span className="sw-banner-badge">✦ FULL STUDIO PORTFOLIO</span>
              <h4 className="sw-view-all-title">Explore our full archive of 3D spatial flagships</h4>
              <p className="sw-view-all-desc">
                From real-time climate GIS shaders to interactive furniture configurators and luxury audio flagships.
              </p>
            </div>
            <Link href="/work" className="btn btn-primary">
              <span>View All 6+ Case Studies</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>

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
                <a
                  href="#contact"
                  className="btn btn-primary"
                  onClick={() => setActiveModalProject(null)}
                >
                  <span>Inquire About Similar Build</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
