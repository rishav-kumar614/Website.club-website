"use client";

import { useState } from "react";
import Image from "next/image";
import { WEBSITES } from "@/lib/content";
import { Reveal, RevealText } from "./ui/Reveal";
import { ModelViewerModal } from "./visuals/ModelViewerModal";

interface RentalConfig {
  kicker: string;
  tagline: string;
  subDescription: string;
  image: string;
  imageAlt: string;
  price: string;
  period: string;
  terms: string;
  specs: string[];
  liveUrl: string;
  badge: string;
  accentGlow: string;
}

const RENTAL_DETAILS: Record<string, RentalConfig> = {
  maison: {
    kicker: "01 — RESTAURANT & HOSPITALITY",
    tagline: "Sensory 3D Culinary Flagship",
    subDescription:
      "Crafted for Michelin-star restaurants, luxury cocktail lounges, and premier hospitality groups with interactive 3D glassware, ambient lighting shaders, and instant table reservations.",
    image: "/rental_maison_preview.jpg",
    imageAlt: "Maison - Luxury Restaurant 3D Website Preview",
    price: "$490",
    period: "/ month",
    terms: "Zero upfront build cost · Custom domain DNS · Cancel anytime",
    specs: ["WebGL 3D Glass Sculpture", "Interactive Reservation Drawer", "Sub-1s Global Edge Load", "Mobile-Optimized Shaders"],
    liveUrl: "maison.websiteclub.com",
    badge: "● 60 FPS Three.js",
    accentGlow: "radial-gradient(circle, rgba(217, 119, 6, 0.18) 0%, rgba(59, 130, 246, 0.12) 50%, transparent 72%)",
  },
  forma: {
    kicker: "02 — ARCHITECTURE & LUXURY REAL ESTATE",
    tagline: "Volumetric Spatial Architecture",
    subDescription:
      "Engineered for architectural studios, property developers, and luxury estates. Features volumetric daylight simulations, dynamic CAD wireframe toggles, and interactive 3D villa walkthroughs.",
    image: "/rental_forma_preview.jpg",
    imageAlt: "Forma - Architectural Real Estate 3D Website Preview",
    price: "$590",
    period: "/ month",
    terms: "Zero upfront build cost · Custom domain DNS · Cancel anytime",
    specs: ["Architectural 3D Pavilion", "Day / Night Shader Controls", "Blueprint Coordinate Overlays", "Ultra-HD Surface Textures"],
    liveUrl: "forma.websiteclub.com",
    badge: "● Spatial Shaders",
    accentGlow: "radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(96, 165, 250, 0.1) 50%, transparent 72%)",
  },
  orbit: {
    kicker: "03 — HARDWARE & FRONTIER TECH",
    tagline: "Exploded Hardware & Tech Motion",
    subDescription:
      "Designed for physical technology, audio equipment, and frontier hardware brands. Brings your product to life with an interactive exploded component view, 360° rotation canvas, and real-time telemetry.",
    image: "/rental_orbit_preview.jpg",
    imageAlt: "Orbit - Hardware Product 3D Website Preview",
    price: "$690",
    period: "/ month",
    terms: "Zero upfront build cost · Custom domain DNS · Cancel anytime",
    specs: ["Exploded Component Mesh", "360° Rotatable 3D Canvas", "Telemetry Spec Hotspots", "Haptic Sound & Micro-interactions"],
    liveUrl: "orbit.websiteclub.com",
    badge: "● Interactive 3D Canvas",
    accentGlow: "radial-gradient(circle, rgba(79, 70, 229, 0.22) 0%, rgba(37, 99, 235, 0.12) 50%, transparent 72%)",
  },
};

