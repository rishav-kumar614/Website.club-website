"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { ModelViewerModal } from "@/components/visuals/ModelViewerModal";
import { FinalCTA } from "@/components/FinalCTA";
import { Spotlight } from "@/components/ui/Spotlight";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { RentFx } from "@/components/rent/RentFx";
import { RentCalculator } from "@/components/rent/RentCalculator";
import { RentBrandPreview } from "@/components/rent/RentBrandPreview";
import "./rent-extra.css";

interface FlagshipModel {
  id: "maison" | "forma" | "orbit";
  name: string;
  category: string;
  industry: "hospitality" | "architecture" | "tech";
  industryLabel: string;
  kicker: string;
  tagline: string;
  description: string;
  image: string;
  price: string;
  period: string;
  terms: string;
  specs: string[];
  features: string[];
  liveUrl: string;
  badge: string;
  accentGlow: string;
  highlightTag: string;
}

const FLAGSHIPS: FlagshipModel[] = [
  {
    id: "orbit",
    name: "Orbit",
    category: "Hardware & Frontier Tech",
    industry: "tech",
    industryLabel: "Product & Frontier Tech",
    kicker: "FLAGSHIP 01 · HARDWARE & ROBOTICS",
    tagline: "Exploded Spatial Audio & Device Architecture",
    description:
      "For gadgets, audio gear and electronics. Visitors spin the product, pull it apart to see inside, and tap hotspots for specs.",
    image: "/rental_orbit_preview.jpg",
    price: "$690",
    period: "/ month",
    terms: "Zero setup fee · Custom domain DNS · Cancel anytime",
    specs: ["Exploded Three.js Component Mesh", "360° Drag & Orbit Controls", "Telemetry Spec Hotspots", "CAD Wireframe & Dark Mode"],
    features: [
      "Spin the product and pull it apart in 3D",
      "Switch colorways and a wireframe view",
      "Syncs with your Shopify or Stripe cart",
    ],
    liveUrl: "orbit.websiteclub.com",
    badge: "● Live WebGL 2.0 · 60 FPS",
    accentGlow: "radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(37, 99, 235, 0.12) 50%, transparent 72%)",
    highlightTag: "Best for Physical Tech & Hardware",
  },
  {
    id: "maison",
    name: "Maison",
    category: "Restaurant & Culinary Hospitality",
    industry: "hospitality",
    industryLabel: "Culinary & Luxury Hospitality",
    kicker: "FLAGSHIP 02 · LUXURY HOSPITALITY",
    tagline: "Sensory Refractive Glassware & Ambient Dining",
    description:
      "For restaurants, bars and wineries. A glass of 3D liquid sets the mood, and guests book a table without leaving the page.",
    image: "/rental_maison_preview.jpg",
    price: "$490",
    period: "/ month",
    terms: "Zero setup fee · Custom domain DNS · Cancel anytime",
    specs: ["GLSL Liquid Refraction Shaders", "Interactive Table Booking Drawer", "Effervescent Champagne Micro-particles", "Sub-1s Global Edge Load"],
    features: [
      "Realistic 3D glass and liquid that reacts as you move",
      "Pick the mood: crystal, amber or emerald",
      "Connects to OpenTable, Resy or SevenRooms",
    ],
    liveUrl: "maison.websiteclub.com",
    badge: "● Sensory GLSL Caustics",
    accentGlow: "radial-gradient(circle, rgba(217, 119, 6, 0.2) 0%, rgba(59, 130, 246, 0.12) 50%, transparent 72%)",
    highlightTag: "Best for Fine Dining & Nightlife",
  },
  {
    id: "forma",
    name: "Forma",
    category: "Architecture & Luxury Real Estate",
    industry: "architecture",
    industryLabel: "Architecture & Prime Estates",
    kicker: "FLAGSHIP 03 · MODERNIST REAL ESTATE",
    tagline: "Volumetric Spatial Pavilion & Villa Walkthrough",
    description:
      "For architects and property developers. Visitors watch a villa move from day to night, lift the roof to see inside, and book a viewing.",
    image: "/rental_forma_preview.jpg",
    price: "$590",
    period: "/ month",
    terms: "Zero setup fee · Custom domain DNS · Cancel anytime",
    specs: ["Volumetric Solar Lighting Shader", "CAD Blueprint Coordinate Grid", "Axonometric Floorplan Lift", "Ultra-HD Surface Textures"],
    features: [
      "Switch between sunset, day and night lighting",
      "Lift the roof to reveal the floor plan",
      "Viewing request form with calendar sync",
    ],
    liveUrl: "forma.websiteclub.com",
    badge: "● Spatial Ray-Marching",
    accentGlow: "radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(96, 165, 250, 0.1) 50%, transparent 72%)",
    highlightTag: "Best for Developers & Architects",
  },
];

