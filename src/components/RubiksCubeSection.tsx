"use client";

import React from "react";
import { Reveal, RevealText } from "./ui/Reveal";
import { RubiksCube } from "./visuals/RubiksCube";
import Link from "next/link";

export function RubiksCubeSection() {
  return (
    <section id="cube-lab" className="section cube-lab-section" aria-labelledby="cube-lab-title">
      <div className="wrap">
        {/* Section Header */}
        <div className="cube-lab-header">
          <div className="cube-lab-badge">
            <span className="badge-pulse" />
            <span>INTERACTIVE 3D LAB · ZERO BUNDLE OVERHEAD</span>
          </div>

          <RevealText
            id="cube-lab-title"
            text="Websites Shouldn't Just Sit There. Interact."
            as="h2"
            className="h2 cube-lab-h2"
          />

          <Reveal delay={100}>
            <p className="cube-lab-lead">
              Grab, spin, and scramble our pure mathematical 3D cube. Engineered with 4x4 matrix transformations,
              real-time kinetic inertia, and sub-millisecond physics — delivering 60 FPS spatial interactions
              without heavy canvas libraries.
            </p>
          </Reveal>

          {/* Technical Telemetry Badges */}
          <Reveal delay={180} className="cube-telemetry-row">
            <div className="cube-telemetry-pill">
              <span className="cube-telemetry-dot green" />
              <span>4x4 Matrix Kinematics</span>
            </div>
            <div className="cube-telemetry-pill">
              <span className="cube-telemetry-dot blue" />
              <span>CSS 3D Preserve-3D Engine</span>
            </div>
            <div className="cube-telemetry-pill">
              <span className="cube-telemetry-dot amber" />
              <span>Kinetic Inertia &amp; Spring Return</span>
            </div>
            <div className="cube-telemetry-pill">
              <span className="cube-telemetry-dot purple" />
              <span>Reverse Algorithmic Solver</span>
            </div>
          </Reveal>
        </div>

        {/* 3D Interactive Stage Canvas Card */}
        <Reveal delay={240} className="cube-stage-card">
          <div className="cube-stage-glow" aria-hidden="true" />
          <div className="cube-stage-content">
            <RubiksCube />
          </div>

          {/* Footer Callout within Card */}
          <div className="cube-card-footer">
            <div className="cube-footer-info">
              <span className="cube-footer-badge">TAILORED FOR YOUR STOREFRONT</span>
              <p className="cube-footer-text">
                Need bespoke 3D products, interactive configurators, or spatial storytelling on your site?
              </p>
            </div>
            <div className="cube-footer-actions">
              <Link href="/transform" className="cube-btn-ghost">
                Explore 3D Retrofits
              </Link>
              <Link href="/#contact" className="cube-btn-primary">
                Build Spatial Website →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
