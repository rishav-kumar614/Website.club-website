"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Stage } from "./heroes";

/* ── geometry (px, relative to the frame centre) ── */
const MIN_CARDS = 14;                        // 14 cards x 300px closes the circle with ~25px gaps once lifted
const CARD_W = 300, CARD_H = 188;            // 16:10, same ratio as the templates so nothing is cropped
const R0 = 670, R1 = 960;                    // wheel radius before / after the lift
const PIV0 = 530, PIV1 = 900;                // pivot below centre before / after the lift
const DEAL_S = 2.6, LIFT_S = 1.9;
const DRIFT = 7;                             // deg/s, scaled by lift
const VISIBLE_DEG = 100;

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const wrap180 = (a) => ((((a + 180) % 360) + 360) % 360) - 180;

/** cubic-bezier(x1,y1,x2,y2) easing, solved with a few Newton steps. */
function bezier(x1, y1, x2, y2) {
  const c = (a, b, t) => 3 * a * (1 - t) * (1 - t) * t + 3 * b * (1 - t) * t * t + t * t * t;
  const dx = (t) => 3 * x1 * (1 - t) * (1 - t) + 6 * (x2 - x1) * (1 - t) * t + 3 * (1 - x2) * t * t;
  return (x) => {
    let t = x;
    for (let i = 0; i < 6; i++) { const e = c(x1, x2, t) - x, d = dx(t); if (Math.abs(d) < 1e-6) break; t -= e / d; }
    return c(y1, y2, clamp(t));
  };
}
const liftEase = bezier(0.5, 0, 0.15, 1);