const RENTAL_FAQS = [
  {
    q: "How does renting a 3D website work?",
    a: "You select a curated 3D flagship architecture that aligns with your brand. Within 48 hours, our studio injects your branding (logo, colors, typography, imagery, product copy), sets up your custom domain DNS, and launches the site live on Cloudflare Enterprise Edge CDN with zero upfront development fees.",
  },
  {
    q: "Can I use my own custom domain (e.g. mybrand.com)?",
    a: "Absolutely. We provide simple DNS instructions or handle the configuration directly with your domain registrar. Your visitors only see your custom brand domain with full automated SSL certification.",
  },
  {
    q: "What if I want to update text, products, or images later?",
    a: "Every rental comes with access to an intuitive CMS dashboard or a dedicated Slack concierge channel where our studio makes routine content updates for you within 24 hours.",
  },
];

const INCLUDED = [
  ["◎", "Your domain + SSL", "We connect mybrand.com, certificates and DNS. You do nothing.", "🔒 mybrand.com"],
  ["⚡", "Edge CDN hosting", "Fast global delivery, uptime monitoring and zero hosting bills.", "Fast everywhere"],
  ["✎", "Content updates", "CMS access or a Slack concierge. Routine edits live within 24 hours.", "Edits live in < 24h"],
  ["↗", "Analytics + SEO", "Metadata, schema and performance budgets tuned for search from day one.", "Schema · Metadata"],
] as const;

const STEPS = [
  ["01", "Hour 0", "Pick a flagship", "Choose the 3D architecture that fits your category."],
  ["02", "< 24 hours", "We tailor it", "Brand colors, type, copy and lighting moods injected."],
  ["03", "Hour 48", "Go live", "Domain, SSL and edge caching connected. You launch."],
  ["04", "Always", "We maintain it", "Shader tuning, monitoring and content updates included."],
] as const;

