"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ScrollTrigger } from "@/lib/gsap";

const CHAPTERS = [
  {
    k: "01",
    t: "Flat",
    s: "Flat",
    d: "Your site today: sections on a single plane. Clean, but nothing to explore.",
    tags: ["1 layer", "Static images"],
  },
  {
    k: "02",
    t: "Lift",
    s: "Lift",
    d: "We separate the page into depth layers. Hero, content and navigation each get their own space.",
    tags: ["+3 depth layers", "Same HTML"],
  },
  {
    k: "03",
    t: "Add the object",
    s: "Object",
    d: "A real 3D product enters the page, and visitors turn it around as they scroll.",
    tags: ["WebGL object", "Drag to rotate"],
  },
  {
    k: "04",
    t: "Make it respond",
    s: "Respond",
    d: "Interface elements float, react to the cursor and guide visitors toward the action.",
    tags: ["60 FPS", "0 backend changes"],
  },
];

// Scroll progress each chapter button jumps to.
const JUMP = [0.03, 0.42, 0.66, 0.97];

// What the demo store gains per chapter (max = number of pips; 0 = no meter).
const STATS = [
  { l: "Depth layers", v: [1, 4, 5, 6], max: 6 },
  { l: "Interactive elements", v: [3, 3, 6, 9], max: 9 },
  { l: "Backend changes", v: [0, 0, 0, 0], max: 0 },
];

/** Number that eases from its previous value to `to`. */
function Count({ to }: { to: number }) {
  const [n, setN] = useState(to);
  const shown = useRef(to);
  useEffect(() => {
    const from = shown.current;
    if (from === to) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 550);
      shown.current = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      setN(shown.current);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{n}</>;
}

type Kind = "over" | "buds" | "speaker";

const PRODUCTS: { n: string; p: number; kind: Kind; tag: string; colors: string[] }[] = [
  { n: "Aethel One", p: 349, kind: "over", tag: "New", colors: ["#3a64f0", "#1a1c26", "#b08968"] },
  { n: "Aethel Air", p: 249, kind: "buds", tag: "", colors: ["#ff7a45", "#2fbf71"] },
  { n: "Aethel Max", p: 499, kind: "speaker", tag: "Best seller", colors: ["#5b5c63", "#8a4fff"] },
];

/** Flat product illustrations for the mock store, tinted with the chosen color. */
function Product({ kind, color, size = 44 }: { kind: Kind; color: string; size?: number }) {
  if (kind === "over")
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
        <path d="M24 72V60a36 36 0 0 1 72 0v12" stroke="#1a1c26" strokeWidth="7" strokeLinecap="round" />
        <rect x="12" y="62" width="24" height="40" rx="11" fill={color} />
        <rect x="84" y="62" width="24" height="40" rx="11" fill={color} />
        <rect x="19" y="69" width="10" height="26" rx="5" fill="#fff" opacity="0.45" />
        <rect x="91" y="69" width="10" height="26" rx="5" fill="#fff" opacity="0.45" />
      </svg>
    );
  if (kind === "buds")
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
        <rect x="18" y="30" width="34" height="40" rx="17" fill={color} />
        <rect x="28" y="62" width="12" height="34" rx="6" fill={color} />
        <rect x="68" y="30" width="34" height="40" rx="17" fill={color} />
        <rect x="80" y="62" width="12" height="34" rx="6" fill={color} />
        <circle cx="35" cy="46" r="7" fill="#fff" opacity="0.5" />
        <circle cx="85" cy="46" r="7" fill="#fff" opacity="0.5" />
      </svg>
    );
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect x="30" y="14" width="60" height="92" rx="16" fill={color} />
      <circle cx="60" cy="40" r="11" fill="#000" opacity="0.25" />
      <circle cx="60" cy="76" r="20" fill="#000" opacity="0.25" />
      <circle cx="60" cy="76" r="9" fill="#fff" opacity="0.18" />
    </svg>
  );
}

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

type Lenisish = { scrollTo: (target: number, opts?: { duration?: number; easing?: (t: number) => number; immediate?: boolean }) => void };

