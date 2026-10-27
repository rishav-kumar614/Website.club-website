import { PREDEFINED_QUESTIONS } from "@/lib/assistant-knowledge";

/**
 * Everything the assistant says.
 * Shared by the page (typing) and /api/speak (voice).
 */
export const LINES = {
  greeting: "Welcome to Website Club. I'm your interactive spatial assistant.",
  followUp: "We build turnkey 3D rentals from $490/mo, custom digital flagships, and spatial web retrofits. How can I help you today?",
  // Core predefined questions mapped to verified website data
  "rent-pricing":
    "Rental flagships start at $490/mo for Maison (hospitality), $590/mo for Forma (architecture), and $690/mo for Orbit (hardware). There is zero setup fee, we launch in 48 hours to 10 days, and you can buy out the complete code after 12 months.",
  "transform-site":
    "Yes! We drop a 60 FPS WebGL layer directly over your existing Shopify, Next.js, or WordPress storefront with zero CMS migration, preserving 100% of your cart and SEO rankings.",
  "custom-build":
    "Custom builds run in a focused 3 to 4 week sprint with weekly private previews. We craft bespoke GLSL shaders, CAD model optimization, and you own 100% of the codebase.",
  "mobile-performance":
    "Not at all. We lock 60 FPS on mobile using 20:1 Draco compression, off-thread Web Workers, and semantic HTML that paints in under 400ms without blocking the main thread.",
  "domain-ownership":
    "Every site connects to your custom domain with SSL and edge CDN included. Your brand and content are 100% yours, and rental plans include a full code buyout option after 12 months.",
  "models-assets":
    "We do both! Our studio designs and sculpts custom 3D models in-house, or we can optimize your existing CAD, OBJ, or GLTF files for buttery 60 FPS WebGL.",
  "start-project":
    "Write to hello@websiteclub.com with your timeline, budget, and vision. We will assemble an architectural blueprint within 2 hours.",

  // Legacy fallback aliases
  project: "Tell us about your timeline, budget, and vision. We'll assemble an architectural blueprint within 2 hours.",
  rent: "Turnkey 3D flagships customized for your brand and deployed in 10 days from $490/mo.",
  transform: "We overlay a buttery 60 FPS WebGL layer onto your existing Shopify, Next.js, or WordPress store.",
  tech: "20:1 Draco compression, offscreen Web Workers, and locked 60 FPS across mobile GPUs.",
  direct: "Studio line: hello@websiteclub.com. We read and respond to every inquiry.",
} as const;

export type LineId = keyof typeof LINES;

