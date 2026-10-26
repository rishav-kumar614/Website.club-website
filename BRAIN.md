# WEBSITE CLUB — ARCHITECTURAL BRAIN & SOURCE OF TRUTH (BRAIN.md)

> **Single Source of Truth for Future AI Agents, Engineers, and Maintainers.**  
> *Last Verified:* October 2026 · *Framework:* Next.js 15 (App Router) + React 19 + TypeScript + Three.js / R3F + GSAP + Framer Motion.

---

## 1. Executive Summary & Core Mission

**Website Club** (`https://website.club`) is a high-performance, conversion-engineered **3D and Interactive Web Studio**. The studio creates Awwwards-caliber digital flagships, turnkey 3D rentals, and drop-in spatial WebGL retrofits for ambitious modern brands.

### The Problem It Solves:
Traditional 3D websites are notorious for:
1. Massive initial download payloads (20MB - 50MB)
2. Crippling mobile framerates (15 - 25 FPS)
3. Poor Core Web Vitals and destroyed Google SEO equity
4. Months of custom development time with $50k+ upfront budgets

### The Architectural Solution:
Website Club employs a **Dual-Threaded WebGL Architecture**:
- First Contentful Paint paints raw semantic HTML in **under 400ms**.
- Draco-compressed glTF/USDZ geometry (1.2MB total payload) streams quietly via Web Workers.
- Locked **60 FPS** WebGL interaction with zero thread blocking (0ms Total Blocking Time).
- Drop-in retrofits that preserve existing Shopify checkouts, Next.js stacks, or WordPress CMS inventory without disruption.

---

## 2. System Architecture & Topology

```
c:\Users\Rishav\...\Websites.club website\
├── public/                     # Static WebGL textures, models, preview stills, icons
│   ├── service_rent_3d.jpg     # 3D Turnkey Rental preview asset
│   ├── service_build_3d.jpg    # 3D Custom Studio Build asset
│   ├── service_transform_3d.jpg# 3D Spatial Retrofit asset
│   ├── headphone_2d.jpg        # Transformation Before flat image
│   ├── headphone_3d.jpg        # Transformation After spatial image
│   └── (optimized WebP/AVIFs)
├── src/
│   ├── app/                    # Next.js 15 App Router Routes
│   │   ├── page.tsx            # High-converting streamlined 8-section Homepage
│   │   ├── layout.tsx          # Root layout with fonts, metadata, jsonLd
│   │   ├── globals.css         # Complete studio styling system (tokens, resets, layouts)
│   │   ├── sitemap.ts          # Dynamic XML Sitemap generator
│   │   ├── robots.ts           # Robots.txt rules
│   │   ├── opengraph-image.tsx # Dynamic OpenGraph social card renderer
│   │   ├── rent/               # Path 01: Turnkey 3D Rental Catalog
│   │   │   └── page.tsx        # Rental plans, filters, live 3D showcase
│   │   ├── custom/             # Path 02: Bespoke Digital Flagship
│   │   │   └── page.tsx        # Custom architectural commissions, CAD pipelines
│   │   ├── transform/          # Path 03: Spatial 3D Web Retrofit
│   │   │   └── page.tsx        # Drop-in WebGL layer for Shopify/WP/Webflow
│   │   ├── work/               # Full Studio Portfolio
│   │   │   ├── page.tsx        # Metadata & page wrapper
│   │   │   └── WorkPortfolioView.tsx # 6 deep case studies + WebGL model modal
│   │   └── performance/        # Developer Telemetry Console & Deep-Dive
│   │       ├── page.tsx        # Metadata & page wrapper
│   │       └── PerformanceDeepDive.tsx # Waterfall inspector & 6 architecture pillars
│   ├── components/             # Reusable UI & Feature Sections
│   │   ├── Navbar.tsx          # Fixed glassmorphic navigation header
│   │   ├── Hero.tsx            # Kinetic typography hero with direct /rent CTA
│   │   ├── Marquee.tsx         # Infinite typography marquee strip
│   │   ├── ServicePaths.tsx    # Pinned GSAP horizontal scrubbing rail (3 Paths)
│   │   ├── Transformation.tsx  # Before/After interactive slider & 6 retrofit layers
│   │   ├── RubiksCubeSection.tsx # Interactive 3D Rubik's Cube Spatial Lab on Homepage
│   │   ├── SelectedWork.tsx    # Curated studio case studies linking to /work
│   │   ├── Performance.tsx     # Telemetry Console component (standalone)
│   │   ├── PricingPreview.tsx  # Commercial economics and tier cards
│   │   ├── FAQ.tsx             # Interactive accordion FAQ
│   │   ├── FinalCTA.tsx        # High-impact closing CTA banner
│   │   ├── Footer.tsx          # Complete architectural 4-column studio footer
│   │   ├── ui/                 # Motion & Design Primitives
│   │   │   ├── Reveal.tsx      # Framer Motion powered scroll reveals & spring hovers
│   │   │   ├── SmoothScroll.tsx# Lenis smooth scrolling hooked to GSAP ticker
│   │   │   └── Spotlight.tsx   # Mouse cursor ambient radial lighting
│   │   └── visuals/            # Three.js, R3F & Visual Scene Hosts
│   │       ├── RubiksCube.tsx  # 4x4 Matrix math CSS 3D Rubik's Cube with inertia & auto-solver
│   │       ├── BrowserFrame.tsx# Mac window mockup chrome
│   │       ├── ModelViewerModal.tsx # Fullscreen interactive 3D model inspector
│   │       ├── HeroSquareBackground.tsx # Interactive WebGL canvas background
│   │       ├── FloatingCubesBackground.tsx # 3D ambient floating shapes
│   │       └── scenes/         # Pure Three.js / R3F shaders & geometry
│   └── lib/                    # Single Source of Data & Utilities
│       ├── content.ts          # Central data store (Services, Projects, FAQ, Links)
│       └── hooks.ts            # useInView, useMedia, useIntersectionObserver
├── package.json                # Dependencies: Next 15, React 19, Three.js, GSAP, Framer Motion
├── tsconfig.json               # Strict TypeScript configuration
└── AGENTS.md                   # Strict local Next.js agent directives
```

