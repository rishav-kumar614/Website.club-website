// Plain data (no components) so server pages can use it for metadata, sitemap and JSON-LD.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const TEMPLATES_DATA = [
  {
    slug: "aurora", name: "Aurora", cat: "SaaS", price: 39, rent: 6, tech: ["GSAP", "CSS"],
    desc: "Gradient-mesh SaaS landing hero with an animated 3D-tilted dashboard, floating notifications and word-by-word headline reveal.",
    timeline: ["nav", "badge", "headline", "copy", "dashboard", "chips"],
    features: ["Animated gradient mesh background", "3D-tilted dashboard with growing chart", "Word-by-word masked headline", "Floating notification chips", "Fully responsive layout"],
  },
  {
    slug: "orbit", name: "Orbit", cat: "Agency", price: 49, rent: 8, tech: ["Three.js", "GSAP"],
    desc: "Editorial agency hero with a refractive glass 3D object that follows the cursor, masked line reveals and a client marquee.",
    timeline: ["nav", "tag", "headline", "copy", "canvas"],
    features: ["Refractive glass 3D object (Three.js)", "Cursor-reactive camera motion", "Masked line-by-line headline", "Infinite client marquee", "Procedural lighting, no HDR download"],
  },
  {
    slug: "noir", name: "Noir", cat: "Portfolio", price: 45, rent: 7, tech: ["Three.js", "GSAP"],
    desc: "Dark, giant-type portfolio hero with a reactive distorted wireframe, masked character reveal and a rotating role ticker.",
    timeline: ["nav", "name", "role", "meta", "canvas"],
    features: ["Distorted 3D wireframe that follows the cursor", "Giant masked character reveal", "Rotating role ticker", "Blend-mode headline", "Fully responsive layout"],
  },
  {
    slug: "arcade", name: "Arcade", cat: "Game", price: 35, rent: 5, tech: ["CSS 3D", "GSAP"],
    desc: "Synthwave game launch hero with an infinite perspective grid, glitch title and a pure CSS 3D neon cube.",
    timeline: ["sun", "cube", "title", "tagline", "button"],
    features: ["Infinite perspective grid floor", "Glitch title effect", "Pure CSS 3D neon cube (no WebGL)", "Neon glow call to action", "Lightweight, works on any device"],
  },
  {
    slug: "bloom", name: "Bloom", cat: "E-commerce", price: 55, rent: 9, tech: ["Three.js", "GSAP", "React"],
    desc: "Product hero with a live 3D headphone model and a color configurator, price block and add-to-cart call to action.",
    timeline: ["circle", "nav", "headline", "buy", "canvas", "tag"],
    features: ["Live 3D product model", "Color configurator with instant updates", "Price and add-to-cart block", "Cursor-reactive rotation", "Swap in your own GLB model"],
  },
  {
    slug: "terra", name: "Terra", cat: "Architecture", price: 42, rent: 6, tech: ["GSAP", "Parallax"],
    desc: "Serif architecture hero with a three-layer mouse-parallax skyline, line-draw intro and animated project stats.",
    timeline: ["line", "nav", "kicker", "headline", "copy", "stats", "skyline"],
    features: ["Three-layer mouse parallax skyline", "Line-draw intro animation", "Serif editorial typography", "Animated project stats", "Fully responsive layout"],
  },
  {
    slug: "lumen", name: "Lumen", cat: "Startup", price: 0, rent: 0, tech: ["GSAP", "CSS"], free: true,
    desc: "A free, minimal waitlist hero with soft glowing orbs, a word reveal and an email capture. A friendly starting point for any launch page.",
    timeline: ["nav", "badge", "headline", "form", "proof", "orbs"],
    features: ["Soft glowing orb background", "Word-by-word headline reveal", "Email capture form", "Social proof avatar row", "Free to use in personal and commercial projects"],
  },
  {
    slug: "helix", name: "Helix", cat: "3D", isNew: true, price: 59, rent: 10, tech: ["Three.js", "GSAP"],
    desc: "Dark 3D studio hero with a chrome torus knot that tumbles, floats and follows the cursor, plus a masked word-by-word headline.",
    timeline: ["nav", "tag", "headline", "copy", "canvas"],
    features: ["Chrome torus knot (Three.js)", "Cursor-reactive rotation and float", "Masked word-by-word headline", "Procedural studio lighting, no HDR download", "Fully responsive layout"],
  },
  {
    slug: "tidal", name: "Tidal", cat: "Landing Page", price: 52, rent: 9, tech: ["GSAP", "CSS"], isNew: true,
    desc: "Cinematic coastal hero with layered scrolling waves, rising bubbles and a masked serif headline reveal.",
    timeline: ["nav", "headline", "copy", "button", "waves"],
    features: ["Three parallax wave layers", "Rising bubble particles", "Masked line-by-line headline", "Pure CSS and GSAP, no WebGL", "Fully responsive layout"],
  },
  {
    slug: "prism", name: "Prism", cat: "Agency", price: 48, rent: 8, tech: ["GSAP", "CSS 3D"], isNew: true,
    desc: "Bright studio hero with a rotating conic-gradient orb, floating glass stat cards and pointer-driven 3D tilt.",
    timeline: ["nav", "headline", "copy", "orb", "cards"],
    features: ["Rotating conic-gradient orb", "Floating glassmorphism stat cards", "Pointer-driven 3D tilt", "Word-by-word headline reveal", "Lightweight, works on any device"],
  },
];

export const getTemplate = (slug) => TEMPLATES_DATA.find((t) => t.slug === slug);

export const LICENSES = [
  { id: "personal", name: "Personal", mult: 1, note: "1 project, non-commercial use" },
  { id: "commercial", name: "Commercial", mult: 2, note: "Unlimited client and business projects" },
  { id: "extended", name: "Extended", mult: 5, note: "Resale inside your own products" },
];

export function snippetFor(t) {
  const three = t.tech.includes("Three.js");
  const steps = t.timeline
    .map((s, i) => `    .from(".${s}", { y: 30, opacity: 0, duration: 0.8 }${i ? ', "-=0.45"' : ""})`)
    .join("\n");
  return `import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";${three ? '\nimport { Canvas } from "@react-three/fiber";' : ""}
import "./${t.slug}.css";

// Simplified excerpt. The full, commented source ships with your download.
export default function ${t.name}Hero() {
  useGSAP(() => {
    SplitText.create(".headline", { type: "lines", mask: "lines" });
    gsap.timeline({ defaults: { ease: "power3.out" } })
${steps};
  });

  return (
    <section className="${t.slug}-hero">
      <h1 className="headline">${t.desc.split(".")[0].split(" ").slice(0, 6).join(" ")}…</h1>${three ? "\n      <Canvas>{/* 3D scene */}</Canvas>" : ""}
    </section>
  );
}`;
}
