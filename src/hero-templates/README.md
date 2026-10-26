# Hero templates: portable copy

10 animated hero sections: Aurora, Orbit, Noir, Arcade, Bloom, Terra, Lumen, Helix, Tidal, Prism.

## 1. Install (React 18+/19, Next.js App Router or Vite)
    npm i gsap @gsap/react three @react-three/fiber @react-three/drei

## 2. Copy this folder into your project (e.g. src/hero-templates/)
Files: heroes.js, heroes.css, gsap.js, templates-data.js

## 3. Use a template
Every template is a client component sized in `cqw`, so it fills whatever box you give it
(a small card or a full screen). Wrap it in `Stage`:

    "use client";
    import { HERO_TEMPLATES, Stage } from "@/hero-templates/heroes";

    export default function Hero() {
      const t = HERO_TEMPLATES.find((x) => x.slug === "orbit");
      return <Stage comp={t.Comp} full />;   // full = 100vh hero, omit for a 16:10 card
    }

Slugs: aurora, orbit, noir, arcade, bloom, terra, lumen, helix, tidal, prism.

## Notes
- Next.js: pages using it must be client components ("use client"), or load with next/dynamic { ssr: false }.
- Vite/CRA: remove the "use client" line at the top of heroes.js (harmless if left).
- Edit text, colors and links directly inside heroes.js (JSX) and heroes.css (class prefixes: au-, or-, no-, ar-, bl-, te-, lu-, hl-, td-, pr-).
- templates-data.js is only metadata (names, prices, descriptions); delete the parts you don't need, but keep the slugs.
