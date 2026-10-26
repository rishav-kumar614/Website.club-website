import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CubeVisual } from "@/components/visuals/SceneHosts";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { SelectedWork } from "@/components/SelectedWork";
import { FinalCTA } from "@/components/FinalCTA";
import { Spotlight } from "@/components/ui/Spotlight";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { BuildStages } from "@/components/build/BuildStages";
import { BuildProcess } from "@/components/build/BuildProcess";
import { ScopePlanner } from "@/components/build/ScopePlanner";
import "../transform/transform.css";
import "./build.css";

export const metadata: Metadata = {
  title: "Bespoke 3D Website Design & Custom Creative Coding | Website Club",
  description:
    "100% custom-built 3D digital flagships. Tailored GLSL shaders, custom WebGL physics, and high-performance interactive architectures.",
};

const BESPOKE_CAPABILITIES = [
  {
    num: "01",
    tag: "ARCHITECTURE",
    title: "Zero-Template Architecture",
    desc: "100% custom Three.js and WebGL codebase built from scratch. No shared components, no templates from other clients.",
    highlight: "100% Original Code",
  },
  {
    num: "02",
    tag: "SHADER PHYSICS",
    title: "Tailored GLSL Shaders",
    desc: "Bespoke vertex and fragment shaders crafted for your specific visual physics: caustics, refraction, particles, and kinetic typography.",
    highlight: "Custom GLSL Engine",
  },
  {
    num: "03",
    tag: "SPATIAL ASSETS",
    title: "Full-Pipeline 3D Modeling",
    desc: "From industrial CAD file optimization to high-fidelity organic models, texture baking, and cinematic studio lighting choreography.",
    highlight: "92% Draco Compression",
  },
  {
    num: "04",
    tag: "STABILITY & FRAMERATE",
    title: "60 FPS GPU Guaranteed",
    desc: "Rigorous performance profiling ensuring butter-smooth 60 FPS interactions across desktop, tablet, and mobile GPUs.",
    highlight: "Locked 60 FPS",
  },
];

export default function CustomPage() {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <SmoothScroll />
      <Spotlight />
      <Navbar />

      <main id="main" className="bd">
        {/* Hero */}
        <section className="bd-hero" aria-labelledby="custom-hero-title">
          <div className="bd-hero-bg" aria-hidden="true">
            <i className="c tl" />
            <i className="c tr" />
            <i className="c bl" />
            <i className="c br" />
          </div>
          <div className="wrap bd-hero-inner">
            <div className="bd-hero-copy">
              <span className="bd-pill">
                <span className="dot" />
                Bespoke 3D web engineering
              </span>
              <h1 id="custom-hero-title" className="display bd-h1">
                <span>Original 3D.</span>
                <span>
                  Built from <em>ground zero.</em>
                </span>
              </h1>
              <p className="lead bd-lead">
                A fully custom 3D flagship, designed and engineered around your brand. No templates, no shared
                components, and the code is yours.
              </p>
              <div className="bd-cta">
                <a href="#planner" className="btn btn-primary">
                  Plan my build →
                </a>
                <a href="#work" className="btn btn-ghost">
                  View case studies
                </a>
              </div>
            </div>

            <div className="bd-hero-stage">
              <div className="bd-dim h" aria-hidden="true">
                <span>Zero templates</span>
              </div>
              <div className="bd-dim v" aria-hidden="true">
                <span>100% your IP</span>
              </div>
              <CubeVisual />
              <div className="bd-chip a">Custom GLSL</div>
              <div className="bd-chip b">3–4 week sprint</div>
              <div className="bd-chip c">60 FPS locked</div>
            </div>
          </div>
        </section>

        {/* Interactive build stages */}
        <section className="section bd-sec" aria-labelledby="bd-stages-title">
          <div className="wrap">
            <div className="tf-head">
              <span className="tf-kicker">From sketch to hero quality</span>
              <h2 id="bd-stages-title" className="h2">
                Watch one object get built.
              </h2>
              <p className="lead">Scrub through the four stages every custom piece goes through, and drag to rotate.</p>
            </div>
            <Reveal>
              <BuildStages />
            </Reveal>
          </div>
        </section>

        {/* Capabilities */}
        <section className="section bd-sec" style={{ paddingTop: 0 }} aria-labelledby="bd-caps-title">
          <div className="wrap">
            <div className="tf-head">
              <span className="tf-kicker">Engineering specifications</span>
              <h2 id="bd-caps-title" className="h2">
                The custom studio standard.
              </h2>
              <p className="lead">Every commission is profiled on real hardware before it ships.</p>
            </div>
            <div className="bd-caps">
              {BESPOKE_CAPABILITIES.map((cap, i) => (
                <Reveal key={cap.num} delay={i * 70}>
                  <article className="bd-cap">
                    <div className="top">
                      <span className="tag">{cap.tag}</span>
                      <span className="num">{cap.num}</span>
                    </div>
                    <h3>{cap.title}</h3>
                    <p>{cap.desc}</p>
                    <span className="hl">
                      <span className="d" />
                      {cap.highlight}
                    </span>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section bd-sec bd-dark" aria-labelledby="bd-proc-title">
          <div className="wrap">
            <div className="tf-head">
              <span className="tf-kicker tf-kicker-dark">How a build runs</span>
              <h2 id="bd-proc-title" className="h2">
                Four weeks, four phases.
              </h2>
              <p className="lead">Pick a phase to see what you get. You see a private preview every week.</p>
            </div>
            <Reveal>
              <BuildProcess />
            </Reveal>
          </div>
        </section>

        {/* Scope planner */}
        <section id="planner" className="section bd-sec" aria-labelledby="bd-plan-title">
          <div className="wrap">
            <div className="tf-head">
              <span className="tf-kicker">Plan your build</span>
              <h2 id="bd-plan-title" className="h2">
                Shape the scope. See the time.
              </h2>
              <p className="lead">Pick what you want to make and watch the timeline and complexity update.</p>
            </div>
            <Reveal>
              <ScopePlanner />
            </Reveal>
          </div>
        </section>

        {/* Selected Work Portfolio Case Studies */}
        <SelectedWork />

        {/* Final CTA & Contact Inquiry Form */}
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