export default function TemplateWheel({ templates }) {
  const frame = useRef(null);
  const cardEls = useRef([]);
  const skipBtn = useRef(null);
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(null); // template shown in the popup

  // repeat the filtered templates until the wheel has enough cards to close the circle
  const cards = useMemo(() => {
    if (!templates.length) return [];
    return Array.from({ length: Math.max(MIN_CARDS, templates.length) }, (_, i) => templates[i % templates.length]);
  }, [templates]);
  const N = cards.length;

  const st = useRef({ deal: 0, lift: 0, started: false, t0: 0, tLift: 0, rot: 0, target: 0, vel: 0, drag: false, moved: 0, lastX: 0, lastT: 0, skip: false, hover: false, driftK: 1, px: null, py: 0 });

  useEffect(() => {
    const s = st.current;
    const el = frame.current;
    if (!el || !N) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { s.deal = 1; s.lift = 1; s.started = true; setDone(true); }

    // start the deal when the section is on screen
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !s.started) { s.started = true; s.t0 = performance.now(); }
    }, { threshold: 0.3 });
    io.observe(el);

    const finish = () => { s.deal = 1; s.lift = 1; s.started = true; setDone(true); };
    const onKey = (e) => { if (e.key === "Escape" || e.key === "Tab") finish(); };
    window.addEventListener("keydown", onKey);

    // ── drag / swipe / horizontal wheel ──
    const down = (e) => {
      s.drag = true; s.moved = 0; s.vel = 0; s.lastX = e.clientX; s.lastT = performance.now();
      el.setPointerCapture?.(e.pointerId);
    };
    // remember the cursor; the loop hit-tests it every frame (enter/leave events don't fire when a card slides under a still cursor)
    const track = (e) => { s.px = e.clientX; s.py = e.clientY; };
    const untrack = () => { s.px = null; };
    el.addEventListener("pointermove", track);
    el.addEventListener("pointerenter", track);
    el.addEventListener("pointerleave", untrack);
    const move = (e) => {
      if (!s.drag) return;
      const now = performance.now(), dx = e.clientX - s.lastX, dt = Math.max(1, now - s.lastT) / 1000;
      s.moved += Math.abs(dx);
      const dDeg = dx * 0.22;
      s.target += dDeg;
      s.vel = 0.6 * s.vel + 0.4 * (dDeg / dt);
      s.lastX = e.clientX; s.lastT = now;
    };
    const up = () => {
      if (!s.drag) return;
      s.drag = false;
      if (performance.now() - s.lastT > 80) s.vel = 0; // paused before release: no fling
    };
    const wheel = (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) s.target -= e.deltaX * 0.06; };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("wheel", wheel, { passive: true });

    // home angle + deal order (0 = top card) per card
    const home = cards.map((_, i) => (i * 360) / N);
    const order = home.map((a) => Math.abs(wrap180(a)) / 180);
    const cache = cards.map(() => ({ t: "", v: "" }));
    let sceneCache = "";
    const scene = el.querySelector(".wh-scene");

    let raf, last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (s.started && !(s.deal >= 1 && s.lift >= 1)) {
        if (s.deal < 1) s.deal = clamp((now - s.t0) / 1000 / DEAL_S);
        if (s.deal >= 1) {
          if (!s.tLift) s.tLift = now;
          s.lift = clamp((now - s.tLift) / 1000 / LIFT_S);
          if (s.lift >= 1) setDone(true);
        }
      }
      const lift = liftEase(s.lift);

      // drift, fling decay, exponential follow
      if (!s.drag) {
        if (Math.abs(s.vel) > 0.05) { s.target += s.vel * dt; s.vel *= Math.exp(-dt * 3.2); }
        // hovering a card eases the drift to a stop; leaving eases it back
        s.hover = s.px != null && !!document.elementFromPoint(s.px, s.py)?.closest(".wh-card");
        s.driftK += ((s.hover ? 0 : 1) - s.driftK) * (1 - Math.exp(-dt * 6));
        if (!reduce) s.target -= DRIFT * lift * s.driftK * dt;
      }
      s.rot += (s.target - s.rot) * (1 - Math.exp(-dt * 9));

      const sceneT = `rotateX(${(12 * lift).toFixed(3)}deg) scale(${(1 + 0.14 * lift).toFixed(4)})`;
      if (scene && sceneT !== sceneCache) { scene.style.transform = sceneT; sceneCache = sceneT; }

      const radius = R0 + (R1 - R0) * lift;
      const pivotY = PIV0 + (PIV1 - PIV0) * lift;
      for (let i = 0; i < N; i++) {
        const c = cardEls.current[i];
        if (!c) continue;
        const p = easeOutCubic(clamp((s.deal - order[i] * 0.6) / 0.4));
        const angle = home[i] + s.rot - 28 * lift + 70 * (1 - p);
        const fromTop = Math.abs(wrap180(angle));
        const dist = radius * p - 140 * (1 - p);
        const depth = -fromTop * 2;
        const flip = 180 * (1 - p);
        const sc = (0.7 + 0.3 * p) * (1 + 0.35 * lift);
        const t = `translate3d(0,${pivotY.toFixed(2)}px,${depth.toFixed(2)}px) rotateZ(${angle.toFixed(3)}deg) translate3d(0,${(-dist).toFixed(2)}px,0) rotateY(${flip.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
        const v = fromTop > VISIBLE_DEG ? "hidden" : "visible";
        if (t !== cache[i].t) { c.style.transform = t; cache[i].t = t; }
        if (v !== cache[i].v) { c.style.visibility = v; cache[i].v = v; }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("keydown", onKey);
      el.removeEventListener("pointermove", track);
      el.removeEventListener("pointerenter", track);
      el.removeEventListener("pointerleave", untrack);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("wheel", wheel);
    };
  }, [cards, N]);

  if (!N) return null;
  return (
    <div ref={frame} className="wh-frame" role="region" aria-label="Template wheel. Drag to turn.">
      <div className="wh-scene">
        {cards.map((t, i) => (
          <div
            key={i}
            ref={(n) => (cardEls.current[i] = n)}
            className="wh-card"
            style={{ width: CARD_W, height: CARD_H, marginLeft: -CARD_W / 2, marginTop: -CARD_H / 2 }}
          >
            <div className="wh-face wh-front">
              <span className="wh-stagebox"><Stage comp={t.Comp} /></span>
              <span className="wh-cap"><b>{t.name}</b><small>{t.cat} · {t.tech[0]}</small></span>
              {/* sibling link, not a wrapper: the templates contain their own <a> tags */}
              <button
                type="button"
                className="wh-link"
                aria-label={`Preview ${t.name}, ${t.cat} template`}
                onClick={() => { if (st.current.moved <= 5) setOpen(t); }}
              />
            </div>
            <div className="wh-face wh-back" aria-hidden="true"><span>w</span></div>
          </div>
        ))}
      </div>
      {open && <Preview t={open} onClose={() => setOpen(null)} />}
      {!done && (
        <button ref={skipBtn} type="button" className="wh-skip" onClick={() => { const s = st.current; s.deal = 1; s.lift = 1; s.started = true; setDone(true); }}>
          Skip intro
        </button>
      )}
    </div>
  );
}

/** Popup with the live template running at full size. */
function Preview({ t, onClose }) {
  const closeBtn = useRef(null);
  useEffect(() => {
    closeBtn.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return createPortal(
    <div className="wh-modal" role="dialog" aria-modal="true" aria-label={`${t.name} preview`} onClick={onClose}>
      <div className="wh-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="wh-modal-bar">
          <b>{t.name}</b><span>{t.cat} · {t.tech.join(" · ")}</span>
          <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close preview">×</button>
        </div>
        <Stage comp={t.Comp} />
      </div>
    </div>,
    document.body
  );
}
