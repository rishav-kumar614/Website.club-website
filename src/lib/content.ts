export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://websiteclub.com";

export const NAV_LINKS = [
  { label: "Templates", href: "/#templates" },
  { label: "Rent 3D", href: "/rent" },
  { label: "Custom 3D", href: "/custom" },
  { label: "Transform", href: "/transform" },
  { label: "Work", href: "/work" },
  { label: "Performance", href: "/performance" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Talk", href: "/contact" },
] as const;

export const SERVICES = [
  {
    id: "rent",
    n: "01",
    title: "Rent",
    body: "Choose one of our ready-made 3D websites, customize it for your brand, connect your domain, and launch.",
    cta: "Browse Websites",
    href: "/rent",
  },
  {
    id: "build",
    n: "02",
    title: "Build",
    body: "We design and develop a completely original 3D website around your brand, product, and story.",
    cta: "Build My Website",
    href: "/custom",
  },
  {
    id: "transform",
    n: "03",
    title: "Transform",
    body: "Already have a website? We upgrade it with immersive 3D, motion, interactions, and WebGL experiences.",
    cta: "Transform My Site",
    href: "/transform",
  },
] as const;

export const WEBSITES = [
  {
    id: "maison",
    name: "Maison",
    category: "Restaurant / Hospitality",
    body: "An immersive digital experience for restaurants, cafés, and premium hospitality brands.",
  },
  {
    id: "forma",
    name: "Forma",
    category: "Architecture / Real Estate",
    body: "A cinematic 3D experience for architects, developers, and luxury property brands.",
  },
  {
    id: "orbit",
    name: "Orbit",
    category: "Product / Technology",
    body: "An interactive product-focused website designed around 3D storytelling and motion.",
  },
] as const;

export const STEPS = [
  { n: "01", title: "Choose", body: "Pick a Website Club experience from our collection." },
  {
    n: "02",
    title: "Customize",
    body: "We replace the branding, copy, imagery, colors, products, and information with yours.",
  },
  { n: "03", title: "Launch", body: "Connect your domain and take your new website live." },
  {
    n: "04",
    title: "Stay covered",
    body: "Hosting, maintenance, and support are included in your monthly plan.",
  },
] as const;

export const CAPABILITIES = [
  "Strategy",
  "Creative Direction",
  "UI/UX",
  "3D Design",
  "3D Modeling",
  "Motion",
  "WebGL",
  "Development",
  "Responsive Design",
  "Performance Optimization",
] as const;

export const TRANSFORM_OPTIONS = [
  "3D hero experiences",
  "Interactive product models",
  "Scroll animations",
  "WebGL scenes",
  "Motion design",
  "3D environments",
  "Advanced transitions",
  "Micro-interactions",
  "Interactive storytelling",
] as const;

export const WHY = [
  {
    title: "Designed for attention",
    body: "We create experiences that encourage people to stop, interact, and explore.",
  },
  {
    title: "3D without the headache",
    body: "We handle the design, development, optimization, and technical complexity.",
  },
  {
    title: "Multiple ways to work together",
    body: "Rent an existing experience, commission something original, or transform what you already have.",
  },
  {
    title: "Performance still matters",
    body: "3D should enhance your website, not make it unusable. Every experience should be optimized for real devices.",
  },
] as const;

export type WorkVisual = "shift" | "contour" | "ring" | "blocks";

export const WORK: readonly {
  name: string;
  industry: string;
  type: string;
  label: string;
  body: string;
  visual: WorkVisual;
  tags: readonly string[];
}[] = [
  {
    name: "Halo",
    industry: "Audio hardware",
    type: "Custom Build",
    label: "Concept Experience",
    body: "A product launch site where the headphones are the interface: scroll to disassemble, hover to hear each driver.",
    visual: "ring",
    tags: ["3D", "Product model", "Scroll motion"],
  },
  {
    name: "Meridian",
    industry: "Architecture",
    type: "3D Transformation",
    label: "Concept Experience",
    body: "A flat project gallery rebuilt as a walkable scale model, with plans that lift into volumes as you scroll.",
    visual: "shift",
    tags: ["3D environment", "Motion", "Transformation"],
  },
  {
    name: "Strata",
    industry: "Geospatial data",
    type: "Website Club Original",
    label: "Website Club Original",
    body: "Terrain rendered in layered contours, used to explain data one depth at a time.",
    visual: "contour",
    tags: ["WebGL", "Data", "Storytelling"],
  },
  {
    name: "Assembly",
    industry: "Furniture / Retail",
    type: "Custom Build",
    label: "Concept Experience",
    body: "A configurator concept where each product assembles itself in front of you, part by part.",
    visual: "blocks",
    tags: ["3D", "Configurator", "Micro-interactions"],
  },
];

export const PRICING = [
  {
    id: "rent",
    name: "Rent",
    model: "Monthly pricing",
    price: "From $___",
    unit: "/ month",
    items: ["Website design", "Brand customization", "Hosting", "Maintenance", "Support"],
    cta: "Explore Websites",
    href: "#websites",
  },
  {
    id: "custom",
    name: "Custom",
    model: "Project-based pricing",
    price: "From $___",
    unit: "/ project",
    items: ["Strategy", "Design", "3D", "Development", "Launch"],
    cta: "Start a Project",
    href: "#contact",
    featured: true,
  },
  {
    id: "transform",
    name: "Transform",
    model: "Scope-based pricing",
    price: "From $___",
    unit: "/ scope",
    items: ["Website audit", "Creative direction", "3D upgrades", "Motion", "Development"],
    cta: "Transform My Website",
    href: "#transform",
  },
] as const;

export const FAQ = [
  {
    q: "What does renting a website mean?",
    a: "You pick a finished Website Club experience, we customize it with your brand, content and domain, and you pay a monthly plan instead of a large upfront build cost. Hosting, maintenance and support are part of that plan.",
  },
  {
    q: "Can I use my own domain?",
    a: "Yes. Every rental launches on your own domain. We handle the DNS and SSL setup with you.",
  },
  {
    q: "Can you customize a rental website?",
    a: "Yes. We replace the branding, copy, imagery, colors, products and information. Deeper structural changes can be scoped as a custom project.",
  },
  {
    q: "Can another company use the same design?",
    a: "Rental designs are shared starting points, so the underlying layout can appear with more than one client. Your branding, content and domain are your own, and we can discuss exclusivity for specific designs.",
  },
  {
    q: "What happens if I stop paying?",
    a: "A rental is a subscription. If you cancel, the site is taken offline at the end of your paid period. The rental terms cover the details, including how to export your content.",
  },
  {
    q: "How long does it take to launch?",
    a: "Rentals are the fastest path because the experience already exists. Timelines depend on how much content and customization you need; we give you a clear schedule before work starts.",
  },
  {
    q: "Do you build completely custom websites?",
    a: "Yes. We design and develop original interactive 3D websites around your brand, product and story, from strategy through launch.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes. We can rebuild it from scratch, or keep what works and add 3D, motion and interactive sections on top of it.",
  },
  {
    q: "Do you create the 3D models?",
    a: "Yes. 3D design and modeling are part of the studio. If you already have models, we can optimize and use them.",
  },
  {
    q: "Will the website work on mobile?",
    a: "Yes. Mobile is designed separately, not shrunk down from desktop. Scenes are simplified, and heavier ones fall back to rendered imagery or video where needed.",
  },
  {
    q: "Will 3D make my website slow?",
    a: "It shouldn't. Models are compressed, scenes load lazily after the page is readable, and low-powered devices get lightweight fallbacks. Performance is part of the brief, not an afterthought.",
  },
  {
    q: "Will 3D hurt my SEO?",
    a: "Not when it's built properly. All headings, copy and links live in plain HTML that search engines read directly, and the 3D scene loads after the page is already readable, so it never blocks content or first paint.",
  },
  {
    q: "Who owns the website and my content?",
    a: "Your brand, copy, imagery and domain always stay yours. On a rental, the underlying design and code stay with Website Club and are licensed to you while your plan is active. On custom builds, ownership terms are set out in the project agreement.",
  },
  {
    q: "Can I eventually purchase a rented website?",
    a: "This is something we can discuss. Buy-out options for specific designs are handled case by case and are covered in the rental terms.",
  },
] as const;

export const FOOTER_NAV = [...NAV_LINKS, { label: "Contact", href: "#contact" }] as const;
export const SOCIALS = ["Instagram", "LinkedIn", "X", "Behance"] as const;
export const LEGAL = ["Privacy Policy", "Terms", "Website Rental Terms"] as const;

export const PERFORMANCE = [
  { t: "Deferred loading", d: "The page paints and becomes readable first. Heavy 3D scenes load afterwards, only when they're needed." },
  { t: "Compressed models", d: "GLB/glTF models are optimized aggressively and Draco-compressed where it pays off." },
  { t: "Lean textures and images", d: "Compressed textures, plus WebP and AVIF images at responsive sizes." },
  { t: "Lighter on phones", d: "Mobile gets simpler scenes, fewer particles and calmer motion, designed separately from desktop." },
  { t: "Fallbacks that still look good", d: "Low-powered devices and reduced-motion settings get rendered imagery instead of a live scene." },
  { t: "Search-readable by default", d: "Headlines, copy and links are real HTML, never locked inside a canvas." },
] as const;

export const TERMS = [
  { k: "Minimum term", v: "___ months" },
  { k: "Cancel with", v: "___ days notice" },
  { k: "Your domain", v: "Yours, transferable" },
  { k: "Included", v: "Hosting, SSL, backups, security updates" },
] as const;

export const PROJECT_TYPES = ["Rent a website", "Custom build", "Transform my site", "Not sure yet"] as const;
export const BUDGETS = ["Under $5k", "$5k – $15k", "$15k – $40k", "$40k+", "Not sure yet"] as const;
