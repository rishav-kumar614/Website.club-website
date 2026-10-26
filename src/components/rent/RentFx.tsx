"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Tween the first number inside an element's text, keeping the rest ("$690", "100% Custom", "48 Hours"). */
function countUp(el: HTMLElement, scrollTrigger?: ScrollTrigger.Vars) {
  const text = el.textContent ?? "";
  const m = text.match(/\d+/);
  if (!m) return;
  const end = Number(m[0]);
  const o = { v: 0 };
  gsap.to(o, {
    v: end,
    duration: 1.4,
    ease: "power2.out",
    scrollTrigger,
    onStart: () => { el.textContent = text.replace(m[0], "0"); },
    onUpdate: () => { el.textContent = text.replace(m[0], String(Math.round(o.v))); },
    onComplete: () => { el.textContent = text; },
  });
}

/** Pointer-follow helper: calls move(nx, ny) with -0.5..0.5 coords, reset() on leave. */
function pointer(el: HTMLElement, move: (nx: number, ny: number, e: PointerEvent) => void, reset: () => void, undo: Array<() => void>) {
  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    move((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5, e);
  };
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", reset);
  undo.push(() => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", reset); });
}

/** GSAP choreography for the /rent page (rp-* classes) plus the scroll progress bar. */
export function RentFx() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced()) return;
    const undo: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const q = gsap.utils.toArray<HTMLElement>;
      gsap.to(bar.current, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

      // ── hero ──
      gsap.from(".rp-badge", { y: -24, opacity: 0, scale: 0.92, duration: 0.8, ease: "back.out(1.6)" });
      gsap.from(".rp-lead, .rp-hero-cta > *", { y: 28, opacity: 0, stagger: 0.12, duration: 0.8, delay: 0.5, ease: "power3.out" });
      gsap.from(".rp-fan-card", { y: 160, rotation: 0, opacity: 0, stagger: 0.15, duration: 1.1, delay: 0.6, ease: "power4.out" });
      gsap.to(".rp-fan-card", { y: "+=10", duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: { each: 0.4, from: "center" } });
      gsap.from(".rp-metric", { y: 36, opacity: 0, stagger: 0.1, duration: 0.8, delay: 1, ease: "power3.out" });
      q(".rp-num").forEach((el) => countUp(el, { trigger: el, start: "top 95%" }));
      gsap.to(".rp-hero .wrap", {
        yPercent: -6, opacity: 0.5, ease: "none",
        scrollTrigger: { trigger: ".rp-hero", start: "top top", end: "bottom top", scrub: true },
      });
      const fan = document.querySelector<HTMLElement>(".rp-fan");
      if (fan) {
        const cards = q(".rp-fan-card");
        const xs = cards.map((c, i) => gsap.quickTo(c, "x", { duration: 0.8, ease: "power3" }));
        pointer(fan, (nx) => cards.forEach((_, i) => xs[i](nx * (i === 1 ? 30 : i === 0 ? -50 : 50))), () => xs.forEach((f) => f(0)), undo);
      }

      // ── headings: masked line reveal ──
      q(".rp-h2").forEach((h) => {
        SplitText.create(h, {
          type: "lines", mask: "lines", autoSplit: true,
          onSplit: (s: SplitText) => gsap.from(s.lines, { yPercent: 110, duration: 0.9, stagger: 0.12, ease: "power4.out", scrollTrigger: { trigger: h, start: "top 88%" } }),
        });
      });
      gsap.from(".rp-sec-head .rp-kicker", { x: -20, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".rp-showcase", start: "top 80%" } });

      // ── flagships ──
      q(".rp-item").forEach((item) => {
        const w = (s: string) => item.querySelectorAll<HTMLElement>(s);
        const st = { trigger: item, start: "top 70%" };

        gsap.from(w(".rp-frame"), { rotationX: 12, transformPerspective: 1100, y: 80, scale: 0.92, ease: "none",
          scrollTrigger: { trigger: item, start: "top bottom", end: "top 35%", scrub: 0.6 } });
        gsap.fromTo(w(".rp-shot-img"), { scale: 1.16, yPercent: -5 }, { scale: 1.03, yPercent: 5, ease: "none",
          scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.to(w(".rp-glow"), { scale: 1.2, opacity: 0.6, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(w(".rp-chip-a"), { y: -8, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(w(".rp-chip-b"), { y: 8, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.from(w(".rp-chip"), { scale: 0.6, opacity: 0, stagger: 0.15, duration: 0.7, ease: "back.out(2)", scrollTrigger: st });
        gsap.from(w(".rp-orbit"), { scale: 0, rotate: -180, duration: 1, ease: "back.out(1.6)", scrollTrigger: st });

        gsap.from(w(".rp-big-n"), { xPercent: -20, opacity: 0, duration: 1.2, ease: "power4.out", scrollTrigger: st });
        gsap.fromTo(w(".rp-big-n"), { yPercent: 10 }, { yPercent: -25, ease: "none", scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(w(".rp-kicker, .rp-tagline"), { x: -24, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out", scrollTrigger: st });
        w(".rp-name").forEach((n) =>
          SplitText.create(n, { type: "chars", autoSplit: true,
            onSplit: (s: SplitText) => gsap.from(s.chars, { yPercent: 100, opacity: 0, rotate: 8, stagger: 0.04, duration: 0.8, ease: "back.out(1.8)", scrollTrigger: st }) }));
        gsap.from(w(".rp-desc"), { y: 24, opacity: 0, duration: 0.8, delay: 0.15, ease: "power3.out", scrollTrigger: st });
        gsap.from(w(".rp-feats li"), { x: -30, opacity: 0, stagger: 0.12, duration: 0.7, delay: 0.25, ease: "power3.out", scrollTrigger: st });
        gsap.from(w(".rp-feats svg"), { scale: 0, rotate: -90, stagger: 0.12, duration: 0.6, delay: 0.45, ease: "back.out(2.4)", scrollTrigger: st });
        gsap.from(w(".rp-specs span"), { y: 14, opacity: 0, scale: 0.9, stagger: 0.08, duration: 0.5, delay: 0.5, ease: "power3.out", scrollTrigger: st });
        gsap.from(w(".rp-buy"), { y: 30, opacity: 0, duration: 0.8, delay: 0.6, ease: "power3.out", scrollTrigger: st });
        w(".rp-price-fig").forEach((el) => countUp(el, { trigger: el, start: "top 90%" }));

        const frame = item.querySelector<HTMLElement>(".rp-frame");
        if (frame) {
          const rx = gsap.quickTo(frame, "rotationX", { duration: 0.6, ease: "power3" });
          const ry = gsap.quickTo(frame, "rotationY", { duration: 0.6, ease: "power3" });
          gsap.set(frame, { transformPerspective: 1200 });
          pointer(frame, (nx, ny) => { ry(nx * 9); rx(-ny * 9); }, () => { rx(0); ry(0); }, undo);
        }
        w(".rp-btn, .rp-orbit").forEach((btn) => {
          const x = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
          const y = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
          pointer(btn, (nx, ny) => { x(nx * 18); y(ny * 22); }, () => { x(0); y(0); }, undo);
        });
      });

      // ── bento ──
      gsap.from(".rp-tile", { y: 60, opacity: 0, scale: 0.94, stagger: { each: 0.09, from: "start" }, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".rp-bento", start: "top 82%" } });
      q(".rp-tile").forEach((t) => {
        pointer(t, (_nx, _ny, e) => {
          const r = t.getBoundingClientRect();
          t.style.setProperty("--mx", `${e.clientX - r.left}px`);
          t.style.setProperty("--my", `${e.clientY - r.top}px`);
        }, () => {}, undo);
      });

      // ── timeline ──
      gsap.fromTo(".rp-line i", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".rp-steps", start: "top 75%", end: "bottom 60%", scrub: 0.5 } });
      gsap.from(".rp-node", { scale: 0, rotate: -120, stagger: 0.25, duration: 0.7, ease: "back.out(2)", scrollTrigger: { trigger: ".rp-steps", start: "top 75%" } });
      gsap.from(".rp-step small, .rp-step h3, .rp-step p", { y: 24, opacity: 0, stagger: 0.04, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".rp-steps", start: "top 72%" } });

      // ── versus ──
      gsap.from(".rp-vs-card.old", { x: -80, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".rp-vs", start: "top 82%" } });
      gsap.from(".rp-vs-card.new", { x: 80, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".rp-vs", start: "top 82%" } });
      gsap.from(".rp-vs li", { y: 20, opacity: 0, stagger: 0.07, duration: 0.6, delay: 0.3, ease: "power3.out", scrollTrigger: { trigger: ".rp-vs", start: "top 78%" } });
      gsap.from(".rp-tick", { scale: 0, stagger: 0.1, duration: 0.5, delay: 0.6, ease: "back.out(3)", scrollTrigger: { trigger: ".rp-vs", start: "top 78%" } });

      // ── calculator + FAQ ──
      gsap.from(".rent-calc", { y: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".rent-calc", start: "top 88%" } });
      gsap.from(".rp-faq-item", { y: 30, opacity: 0, stagger: 0.09, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".rp-faq", start: "top 85%" } });
    });
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(raf); undo.forEach((u) => u()); ctx.revert(); };
  }, []);

  return <div ref={bar} className="rent-progress" aria-hidden="true" />;
}
