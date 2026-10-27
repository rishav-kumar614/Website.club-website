/**
 * Website Club Studio Knowledge Base & Query Resolver
 * Single source of truth for the interactive talk/contact assistant.
 * Contains verified website data for Rent, Custom Build, Transform, Performance, and Pricing.
 */

export interface PredefinedQuestion {
  id: string;
  label: string;
  question: string;
  answer: string;
}

export const PREDEFINED_QUESTIONS: PredefinedQuestion[] = [
  {
    id: "rent-pricing",
    label: "Rental pricing & plans",
    question: "How much does renting a 3D website cost, and what plans are available?",
    answer:
      "Rental flagships start at $490/mo for Maison (hospitality), $590/mo for Forma (architecture), and $690/mo for Orbit (hardware). There is zero setup fee, we launch in 48 hours to 10 days, and you can buy out the complete code after 12 months.",
  },
  {
    id: "transform-site",
    label: "Transform existing site",
    question: "Can you add 3D to my existing Shopify or WordPress site?",
    answer:
      "Yes! We drop a 60 FPS WebGL layer directly over your existing Shopify, Next.js, or WordPress storefront with zero CMS migration, preserving 100% of your cart and SEO rankings.",
  },
  {
    id: "custom-build",
    label: "Custom 3D build",
    question: "How long does a custom 3D build take and what is the process?",
    answer:
      "Custom builds run in a focused 3 to 4 week sprint with weekly private previews. We craft bespoke GLSL shaders, CAD model optimization, and you own 100% of the codebase.",
  },
  {
    id: "mobile-performance",
    label: "Mobile speed & 60 FPS",
    question: "Will 3D make my website slow on mobile?",
    answer:
      "Not at all. We lock 60 FPS on mobile using 20:1 Draco compression, off-thread Web Workers, and semantic HTML that paints in under 400ms without blocking the main thread.",
  },
  {
    id: "domain-ownership",
    label: "Domain & ownership",
    question: "Can I use my own domain, and who owns the website?",
    answer:
      "Every site connects to your custom domain with SSL and edge CDN included. Your brand and content are 100% yours, and rental plans include a full code buyout option after 12 months.",
  },
  {
    id: "models-assets",
    label: "3D models & assets",
    question: "Do you create the 3D models or do I supply them?",
    answer:
      "We do both! Our studio designs and sculpts custom 3D models in-house, or we can optimize your existing CAD, OBJ, or GLTF files for buttery 60 FPS WebGL.",
  },
  {
    id: "start-project",
    label: "Start a project",
    question: "How do I get started with Website Club?",
    answer:
      "Write to hello@websiteclub.com with your timeline, budget, and vision. We will assemble an architectural blueprint within 2 hours.",
  },
];

interface KnowledgeTopic {
  id: string;
  keywords: string[];
  patterns?: RegExp[];
  answer: string;
}

