/** Everything the assistant says. Shared by the page (typing) and /api/speak (voice), so the API only ever voices these exact lines. */
export const LINES = {
  greeting: "Oh, hi! I'm W.C.L.U.B., your trusty (and slightly opinionated) assistant at Website Club.",
  followUp: "Finally, some company! Talking to myself was getting weird. How can I help?",
  project: "Tell us about your timeline, budget, and vision. We'll assemble an architectural blueprint within 2 hours.",
  rent: "Turnkey 3D flagships customized for your brand and deployed in 10 days from $490/mo.",
  transform: "We overlay a buttery 60 FPS WebGL layer onto your existing Shopify, Next.js, or WordPress store.",
  tech: "20:1 Draco compression, offscreen Web Workers, and locked 60 FPS across mobile GPUs.",
  direct: "Studio line: hello@websiteclub.com. We read and respond to every inquiry.",
} as const;

export type LineId = keyof typeof LINES;
