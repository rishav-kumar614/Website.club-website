"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float, MeshDistortMaterial } from "@react-three/drei";
import { gsap, SplitText, useGSAP } from "./gsap";
import "./heroes.css";
import { TEMPLATES_DATA } from "./templates-data";

const Nav = ({ logo, links, cta, ctaClass = "p" }) => (
  <div className="hx-nav">
    <span className="hx-logo">{logo}</span>
    <div className="hx-links">
      {links.map((l) => <a key={l} href="#">{l}</a>)}
      <a className={`hx-btn ${ctaClass}`} href="#">{cta}</a>
    </div>
  </div>
);

const Studio = () => (
  <Environment resolution={256}>
    <Lightformer form="rect" intensity={4} position={[0, 4, 3]} scale={[8, 3, 1]} />
    <Lightformer form="rect" intensity={2} color="#ffd9c2" position={[-5, 0, 2]} scale={[3, 6, 1]} />
    <Lightformer form="rect" intensity={2} color="#cfe8ff" position={[5, 0, -2]} scale={[3, 6, 1]} />
  </Environment>
);

/* 1 · Aurora: SaaS landing hero ------------------------------------------ */
function Aurora() {
  const root = useRef();
  useGSAP(() => {
    gsap.to(".au-b1", { xPercent: 25, yPercent: 15, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".au-b2", { xPercent: -30, yPercent: 20, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".au-b3", { xPercent: 30, yPercent: -25, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
    const split = SplitText.create(".au h1", { type: "words", mask: "words" });
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hx-nav", { y: -30, opacity: 0, duration: 0.8 })
      .from(".au-badge", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(split.words, { yPercent: 110, stagger: 0.08, duration: 0.9 }, "-=0.3")
      .from(".au p, .au-cta", { y: 24, opacity: 0, stagger: 0.12, duration: 0.8 }, "-=0.5")
      .from(".au-dash", { x: 120, opacity: 0, rotateY: -35, duration: 1.2 }, "-=1.2")
      .from(".au-chart i", { scaleY: 0, stagger: 0.07, duration: 0.8, ease: "back.out(1.4)" }, "-=0.6")
      .from(".au-chip", { scale: 0, stagger: 0.2, duration: 0.6, ease: "back.out(2)" }, "-=0.4");
    gsap.to(".au-c1", { y: -14, repeat: -1, yoyo: true, duration: 2, ease: "sine.inOut" });
    gsap.to(".au-c2", { y: 12, repeat: -1, yoyo: true, duration: 2.4, ease: "sine.inOut" });
  }, { scope: root });
  const bars = [40, 62, 48, 78, 58, 90, 70, 100];
  return (
    <div ref={root} className="hx au">
      <i className="au-blob au-b1" /><i className="au-blob au-b2" /><i className="au-blob au-b3" /><div className="au-grid" />
      <Nav logo="◆ Pulse" links={["Product", "Pricing", "Docs"]} cta="Start free" />
      <div className="au-left">
        <span className="au-badge">✦ New · AI insights are live</span>
        <h1>Ship products your users <em>actually love</em></h1>
        <p>Pulse turns raw analytics into clear decisions, so your team can build the right thing faster.</p>
        <div className="au-cta"><a className="hx-btn p" href="#">Get started</a><a className="hx-btn g" href="#">Watch demo</a></div>
      </div>
      <div className="au-dash">
        <div className="au-dots"><i /><i /><i /></div>
        <div className="au-kpis">
          {[["24.8k", "Active users"], ["+18%", "Growth"], ["4.9", "NPS"]].map(([b, s]) => <div className="au-kpi" key={s}><b>{b}</b><span>{s}</span></div>)}
        </div>
        <div className="au-chart">{bars.map((h, i) => <i key={i} style={{ height: h + "%" }} />)}</div>
      </div>
      <span className="au-chip au-c1">🚀 +2,340 signups today</span>
      <span className="au-chip au-c2">✓ Deploy successful</span>
    </div>
  );
}

/* 2 · Orbit: agency hero with glass 3D object --------------------------- */
function Glass() {
  const g = useRef();
  useFrame((s, dt) => {
    g.current.rotation.y += dt * 0.25;
    g.current.position.x += (s.pointer.x * 0.6 - g.current.position.x) * 0.05;
    g.current.position.y += (s.pointer.y * 0.4 - g.current.position.y) * 0.05;
  });
  return (
    <group ref={g}>
      <Float speed={1.6} floatIntensity={0.8}>
        <mesh>
          <torusGeometry args={[1.05, 0.5, 64, 128]} />
          <meshPhysicalMaterial color="#ffffff" transmission={1} thickness={1.4} roughness={0.05} ior={1.45} clearcoat={1} />
        </mesh>
        <mesh position={[0, 0, -0.3]} scale={0.55}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial color="#ff5a1f" roughness={0.35} />
        </mesh>
      </Float>
    </group>
  );
}
function Orbit() {
  const root = useRef();
  useGSAP(() => {
    const split = SplitText.create(".or h1", { type: "lines", mask: "lines" });
    gsap.timeline({ defaults: { ease: "expo.out" } })
      .from(".hx-nav", { y: -30, opacity: 0, duration: 0.8 })
      .from(".or-tag", { x: -30, opacity: 0, duration: 0.8 }, "-=0.4")
      .from(split.lines, { yPercent: 110, stagger: 0.12, duration: 1.2 }, "-=0.5")
      .from(".or p, .or .hx-btn", { y: 24, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.7")
      .from(".or-canvas", { scale: 0.7, opacity: 0, duration: 1.4 }, "-=1.2");
    gsap.to(".or-strip span", { xPercent: -100, repeat: -1, duration: 18, ease: "none" });
  }, { scope: root });
  return (
    <div ref={root} className="hx or">
      <Nav logo="Orbit®" links={["Work", "Studio", "Journal"]} cta="Let's talk" />
      <div className="or-canvas">
        <Canvas camera={{ position: [0, 0, 7.5], fov: 40 }} dpr={[1, 1.25]}>
          <Studio /><Glass />
        </Canvas>
      </div>
      <div className="or-copy">
        <div className="or-tag">Digital design studio</div>
        <h1>We shape<br />brands into <span>worlds.</span></h1>
        <p>Strategy, identity and interactive experiences for companies that want to be remembered.</p>
        <a className="hx-btn p" href="#">See our work →</a>
      </div>
      <div className="or-strip"><span>Nike · Stripe · Notion · Spotify · Airbnb · Figma · Linear · Vercel · &nbsp;</span><span>Nike · Stripe · Notion · Spotify · Airbnb · Figma · Linear · Vercel · &nbsp;</span></div>
    </div>
  );
}

/* 3 · Noir: portfolio hero with a reactive wireframe ------------------- */
function Wire() {
  const m = useRef();
  useFrame((s, dt) => {
    m.current.rotation.y += (s.pointer.x * 1.2 - m.current.rotation.y) * 0.04 + dt * 0.1;
    m.current.rotation.x += (-s.pointer.y * 0.8 - m.current.rotation.x) * 0.04;
  });
  return (
    <mesh ref={m}>
      <icosahedronGeometry args={[1.7, 3]} />
      <MeshDistortMaterial color="#f4f4f0" wireframe distort={0.35} speed={1.6} />
    </mesh>
  );
}
function Noir() {
  const root = useRef();
  useGSAP(() => {
    const split = SplitText.create(".no-name div", { type: "chars", mask: "chars" });
    gsap.timeline({ defaults: { ease: "expo.out" } })
      .from(".hx-nav", { opacity: 0, duration: 1 })
      .from(split.chars, { yPercent: 115, stagger: 0.04, duration: 1.2 }, "-=0.6")
      .from(".no-role, .no-meta, .no-foot", { opacity: 0, y: 20, stagger: 0.15, duration: 1 }, "-=0.8")
      .from(".no-canvas", { opacity: 0, scale: 0.85, duration: 1.6 }, "-=1.6");
    const tl = gsap.timeline({ repeat: -1 });
    [1, 2, 3].forEach((i) => tl.to(".no-role b span", { yPercent: -100 * i, duration: 0.6, ease: "power3.inOut" }, "+=1.6"));
    tl.set(".no-role b span", { yPercent: 0 });
  }, { scope: root });
  return (
    <div ref={root} className="hx no">
      <div className="no-canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.25]}><Wire /></Canvas>
      </div>
      <Nav logo="AM." links={["Work", "About", "Contact"]} cta="Hire me" ctaClass="" />
      <div className="no-role"><b><span>Creative developer</span><span>Motion designer</span><span>3D artist</span><span>Creative developer</span></b>Based in Berlin<br />Available for freelance</div>
      <div className="no-meta">Selected work<br />2019 — 2026<br />(48 projects)</div>
      <div className="no-name"><div>Alex</div><div>Morgan</div></div>
      <div className="no-foot"><span>Scroll ↓</span><span>© 2026</span></div>
    </div>
  );
}

/* 4 · Arcade: retro game hero (pure CSS 3D) ---------------------------- */
function Arcade() {
  const root = useRef();
  useGSAP(() => {
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".ar-sun", { y: 80, opacity: 0, duration: 1.4 })
      .from(".ar-cube-wrap", { scale: 0, duration: 1, ease: "back.out(1.6)" }, "-=0.8")
      .from(".ar h1", { y: 60, opacity: 0, duration: 1 }, "-=0.5")
      .from(".ar p, .ar .ar-center .hx-btn", { y: 20, opacity: 0, stagger: 0.15, duration: 0.7 }, "-=0.4")
      .from(".hx-nav", { y: -30, opacity: 0, duration: 0.7 }, "-=0.8");
    gsap.to(".ar-cube-wrap", { y: -20, repeat: -1, yoyo: true, duration: 2, ease: "sine.inOut" });
  }, { scope: root });
  return (
    <div ref={root} className="hx ar">
      <div className="ar-sun" />
      <div className="ar-floor" />
      <div className="ar-cube-wrap"><div className="ar-cube"><i /><i /><i /><i /><i /><i /></div></div>
      <Nav logo="▲ PIXEL RUSH" links={["Play", "Leaderboard", "Store"]} cta="Join beta" />
      <div className="ar-center">
        <h1 data-t="Pixel Rush">Pixel Rush</h1>
        <p>The ultimate synthwave racer</p>
        <a className="hx-btn" href="#">Play now</a>
      </div>
    </div>
  );
}

/* 5 · Bloom: e-commerce hero with live product configurator ------------- */
const COLORS = [["Peach", "#ffb89a"], ["Ink", "#222222"], ["Sage", "#9bb89a"], ["Sky", "#8ec5ff"]];
function Headphones({ color }) {
  const g = useRef();
  useFrame((s, dt) => {
    g.current.rotation.y += (s.pointer.x * 0.9 - g.current.rotation.y) * 0.05;
    g.current.rotation.x += (-s.pointer.y * 0.3 - g.current.rotation.x) * 0.05;
  });
  const mat = <meshStandardMaterial color={color} metalness={0.35} roughness={0.3} />;
  return (
    <group ref={g}>
      <Float speed={1.8} floatIntensity={0.8} rotationIntensity={0.3}>
        <group rotation={[0, 0, 0]} scale={1.15}>
          <mesh position={[0, 0.1, 0]}><torusGeometry args={[1.25, 0.1, 24, 80, Math.PI]} />{mat}</mesh>
          {[-1, 1].map((x) => (
            <group key={x} position={[x * 1.25, 0.1, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]} position={[0, -0.5, 0]}><cylinderGeometry args={[0.55, 0.55, 0.42, 48]} />{mat}</mesh>
              <mesh rotation={[0, 0, Math.PI / 2]} position={[x * 0.24, -0.5, 0]}><cylinderGeometry args={[0.4, 0.4, 0.05, 48]} /><meshStandardMaterial color="#111" roughness={0.6} /></mesh>
            </group>
          ))}
        </group>
      </Float>
    </group>
  );
}
function Bloom() {
  const root = useRef();
  const [color, setColor] = useState(COLORS[0][1]);
  useGSAP(() => {
    const split = SplitText.create(".bl h1", { type: "lines", mask: "lines" });
    gsap.timeline({ defaults: { ease: "power4.out" } })
      .from(".bl-circle", { scale: 0, duration: 1.2, ease: "expo.out" })
      .from(".hx-nav", { y: -30, opacity: 0, duration: 0.8 }, "-=0.8")
      .from(".bl-new", { scale: 0, duration: 0.5 }, "-=0.5")
      .from(split.lines, { yPercent: 110, stagger: 0.12, duration: 1 }, "-=0.3")
      .from(".bl p, .bl-buy, .bl-sw", { y: 24, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=0.6")
      .from(".bl-canvas", { y: 80, opacity: 0, duration: 1.2 }, "-=1.4")
      .from(".bl-tag", { x: 40, opacity: 0, duration: 0.7 }, "-=0.4");
  }, { scope: root });
  return (
    <div ref={root} className="hx bl">
      <div className="bl-circle" />
      <div className="bl-canvas">
        <Canvas camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 1.25]}>
          <ambientLight intensity={0.6} /><Studio /><Headphones color={color} />
        </Canvas>
      </div>
      <Nav logo="bloom." links={["Shop", "Collections", "Journal"]} cta="Cart (2)" />
      <div className="bl-copy">
        <span className="bl-new">New season</span>
        <h1>Sound, softly redefined.</h1>
        <p>Aero headphones with 40-hour battery, adaptive noise cancelling and a finish that goes with everything.</p>
        <div className="bl-buy"><b>$189</b><a className="hx-btn p" href="#">Add to cart</a></div>
        <div className="bl-sw">Color:
          {COLORS.map(([n, c]) => <button key={n} aria-label={n} className={c === color ? "on" : ""} style={{ background: c }} onClick={() => setColor(c)} />)}
        </div>
      </div>
      <div className="bl-rate">★★★★★ 4.9 · 2,300 reviews</div>
      <div className="bl-tag"><b>Free shipping</b>On orders over $75</div>
    </div>
  );
}

/* 6 · Terra: architecture hero with mouse-parallax skyline -------------- */
const SKY = [
  { l: "2%", w: "9%", h: "42%" }, { l: "13%", w: "7%", h: "55%" }, { l: "24%", w: "10%", h: "38%" }, { l: "38%", w: "8%", h: "60%" },
  { l: "50%", w: "11%", h: "46%" }, { l: "64%", w: "7%", h: "66%" }, { l: "74%", w: "10%", h: "50%" }, { l: "87%", w: "9%", h: "40%" },
];
function Terra() {
  const root = useRef();
  useGSAP(() => {
    const split = SplitText.create(".te h1", { type: "lines", mask: "lines" });
    gsap.timeline({ defaults: { ease: "power4.out" } })
      .from(".te-line", { scaleX: 0, duration: 1.4, ease: "expo.inOut" })
      .from(".hx-nav", { opacity: 0, duration: 0.8 }, "-=0.8")
      .from(".te-kicker", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
      .from(split.lines, { yPercent: 110, stagger: 0.14, duration: 1.2 }, "-=0.4")
      .from(".te p, .te .hx-btn", { y: 20, opacity: 0, stagger: 0.12, duration: 0.8 }, "-=0.7")
      .from(".te-stats > div", { x: 40, opacity: 0, stagger: 0.12, duration: 0.8 }, "-=0.8")
      .from(".te-b", { yPercent: 100, stagger: { each: 0.04, from: "random" }, duration: 1.4, ease: "expo.out" }, "-=1.6");
    const layers = gsap.utils.toArray(".te-layer").map((el, i) => ({ x: gsap.quickTo(el, "x", { duration: 0.8 }), k: (i + 1) * 14 }));
    const el = root.current;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      layers.forEach((l) => l.x(-nx * l.k));
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, { scope: root });
  return (
    <div ref={root} className="hx te">
      <div className="te-sky" />
      {[1, 2, 3].map((n) => (
        <div key={n} className={`te-layer te-l${n}`} style={{ height: `${70 - n * 12}%`, top: "auto", bottom: 0 }}>
          {SKY.map((b, i) => <i key={i} className="te-b" style={{ left: `${(parseFloat(b.l) + n * 5) % 92}%`, width: b.w, height: `${parseFloat(b.h) * (1 - (n - 1) * 0.08) * (0.8 + ((i * n) % 3) * 0.12)}%` }} />)}
        </div>
      ))}
      <Nav logo="TERRA" links={["Projects", "Studio", "Journal"]} cta="Enquire" />
      <div className="te-line" />
      <div className="te-copy">
        <div className="te-kicker">Architecture & urban design</div>
        <h1>Spaces that<br /><em>breathe</em> with<br />the city.</h1>
        <p>Award-winning sustainable architecture, from private homes to cultural landmarks.</p>
        <a className="hx-btn" href="#">View projects</a>
      </div>
      <div className="te-stats">
        <div><b>120+</b><span>Projects</span></div>
        <div><b>18</b><span>Awards</span></div>
        <div><b>12</b><span>Countries</span></div>
      </div>
    </div>
  );
}

/* 7 · Lumen: free waitlist hero ---------------------------------------- */
function Lumen() {
  const root = useRef();
  const [sent, setSent] = useState(false);
  useGSAP(() => {
    const split = SplitText.create(".lu h1", { type: "words", mask: "words" });
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".hx-nav", { y: -24, opacity: 0, duration: 0.8 })
      .from(".lu-badge", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(split.words, { yPercent: 110, stagger: 0.07, duration: 0.9 }, "-=0.3")
      .from(".lu-form, .lu-proof", { y: 24, opacity: 0, stagger: 0.12, duration: 0.8 }, "-=0.5")
      .from(".lu-orb", { scale: 0, opacity: 0, stagger: 0.15, duration: 1.4, ease: "elastic.out(1, 0.5)" }, "-=1.2");
    gsap.to(".lu-orb", { y: "random(-24, 24)", x: "random(-18, 18)", repeat: -1, yoyo: true, duration: "random(3, 5)", ease: "sine.inOut", stagger: 0.4 });
  }, { scope: root });
  return (
    <div ref={root} className="hx lu">
      <i className="lu-orb o1" /><i className="lu-orb o2" /><i className="lu-orb o3" />
      <Nav logo="lumen" links={["Features", "Pricing", "Blog"]} cta="Sign in" ctaClass="p" />
      <div className="lu-center">
        <span className="lu-badge">✦ Launching this spring</span>
        <h1>Launch your idea before lunch.</h1>
        <form className="lu-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {sent ? <b>You&apos;re on the list ✓</b> : (<><input type="email" required placeholder="you@email.com" /><button>Join waitlist</button></>)}
        </form>
        <div className="lu-proof"><span className="lu-av"><i /><i /><i /></span>Join the early-access list</div>
      </div>
    </div>
  );
}

/* 8 · Helix: 3D product-studio hero with a chrome torus knot ----------- */
function Knot() {
  const m = useRef();
  useFrame((s, dt) => {
    m.current.rotation.x += dt * 0.3;
    m.current.rotation.y += (s.pointer.x * 2 - m.current.rotation.y) * 0.03 + dt * 0.2;
    m.current.position.y += (s.pointer.y * 0.5 - m.current.position.y) * 0.05;
  });
  return (
    <Float speed={1.4} floatIntensity={0.6}>
      <mesh ref={m}>
        <torusKnotGeometry args={[1.1, 0.38, 220, 32]} />
        <meshStandardMaterial color="#c9b8ff" metalness={1} roughness={0.12} />
      </mesh>
    </Float>
  );
}
function Helix() {
  const root = useRef();
  useGSAP(() => {
    const split = SplitText.create(".hl h1", { type: "words", mask: "words" });
    gsap.timeline({ defaults: { ease: "expo.out" } })
      .from(".hx-nav", { y: -30, opacity: 0, duration: 0.8 })
      .from(".hl-tag", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
      .from(split.words, { yPercent: 110, stagger: 0.08, duration: 1.1 }, "-=0.4")
      .from(".hl p, .hl .hx-btn", { y: 24, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.7")
      .from(".hl-canvas", { scale: 0.6, opacity: 0, duration: 1.6 }, "-=1.4");
  }, { scope: root });
  return (
    <div ref={root} className="hx hl">
      <div className="hl-glow" />
      <Nav logo="◈ Helix" links={["Studio", "Showcase", "Pricing"]} cta="Try it" />
      <div className="hl-canvas">
        <Canvas camera={{ position: [0, 0, 6.5], fov: 40 }} dpr={[1, 1.25]}>
          <Studio /><Knot />
        </Canvas>
      </div>
      <div className="hl-copy">
        <span className="hl-tag">3D web experiences</span>
        <h1>Make your product <em>impossible to ignore.</em></h1>
        <p>Interactive 3D heroes that react to every move, built to turn visitors into customers.</p>
        <a className="hx-btn p" href="#">Explore the studio →</a>
      </div>
    </div>
  );
}

/* 9 · Tidal: cinematic wave hero --------------------------------------- */
function Tidal() {
  const root = useRef();
  useGSAP(() => {
    const split = SplitText.create(".td h1", { type: "lines", mask: "lines" });
    gsap.timeline({ defaults: { ease: "expo.out" } })
      .from(".hx-nav", { y: -30, opacity: 0, duration: 0.8 })
      .from(split.lines, { yPercent: 110, stagger: 0.14, duration: 1.4 }, "-=0.4")
      .from(".td p, .td .hx-btn", { y: 24, opacity: 0, stagger: 0.12, duration: 0.9 }, "-=0.8")
      .from(".td-wave", { yPercent: 40, opacity: 0, stagger: 0.15, duration: 1.6 }, "-=1.4");
    gsap.utils.toArray(".td-wave i").forEach((w, n) => gsap.to(w, { xPercent: -50, duration: 14 - n * 3, repeat: -1, ease: "none" }));
    gsap.utils.toArray(".td-bub").forEach((b) => gsap.to(b, { y: "random(-50, -140)", opacity: 0, duration: "random(4, 7)", repeat: -1, delay: "random(0, 4)", ease: "sine.out" }));
  }, { scope: root });
  return (
    <div ref={root} className="hx td">
      <Nav logo="Tidal" links={["Journeys", "Stories", "About"]} cta="Book now" />
      {[0, 1, 2, 3, 4, 5].map((i) => <b key={i} className="td-bub" style={{ left: `${12 + i * 15}%` }} />)}
      <div className="td-copy">
        <span className="td-tag">Coastal escapes</span>
        <h1>Let the tide<br />carry you <em>home.</em></h1>
        <p>Slow, scroll-led stories from the world&apos;s quietest shores.</p>
        <a className="hx-btn p" href="#">Start exploring →</a>
      </div>
      {[1, 2, 3].map((n) => <div key={n} className={`td-wave w${n}`}><i /></div>)}
    </div>
  );
}

/* 10 · Prism: glass cards over a conic-gradient orb --------------------- */
function Prism() {
  const root = useRef();
  useGSAP(() => {
    const split = SplitText.create(".pr h1", { type: "words", mask: "words" });
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".hx-nav", { y: -24, opacity: 0, duration: 0.8 })
      .from(split.words, { yPercent: 110, stagger: 0.07, duration: 0.9 }, "-=0.3")
      .from(".pr p, .pr .hx-btn", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.5")
      .from(".pr-orb", { scale: 0.4, opacity: 0, duration: 1.6, ease: "expo.out" }, "-=1.2")
      .from(".pr-glass", { y: 60, opacity: 0, rotate: 6, stagger: 0.15, duration: 1.1, ease: "back.out(1.4)" }, "-=1");
    gsap.to(".pr-orb", { rotate: 360, duration: 24, repeat: -1, ease: "none" });
    gsap.to(".pr-glass", { y: "random(-14, 14)", repeat: -1, yoyo: true, duration: "random(2.5, 4)", ease: "sine.inOut", stagger: 0.3 });
    const el = root.current;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(".pr-stage", { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 14, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 10, duration: 0.8 });
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, { scope: root });
  return (
    <div ref={root} className="hx pr">
      <Nav logo="◇ Prism" links={["Work", "Process", "Contact"]} cta="Get in touch" />
      <div className="pr-copy">
        <h1>Design that catches the light.</h1>
        <p>A brand and web studio shaping calm, confident, colorful products.</p>
        <a className="hx-btn p" href="#">View our work →</a>
      </div>
      <div className="pr-stage">
        <i className="pr-orb" />
        <div className="pr-glass g1"><b>98</b><span>Lighthouse score</span></div>
        <div className="pr-glass g2"><b>+240%</b><span>Conversion lift</span></div>
        <div className="pr-glass g3"><b>4 wks</b><span>Concept to launch</span></div>
      </div>
    </div>
  );
}

const COMPS = { aurora: Aurora, orbit: Orbit, noir: Noir, arcade: Arcade, bloom: Bloom, terra: Terra, lumen: Lumen, helix: Helix, tidal: Tidal, prism: Prism };
export const HERO_TEMPLATES = TEMPLATES_DATA.map((t) => ({ ...t, Comp: COMPS[t.slug] }));
export const HERO_CATS = ["All", ...new Set(HERO_TEMPLATES.map((t) => t.cat))];

/* Stage: renders the template only while on screen, in a cqw-sized container */
export function Stage({ comp: Comp, full = false }) {
  const ref = useRef();
  const [on, setOn] = useState(full);
  useEffect(() => {
    if (full) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.25 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [full]);
  return <div ref={ref} className={`stage ${full ? "full" : ""}`}>{on && <Comp />}</div>;
}