export const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  {
    id: "rent-general",
    keywords: ["rent", "renting", "rental", "subscription", "ready-made", "catalog", "monthly"],
    patterns: [/how.*rent/i, /rent.*work/i, /what.*rent/i],
    answer:
      "Renting gets you a ready-made, Awwwards-caliber 3D flagship site launched in 48 hours to 10 days. Zero upfront fee, custom domain DNS, edge hosting included, and full code buyout available after 12 months.",
  },
  {
    id: "rent-pricing",
    keywords: ["price", "pricing", "cost", "how much", "rate", "fee", "plans", "tiers", "dollars"],
    patterns: [/how much/i, /what.*cost/i, /pricing.*plans/i],
    answer:
      "Rental plans are: Maison at $490/mo (hospitality), Forma at $590/mo (architecture), and Orbit at $690/mo (hardware/tech). Transform retrofits start around $4,500, and bespoke custom builds run from $15k to $45k.",
  },
  {
    id: "maison",
    keywords: ["maison", "restaurant", "hospitality", "dining", "bar", "wine", "food", "café", "reservation", "opentable", "resy"],
    patterns: [/maison/i, /restaurant/i, /hospitality/i],
    answer:
      "Maison is our $490/month luxury hospitality flagship. It features GLSL liquid refraction shaders, sensory glassware, dynamic ambiance modes, and direct table booking with OpenTable, Resy, or SevenRooms.",
  },
  {
    id: "forma",
    keywords: ["forma", "architecture", "estate", "real estate", "villa", "property", "developer", "architect"],
    patterns: [/forma/i, /real estate/i, /architect/i],
    answer:
      "Forma is our $590/month architecture and luxury real estate flagship. It includes volumetric solar lighting, sunset-to-night transitions, axonometric floorplan lifts, and calendar viewing booking.",
  },
  {
    id: "orbit",
    keywords: ["orbit", "hardware", "gadget", "electronics", "audio", "device", "tech", "robotics", "headphone"],
    patterns: [/orbit/i, /hardware/i, /electronics/i],
    answer:
      "Orbit is our $690/month flagship for hardware, audio, and physical tech. It features 360° interactive orbit drag, an exploded component breakdown, telemetry hotspots, and Shopify or Stripe cart sync.",
  },
  {
    id: "transform",
    keywords: ["transform", "retrofit", "existing", "shopify", "wordpress", "wp", "webflow", "current site", "redesign", "upgrade"],
    patterns: [/existing site/i, /add 3d/i, /shopify/i, /wordpress/i, /transform/i],
    answer:
      "Our Transform service injects an interactive 60 FPS WebGL layer directly onto your live Shopify, Next.js, or WordPress store. There is zero CMS migration, and your inventory, checkout, and SEO rankings remain completely untouched.",
  },
  {
    id: "custom-build",
    keywords: ["custom", "build", "bespoke", "scratch", "original", "ground zero", "unique", "commission"],
    patterns: [/custom build/i, /from scratch/i, /bespoke/i],
    answer:
      "Custom builds are 100% original 3D flagships engineered around your brand narrative. Delivered in a 3 to 4 week sprint with weekly live previews, custom GLSL shaders, and 100% codebase and IP ownership.",
  },
  {
    id: "mobile-performance",
    keywords: ["mobile", "speed", "performance", "fps", "slow", "fast", "framerate", "phone", "draco", "lag", "latency", "loading"],
    patterns: [/slow/i, /fast/i, /on mobile/i, /60 fps/i, /fps/i],
    answer:
      "We guarantee locked 60 FPS on mobile. We use 20:1 Draco geometry compression, deferred off-thread Web Workers, and semantic HTML that paints in under 400ms so 3D never slows down your visitors.",
  },
  {
    id: "seo",
    keywords: ["seo", "google", "search", "ranking", "crawl", "index", "traffic"],
    patterns: [/hurt.*seo/i, /google/i, /search engine/i],
    answer:
      "3D never hurts your SEO. All copy, headings, and links live in semantic HTML that search engines crawl instantly. The WebGL canvas loads lazily after the readable page has already painted.",
  },
  {
    id: "domain-dns",
    keywords: ["domain", "dns", "ssl", "url", "mybrand", "registrar"],
    patterns: [/my own domain/i, /custom domain/i, /connect domain/i],
    answer:
      "Yes, every rental and custom project launches on your own custom domain (e.g., yourbrand.com). We configure DNS, automated SSL certificates, and Cloudflare Enterprise Edge CDN delivery for you.",
  },
  {
    id: "ownership-buyout",
    keywords: ["own", "ownership", "buyout", "buy", "purchase", "ip", "cancel", "license"],
    patterns: [/who owns/i, /can i buy/i, /buy out/i, /cancel/i],
    answer:
      "Your brand, content, and domain always belong 100% to you. On rentals, you can buy out the complete source code after 12 months. On custom builds, you own all the IP and code from day one.",
  },
  {
    id: "models",
    keywords: ["model", "models", "cad", "blender", "gltf", "glb", "obj", "step", "3d modeling", "assets"],
    patterns: [/do you make.*models/i, /create.*3d/i, /my own model/i],
    answer:
      "We do both! Our studio models, textures, and sculpts custom 3D assets in-house. If you already have CAD, STEP, OBJ, or GLTF files, our engineers optimize and Draco-compress them for real-time WebGL.",
  },
  {
    id: "timeline",
    keywords: ["timeline", "how long", "time", "launch", "duration", "hours", "weeks", "days"],
    patterns: [/how long.*take/i, /when.*launch/i, /turnaround/i],
    answer:
      "Rentals launch in 48 hours to 10 days. Transform retrofits take roughly 10 days. Fully bespoke custom 3D builds are delivered within a focused 3 to 4 week sprint.",
  },
  {
    id: "contact",
    keywords: ["contact", "email", "hello", "talk", "reach", "hire", "start", "quote", "blueprint"],
    patterns: [/how.*start/i, /contact/i, /reach out/i, /email/i],
    answer:
      "You can reach the studio directly at hello@websiteclub.com. Tell us your timeline, budget, and vision, and we will assemble an architectural blueprint within 2 hours.",
  },
  {
    id: "tech-stack",
    keywords: ["stack", "tech", "technology", "three.js", "threejs", "r3f", "react", "next.js", "nextjs", "webgl", "gsap", "lenis"],
    patterns: [/what tech/i, /framework/i, /built with/i],
    answer:
      "Our production stack is built on Next.js 15, React 19, TypeScript, Three.js / React Three Fiber, GSAP, Lenis smooth scrolling, and hardware-accelerated GLSL shaders.",
  },
  {
    id: "about-studio",
    keywords: ["who are you", "what is website club", "about", "what do you do", "studio", "w.c.l.u.b", "wclub", "bot", "assistant"],
    patterns: [/who are you/i, /what is website club/i, /about you/i],
    answer:
      "Website Club is a high-performance 3D and interactive web studio. We build Awwwards-caliber digital flagships, turnkey 3D rentals from $490/mo, and spatial retrofits for ambitious modern brands.",
  },
];