/** Scroll-scrubbed story: a flat page lifts into depth layers, gains a 3D object, then comes alive. */
export function ScrollFlip() {
  const outer = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  // mock-store state
  const [active, setActive] = useState(0);
  const [shade, setShade] = useState([0, 0, 0]);
  const [cart, setCart] = useState(2);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = outer.current;
    const st = stage.current;
    if (!el || !st) return;

    const apply = (p: number) => {
      st.style.setProperty("--p", p.toFixed(4));
      st.style.setProperty("--a", ease(seg(p, 0.05, 0.3)).toFixed(4)); // tilt
      st.style.setProperty("--b", ease(seg(p, 0.25, 0.52)).toFixed(4)); // layers separate
      st.style.setProperty("--c", ease(seg(p, 0.5, 0.74)).toFixed(4)); // 3D object
      st.style.setProperty("--d", ease(seg(p, 0.74, 0.94)).toFixed(4)); // floating UI
      setIdx(Math.min(CHAPTERS.length - 1, Math.floor(p * CHAPTERS.length)));
    };

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }
    const trig = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => apply(self.progress),
    });
    return () => {
      trig.kill();
      window.clearTimeout(toastTimer.current);
    };
  }, []);

  /** Scroll so the story sits at progress `p`. Uses Lenis when it is running. */
  const scrollToProgress = (p: number, duration = 1.4, linear = false) => {
    const el = outer.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const target = top + (el.offsetHeight - window.innerHeight) * p;
    const lenis = (window as unknown as { __lenis?: Lenisish }).__lenis;
    if (lenis) lenis.scrollTo(target, { duration, easing: linear ? (t) => t : undefined });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const play = () => {
    if (idx === CHAPTERS.length - 1) {
      const lenis = (window as unknown as { __lenis?: Lenisish }).__lenis;
      const el = outer.current;
      if (lenis && el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        lenis.scrollTo(top, { immediate: true });
      }
    }
    requestAnimationFrame(() => scrollToProgress(0.98, 7, true));
  };

  // Cursor parallax: the whole scene leans slightly toward the pointer.
  const lean = (e: PointerEvent<HTMLDivElement>) => {
    const st = stage.current;
    if (!st || e.pointerType !== "mouse") return;
    const r = st.getBoundingClientRect();
    st.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    st.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const unlean = () => {
    stage.current?.style.setProperty("--mx", "0");
    stage.current?.style.setProperty("--my", "0");
  };

  // Glare that follows the cursor across the mock page.
  const glare = (e: PointerEvent<HTMLDivElement>) => {
    const sc = scene.current;
    if (!sc || e.pointerType !== "mouse") return;
    const r = sc.getBoundingClientRect();
    sc.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
    sc.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const addToCart = (i: number) => {
    setCart((c) => c + 1);
    setToast({ id: Date.now(), text: `Added ${PRODUCTS[i].n}` });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1800);
  };

  const pickShade = (i: number, s: number) => {
    setActive(i);
    setShade((prev) => prev.map((v, j) => (j === i ? s : v)));
  };

  const cur = PRODUCTS[active];
  const color = cur.colors[shade[active]];

  return (
    <div ref={outer} className="tf-flip">
      <div
        ref={stage}
        className="tf-flip-sticky"
        onPointerMove={lean}
        onPointerLeave={unlean}
        style={{ "--p": 0, "--a": 0, "--b": 0, "--c": 0, "--d": 0, "--mx": 0, "--my": 0 } as CSSProperties}
      >
        <div className="tf-flip-bg" aria-hidden="true" />
        <div className="wrap tf-flip-inner">
          <div className="tf-flip-text">
            <div className="tf-flip-top">
              <span className="tf-kicker">Scroll to transform</span>
              <button type="button" className="tf-flip-play" onClick={play}>
                <span aria-hidden="true">▶</span> Play the story
              </button>
            </div>
            <div className="tf-flip-chapters" aria-live="polite">
              {CHAPTERS.map((c, i) => (
                <div key={c.k} className={`tf-flip-ch ${i === idx ? "is-active" : ""}`} aria-hidden={i !== idx}>
                  <span className="tf-flip-ghost" aria-hidden="true">
                    {c.k}
                  </span>
                  <span className="tf-flip-num">
                    <b>{c.k}</b> <i>/ 04</i>
                  </span>
                  <h2 className="h2 tf-flip-title" aria-label={c.t}>
                    {c.t.split(" ").map((word, w, words) => {
                      const before = words.slice(0, w).join("").length;
                      return (
                        <Fragment key={w}>
                          {w > 0 && " "}
                          <span className="w" aria-hidden="true">
                            {word.split("").map((ch, j) => (
                              <span key={j} className="ch" style={{ "--j": before + j } as CSSProperties}>
                                {ch}
                              </span>
                            ))}
                          </span>
                        </Fragment>
                      );
                    })}
                  </h2>
                  <p className="lead">{c.d}</p>
                  <ul className="tf-flip-tags">
                    {c.tags.map((t, j) => (
                      <li key={t} style={{ "--j": j } as CSSProperties}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="tf-flip-stats">
              <div className="tf-flip-stats-head">
                <span className="live" aria-hidden="true" />
                Live demo stats
                <em>updates as you scroll</em>
              </div>
              {STATS.map((s) => (
                <div key={s.l} className="tf-flip-stat">
                  <span className="l">{s.l}</span>
                  <b className="v">
                    <Count to={s.v[idx]} />
                  </b>
                  {s.max ? (
                    <span className="pips" aria-hidden="true">
                      {Array.from({ length: s.max }, (_, j) => (
                        <i key={j} className={j < s.v[idx] ? "on" : ""} style={{ "--j": j } as CSSProperties} />
                      ))}
                    </span>
                  ) : (
                    <span className="ok">Untouched</span>
                  )}
                </div>
              ))}
            </div>

            <nav className="tf-flip-steps" aria-label="Story chapters">
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.k}
                  type="button"
                  className={`${i < idx ? "is-done" : ""} ${i === idx ? "is-now" : ""}`}
                  style={{ "--i": i } as CSSProperties}
                  aria-label={`Go to chapter ${c.k}: ${c.t}`}
                  aria-current={i === idx ? "step" : undefined}
                  onClick={() => scrollToProgress(JUMP[i])}
                >
                  <span className="bar" aria-hidden="true">
                    <span className="fill" />
                  </span>
                  <span className="lbl">
                    <b>{c.k}</b> {c.s}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="tf-flip-stage">
            <div
              ref={scene}
              className="tf-sc"
              onPointerMove={glare}
              style={{ "--prod": color } as CSSProperties}
              role="group"
              aria-label="Demo store you can try"
            >
              <div className="tf-sc-shadow" aria-hidden="true" />

              <div className="tf-sc-base">
                <div className="tf-sc-bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span className="url">demo-store.example</span>
                </div>
                <div className="tf-sc-nav">
                  <strong>aethel</strong>
                  <span>Shop</span>
                  <span>Sound</span>
                  <span>Support</span>
                  <em className="cart" aria-label={`Cart, ${cart} items`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 7h14l-1.5 12h-11L5 7Zm4 0a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
                    </svg>
                    <sup key={cart}>{cart}</sup>
                  </em>
                  {toast && (
                    <span key={toast.id} className="tf-sc-toast" role="status">
                      ✓ {toast.text}
                    </span>
                  )}
                </div>
                <div className="tf-sc-wash" aria-hidden="true" />
                <div className="tf-sc-glare" aria-hidden="true" />
              </div>

              <div className="tf-sc-disc" aria-hidden="true" />
              <div className="tf-sc-product">
                <span key={`${active}-${color}`} className="tf-sc-hero-prod">
                  <Product kind={cur.kind} color={color} size={96} />
                </span>
                <span className="price">
                  {cur.n} · ${cur.p}
                </span>
              </div>

              <div className="tf-sc-hero">
                <small>{(cur.tag || "Featured").toUpperCase()} · {cur.n.toUpperCase()}</small>
                <h3>
                  Hear it
                  <br />
                  differently.
                </h3>
                <p>Studio sound that follows you everywhere.</p>
                <div className="btns">
                  <button type="button" className="shop" onClick={() => addToCart(active)}>
                    Add to cart
                  </button>
                  <span>
                    <i aria-hidden="true">▶</i> Watch film
                  </span>
                </div>
                <div className="rating">
                  Demo store · sample data
                </div>
              </div>

              <div className="tf-sc-cards">
                {PRODUCTS.map((p, i) => (
                  <div
                    key={p.n}
                    className={i === active ? "is-active" : ""}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <button type="button" className="img" onClick={() => setActive(i)} aria-label={`Show ${p.n}`}>
                      <Product kind={p.kind} color={p.colors[shade[i]]} />
                      {p.tag && <small>{p.tag}</small>}
                    </button>
                    <b>{p.n}</b>
                    <div className="row">
                      <span>${p.p}</span>
                      <span className="dots">
                        {p.colors.map((c, s) => (
                          <button
                            key={c}
                            type="button"
                            style={{ background: c }}
                            aria-label={`${p.n} color ${s + 1}`}
                            aria-pressed={shade[i] === s}
                            onClick={() => pickShade(i, s)}
                          />
                        ))}
                      </span>
                    </div>
                    <button type="button" className="add" aria-label={`Add ${p.n} to cart`} onClick={() => addToCart(i)}>
                      +
                    </button>
                  </div>
                ))}
              </div>

              <div className="tf-sc-ring" aria-hidden="true" />
              <div className="tf-sc-cube" aria-hidden="true">
                <u className="f1" />
                <u className="f2" />
                <u className="f3" />
                <u className="f4" />
                <u className="f5" />
                <u className="f6" />
              </div>

              <span className="tf-sc-chip c1" aria-hidden="true">360° viewer</span>
              <span className="tf-sc-chip c3" aria-hidden="true">60 FPS</span>
              <span className="tf-sc-spark s1" aria-hidden="true">✦</span>
              <span className="tf-sc-spark s2" aria-hidden="true">✦</span>
              <span className="tf-sc-spark s3" aria-hidden="true">✦</span>
            </div>
            <p className="tf-flip-hint">
              <span className="dot" aria-hidden="true" /> Try it: hover a product, pick a color, tap + to add
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
