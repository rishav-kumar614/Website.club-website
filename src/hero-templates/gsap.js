import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

// Shared scroll state read by the 3D scene every frame.
export const scrollState = { progress: 0, velocity: 0 };

// Respect "reduce motion": play entrance tweens almost instantly, then stop endless loops.
if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.globalTimeline.timeScale(12);
  setTimeout(() => {
    gsap.globalTimeline.timeScale(1);
    gsap.globalTimeline.getChildren(true, true, true).forEach((t) => { if (t.repeat && t.repeat() === -1) t.pause(); });
  }, 2500);
}