/**
 * Smart keyword & pattern scoring engine.
 * Resolves any visitor query against verified Website Club data.
 */
export function resolveWebsiteAnswer(query: string): string {
  if (!query || !query.trim()) {
    return "I'm here to answer anything about Website Club's 3D rentals, custom flagships, or retrofits. What would you like to know?";
  }

  const clean = query.toLowerCase().replace(/['"?!,.]/g, " ").trim();
  const words = clean.split(/\s+/).filter(Boolean);

  let bestTopic: KnowledgeTopic | null = null;
  let highestScore = 0;

  for (const topic of KNOWLEDGE_TOPICS) {
    let score = 0;

    // Pattern matching gets highest weight
    if (topic.patterns) {
      for (const pattern of topic.patterns) {
        if (pattern.test(query)) {
          score += 6;
        }
      }
    }

    // Keyword matching
    for (const kw of topic.keywords) {
      if (clean.includes(kw)) {
        score += kw.includes(" ") ? 4 : 2;
      }
      for (const w of words) {
        if (w.length > 2 && kw === w) {
          score += 1.5;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestTopic = topic;
    }
  }

  if (bestTopic && highestScore >= 2) {
    return bestTopic.answer;
  }

  // Graceful comprehensive fallback
  return "Website Club provides turnkey 3D website rentals from $490/mo, custom flagships in 3–4 weeks, and spatial retrofits for Shopify and WordPress. Reach out to hello@websiteclub.com with your project goals!";
}

/** Complete LLM System Knowledge Prompt */
export const WEBSITE_SYSTEM_PROMPT = `You are the interactive studio assistant for Website Club (https://website.club), an award-winning 3D and interactive web studio.

YOUR ROLE & TONE:
- Speak as W.C.L.U.B., the studio's friendly, confident, and knowledgeable assistant.
- Your answers are spoken and typed directly into a compact HUD on screen.
- Keep responses concise: 1 to 3 crisp, natural sentences.
- Never use markdown formatting (no bold asterisks, bullet lists, emojis, or raw URLs).
- Only provide factual answers based strictly on Website Club data below.

VERIFIED WEBSITE DATA:

1. RENT (Turnkey 3D Flagships):
- Subscription model: Choose a curated 3D flagship, tailored with your brand, colors, typography, and domain.
- Turnaround: Live in 48 hours to 10 days. Zero upfront build fee.
- Cancel anytime with 30 days notice. Full source code buyout option available after 12 months.
- Flagships:
  * Maison: $490/month. Best for luxury hospitality, dining, bars, wineries. Features GLSL refractive liquid glassware caustics, dynamic lighting, OpenTable/Resy/SevenRooms integrations.
  * Forma: $590/month. Best for architecture, prime real estate, and developers. Features volumetric solar lighting with sunset-to-night transitions, axonometric floorplan lift, and calendar viewing bookings.
  * Orbit: $690/month. Best for consumer hardware, electronics, audio, and frontier tech. Features 360° orbit drag, exploded component breakdown, spec telemetry hotspots, and Shopify/Stripe cart sync.

2. BUILD (Custom 3D Digital Flagships):
- 100% original, bespoke digital flagship built from ground zero.
- Timeline: Focused 3 to 4 week sprint. Weekly private preview builds.
- 100% client-owned code and bespoke IP. Custom GLSL shaders and CAD optimization.
- Investment: typically between $15,000 and $45,000+.

3. TRANSFORM (Spatial 3D Retrofits):
- Upgrade existing websites (Shopify, Next.js, WordPress, Webflow) by overlaying an interactive WebGL 3D layer.
- Zero CMS migration. Preserves your existing cart, inventory, checkout, and 100% SEO rankings.
- Timeline: 10-day modular sprint, starting from $4,500.

4. ENGINEERING & PERFORMANCE:
- Locked 60 FPS on mobile GPUs.
- 20:1 Draco compression with geometry streaming under 1.2MB total payload.
- First Contentful Paint in under 400ms. 0ms Total Blocking Time.
- Real HTML for all text, headings, and links so Google SEO is 100% preserved.
- Stack: Next.js 15, React 19, TypeScript, Three.js, React Three Fiber, GSAP, Lenis.

5. 3D MODELS & ASSETS:
- Studio designs and sculpts custom 3D models in-house.
- Also optimizes client CAD, STEP, OBJ, and GLTF models for real-time WebGL.

6. CONTACT & BLUEPRINT:
- Email: hello@websiteclub.com.
- Tell us your timeline, budget, and vision, and we provide an architectural blueprint within 2 hours.
`;