export function FeaturedWebsites() {
  const [activeModel, setActiveModel] = useState<"maison" | "forma" | "orbit" | null>(null);

  return (
    <section id="websites" className="section featured-websites-section" aria-labelledby="websites-title">
      <div className="wrap">
        {/* Editorial Section Header */}
        <div className="featured-head">
          <div className="featured-head-left">
            <span className="featured-kicker">✦ FLAGSHIP RENTAL COLLECTION</span>
            <RevealText
              id="websites-title"
              text="Curated 3D flagships. Ready to license."
              className="h2 featured-h2"
            />
          </div>
          <Reveal delay={120} className="featured-head-right">
            <p className="lead">
              Deploy an Awwwards-caliber 3D digital flagship on your own domain with zero upfront development cost.
              Fully hosted on global edge CDN, continuously maintained, and tailored to your identity.
            </p>
            <div className="featured-head-highlights">
              <span className="highlight-pill">✓ 48h Turnkey Setup</span>
              <span className="highlight-pill">✓ Custom Domain DNS</span>
              <span className="highlight-pill">✓ Continuous Shader Maintenance</span>
            </div>
          </Reveal>
        </div>

        {/* Stacked Interactive Showcases */}
        <div className="products">
          {WEBSITES.map((w, i) => {
            const details = RENTAL_DETAILS[w.id] || {
              kicker: `0${i + 1} — ${w.category.toUpperCase()}`,
              tagline: w.category,
              subDescription: w.body,
              image: "/rental_maison_preview.jpg",
              imageAlt: w.name,
              price: "$490",
              period: "/ month",
              terms: "Zero setup fee · Cancel anytime",
              specs: ["3D WebGL Model", "Custom Domain", "Mobile-Optimized", "Hosting Included"],
              liveUrl: `${w.id}.websiteclub.com`,
              badge: "● 60 FPS",
              accentGlow: "radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)",
            };

            const isFlipped = i % 2 === 1;

            return (
              <article
                key={w.id}
                data-spot
                className={`product ${isFlipped ? "flip" : ""}`}
                aria-labelledby={`p-${w.id}`}
              >
                {/* Visual Showcase Stage */}
                <Reveal className="product-visual">
                  <div className="product-visual-stage">
                    {/* Dynamic Ambient Glow Backdrop */}
                    <div
                      className="product-stage-ambient"
                      style={{ background: details.accentGlow }}
                      aria-hidden="true"
                    />

                    {/* Window Container */}
                    <div className="product-browser-frame">
                      {/* Browser Chrome Header */}
                      <div className="product-browser-header">
                        <div className="product-window-controls" aria-hidden="true">
                          <span className="dot dot-close" />
                          <span className="dot dot-min" />
                          <span className="dot dot-max" />
                        </div>
                        <div className="product-url-pill">
                          <svg
                            className="url-lock-icon"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M4.5 7V5.5C4.5 3.567 6.067 2 8 2C9.933 2 11.5 3.567 11.5 5.5V7M3 7H13V14H3V7Z"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="url-text">{details.liveUrl}</span>
                        </div>
                        <div className="product-fps-badge">
                          <span>{details.badge}</span>
                        </div>
                      </div>

                      {/* Screen Image Viewport */}
                      <div className="product-screen-viewport">
                        <Image
                          src={details.image}
                          alt={details.imageAlt}
                          width={1100}
                          height={620}
                          className="product-screen-image"
                          priority={i === 0}
                        />
                        <button
                          type="button"
                          onClick={() => setActiveModel(w.id as "maison" | "forma" | "orbit")}
                          className="product-hover-overlay"
                          aria-label={`Launch interactive 3D model simulation for ${w.name}`}
                        >
                          <span className="hover-demo-btn">
                            <span>Launch Live 3D Model</span>
                            <svg viewBox="0 0 16 16" fill="none" className="hover-arrow" aria-hidden="true">
                              <path
                                d="M3.5 12.5L12.5 3.5M12.5 3.5H6.5M12.5 3.5V9.5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Content Details Column */}
                <Reveal delay={120} className="product-text">
                  <div className="product-meta-header">
                    <span className="product-kicker">{details.kicker}</span>
                    <span className="product-tagline-badge">{details.tagline}</span>
                  </div>

                  <h3 id={`p-${w.id}`} className="product-title">
                    {w.name}
                  </h3>

                  <p className="product-desc">{details.subDescription}</p>

                  {/* Capability Chips */}
                  <div className="product-capabilities" aria-label="Included specifications">
                    {details.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="capability-tag">
                        <i className="capability-dot" />
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Pricing & Guarantee Box */}
                  <div className="product-commercial-box">
                    <div className="product-pricing-row">
                      <span className="pricing-from-label">Subscription</span>
                      <div className="pricing-amount-group">
                        <span className="pricing-figure">{details.price}</span>
                        <span className="pricing-unit">{details.period}</span>
                      </div>
                    </div>
                    <p className="product-terms-note">{details.terms}</p>
                  </div>

                  {/* Action CTAs */}
                  <div className="product-actions-row">
                    <a href="#contact" className="product-cta-primary">
                      <span>Rent {w.name}</span>
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
                    <button
                      type="button"
                      onClick={() => setActiveModel(w.id as "maison" | "forma" | "orbit")}
                      className="product-cta-secondary"
                      aria-label={`Launch 3D simulation for ${w.name}`}
                    >
                      <span>Interactive 3D Demo</span>
                      <svg viewBox="0 0 16 16" fill="none" className="secondary-arrow" aria-hidden="true">
                        <path
                          d="M3 8H13M13 8L9 4M13 8L9 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>

        {/* Deep Dive Collection Banner linking to /rent */}
        <Reveal delay={200} className="featured-catalog-cta-banner">
          <div className="catalog-cta-ambient" aria-hidden="true" />
          <div className="catalog-cta-inner">
            <div className="catalog-cta-left">
              <span className="catalog-cta-tag">✦ THE FULL 3D RENTAL COLLECTION</span>
              <h3 className="catalog-cta-title">Want to test and compare all 3D flagships?</h3>
              <p className="catalog-cta-desc">
                Explore our full catalog on the dedicated Rentals page — complete with category filters, full-screen 3D model sandboxes, launch timelines, and complete licensing FAQs.
              </p>
            </div>
            <div className="catalog-cta-right">
              <a href="/rent" className="catalog-cta-button">
                <span>View Full Rental Catalog</span>
                <svg viewBox="0 0 16 16" fill="none" className="catalog-cta-arrow" aria-hidden="true">
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
          </div>
        </Reveal>
      </div>

      {/* Fullscreen Interactive 3D Model Viewer Modal */}
      <ModelViewerModal
        modelId={activeModel}
        onClose={() => setActiveModel(null)}
      />
    </section>
  );
}