---

## 3. The 3 Core Commercial Paths

| Path | Route | Model | Target Customer | Value Proposition |
| :--- | :--- | :--- | :--- | :--- |
| **01 · Turnkey 3D Rental** | `/rent` | Subscription ($999/mo) | DTC brands, emerging founders, agencies | Live in 48 hours. Zero upfront build fee. Pre-engineered 3D flagship, domain connection, managed cloud. |
| **02 · Bespoke Digital Flagship** | `/custom` | Commission ($15k - $45k) | Luxury brands, hardware products, enterprise | 100% custom codebase. Custom GLSL shaders, CAD model optimization, locked 60 FPS mobile, bespoke brand narrative. |
| **03 · Spatial 3D Retrofit** | `/transform` | Modular Sprint ($4.5k - $9.5k) | Live Shopify, Next.js, WordPress storefronts | Zero CMS migration. Drop-in WebGL layer injected directly over existing cart, preserving 100% SEO rankings. |

---

## 4. Animation & Interaction Architecture

The project features a **two-tier animation pipeline** designed for maximum visual punch without CPU thrashing:

### Tier 1: GSAP ScrollTrigger + Lenis (`SmoothScroll.tsx` & `ServicePaths.tsx`)
- **Lenis Smooth Scroll** provides hardware-interpolated inertia scrolling:
  - Synchronized via `lenis.on('scroll', ScrollTrigger.update)`.
  - Driven by `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
  - `gsap.ticker.lagSmoothing(0)` prevents frame jumps during heavy GPU renders.
- **ServicePaths Pinned Horizontal Scroll**:
  - Pinned container: `.service-paths-pin-wrap` inside `.service-paths-section`.
  - Pinned at `start: "top top"` with `scrub: 0.7`.
  - Mathematically scrubs horizontal track across all 3 slides over `duration: 2.0`.
  - Clean card opacity/scaling transitions (1.0 active vs 0.45 inactive) with **zero blur filters** to preserve crystal-clear text readability.
  - Interactive bottom rail chips (`01 RENT`, `02 BUILD`, `03 TRANSFORM`) update dynamically and allow clicking to smoothly scroll to any slide.

### Tier 2: Framer Motion Primitives (`src/components/ui/Reveal.tsx`)
- **`Reveal`**: Powered by `whileInView={{ opacity: 1, y: 0 }}` with spring physics (`ease: [0.16, 1, 0.3, 1]`) and viewport thresholding (`margin: "-40px"`).
- **`RevealText`**: Word-by-word headline reveals with container variants (`staggerChildren: 0.05`).
- **`MotionStaggerContainer` & `MotionStaggerItem`**: Staggered cascading entry for bento grids (such as the 6 layers in `Transformation.tsx` and pricing cards).
- **`MotionCard` & `MotionButton`**: Spring hover elevations (`whileHover={{ y: -4, scale: 1.02 }}`) and tactile squash click feedback (`whileTap={{ scale: 0.97 }}`).

---

## 5. Dedicated Pages vs. Homepage Content Distribution

To prevent cognitive overload, the homepage is lean, fast, and high-converting. Heavy technical consoles are organized on dedicated pages:

1. **Homepage (`/`)**:
   - `Hero`: Clear 10-second value prop, direct CTA to `/rent`.
   - `Marquee`: Trust proof & tech badges.
   - `ServicePaths`: Pinned 3-card horizontal showcase.
   - `Transformation`: Before/After headphone slider + 6-layer modular retrofit bento grid.
   - `SelectedWork`: 2 featured projects + "View All 6+ Case Studies ➔" link to `/work`.
   - `PricingPreview`: Commercial tiers preview.
   - `FAQ`: 6 most frequent buyer questions.
   - `FinalCTA`: High-impact closing conversion card with interactive 3D model fallback.

2. **Dedicated Pages**:
   - `/rent`: Full rental catalog with interactive category filters, pricing breakdown, and onboarding checklist.
   - `/custom`: Deep-dive into bespoke CAD rendering, GLSL shaders, and commission process.
   - `/transform`: 6-layer spatial retrofit breakdown, Shopify/Next.js/WP drop-in demo, and 10-day timeline.
   - `/work`: Complete 6-case-study studio portfolio with `ModelViewerModal` for real-time 3D model interaction.
   - `/performance`: Developer telemetry console, live 1,000ms waterfall inspection, and 6 architecture pillars.

---

## 6. Data Architecture (`src/lib/content.ts`)

`src/lib/content.ts` acts as the single data dictionary for the entire studio:
- **`SERVICES`**: Metadata, pricing anchors, slugs, and taglines for Rent, Build, Transform.
- **`PROJECTS`**: Array of 6 flagship projects (Maison Spatial, Chrono Precision, Solace Audio, Aether Spatial, Lumina OS, Nexus VR) with tech tags, metrics, and GLTF asset paths.
- **`COMPARISON`**: 2D standard vs 3D Studio comparison matrix metrics.
- **`FAQ`**: Full FAQ questions, answers, and schema definitions.
- **`STUDIO_LINKS`**: Footer navigation structure divided into 4 semantic columns.
- **`METRICS`**: Core telemetry benchmarks (0.4s FCP, 60 FPS, 1.2MB, 0ms TBT).

---

## 7. Strict Operational & Security Rules

> [!IMPORTANT]
> **1. ABSOLUTELY NO `git push`**  
> Under NO circumstances should any automated tool or agent execute `git push` unless the user explicitly types the command or requests it directly.
>
> **2. Never run interactive shell commands that trigger prompts**  
> Run terminal commands with non-interactive flags. Avoid raw `git` commands that prompt for user elevation unless instructed.
>
> **3. React 19 & Next.js 15 Compatibility**  
> Next.js 15 breaking changes apply. Always adhere to `AGENTS.md`. Do not downgrade React or introduce legacy webpack plugins.
>
> **4. Styling Conventions**  
> Keep styles centralized in `src/app/globals.css`. Do not inject ad-hoc random inline styles or introduce Tailwind utility clutter unless explicitly structured. Use CSS custom properties (`--color-bg`, `--color-accent`, `--font-display`, `--font-mono`).

---

## 8. Development Runbook

### Local Development Server:
```bash
npm run dev
# Server runs on http://localhost:3000
```

### TypeScript Validation:
```bash
npm run lint
# Executes tsc --noEmit (must pass with 0 errors)
```

### Production Build:
```bash
npm run build
```

---

*This document is maintained as the authoritative design and technical specification for Website Club.*