export default function RentPage() {
  const [activeModel, setActiveModel] = useState<"maison" | "forma" | "orbit" | null>(null);
  const [picked, setPicked] = useState<FlagshipModel["id"] | null>(null);

  const pick = (id: FlagshipModel["id"]) => {
    document.getElementById(`fl-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    setPicked(id);
    window.setTimeout(() => setPicked(null), 1800);
  };

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <SmoothScroll />
      <Spotlight />
      <Navbar />
      <RentFx />

      <main id="main" className="rp">
        {/* ───────── Hero: headline + fanned flagship cards ───────── */}
        <section className="rp-hero" aria-labelledby="rent-hero-title">
          <div className="wrap">
            <span className="rp-badge">
              <span className="badge-dot" />
              THE 3D FLAGSHIP RENTAL COLLECTION
            </span>

            <RevealText
              id="rent-hero-title"
              text="Rent a 3D flagship. Live in 48 hours."
              as="h1"
              className="display rp-h1"
            />

            <p className="lead rp-lead">
              Award-level interactive websites on your own domain, for a flat monthly fee. No build cost, no developers,
              no maintenance.
            </p>

            <div className="rp-hero-cta">
              <a href="#flagships" className="rp-btn rp-btn-dark">
                Browse the 3 flagships <span aria-hidden="true">↓</span>
              </a>
              <a href="#contact" className="rp-btn rp-btn-ghost">
                Talk to us
              </a>
            </div>

            <div className="rp-fan" aria-hidden="true">
              {[FLAGSHIPS[1], FLAGSHIPS[0], FLAGSHIPS[2]].map((f, i) => (
                <div key={f.id} className={`rp-fan-card rp-fan-${i}`}>
                  <Image src={f.image} alt="" width={640} height={400} />
                  <span>{f.name}</span>
                </div>
              ))}
            </div>

            <dl className="rp-metrics">
              {[
                ["48 Hours", "to launch"],
                ["$0", "upfront build fee"],
              ].map(([v, l]) => (
                <div key={l} className="rp-metric">
                  <dd className="rp-num">{v}</dd>
                  <dt>{l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ───────── Which flagship fits you? ───────── */}
        <section className="rx-pick" aria-labelledby="rx-pick-title">
          <div className="wrap">
            <div className="rp-sec-head" style={{ marginBottom: 28 }}>
              <span className="rp-kicker">FIND YOUR FIT</span>
              <h2 id="rx-pick-title" className="rp-h2">Which flagship fits you?</h2>
            </div>
            <div className="rx-pick-grid">
              {[
                ["maison", "Restaurants & bars", "I run a restaurant, bar or winery", "Maison", FLAGSHIPS[1].price],
                ["forma", "Property & design", "I sell property or design buildings", "Forma", FLAGSHIPS[2].price],
                ["orbit", "Products & gadgets", "I sell a physical product", "Orbit", FLAGSHIPS[0].price],
              ].map(([id, tag, line, name, price]) => (
                <button key={id} type="button" className="rx-pick-btn" onClick={() => pick(id as FlagshipModel["id"])}>
                  <small>{tag}</small>
                  <b>{line}</b>
                  <span>
                    {name} · {price}/month
                  </span>
                  <em>
                    See {name} <i aria-hidden="true">↓</i>
                  </em>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Flagships: sticky visual + scrolling details ───────── */}
        <section id="flagships" className="rp-showcase" aria-label="Available 3D website models">
          <div className="wrap">
            <div className="rp-sec-head">
              <span className="rp-kicker">THE COLLECTION</span>
              <h2 className="rp-h2">Three flagships. Pick your world.</h2>
            </div>

            {FLAGSHIPS.map((f, i) => (
              <article key={f.id} id={`fl-${f.id}`} data-spot className={`rp-item ${i % 2 ? "flip" : ""} ${picked === f.id ? "is-picked" : ""}`} aria-labelledby={`flagship-${f.id}`}>
                <div className="rp-visual">
                  <div className="rp-frame">
                    <div className="rp-glow" style={{ background: f.accentGlow }} aria-hidden="true" />
                    <div className="rp-shot">
                      <Image
                        src={f.image}
                        alt={`${f.name} - 3D Website Preview`}
                        width={1100}
                        height={620}
                        className="rp-shot-img"
                        priority={i === 0}
                      />
                    </div>
                    <span className="rp-chip rp-chip-a">{f.badge}</span>
                    <span className="rp-chip rp-chip-b">Live 3D demo</span>
                    <button
                      type="button"
                      className="rp-orbit"
                      onClick={() => setActiveModel(f.id)}
                      aria-label={`Launch real-time 3D simulation for ${f.name}`}
                    >
                      <svg viewBox="0 0 120 120" className="rp-orbit-ring" aria-hidden="true">
                        <defs>
                          <path id={`ring-${f.id}`} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                        </defs>
                        <text>
                          <textPath href={`#ring-${f.id}`}>LIVE 3D · DRAG TO ORBIT · LIVE 3D · DRAG TO ORBIT ·</textPath>
                        </text>
                      </svg>
                      <span className="rp-orbit-core" aria-hidden="true">
                        ↗
                      </span>
                    </button>
                  </div>
                </div>

                <div className="rp-info">
                  <span className="rp-big-n" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="rp-kicker">{f.kicker}</span>
                  <h2 id={`flagship-${f.id}`} className="rp-name">
                    {f.name}
                  </h2>
                  <p className="rp-tagline">{f.tagline}</p>
                  <p className="rp-desc">{f.description}</p>

                  <ul className="rp-feats">
                    {f.features.map((feat) => (
                      <li key={feat}>
                        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <circle cx="8" cy="8" r="7" fill="rgba(37,99,235,.12)" />
                          <path d="M5 8.2L7 10.2L11 5.8" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="rp-buy">
                    <div className="rp-price">
                      <span className="rp-price-fig">{f.price}</span>
                      <span className="rp-price-unit">{f.period}</span>
                    </div>
                    <div className="rp-buy-actions">
                      <a href="#contact" className="rp-btn rp-btn-blue">
                        Reserve {f.name} <span aria-hidden="true">↗</span>
                      </a>
                      <button type="button" className="rp-btn rp-btn-ghost" onClick={() => setActiveModel(f.id)}>
                        Live demo
                      </button>
                    </div>
                  </div>
                  <p className="rp-terms">{f.terms}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ───────── Make it yours ───────── */}
        <section className="rp-section" aria-labelledby="rx-brand-title" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <div className="rp-sec-head">
              <span className="rp-kicker">MAKE IT YOURS</span>
              <h2 id="rx-brand-title" className="rp-h2">See it in your brand.</h2>
              <p className="lead">Type your name, pick a color. We apply the full branding within 24 hours.</p>
            </div>
            <RentBrandPreview />
          </div>
        </section>

        {/* ───────── Process + what is included (merged) ───────── */}
        <section className="rp-section rp-process" aria-labelledby="rent-flow-title">
          <div className="wrap">
            <div className="rp-sec-head">
              <span className="rp-kicker">TURNKEY ONBOARDING</span>
              <h2 id="rent-flow-title" className="rp-h2">Everything handled. Live in 48 hours.</h2>
            </div>
            <div className="rp-steps">
              <div className="rp-line" aria-hidden="true">
                <i />
              </div>
              {STEPS.map(([n, when, t, d]) => (
                <div key={n} className="rp-step">
                  <span className="rp-node">{n}</span>
                  <small>{when}</small>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
            <div className="rx-incl" style={{ marginTop: 56 }}>
              {INCLUDED.map(([ic, t, d, chip], i) => (
                <div key={t} className="rx-incl-card" style={{ "--i": i } as React.CSSProperties}>
                  <div className="top">
                    <span className="ic" aria-hidden="true">
                      {ic}
                    </span>
                    <span className="inc">
                      <i aria-hidden="true">✓</i> Included
                    </span>
                  </div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                  <span className="vis">{chip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RentCalculator />

        {/* ───────── Terms at a glance ───────── */}
        <section className="rp-section" aria-labelledby="rx-terms-title" style={{ paddingBottom: 0 }}>
          <div className="wrap">
            <div className="rp-sec-head">
              <span className="rp-kicker">THE FINE PRINT, SIMPLY</span>
              <h2 id="rx-terms-title" className="rp-h2">Rental terms at a glance.</h2>
            </div>
            <div className="rx-terms">
              {[
                ["◎", "What you get", "A flagship on your own domain, hosting, SSL, upkeep and routine content updates."],
                ["✎", "What you can change", "Text, images, products and brand colors. Send changes and they go live within 24 hours."],
                ["↺", "Leaving", "No lock-in. Pause or cancel with 30 days notice, with a clean export of your data."],
                ["⌘", "Owning it", "After 12 months you can buy out the full source code at a pre-agreed rate."],
              ].map(([ic, t, d]) => (
                <div key={t} className="rx-term">
                  <i aria-hidden="true">{ic}</i>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FAQ accordion ───────── */}
        <section className="rp-section" aria-labelledby="rent-faq-title">
          <div className="wrap rp-faq-wrap">
            <div className="rp-sec-head">
              <span className="rp-kicker">FAQ</span>
              <h2 id="rent-faq-title" className="rp-h2">Questions, answered.</h2>
              <p className="lead">The basics of getting live.</p>
            </div>
            <div className="rp-faq">
              {RENTAL_FAQS.map((faq, i) => (
                <details key={faq.q} className="rp-faq-item" open={i === 0}>
                  <summary>
                    <span>{faq.q}</span>
                    <i aria-hidden="true" />
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />

      <ModelViewerModal modelId={activeModel} onClose={() => setActiveModel(null)} />
    </>
  );
}
